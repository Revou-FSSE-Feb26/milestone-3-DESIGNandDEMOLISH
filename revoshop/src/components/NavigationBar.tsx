'use client'

import Link from "next/link";
import { useState } from "react";
import CartDrawer from "@/components/CartDrawer"; // Make sure this path is correct!

export default function Navigation() {
    // 1. Memory to track if the cart is open
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <header className="w-full py-4 shadow-sm bg-white text-black fixed z-30 flex flex-col">
            <div className="flex justify-between px-4 text-2xl">
                <Link href="/" className="font-bold">RevoShop</Link>

                <nav className="flex items-center gap-10 text-lg">
                    <Link href={"/products"} className="hover:text-indigo-600 transition">
                        Product
                    </Link>
                    <Link href={"/dashboard"} className="hover:text-indigo-600 transition">
                        Dashboard
                    </Link>
                </nav>
                <div className="flex gap-20 px-3">
                    {/* 2. Open the cart when clicked */}
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="hover:scale-110 transition-transform"
                    >
                        <span>🛒</span>
                    </button>
                    <div>
                        <Link href={"/login"} className="hover:text-indigo-600 transition">
                            Login
                        </Link>
                    </div>
                </div>
            </div>

            {/* 3. The sliding drawer itself */}
            <CartDrawer
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
            />
        </header>
    )
}