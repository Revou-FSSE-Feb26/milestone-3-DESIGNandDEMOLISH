'use client'

import { AllProduct } from "@/types"
import axios from "axios";
import { useEffect, useState } from "react"
import Navigation from "@/components/NavigationBar";

export default function ProductsPage() {
    const [products, setProducts] = useState<AllProduct[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    const getProductsAll = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await axios.get<AllProduct[]>(`https://api.escuelajs.co/api/v1/products`);
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
            <div className="flex justify-center">All Products</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((item: AllProduct) => (
                    <div key={item.id}>{item.images && item.images[0] && (
                        <div>
                            <img src={item.images[0]} alt={item.title} />
                        </div>
                    )}
                        <h3>{item.title}</h3>
                        <p>${item.price}</p>
                    </div>
                ))}

            </div>

        </div>
    )

}