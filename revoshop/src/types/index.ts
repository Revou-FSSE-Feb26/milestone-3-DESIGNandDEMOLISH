export interface Product {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    images: string[],
};

export interface ProductCardProps {
    product: Product
};

export interface CartItem extends Product {
    quantity: number;
}

export interface AuthUser {
    id: number;
    name: string;
    email: string;
    avatar: string;
    role: "admin" | "user";
}

export interface SessionData {
    user: AuthUser;
    token: string;
}

export interface Notification {
    id: string;
    message: string;
    type: "success" | "error" | "info";
}