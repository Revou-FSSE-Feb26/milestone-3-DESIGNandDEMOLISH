'use client'

import { Product } from "@/types"
import axios from "axios";
import { useEffect, useState } from "react"
import Navigation from "@/components/NavigationBar";
import ProductCard from "@/components/ProductCard";

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    const getProductsAll = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await axios.get<Product[]>(`https://api.escuelajs.co/api/v1/products`);
            setProducts(response.data);

        } catch (error: any) {
            setError(error.message || "Failed to load")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {

        getProductsAll()
    }, []);

    if (loading) {
        return (
            <div>
                <h1>Loading Product List...</h1>
            </div>
        )
    }
    if (error) {
        return (
            <div>
                <div>
                    <h1>Error Loading Page</h1>
                </div>
                <button onClick={() => getProductsAll()} >Refresh Page</button>
            </div>
        )
    }
    return (
        <div>
            <Navigation />
            <h1 className="flex justify-center">All Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((item: Product) => (
                    <ProductCard key={item.id} product={item} />
                ))}

            </div>

        </div>
    )

}