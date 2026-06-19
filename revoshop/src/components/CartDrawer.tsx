'use client'

import { useCart } from "@/contexts/CartContext";

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
    // Reading items, total, and dispatch directly from your Context memory
    const { items, total, dispatch } = useCart();

    return (
        <>
            {/* Backdrop overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm transition-opacity"
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}

            {/* Drawer panel (Dark Theme) */}
            <aside
                className={`fixed top-0 right-0 h-full w-full max-w-sm bg-zinc-900 border-l border-zinc-700 z-50 flex flex-col transition-transform duration-300 shadow-2xl ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                aria-label="Shopping cart"
            >
                {/* Drawer header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-700 bg-zinc-800">
                    <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
                        🛒 Your Cart
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-zinc-400 hover:text-red-500 transition-colors text-xl leading-none cursor-pointer"
                        aria-label="Close cart"
                    >
                        ✕
                    </button>
                </div>

                {/* Cart items list */}
                <div className="flex-1 overflow-y-auto px-4 py-4">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
                            <span className="text-5xl">🛍️</span>
                            <p className="text-sm font-semibold text-zinc-400">
                                Your cart is empty!
                            </p>
                            <p className="text-xs text-zinc-500">
                                Head to the products page and add some items.
                            </p>
                        </div>
                    ) : (
                        <ul className="space-y-4">
                            {items.map((item) => (
                                <li
                                    key={item.id}
                                    className="flex items-center gap-4 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3"
                                >
                                    {/* Product Image */}
                                    {item.images && item.images[0] ? (
                                        <img
                                            src={item.images[0]}
                                            alt={item.title}
                                            className="w-16 h-16 object-cover rounded-md border border-zinc-600 shrink-0"
                                        />
                                    ) : (
                                        <div className="w-16 h-16 bg-zinc-700 rounded-md flex items-center justify-center text-xl shrink-0">
                                            📦
                                        </div>
                                    )}

                                    {/* Title + price */}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-zinc-100 truncate">
                                            {item.title}
                                        </p>
                                        <p className="text-xs text-indigo-400 font-medium mt-1">
                                            ${Number(item.price).toFixed(2)} each
                                        </p>
                                    </div>

                                    {/* Quantity controls */}
                                    <div className="flex flex-col items-end gap-2 shrink-0">
                                        <div className="flex items-center gap-1 bg-zinc-900 rounded-lg border border-zinc-700 p-1">
                                            <button
                                                id={`decrease-qty-${item.id}`}
                                                onClick={() => dispatch({
                                                    type: "UPDATE_QUANTITY",
                                                    payload: { id: item.id, quantity: Math.max(1, item.quantity - 1) },
                                                })}
                                                className="w-6 h-6 rounded bg-zinc-800 text-zinc-300 text-xs font-bold flex items-center justify-center hover:bg-zinc-700 transition-colors cursor-pointer"
                                                aria-label={`Decrease quantity of ${item.title}`}
                                            >
                                                −
                                            </button>
                                            <span className="w-6 text-center text-xs font-bold text-zinc-100">
                                                {item.quantity}
                                            </span>
                                            <button
                                                id={`increase-qty-${item.id}`}
                                                onClick={() => dispatch({
                                                    type: "UPDATE_QUANTITY",
                                                    payload: { id: item.id, quantity: item.quantity + 1 },
                                                })}
                                                className="w-6 h-6 rounded bg-zinc-800 text-zinc-300 text-xs font-bold flex items-center justify-center hover:bg-zinc-700 transition-colors cursor-pointer"
                                                aria-label={`Increase quantity of ${item.title}`}
                                            >
                                                +
                                            </button>
                                        </div>

                                        {/* Line total + remove */}
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs font-bold text-zinc-300">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </span>
                                            <button
                                                id={`remove-item-${item.id}`}
                                                onClick={() => dispatch({
                                                    type: "REMOVE_ITEM",
                                                    payload: { id: item.id },
                                                })}
                                                className="text-[10px] text-red-400 hover:text-red-300 font-bold transition-colors cursor-pointer"
                                                aria-label={`Remove ${item.title} from cart`}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Footer / Checkout */}
                {items.length > 0 && (
                    <div className="border-t border-zinc-700 bg-zinc-800 px-6 py-5 space-y-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold text-zinc-400">Subtotal</span>
                            <span className="text-xl font-bold text-indigo-400">
                                ${total.toFixed(2)}
                            </span>
                        </div>

                        <button
                            id="checkout-btn"
                            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-500 transition-colors shadow-lg cursor-pointer"
                            onClick={() => {
                                alert("🎉 Thanks for shopping at RevoShop! (Checkout not implemented — this is a demo!)");
                            }}
                        >
                            Checkout
                        </button>

                        <button
                            id="clear-cart-btn"
                            onClick={() => dispatch({ type: "CLEAR_CART" })}
                            className="w-full text-xs font-bold text-zinc-500 hover:text-red-400 transition-colors cursor-pointer pt-2"
                        >
                            Clear cart
                        </button>
                    </div>
                )}
            </aside>
        </>
    );
}