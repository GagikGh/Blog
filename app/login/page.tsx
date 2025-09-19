"use client"

import React, { useRef, useState } from 'react';
import Form from "@/app/components/ui/Form";
import { loginSchema, registerSchema } from "@/validation";
import {saveToken, saveUserId} from "@/helpers/fromLocalStorage"
import { FormRef } from "@/types";
import Button from "@/app/components/ui/Button";

function LoginForm({ setToken } : { setToken : (token: string) => void }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const formRef = useRef<FormRef>(null);

    const loginFormItems = { email: "", password: "" };
    const registerFormItems = { firstname: "", lastname: "", phone: "", email: "", password: "" };

    const handleLogin = async (info: Record<string, FormDataEntryValue>) => {
        setIsLoading(true);
        try {
            const endpoint = isLogin ? "/login" : "/register";
            const res = await fetch(`http://localhost:3002/api/${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(info),
                credentials: "include"
            });

            if (!res.ok) {
                throw new Error("Invalid credentials");
            }
            const data = await res.json();

            saveToken(data.token);
            saveUserId(data.user.id)
            setToken(data.token);
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async (info: Record<string, FormDataEntryValue> ) => {
        setIsLoading(true);
        try {
            const endpoint = isLogin ? "/login" : "/register";
            const res = await fetch(`http://localhost:3002/api/${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(info),
            });

            if (!res.ok) {
                throw new Error(isLogin ? "Invalid credentials" : "Registration failed");
            }

            const data = await res.json();
            saveToken(data.token);
            saveUserId(data.user.id)
            setToken(data.token);

        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    {isLogin ? "Welcome Back" : "Create Your Account"}
                </h2>
                <Form
                    ref={formRef}
                    validationSchema={isLogin ? loginSchema : registerSchema}
                    formItems={isLogin ? loginFormItems : registerFormItems}
                    onFinish={isLogin ? handleLogin : handleRegister}
                />
                <Button
                    type="primary"
                    label={isLogin ? "Login" : "Register"}
                    onClick={() => formRef?.current?.submitForm()}
                    disabled={isLoading}

                />
                <div className="mt-4 text-center">
                    <button
                        type="button"
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-sm text-blue-600 hover:underline hover:cursor-pointer"
                    >
                        {isLogin
                            ? "Don't have an account? Register"
                            : "Already have an account? Login"}
                    </button>
                </div>
            </div>
        </div>

    );
}

export default LoginForm;
