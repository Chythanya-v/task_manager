import React from "react";
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
import { createTask } from "../../utils/api";

export default function TaskNewEdit() {
    const [task, setTask] = React.useState("");
    const [status, setStatus] = React.useState("Pending");
    const onSubmit = async () => {
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