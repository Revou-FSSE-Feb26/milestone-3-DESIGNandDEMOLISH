"use client"

import { Product } from "@/types";
import { useParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";
import Navigation from "@/components/NavigationBar";
import { useCart } from "@/contexts/CartContext";


export default function ProductData() {
    const params = useParams<{ id: string }>();
    const id = params.id;

    const { dispatch } = useCart();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchProductDetail = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await axios.get<Product>(
                    `https://api.escuelajs.co/api/v1/products/${id}`
                );
                setProduct(response.data);
            } catch (err: any) {
                setError(err.message || "Failed to load Product detail.")
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetail();
    }, [id]);

    return (
        <div>
            <Navigation />
            <main>
                <div className=" mb-6 flex">
                    <Link href="/" className="btn-secondary py-2 text-xs flex items-center gap-1.5 active:scale-95 transition-all">
                        Back to Products
                    </Link>
                </div>

                {error && (
                    <div className="flex flex-col items-center justify-center p-12 text-center text-red-500 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-2xl">
                        <span className="text-3xl mb-2">⚠</span>
                        <h3 className="font-bold text-slate-800 dark:text-zinc-200 text-sm">Failed to Load Product Details</h3>
                        <p className="text-xs mt-1 text-slate-500 dark:text-zinc-400">{error}</p>
                    </div>
                )}

                {loading && !error && (
                    <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-neutral-800 rounded-2xl p-6 flex flex-col md:flex-row gap-8 animate-pulse">
                        <div className="w-full md:w-1/2 h-64 bg-slate-100 dark:bg-zinc-800 rounded-xl" />
                        <div className="flex-1 flex flex-col justify-between py-2">
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <div className="h-6 w-12 bg-slate-100 dark:bg-zinc-800 rounded-md" />
                                </div>
                                <div className="h-7 w-2/3 bg-slate-100 dark:bg-zinc-800 rounded-lg mb-4" />
                                <div className="h-4 w-full bg-slate-50 dark:bg-zinc-800/50 rounded-md mb-2" />
                                <div className="h-4 w-full bg-slate-50 dark:bg-zinc-800/50 rounded-md mb-2" />
                                <div className="h-4 w-3/4 bg-slate-50 dark:bg-zinc-800/50 rounded-md" />
                            </div>
                        </div>
                    </div>
                )}

                {!loading && !error && product && (
                    <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-xs flex flex-col md:flex-row gap-6 md:gap-8 p-6">
                        {/* Left Side: product Image wrapper */}
                        <div className="w-full md:w-1/2 h-72 md:h-80 bg-slate-100 dark:bg-zinc-800 rounded-xl overflow-hidden">
                            {product.images ? (
                                <img src={product.images[0].replace(/^\["|"]$/g, '').replace(/^"|"$/g, '')} alt={product.title} className="h-full w-full object-cover" />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-5xl">📦</div>
                            )}
                        </div>

                        {/* Right Side: product Details wrapper */}
                        <div className="flex-1 flex flex-col justify-between py-2">
                            <div>
                                {/* Meta details tag line */}
                                <div className="flex items-center justify-between gap-4 mb-4">
                                    <span className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400">
                                        ${Number(product.price).toFixed(2)}
                                    </span>
                                </div>

                                <h1 className="text-2xl font-extrabold text-slate-800 dark:text-zinc-150 mb-3">
                                    {product.title}
                                </h1>

                                <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed mb-6 whitespace-pre-line">
                                    {product.description || "No description available for this floral arrangement."}
                                </p>
                            </div>

                            {/* Order checkout confirmation CTA */}
                            <button
                                onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })}
                                className="bg-indigo-600 text-white ..."
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}