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

export default function TaskNewEdit() {
    const { id } = useParams();
    const [task, setTask] = React.useState("");
    const [status, setStatus] = React.useState("Pending");

    const fetchTaskData = async () => {
        if (id) {
            // Fetch task details for editing (not implemented in this snippet)
            // You would typically use useEffect to fetch the task data and populate the state
            try {
                const data = await fetchTask(id);
                if (data.task) {
                    setTask(data.task.title);
                    setStatus(data.task.status);
                } else {
                    alert(data.message || "Failed to fetch task details. Please try again.");
                }
            } catch (err) {
                console.error("Error fetching task details:", err);
                alert("Network error. Please try again.");
            }
        }
    }

    useEffect(() => {
        fetchTaskData();
    }, [id]);

    const onSubmit = async () => {
        if (id) {
            try {
                const data = await updateTask(id, { title: task, status });
                if (data.task) {
                    window.location.href = "/tasks";
                } else {
                    alert(data.message || "Failed to update task. Please try again.");
                }
            } catch (err) {
                console.error("Error updating task:", err);
                alert("Network error. Please try again.");
            }
            return;
        }
        try {
            const data = await createTask({ title: task, status });
            if (data.task) {
                window.location.href = "/tasks";
            } else {
                alert(data.message || "Failed to create task. Please try again.");
            }
        } catch (err) {
            console.error("Error submitting task:", err);
            alert("Network error. Please try again.");
        }
    }

    return (
        <div className="p-4 flex justify-center">
            <FieldSet className="w-full max-w-xs">
                <FieldGroup >
                    <Field>
                        <FieldLabel htmlFor="task">Task</FieldLabel>
                        <Input id="task" type="text" placeholder="Task" value={task} onChange={(e) => setTask(e.target.value)} />
                        <FieldDescription>
                            Enter the task details.
                        </FieldDescription>
                    </Field>
                    <Field>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" onChange={(e) => setStatus(e.target.value)}>
                                    {status}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuGroup>
                                    <DropdownMenuLabel>Pending</DropdownMenuLabel>
                                    <DropdownMenuItem value="Pending" onClick={() => setStatus("Pending")}>
                                        Pending
                                    </DropdownMenuItem>
                                    <DropdownMenuItem value="Completed" onClick={() => setStatus("Completed")}>
                                        Completed
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </Field>
                    <Button className="mt-4" variant="default" size="default" onClick={onSubmit}>
                        Submit
                    </Button>
                </FieldGroup>
            </FieldSet>
        </div>
    );
}