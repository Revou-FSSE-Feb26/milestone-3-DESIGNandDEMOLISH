'use client'

import { useState } from "react"

interface LoginData {
    email: string,
    password: string,
};

export function LoginPage() {
    const [loginData, setLoginData] = useState<LoginData>({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLoginPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData((previous) => ({
            ...previous, [event.target.name]: event.target.value,
        }))
    };

    const handleReset = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoginData({
            email: "",
            password: "",
        })
    }

    return (
        <>
            <h1>Login</h1>

        </>
    )
}