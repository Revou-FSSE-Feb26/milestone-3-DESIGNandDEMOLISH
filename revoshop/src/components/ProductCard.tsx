'use client'

import { ProductCardProps, Product } from "@/types";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";

export default function ProductCard({ product }: ProductCardProps) {

    const { dispatch } = useCart();

    let initialImage = product?.images && product.images.length > 0 ? product.images[0] : undefined;

    if (initialImage) {
        initialImage = initialImage.replace(/^\["|"]$/g, '').replace(/^"|"$/g, '');
    }

    const [imageSearch, setImageSearch] = useState(initialImage || "https://via.placeholder.com/400x300?text=No+Image+Available")

    if (!product) {
        return null;
    }

    const handleAddToCart = () => {
        console.log(`Added ${product.title} to cart!`);
        // We will add the real cart logic here later
    };

    return (
        <>
            <div className="shop-card">
                <div className="relative h-48 w-full bg-slate-100 dark:bg-zinc-800 overflow-hidden">
                    {product.images ? (
                        <img
                            src={imageSearch}
                            alt={product.title}
                            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                            onError={() => {
                                setImageSearch("https://via.placeholder.com/400x300?text=No+Image+Available");
                            }}
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-3xl">
                            📦
                        </div>
                    )}
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                                ${Number(product.price).toFixed(2)}
                            </span>
                        </div>
                        <h3 className="text-base font-bold text-slate-800 dark:text-zinc-100 line-clamp-1 mb-1">
                            {product.title}
                        </h3>
                        {/* <p className="text-xs text-slate-500 dark:text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                            {product.description || "No description available."}
                        </p> */}
                    </div>
                    <div className="flex flex-col gap-2 mt-4">
                        <Link
                            href={`/flowers/${product.id}`}
                            className="btn-primary py-2 text-xs text-center border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-50 transition"
                        >
                            View Details
                        </Link>

                        {/* YOUR ADD TO CART BUTTON directly in the card! */}
                        <button
                            onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })}
                            className="bg-indigo-600 text-white ..."
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}