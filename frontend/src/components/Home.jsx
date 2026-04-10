import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
            <h1 className="text-4xl font-bold mb-8 text-indigo-600 tracking-tight">
                Task Manager
            </h1>
            <div className="flex space-x-4">
                <Button variant="default" size="lg" onClick={() => navigate("/signup")}>
                    Sign Up
                </Button>
                <Button variant="outline" size="lg" onClick={() => navigate("/login")}>
                    Log In
                </Button>
            </div>
        </div>
    );
}
