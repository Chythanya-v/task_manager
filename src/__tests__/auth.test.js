import { jest } from '@jest/globals';

jest.unstable_mockModule('../prisma.js', () => {
    return {
        prisma: {
            user: {
                findUnique: jest.fn(),
                create: jest.fn(),
            }
        }
    };
});

const { signup, login } = await import('../controllers/auth.js');
const { prisma } = await import('../prisma.js');
import { hashSync } from "bcrypt";
import jwt from "jsonwebtoken";

describe('Auth Controllers', () => {
    let req, res;
    
    beforeEach(() => {
        req = {
            body: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        jest.clearAllMocks();
        process.env.JWT_SECRET = 'test_secret';
    });

    describe('signup', () => {
        it('should return 400 if user already exists', async () => {
            req.body = { email: 'test@example.com', password: 'password123' };
            prisma.user.findUnique.mockResolvedValueOnce({ id: 1, email: 'test@example.com' });
            
            await signup(req, res);
            
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "User already exists" });
        });

        it('should create a new user and return 201', async () => {
            req.body = { email: 'new@example.com', password: 'password123' };
            prisma.user.findUnique.mockResolvedValueOnce(null);
            
            const mockedUser = { id: 2, email: 'new@example.com' };
            prisma.user.create.mockResolvedValueOnce(mockedUser);
            
            await signup(req, res);
            
            expect(prisma.user.create).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ message: "User created successfully", user: mockedUser });
        });
    });

    describe('login', () => {
        it('should return 400 if user does not exist', async () => {
            req.body = { email: 'nonexistent@example.com', password: 'password123' };
            prisma.user.findUnique.mockResolvedValueOnce(null);
            
            await login(req, res);
            
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "Invalid credentials" });
        });

        it('should return 400 if password is incorrect', async () => {
            req.body = { email: 'test@example.com', password: 'wrongpassword' };
            
            prisma.user.findUnique.mockResolvedValueOnce({ 
                id: 1, 
                email: 'test@example.com',
                password: hashSync('correctpassword', 10) 
            });
            
            await login(req, res);
            
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "Incorrect Password" });
        });

        it('should return 200 and a token if credentials are correct', async () => {
            req.body = { email: 'test@example.com', password: 'correctpassword' };
            
            prisma.user.findUnique.mockResolvedValueOnce({ 
                id: 1, 
                email: 'test@example.com',
                password: hashSync('correctpassword', 10) 
            });
            
            await login(req, res);
            
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ 
                message: "User logged in successfully", 
                email: "test@example.com",
                token: expect.any(String)
            }));
        });
    });
});
