'use client'

import { createContext, useContext, useReducer, ReactNode } from "react";
import { CartItem, Product } from "@/types";

// 1. Define the actions our cart can take
type CartAction =
    | { type: "ADD_TO_CART"; payload: Product }
    | { type: "REMOVE_ITEM"; payload: { id: number } }
    | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
    | { type: "CLEAR_CART" };

// 2. Define the State
interface CartState {
    items: CartItem[];
    total: number;
}

const CartContext = createContext<{
    items: CartItem[];
    total: number;
    dispatch: React.Dispatch<CartAction>;
} | undefined>(undefined);

// 3. The Reducer (The "Brain" that updates the cart)
function cartReducer(state: CartState, action: CartAction): CartState {
    let newItems;
    switch (action.type) {
        case "ADD_TO_CART":
            const existingItem = state.items.find(i => i.id === action.payload.id);
            if (existingItem) {
                newItems = state.items.map(i => i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i);
            } else {
                newItems = [...state.items, { ...action.payload, quantity: 1 }];
            }
            break;
        case "REMOVE_ITEM":
            newItems = state.items.filter(i => i.id !== action.payload.id);
            break;
        case "UPDATE_QUANTITY":
            newItems = state.items.map(i => i.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i);
            break;
        case "CLEAR_CART":
            newItems = [];
            break;
        default:
            return state;
    }

    const total = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return { items: newItems, total };
}

// 4. The Provider (The "Wrapper")
export function CartProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

    return (
        <CartContext.Provider value={{ items: state.items, total: state.total, dispatch }}>
            {children}
        </CartContext.Provider>
    );
}

// 5. The hook to easily use the cart
export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
}