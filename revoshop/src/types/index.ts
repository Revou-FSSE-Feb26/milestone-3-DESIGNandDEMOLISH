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
