import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { CheckCircle2, Zap } from "lucide-react";
import { login } from "../utils/api";

export default function Home() {
    const navigate = useNavigate();
    const [demoLoading, setDemoLoading] = useState(false);
    const [demoError, setDemoError] = useState("");

    const handleDemo = async () => {
        setDemoError("");
        setDemoLoading(true);
        try {
            const data = await login("test@example.com", "test");
            if (data.token) {
                localStorage.setItem("token", data.token);
                window.location.href = "/tasks";
            } else {
                setDemoError(data.message || "Demo login failed. Please try again.");
            }
        } catch (err) {
            setDemoError("Network error. Please check your connection.");
        } finally {
            setDemoLoading(false);
        }
    };


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
                        onClick={() => navigate("/signup")}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 text-lg h-auto"
                    >
                        Get Started
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => navigate("/login")}
                        className="px-8 py-2 text-lg h-auto border-slate-300"
                    >
                        Sign In
                    </Button>
                </div>

                <div className="mt-6">
                    <Button
                        id="home-demo-btn"
                        variant="ghost"
                        onClick={handleDemo}
                        disabled={demoLoading}
                        className="text-slate-500 hover:text-blue-600 hover:bg-blue-50 px-8 py-2 h-auto text-sm gap-2 border border-dashed border-slate-300 hover:border-blue-300"
                    >
                        <Zap className="w-4 h-4" />
                        {demoLoading ? "Logging in…" : "Try Demo"}
                    </Button>
                    {demoError && (
                        <p className="mt-3 text-sm text-red-500">{demoError}</p>
                    )}
                    <p className="mt-2 text-xs text-slate-400">No sign-up needed · Instant access</p>
                </div>
            </div>
        </div>
    );
}
