"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/store";
import { toast } from "react-toastify";

export default function SignInPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ username: "", password: "" });
    const dispatch = useDispatch();

    interface CustomJwtPayload {
        sub: string;
        role: string;
    }

    function handleInputChange(event: { target: { id: any; value: any; }; }) {
        const { id, value } = event.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    }

    async function onSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault();
        setIsLoading(true);

        try {
            const payload = {
                username: formData.username,
                password: formData.password,
            };

            const response = await axios.post(
                "http://localhost:8080/api/auth/login",
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );


            if (response.status === 200) {
                const authHeader = response.headers["authorization"];
                if (authHeader) {
                    const token = authHeader.split(" ")[1];
                    const decodedToken = jwtDecode<CustomJwtPayload>(token);
                    dispatch(setUser({ id: decodedToken.sub, role: decodedToken.role, jwt: token }));
                    toast.success("Login successful!");
                    window.location.href = "/dashboard";
                } else {
                    throw new Error("Authorization header not found");
                }
            } else {
                throw new Error("Invalid login attempt");
            }
        } catch (error) {
            console.error("Login failed: Unauthorized access", error);
            toast.error("Invalid credentials. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0e0d29] to-[#010048]/70" />
                <div className="relative z-20 flex items-center text-lg font-medium">
                    <Icons.swasthyahith className="mr-2 h-6 w-6" /> Swasthyahith
                </div>
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            "Revolutionizing healthcare by connecting doctors and patients through secure, digital prescriptions and comprehensive medical records."
                        </p>
                        <footer className="text-sm">Swasthyahith Healthcare Platform</footer>
                    </blockquote>
                </div>
            </div>
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">Sign in to your account</h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your username below to sign in to your account
                        </p>
                    </div>
                    <div className="grid gap-6">
                        <form onSubmit={onSubmit}>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="username">Username</Label>
                                    <Input
                                        id="username"
                                        placeholder="name@example.com"
                                        type="text"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        autoCapitalize="none"
                                        autoComplete="username"
                                        autoCorrect="off"
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        placeholder="Enter your password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        autoCapitalize="none"
                                        autoComplete="current-password"
                                        autoCorrect="off"
                                        disabled={isLoading}
                                    />
                                </div>
                                <Button disabled={isLoading} className="bg-[#8B5DFF] hover:bg-[#6A42C2]">
                                    {isLoading && (
                                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    Sign In
                                </Button>
                            </div>
                        </form>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-1">
                            <Button variant="outline" disabled={isLoading}>
                                <Icons.google className="mr-2 h-4 w-4" /> Google
                            </Button>
                        </div>
                    </div>
                    <p className="px-8 text-center text-sm text-muted-foreground">
                        Don&apos;t have an account?{' '}
                        <a
                            href="/signup"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}