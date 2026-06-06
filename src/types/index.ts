export interface Product {
    id: string,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
};

export interface ProductCardProp {
    product: AllProduct
};

export interface AllProduct {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
    category: string;
}