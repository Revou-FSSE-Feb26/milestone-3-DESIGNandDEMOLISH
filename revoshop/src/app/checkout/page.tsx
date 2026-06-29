'use client'

import { useState } from "react";
import Link from "next/link";
import Navigation from "@/components/NavigationBar";
import { useCart } from "@/contexts/CartContext";

export default function CheckoutPage() {
    const { items, total, dispatch } = useCart();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [orderPlaced, setOrderPlaced] = useState(false);

    const shippingCost = items.length > 0 ? 5.0 : 0;
    const orderTotal = total + shippingCost;

    const handlePlaceOrder = () => {
        if (!name || !email || !address || !phone) {
            alert("Please complete the shipping details before placing your order.");
            return;
        }

        dispatch({ type: "CLEAR_CART" });
        setOrderPlaced(true);
    };

    return (
        <div className="min-h-screen bg-slate-100 text-slate-900">
            <Navigation />

            <main className="pt-28 px-4 pb-8 mx-auto max-w-7xl">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-8">
                    <div>
                        <p className="text-sm text-slate-500">Checkout</p>
                        <h1 className="text-3xl font-extrabold">Complete Your Order</h1>
                    </div>
                    <Link
                        href="/products"
                        className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                        ← Continue shopping
                    </Link>
                </div>

                {orderPlaced ? (
                    <section className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm">
                        <h2 className="text-2xl font-bold text-slate-900 mb-3">Order Confirmed</h2>
                        <p className="text-sm text-slate-600 mb-4">
                            Your order has been placed successfully. We will email you a confirmation shortly.
                        </p>
                        <Link
                            href="/products"
                            className="inline-flex items-center rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-500 transition"
                        >
                            Return to shop
                        </Link>
                    </section>
                ) : (
                    <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
                        <section className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm">
                            <div className="mb-6">
                                <h2 className="text-xl font-bold">Shipping information</h2>
                                <p className="text-sm text-slate-500 mt-2">
                                    Fill in your details so we can complete the checkout process.
                                </p>
                            </div>

                            <div className="grid gap-4">
                                <label className="space-y-2 text-sm text-slate-700">
                                    <span>Name</span>
                                    <input
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                        placeholder="John Doe"
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500"
                                    />
                                </label>

                                <label className="space-y-2 text-sm text-slate-700">
                                    <span>Email</span>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                        placeholder="you@example.com"
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500"
                                    />
                                </label>

                                <label className="space-y-2 text-sm text-slate-700">
                                    <span>Phone</span>
                                    <input
                                        value={phone}
                                        onChange={(event) => setPhone(event.target.value)}
                                        placeholder="(555) 123-4567"
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500"
                                    />
                                </label>

                                <label className="space-y-2 text-sm text-slate-700">
                                    <span>Shipping address</span>
                                    <textarea
                                        value={address}
                                        onChange={(event) => setAddress(event.target.value)}
                                        placeholder="123 Flower Street, City, Country"
                                        className="w-full min-h-[120px] rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 resize-none"
                                    />
                                </label>
                            </div>

                            <button
                                type="button"
                                onClick={handlePlaceOrder}
                                disabled={items.length === 0}
                                className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-indigo-600 px-6 py-4 text-sm font-semibold text-white shadow-lg transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-300"
                            >
                                Place order
                            </button>
                        </section>

                        <aside className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm">
                            <div className="mb-5">
                                <h2 className="text-xl font-bold">Order summary</h2>
                                <p className="text-sm text-slate-500 mt-1">
                                    Review the items in your cart before placing the order.
                                </p>
                            </div>

                            {items.length === 0 ? (
                                <p className="text-sm text-slate-500">Your cart is empty.</p>
                            ) : (
                                <div className="space-y-4">
                                    <div className="space-y-4">
                                        {items.map((item) => (
                                            <div key={item.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                                                <div className="flex items-start gap-4">
                                                    <div className="h-16 w-16 overflow-hidden rounded-2xl bg-white">
                                                        {item.images?.[0] ? (
                                                            <img
                                                                src={item.images[0]}
                                                                alt={item.title}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="flex h-full items-center justify-center text-2xl">📦</div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-slate-900">{item.title}</h3>
                                                        <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-semibold text-slate-900">
                                                            ${(item.price * item.quantity).toFixed(2)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-3 rounded-3xl bg-white p-4 text-sm text-slate-700">
                                        <div className="flex items-center justify-between">
                                            <span>Subtotal</span>
                                            <span>${total.toFixed(2)}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span>Shipping</span>
                                            <span>${shippingCost.toFixed(2)}</span>
                                        </div>
                                        <div className="flex items-center justify-between border-t border-slate-200 pt-3 font-semibold text-slate-900">
                                            <span>Total</span>
                                            <span>${orderTotal.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </aside>
                    </div>
                )}
            </main>
        </div>
    );
}
