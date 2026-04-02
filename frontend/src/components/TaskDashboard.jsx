import React from "react";
import { Routes, Route } from "react-router-dom";
import Tasks from "./Tasks";
import TaskNewEdit from "./TaskNewEdit";
import Task from "./Task";

export default function TaskDashboard() {
    return (
        <div>
            <Routes>
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/tasks/new" element={<TaskNewEdit />} />
                <Route path="/tasks/:id" element={<Task />} />
            </Routes>
        </div>
    );
}