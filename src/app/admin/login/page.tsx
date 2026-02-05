"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button, Input, Card } from "@/components/ui";
import { Lock, Mail, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                throw error;
            }

            router.push("/admin");
            router.refresh();
        } catch (err: any) {
            setError(err.message || "Failed to sign in");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50 p-4">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                        <Lock className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="mt-6 text-3xl font-bold text-neutral-900">
                        Admin Login
                    </h2>
                    <p className="mt-2 text-sm text-neutral-600">
                        Sign in to access the dashboard
                    </p>
                </div>

                <Card className="p-8">
                    <form className="space-y-6" onSubmit={handleLogin}>
                        {error && (
                            <div className="p-3 rounded-lg bg-red-50 border border-red-200 flex items-center gap-2 text-red-600 text-sm">
                                <AlertCircle className="h-4 w-4 shrink-0" />
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <Input
                                label="Email Address"
                                type="email"
                                placeholder="admin@smilecare.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                leftIcon={<Mail className="h-5 w-5" />}
                            />

                            <Input
                                label="Password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                leftIcon={<Lock className="h-5 w-5" />}
                            />
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full"
                            isLoading={loading}
                            disabled={loading}
                        >
                            Sign In
                        </Button>
                    </form>
                </Card>

                <p className="text-center text-sm text-neutral-500">
                    <Link href="/" className="hover:text-primary-600 transition-colors">
                        ← Back to Website
                    </Link>
                </p>
            </div>
        </div>
    );
}
