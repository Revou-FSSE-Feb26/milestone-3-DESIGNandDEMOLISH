import { ProductCardProp, AllProduct } from "@/types";
import axios from "axios";
import { finalizeBundlerFromConfig } from "next/dist/lib/bundler";
import { useEffect, useState } from "react";

export default function ProductCard({ product }: ProductCardProp) {

    const [cardProduct, setCardProduct] = useState<AllProduct[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true)


    useEffect(() => {
        const handleProductCard = async () => {
            try {
                setLoading(true);
                setError(null);

                const reseponse = await axios.get<AllProduct[]>(`https://api.escuelajs.co/api/v1/${id}`)
                setCardProduct(reseponse.data)
            } catch (error: any) {
                setError(error.message || `can't load image`)
            } finally {
                setLoading(false);
            }
        }
        handleProductCard()
    }, [])



    return (
        <>
            <div className="product-card">
                <div>
                    {cardProduct.map((item: AllProduct) => (
                        <div key={item.id}>{item.images && item.images.length < 6 && (
                            <div>
                                <img src={item.images[0]}
                                    alt={item.title} />
                            </div>
                        )}
                        </div>
                    ))}
                </div>

            </div>
        </>
    )
}