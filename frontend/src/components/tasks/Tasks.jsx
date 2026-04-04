import React, { useEffect, useState } from "react";
import { Button } from "../ui/button"
import { fetchTasks } from "../../utils/api";
import { Link } from "react-router-dom";

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

    return (
        <div className="p-4 max-w-2xl mx-auto mt-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold underline">Tasks</h1>
                <Button variant="default" onClick={() => window.location.href = '/tasks/new'}>
                    New Task
                </Button>
            </div>
            
            {loading ? (
                <p>Loading tasks...</p>
            ) : tasks.length === 0 ? (
                <p className="text-gray-500">No tasks found. Create one to get started!</p>
            ) : (
                <ul className="space-y-3">
                    {tasks.map(t => (
                        <li key={t.id} className="border p-4 rounded-md shadow-sm flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold text-lg">{t.title}</h3>
                                <span className={`text-sm px-2 py-1 rounded-full ${t.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                    {t.status}
                                </span>
                            </div>
                            <Button variant="outline" size="sm" onClick={() => window.location.href = `/tasks/${t.id}`}>
                                Edit
                            </Button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}