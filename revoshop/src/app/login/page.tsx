'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { mutate } from "swr"

interface LoginData {
    email: string,
    password: string,
};

export default function LoginPage() {
    const router = useRouter();
    const [loginData, setLoginData] = useState<LoginData>({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData((previous) => ({
            ...previous,
            [event.target.name]: event.target.value,
        }))
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);



        setLoading(true);

        try {
            const response = await axios.post("/api/auth/login", {
                email: loginData.email.trim(),
                password: loginData.password,
            });

            await mutate("/api/auth/me", response.data, true);
            router.push("/dashboard");
        } catch (authError) {
            setError("Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setLoginData({
            email: "",
            password: "",
        });
        setError(null);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
                <h1 className="text-3xl font-semibold text-center mb-6">Login</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={loginData.email}
                            onChange={handleChange}
                            className="w-full rounded border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={loginData.password}
                            onChange={handleChange}
                            className="w-full rounded border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
                            placeholder="Enter your password"
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-red-600">{error}</p>
                    )}

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex w-full justify-center rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-60"
                        >
                            {loading ? "Signing in..." : "Sign in"}
                        </button>
                        <button
                            type="button"
                            onClick={handleReset}
                            className="inline-flex w-full justify-center rounded border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50"
                        >
                            Reset
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
