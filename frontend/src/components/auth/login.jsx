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
import { login } from "../../utils/api";
import { LogIn } from "lucide-react";

export default function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    const onLogin = async () => {
        setError("");
        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }

        setIsLoading(true);
        try {
            const data = await login(email, password);

            if (data.token) {
                localStorage.setItem("token", data.token);
                window.location.href = "/tasks";
            } else {
                setError(data.message || "Login failed. Please try again.");
            }
        } catch (err) {
            setError("Network error. Please check your connection.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 px-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                    <div className="flex justify-center mb-6">
                        <div className="bg-blue-100 p-3 rounded-xl">
                            <LogIn className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>

                    <h1 className="text-2xl font-bold text-center text-slate-900 mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-center text-slate-600 mb-6 text-sm">
                        Sign in to your account to continue
                    </p>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-700 text-sm font-medium">{error}</p>
                        </div>
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
                                    We'll never share your email.
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
                                    At least 8 characters
                                </FieldDescription>
                            </Field>

                            <Button
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-6"
                                onClick={onLogin}
                                disabled={isLoading}
                            >
                                {isLoading ? "Signing in..." : "Sign In"}
                            </Button>
                        </FieldGroup>
                    </FieldSet>

                    <p className="text-center text-slate-600 mt-6 text-sm">
                        Don't have an account?{" "}
                        <button
                            onClick={() => window.location.href = "/signup"}
                            className="text-blue-600 hover:text-blue-700 font-semibold"
                        >
                            Sign up
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}