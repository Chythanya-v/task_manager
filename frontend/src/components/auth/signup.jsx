import React, { useState } from "react";
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
    Alert,
    AlertDescription,
    AlertTitle,
} from "../ui/alert"
import { signup } from "../../utils/api";
import { UserPlus } from "lucide-react";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState(null); // { type: "success" | "error", message: string }
    const [isLoading, setIsLoading] = useState(false);

    const onSignup = async () => {
        setAlert(null);

        if (!email || !password) {
            setAlert({ type: "error", message: "Please fill in all fields" });
            return;
        }

        if (password.length < 8) {
            setAlert({ type: "error", message: "Password must be at least 8 characters" });
            return;
        }

        setIsLoading(true);
        try {
            const data = await signup(email, password);
            if (data.user) {
                setAlert({ type: "success", message: "Account created successfully! Redirecting to login..." });
                setTimeout(() => {
                    window.location.href = "/login";
                }, 1500);
            } else {
                setAlert({ type: "error", message: data.message || "Signup failed. Please try again." });
            }
        } catch (err) {
            setAlert({ type: "error", message: "Network error. Please check your connection." });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 px-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                    <div className="flex justify-center mb-6">
                        <div className="bg-green-100 p-3 rounded-xl">
                            <UserPlus className="w-6 h-6 text-green-600" />
                        </div>
                    </div>

                    <h1 className="text-2xl font-bold text-center text-slate-900 mb-2">
                        Create Account
                    </h1>
                    <p className="text-center text-slate-600 mb-6 text-sm">
                        Sign up to start managing your tasks
                    </p>

                    {alert && (
                        <Alert className={`mb-6 border-0 ${alert.type === "success" ? "bg-green-50" : "bg-red-50"}`}>
                            <AlertTitle className={alert.type === "success" ? "text-green-900" : "text-red-900"}>
                                {alert.type === "success" ? "Success" : "Error"}
                            </AlertTitle>
                            <AlertDescription className={alert.type === "success" ? "text-green-700" : "text-red-700"}>
                                {alert.message}
                            </AlertDescription>
                        </Alert>
                    )}

                    <FieldSet className="space-y-0">
                        <FieldGroup className="space-y-6">
                            <Field className="space-y-2">
                                <FieldLabel htmlFor="email" className="text-slate-700 font-medium">Email Address</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-slate-50 border-slate-200"
                                />
                                <FieldDescription className="text-slate-500 text-xs">
                                    We'll use this to sign you in.
                                </FieldDescription>
                            </Field>

                            <Field className="space-y-2">
                                <FieldLabel htmlFor="password" className="text-slate-700 font-medium">Password</FieldLabel>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-slate-50 border-slate-200"
                                />
                                <FieldDescription className="text-slate-500 text-xs">
                                    Minimum 8 characters, use a mix of numbers and letters.
                                </FieldDescription>
                            </Field>

                            <Button
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-6"
                                onClick={onSignup}
                                disabled={isLoading}
                            >
                                {isLoading ? "Creating account..." : "Create Account"}
                            </Button>
                        </FieldGroup>
                    </FieldSet>

                    <p className="text-center text-slate-600 mt-6 text-sm">
                        Already have an account?{" "}
                        <button
                            onClick={() => window.location.href = "/login"}
                            className="text-blue-600 hover:text-blue-700 font-semibold"
                        >
                            Sign in
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}