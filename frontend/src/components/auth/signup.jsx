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

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState(null); // { type: "success" | "error", message: string }

    const onSignup = async () => {
        setAlert(null);
        try {
            const response = await fetch("/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const text = await response.text();
            const data = text ? JSON.parse(text) : {};

            if (response.ok) {
                setAlert({ type: "success", message: data.message || "User created successfully!" });
            } else {
                setAlert({ type: "error", message: data.message || "Signup failed. Please try again." });
            }
        } catch (err) {
            setAlert({ type: "error", message: "Network error. Please check your connection." });
        }
    };

    return (
        <div className="p-4 flex justify-center items-center h-screen">
            <FieldSet className="w-full max-w-xs">
                <FieldGroup>
                    {alert && (
                        <Alert className="rounded-sm outline outline-green-200 bg-green-50" variant={alert.type === "success" ? "success" : "destructive"}>
                            <AlertTitle>{alert.type === "success" ? "Success" : "Error"}</AlertTitle>
                            <AlertDescription>{alert.message}</AlertDescription>
                        </Alert>
                    )}
                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                            id="email"
                            type="text"
                            placeholder="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <FieldDescription>
                            Enter your email address.
                        </FieldDescription>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <FieldDescription>
                            Must be at least 8 characters long.
                        </FieldDescription>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Field>
                    <Button className="mt-4" variant="default" size="default" onClick={onSignup}>
                        Sign Up
                    </Button>
                </FieldGroup>
            </FieldSet>
        </div>
    )
}