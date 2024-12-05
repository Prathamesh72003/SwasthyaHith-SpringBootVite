import { toast, Toaster } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useLocalState } from "@/util/useLocalStorage";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/store";
import {jwtDecode} from "jwt-decode";
import store from "@/store/store";

interface CustomJwtPayload {
    sub: string;
    role: string;
}

const formSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(4, "Password must be at least 4 characters"),
});

export default function Login() {

    const dispatch = useDispatch();

    const [jsonWebToken, setJsonWebToken] = useLocalState("", "jwt");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onSubmit",
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const payload = {
                username: values.username,
                password: values.password,
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
                    setJsonWebToken(token);
                    toast.success("Login successful!");
                    const decodedToken = jwtDecode<CustomJwtPayload>(token);
                    console.log(decodedToken.role);
                    dispatch(setUser({id: decodedToken.sub.toString(), role: decodedToken.role.toString()}));
                    window.location.href = "/dashboard";
                } else {
                    throw new Error("Authorization header not found");
                }
            } else {
                throw new Error("Invalid login attempt");
            }
        } catch (error: any) {
            console.error("Login failed: Unauthorized access");
    
            toast.error("Invalid credentials. Please try again.");
        }
    }
    

    return (
        <>
            <Toaster />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 max-w-3xl mx-auto py-10"
                >
                    {/* Username Field */}
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="Username" type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Password Field */}
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="****" type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit">Login</Button>
                </form>
            </Form>
        </>
    );
}
