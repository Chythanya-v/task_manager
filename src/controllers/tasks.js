import { prisma } from "../prisma.js";

export const createTask = async (req, res) => {
    const { title, status } = req.body;

    const task = await prisma.tasks.create({
        data: {
            title,
            status
        }
    });

    return res.status(201).json({ message: "Task created successfully", task });
};

export const getTasks = async (req, res) => {
    const tasks = await prisma.tasks.findMany();

    return res.status(200).json({ message: "Tasks retrieved successfully", tasks });
};

export const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, status } = req.body;

    const task = await prisma.tasks.update({
        where: {
            id: parseInt(id)
        },
        data: {
            title,
            status
        }
    });

    return res.status(200).json({ message: "Task updated successfully", task });
};

export const deleteTask = async (req, res) => {
    const { id } = req.params;

    await prisma.tasks.delete({
        where: {
            id: parseInt(id)
        }
    });

    return res.status(200).json({ message: "Task deleted successfully" });
};