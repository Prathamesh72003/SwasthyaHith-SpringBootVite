"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/store";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function SignUpPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        registerationNumber: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        role: "patient"
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    interface CustomJwtPayload {
        sub: string;
        role: string;
    }


    function handleInputChange(event: { target: { id: string; value: string; }; }) {
        const { id, value } = event.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    }

    function handleRoleChange(role: string) {
        if (role === "patient") {
            role = "ROLE_PATIENT";
        } else {
            role = "ROLE_DOCTOR";
        }
        setFormData((prev) => ({ ...prev, role }));
        role = ""
    }

    async function onSubmit(event: React.FormEvent) {
        event.preventDefault();
        setIsLoading(true);

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            setIsLoading(false);
            return;
        }

        try {
            const payload = {
                name: formData.name,
                username: formData.username,
                email: formData.email,
                phone: formData.phoneNumber,
                registeration_number: formData.registerationNumber,
                password: formData.password,
                authority: formData.role,
            };

            const response = await axios.post(
                "http://localhost:8080/api/auth/register",
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                toast.success("Registration successful! Logging in...");
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
                }
            } else {
                throw new Error("Registration failed");
            }
        } catch (error) {
            console.error("Registration failed:", error);
            toast.error("Registration failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    function handleIconClick() {
        navigate("/");
    }

    return (
        <>
            <Toaster />
            <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0e0d29] to-[#010048]/70" />
                    <div className="relative z-20 flex items-center text-xl font-medium cursor-pointer">
                        <Icons.swasthyahith className="mr-2 h-6 w-6" /> <span onClick={() => handleIconClick()}>Swasthyahith</span>
                    </div>
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg">
                                "Join our platform to revolutionize your healthcare experience. Connect with doctors, access digital prescriptions, and manage your medical records securely."
                            </p>
                            <footer className="text-sm">Swasthyahith Healthcare Platform</footer>
                        </blockquote>
                    </div>
                </div>
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
                            <p className="text-sm text-muted-foreground">
                                Sign up below to create your Swasthyahith account
                            </p>
                        </div>
                        <Tabs defaultValue="patient" onValueChange={handleRoleChange}>
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger
                                    value="patient"
                                    className="data-[state=active]:bg-[#8B5DFF] hover:bg-[#6A42C2] data-[state=active]:text-white">
                                    Patient
                                </TabsTrigger>
                                <TabsTrigger
                                    value="doctor"
                                    className="data-[state=active]:bg-[#8B5DFF] hover:bg-[#6A42C2] data-[state=active]:text-white">
                                    Doctor
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="patient">
                                <form onSubmit={onSubmit}>
                                    <div className="grid gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="username">Username</Label>
                                            <Input
                                                id="username"
                                                placeholder="Enter your username"
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
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                placeholder="name@example.com"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                autoCapitalize="none"
                                                autoComplete="email"
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
                                                autoComplete="new-password"
                                                autoCorrect="off"
                                                disabled={isLoading}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                                            <Input
                                                id="confirmPassword"
                                                placeholder="Confirm your password"
                                                type="password"
                                                value={formData.confirmPassword}
                                                onChange={handleInputChange}
                                                autoCapitalize="none"
                                                autoComplete="new-password"
                                                autoCorrect="off"
                                                disabled={isLoading}
                                            />
                                        </div>
                                        <Button type="submit" disabled={isLoading} className="bg-[#8B5DFF] hover:bg-[#6A42C2]">
                                            {isLoading && (
                                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                            )}
                                            Sign Up as Patient
                                        </Button>
                                    </div>
                                </form>
                            </TabsContent>
                            <TabsContent value="doctor">
                                <form onSubmit={onSubmit}>
                                    <div className="grid gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="name">Name</Label>
                                            <Input
                                                id="name"
                                                placeholder="Enter your name"
                                                type="text"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                autoCapitalize="none"
                                                autoComplete="name"
                                                autoCorrect="off"
                                                disabled={isLoading}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="username">Username</Label>
                                            <Input
                                                id="username"
                                                placeholder="Enter your username"
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
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                placeholder="name@example.com"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                autoCapitalize="none"
                                                autoComplete="email"
                                                autoCorrect="off"
                                                disabled={isLoading}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="phoneNumber">Phone Number</Label>
                                            <Input
                                                id="phoneNumber"
                                                placeholder="Enter your contact number"
                                                type="tel"
                                                value={formData.phoneNumber}
                                                onChange={handleInputChange}
                                                autoCapitalize="none"
                                                autoComplete="phoneNumber"
                                                autoCorrect="off"
                                                disabled={isLoading}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="registerationNumber">Registration Number</Label>
                                            <Input
                                                id="registerationNumber"
                                                placeholder="Enter your registeration number"
                                                type="text"
                                                value={formData.registerationNumber}
                                                onChange={handleInputChange}
                                                autoCapitalize="none"
                                                autoComplete="registerationNumber"
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
                                                autoComplete="new-password"
                                                autoCorrect="off"
                                                disabled={isLoading}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                                            <Input
                                                id="confirmPassword"
                                                placeholder="Confirm your password"
                                                type="password"
                                                value={formData.confirmPassword}
                                                onChange={handleInputChange}
                                                autoCapitalize="none"
                                                autoComplete="new-password"
                                                autoCorrect="off"
                                                disabled={isLoading}
                                            />
                                        </div>
                                        <Button type="submit" disabled={isLoading} className="bg-[#8B5DFF] hover:bg-[#6A42C2]">
                                            {isLoading && (
                                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                            )}
                                            Sign Up as Doctor
                                        </Button>
                                    </div>
                                </form>
                            </TabsContent>
                        </Tabs>
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
                        <p className="px-8 text-center text-sm text-muted-foreground">
                            Already have an account?{' '}
                            <a
                                href="/login"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Sign in
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

