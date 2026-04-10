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

export default function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const onLogin = async () => {
        try {
            const data = await login(email, password);

            if (data.token) {
                localStorage.setItem("token", data.token);
                window.location.href = "/tasks";
            } else {
                alert(data.message || "Login failed. Please try again.");
            }

        } catch (err) {
            alert("Network error. Please check your connection.");
        }
    }
    return (
        <div className="p-4 flex justify-center items-center h-screen">
            <FieldSet className="w-full max-w-xs">
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input id="email" type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <FieldDescription>
                            Enter your email address.
                        </FieldDescription>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <FieldDescription>
                            Must be at least 8 characters long.
                        </FieldDescription>
                        <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Field>
                    <Button className="mt-4" variant="default" size="default" onClick={onLogin}>
                        Login
                    </Button>
                </FieldGroup>
            </FieldSet>
        </div>
    )
}