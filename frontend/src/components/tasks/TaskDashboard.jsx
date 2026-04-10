import React from "react";
import { Routes, Route } from "react-router-dom";
import Tasks from "./Tasks";
import TaskNewEdit from "./TaskNewEdit";
import Signup from "../auth/signup";
import Login from "../auth/login";

export default function TaskDashboard() {
    return (
        <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/tasks/new" element={<TaskNewEdit />} />
            <Route path="/tasks/:id" element={<TaskNewEdit />} />
        </Routes>
    );
}