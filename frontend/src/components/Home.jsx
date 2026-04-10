import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { CheckCircle2 } from "lucide-react";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 px-4">
            <div className="text-center max-w-2xl">
                <div className="mb-8">
                    <div className="flex justify-center mb-6">
                        <div className="bg-blue-100 p-4 rounded-2xl">
                            <CheckCircle2 className="w-12 h-12 text-blue-600" />
                        </div>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-4 text-slate-900 tracking-tight">
                        Task Manager
                    </h1>
                    <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                        Organize your work, boost your productivity. Create, manage, and track your tasks with ease.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        variant="default"
                        size="lg"
                        onClick={() => navigate("/signup")}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg h-auto"
                    >
                        Get Started
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={() => navigate("/login")}
                        className="px-8 py-6 text-lg h-auto border-slate-300"
                    >
                        Sign In
                    </Button>
                </div>
            </div>
        </div>
    );
}
