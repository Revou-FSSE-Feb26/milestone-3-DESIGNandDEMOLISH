import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AuthUser, SessionData } from "@/types";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: "Username and password are required" },
                { status: 400 }
            );
        }

        const response = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, expiresInMins: 30 })
        });

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json(
                { error: errorData.message || "Invalid credentials" },
                { status: response.status }
            );
        }

        const data = await response.json();
        const accessToken = data.access_token;

        const profile = await fetch("https://api.escuelajs.co/api/v1/auth/profile", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        });

        if (!profile.ok) {
            return NextResponse.json(
                { error: "Failed to load user profile." },
                { status: profile.status }
            );
        }

        const profileData = await profile.json();

        let role: "admin" | "user" = "user";
        if (profileData.role === "admin" || profileData.name === "admin") {
            role = "admin";
        }

        const authUser: AuthUser = {
            id: profileData.id,
            name: profileData.name,
            email: profileData.email,
            avatar: profileData.avatar,
            role,
        };

        const sessionData: SessionData = { user: authUser, token: accessToken };

        const cookieStore = await cookies();
        cookieStore.set("session", JSON.stringify(sessionData), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 30,
        });

        return NextResponse.json(authUser);
    } catch (error) {
        console.error("Login Proxy Error:", error);
        return NextResponse.json(
            { error: "An unexpected authentication error occurred" },
            { status: 500 }
        );
    }
}