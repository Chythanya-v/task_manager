import { prisma } from "../prisma.js";

export const createTask = async (req, res) => {
    const { title, status } = req.body;
    const userId = req.user.id;

    const task = await prisma.tasks.create({
        data: {
            title,
            status,
            userId
        }
    });

    return res.status(201).json({ message: "Task created successfully", task });
};

export const getTasks = async (req, res) => {
    const userId = req.user.id;

    const tasks = await prisma.tasks.findMany({
        where: { userId }
    });

    return res.status(200).json({ message: "Tasks retrieved successfully", tasks });
};

export const getTask = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    const task = await prisma.tasks.findFirst({
        where: { id: parseInt(id), userId }
    });

    if (!task) {
        return res.status(404).json({ message: "Task not found or not authorized." });
    }

    return res.status(200).json({ message: "Task retrieved successfully", task });
};

export const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, status } = req.body;
    const userId = req.user.id;

    // Ensure the task belongs to the logged-in user
    const existing = await prisma.tasks.findFirst({
        where: { id: parseInt(id), userId }
    });

    if (!existing) {
        return res.status(404).json({ message: "Task not found or not authorized." });
    }

    const task = await prisma.tasks.update({
        where: { id: parseInt(id) },
        data: { title, status }
    });

    return res.status(200).json({ message: "Task updated successfully", task });
};

export const deleteTask = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    // Ensure the task belongs to the logged-in user
    const existing = await prisma.tasks.findFirst({
        where: { id: parseInt(id), userId }
    });

    if (!existing) {
        return res.status(404).json({ message: "Task not found or not authorized." });
    }

    await prisma.tasks.delete({
        where: { id: parseInt(id) }
    });

    return res.status(200).json({ message: "Task deleted successfully" });
};