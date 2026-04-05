import { jest } from '@jest/globals';

jest.unstable_mockModule('../prisma.js', () => {
    return {
        prisma: {
            tasks: {
                create: jest.fn(),
                findMany: jest.fn(),
                findFirst: jest.fn(),
                update: jest.fn(),
                delete: jest.fn(),
            }
        }
    };
});

const { createTask, getTasks, getTask, updateTask, deleteTask } = await import('../controllers/tasks.js');
const { prisma } = await import('../prisma.js');

describe('Tasks Controllers', () => {
    let req, res;
    
    beforeEach(() => {
        req = {
            body: {},
            params: {},
            user: { id: 1 } // Mocked logged-in user
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        jest.clearAllMocks();
    });

    describe('createTask', () => {
        it('should create a new task and return 201', async () => {
            req.body = { title: 'Test Task', status: 'Pending' };
            const mockedTask = { id: 1, title: 'Test Task', status: 'Pending', userId: 1 };
            
            prisma.tasks.create.mockResolvedValueOnce(mockedTask);
            
            await createTask(req, res);
            
            expect(prisma.tasks.create).toHaveBeenCalledWith({
                data: { title: 'Test Task', status: 'Pending', userId: 1 }
            });
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ message: 'Task created successfully', task: mockedTask });
        });
    });

    describe('getTasks', () => {
        it('should return 200 and a list of tasks for the user', async () => {
            const mockedTasks = [{ id: 1, title: 'Task 1' }, { id: 2, title: 'Task 2' }];
            prisma.tasks.findMany.mockResolvedValueOnce(mockedTasks);
            
            await getTasks(req, res);
            
            expect(prisma.tasks.findMany).toHaveBeenCalledWith({ where: { userId: 1 } });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Tasks retrieved successfully', tasks: mockedTasks });
        });
    });

    describe('getTask', () => {
        it('should return 404 if task is not found or user is not authorized', async () => {
            req.params = { id: '99' };
            prisma.tasks.findFirst.mockResolvedValueOnce(null);
            
            await getTask(req, res);
            
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Task not found or not authorized.' });
        });

        it('should return 200 and the task if found', async () => {
            req.params = { id: '1' };
            const mockedTask = { id: 1, title: 'Task 1', userId: 1 };
            prisma.tasks.findFirst.mockResolvedValueOnce(mockedTask);
            
            await getTask(req, res);
            
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Task retrieved successfully', task: mockedTask });
        });
    });

    describe('updateTask', () => {
        it('should return 404 if task to update is not found', async () => {
            req.params = { id: '99' };
            req.body = { title: 'Updated' };
            prisma.tasks.findFirst.mockResolvedValueOnce(null);
            
            await updateTask(req, res);
            
            expect(res.status).toHaveBeenCalledWith(404);
        });

        it('should update the task and return 200', async () => {
            req.params = { id: '1' };
            req.body = { title: 'Updated Task', status: 'Completed' };
            
            prisma.tasks.findFirst.mockResolvedValueOnce({ id: 1, userId: 1 });
            const updatedTask = { id: 1, title: 'Updated Task', status: 'Completed', userId: 1 };
            prisma.tasks.update.mockResolvedValueOnce(updatedTask);
            
            await updateTask(req, res);
            
            expect(prisma.tasks.update).toHaveBeenCalledWith({
                where: { id: 1 },
                data: { title: 'Updated Task', status: 'Completed' }
            });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Task updated successfully', task: updatedTask });
        });
    });

    describe('deleteTask', () => {
        it('should return 404 if task to delete is not found', async () => {
            req.params = { id: '99' };
            prisma.tasks.findFirst.mockResolvedValueOnce(null);
            
            await deleteTask(req, res);
            
            expect(res.status).toHaveBeenCalledWith(404);
        });

        it('should delete the task and return 200', async () => {
            req.params = { id: '1' };
            
            prisma.tasks.findFirst.mockResolvedValueOnce({ id: 1, userId: 1 });
            prisma.tasks.delete.mockResolvedValueOnce({});
            
            await deleteTask(req, res);
            
            expect(prisma.tasks.delete).toHaveBeenCalledWith({ where: { id: 1 } });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Task deleted successfully' });
        });
    });
});
