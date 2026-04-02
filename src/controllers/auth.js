
import { hashSync, compareSync } from "bcrypt";
import { prisma } from "../prisma.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    const { email, password } = req.body;

    let user = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (user) {
        return res.status(400).json({ message: "User already exists" });
    }

    user = await prisma.user.create({
        data: {
            email,
            password: hashSync(password, 10)
        }
    });

    return res.status(201).json({ message: "User created successfully", user });
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    let user = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!compareSync(password, user.password)) {
        return res.status(400).json({ message: "Incorrect Password" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    return res.status(200).json({ message: "User logged in successfully", email: user.email, token });
};
