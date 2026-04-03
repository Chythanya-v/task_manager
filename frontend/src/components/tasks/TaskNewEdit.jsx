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

export default function TaskNewEdit() {
    const onSubmit = () => {

    }

    return (
        <div className="p-4 flex justify-center">
            <FieldSet className="w-full max-w-xs">
                <FieldGroup >
                    <Field>
                        <FieldLabel htmlFor="task">Task</FieldLabel>
                        <Input id="task" type="text" placeholder="Task" />
                        <FieldDescription>
                            Enter the task details.
                        </FieldDescription>
                    </Field>
                    <Field>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">Status</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuGroup>
                                    <DropdownMenuLabel>Pending</DropdownMenuLabel>
                                    <DropdownMenuItem>In Progress</DropdownMenuItem>
                                    <DropdownMenuItem>Completed</DropdownMenuItem>
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