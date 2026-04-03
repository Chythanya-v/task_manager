import React from "react";
import { Button } from "../ui/button"

export default function Tasks() {
    return (
        <div>
            <h1 className="underline">Tasks</h1>
            <Button variant="outline" onClick={() => window.location.href = '/tasks/new'}>
                New Task
            </Button>
        </div>
    );
}