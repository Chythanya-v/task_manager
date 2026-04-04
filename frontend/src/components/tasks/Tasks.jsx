import React, { useEffect, useState } from "react";
import { Button } from "../ui/button"
import { fetchTasks, deleteTask } from "../../utils/api";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table"

export default function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const data = await fetchTasks();
                if (data.message === "Invalid or expired token." || data.message === "No token provided. Authorization denied.") {
                    window.location.href = "/login";
                    return;
                }
                setTasks(data.tasks || []);
            } catch (err) {
                console.error("Failed to load tasks", err);
            } finally {
                setLoading(false);
            }
        };
        loadTasks();
    }, []);

    const onDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this task?")) return;
        try {
            const data = await deleteTask(id);
            if (data.message === "Task deleted successfully") {
                setTasks(tasks.filter(t => t.id !== id));
            } else {
                alert(data.message || "Failed to delete task. Please try again.");
            }
        } catch (err) {
            console.error("Failed to delete task", err);
            alert("Failed to delete task. Please try again.");
        }
    }

    return (
        <div className="p-4 max-w-2xl mx-auto mt-10">
            <div className="flex justify-between items-center mb-6 border-b-2">
                <h1 className="text-2xl font-bold ">Tasks</h1>
                <Button variant="default" className="bg-sky-800 hover:bg-sky-700" onClick={() => window.location.href = '/tasks/new'}>
                    New Task
                </Button>
            </div>

            {loading ? (
                <p>Loading tasks...</p>
            ) : tasks.length === 0 ? (
                <p className="text-gray-500">No tasks found. Create one to get started!</p>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Task</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead></TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tasks.map((t, i) => (
                            <TableRow key={i}>
                                <TableCell className="font-medium">{t.title}</TableCell>
                                <TableCell>{t.status}</TableCell>
                                <TableCell>
                                    <Button variant="outline" size="sm" onClick={() => window.location.href = `/tasks/${t.id}`}>
                                        Edit
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button variant="destructive" size="sm" onClick={() => onDelete(t.id)}>
                                        Delete
                                    </Button>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
}