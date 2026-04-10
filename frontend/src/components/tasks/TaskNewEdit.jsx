import React, { useEffect } from "react";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSet,
} from "../ui/field"
import { Input } from "../ui/input"
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { createTask, fetchTask, updateTask } from "../../utils/api";
import { useParams } from "react-router";
import { ArrowLeft, Save, CheckCircle2, Clock } from "lucide-react";

export default function TaskNewEdit() {
    const { id } = useParams();
    const [task, setTask] = React.useState("");
    const [status, setStatus] = React.useState("Pending");
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");
    const [isEditing, setIsEditing] = React.useState(!!id);

    const fetchTaskData = async () => {
        if (id) {
            try {
                const data = await fetchTask(id);
                if (data.task) {
                    setTask(data.task.title);
                    setStatus(data.task.status);
                } else {
                    setError(data.message || "Failed to fetch task details.");
                }
            } catch (err) {
                console.error("Error fetching task details:", err);
                setError("Network error. Please try again.");
            }
        }
    }

    useEffect(() => {
        fetchTaskData();
    }, [id]);

    const onSubmit = async () => {
        setError("");
        if (!task.trim()) {
            setError("Please enter a task title");
            return;
        }

        setLoading(true);
        try {
            let data;
            if (id) {
                data = await updateTask(id, { title: task, status });
            } else {
                data = await createTask({ title: task, status });
            }

            if (data.task) {
                window.location.href = "/tasks";
            } else {
                setError(data.message || (isEditing ? "Failed to update task." : "Failed to create task."));
            }
        } catch (err) {
            console.error("Error submitting task:", err);
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Header */}
            <div className="border-b border-slate-200 bg-white shadow-sm">
                <div className="max-w-2xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => window.location.href = "/tasks"}
                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            <ArrowLeft className="w-6 h-6 text-slate-600" />
                        </button>
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">
                                {isEditing ? "Edit Task" : "Create New Task"}
                            </h1>
                            <p className="text-slate-600 mt-1">
                                {isEditing ? "Update your task details" : "Add a new task to your list"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className="max-w-2xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-700 font-medium">{error}</p>
                        </div>
                    )}

                    <FieldSet className="space-y-0">
                        <FieldGroup className="space-y-8">
                            <Field className="space-y-3">
                                <FieldLabel htmlFor="task" className="text-slate-900 font-semibold text-base">
                                    Task Title
                                </FieldLabel>
                                <Input
                                    id="task"
                                    type="text"
                                    placeholder="Enter task description..."
                                    value={task}
                                    onChange={(e) => setTask(e.target.value)}
                                    className="bg-slate-50 border-slate-200 py-3 px-4 text-base"
                                />
                                <FieldDescription className="text-slate-500 text-sm">
                                    Be specific about what you need to accomplish.
                                </FieldDescription>
                            </Field>

                            <Field className="space-y-3">
                                <FieldLabel className="text-slate-900 font-semibold text-base">
                                    Status
                                </FieldLabel>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="w-full justify-between border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-900">
                                            <span className="flex items-center gap-2">
                                                {status === "Completed" ? (
                                                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                                                ) : (
                                                    <Clock className="w-4 h-4 text-yellow-600" />
                                                )}
                                                {status}
                                            </span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56">
                                        <DropdownMenuGroup>
                                            <DropdownMenuLabel className="text-slate-700 text-xs font-semibold px-2 py-1.5">
                                                Select Status
                                            </DropdownMenuLabel>
                                            <DropdownMenuItem
                                                onClick={() => setStatus("Pending")}
                                                className="cursor-pointer flex items-center gap-2"
                                            >
                                                <Clock className="w-4 h-4 text-yellow-600" />
                                                <span>Pending</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => setStatus("Completed")}
                                                className="cursor-pointer flex items-center gap-2"
                                            >
                                                <CheckCircle2 className="w-4 h-4 text-green-600" />
                                                <span>Completed</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <FieldDescription className="text-slate-500 text-sm">
                                    Choose whether this task is pending or completed.
                                </FieldDescription>
                            </Field>

                            <div className="flex gap-3 pt-4">
                                <Button
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-6 flex items-center justify-center gap-2"
                                    onClick={onSubmit}
                                    disabled={loading}
                                >
                                    <Save className="w-4 h-4" />
                                    {loading ? "Saving..." : isEditing ? "Update Task" : "Create Task"}
                                </Button>
                                <Button
                                    variant="outline"
                                    className="flex-1 border-slate-300 text-slate-700 hover:bg-slate-100 font-medium py-6"
                                    onClick={() => window.location.href = "/tasks"}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </FieldGroup>
                    </FieldSet>
                </div>
            </div>
        </div>
    );
}