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

export default function Signup() {
    const onSignup = () => {

    }
    return (
        <div className="p-4 flex justify-center items-center h-screen">
            <FieldSet className="w-full max-w-xs">
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="username">Username</FieldLabel>
                        <Input id="username" type="text" placeholder="username" />
                        <FieldDescription>
                            Choose a unique username for your account.
                        </FieldDescription>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <FieldDescription>
                            Must be at least 8 characters long.
                        </FieldDescription>
                        <Input id="password" type="password" placeholder="••••••••" />
                    </Field>
                    <Button className="mt-4" variant="default" size="default" onClick={onSignup}>
                        Sign Up
                    </Button>
                </FieldGroup>
            </FieldSet>
        </div>
    )
}