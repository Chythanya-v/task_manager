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
import { Plus, Edit2, Trash2, LogOut, CheckCircle2, Clock } from "lucide-react";

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

    const onLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Header */}
            <div className="border-b border-slate-200 bg-white shadow-sm">
                <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">My Tasks</h1>
                            <p className="text-slate-600 mt-1">Manage and track your daily tasks</p>
                        </div>
                        <div className="flex gap-3">
                            <Button
                                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                                onClick={() => window.location.href = '/tasks/new'}
                            >
                                <Plus className="w-4 h-4" />
                                New Task
                            </Button>
                            <Button
                                variant="outline"
                                className="border-slate-300 text-slate-700 hover:bg-slate-100 flex items-center gap-2"
                                onClick={onLogout}
                            >
                                <LogOut className="w-4 h-4" />
                                Sign Out
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin">
                            <Clock className="w-8 h-8 text-blue-600" />
                        </div>
                        <span className="ml-3 text-slate-600">Loading your tasks...</span>
                    </div>
                ) : tasks.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="flex justify-center mb-4">
                            <div className="bg-slate-100 p-4 rounded-full">
                                <CheckCircle2 className="w-8 h-8 text-slate-400" />
                            </div>
                        </div>
                        <p className="text-slate-600 text-lg mb-6">No tasks yet. Create one to get started!</p>
                        <Button
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                            onClick={() => window.location.href = '/tasks/new'}
                        >
                            Create Your First Task
                        </Button>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <Table>
                            <TableHeader className="bg-slate-50 border-b border-slate-200">
                                <TableRow className="hover:bg-slate-50">
                                    <TableHead className="text-slate-700 font-semibold">Task</TableHead>
                                    <TableHead className="text-slate-700 font-semibold">Status</TableHead>
                                    <TableHead className="text-right text-slate-700 font-semibold">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {tasks.map((t, i) => (
                                    <TableRow key={i} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                                        <TableCell className="font-medium text-slate-900">{t.title}</TableCell>
                                        <TableCell>
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${t.status === "Completed"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-yellow-100 text-yellow-800"
                                                }`}>
                                                {t.status === "Completed" && <CheckCircle2 className="w-3 h-3 mr-1" />}
                                                {t.status}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex gap-2 justify-end">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="border-slate-300 text-slate-700 hover:bg-slate-100"
                                                    onClick={() => window.location.href = `/tasks/${t.id}`}
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    className="bg-red-100 text-red-700 hover:bg-red-200 border-0"
                                                    onClick={() => onDelete(t.id)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </div>
        </div>
    );
}