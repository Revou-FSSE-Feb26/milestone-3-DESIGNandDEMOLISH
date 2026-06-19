'use client'

import ProductCard from "@/components/ProductCard";
import { Product } from "@/types";
import Image from "next/image";
import Navigation from "@/components/NavigationBar";
import axios from "axios";
import { useEffect, useState } from "react";



export default function Home() {

  const [cardProduct, setCardProduct] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true)


  useEffect(() => {
    const handleProductCard = async () => {
      try {
        setLoading(true);
        setError(null);

        const reseponse = await axios.get<Product[]>(`https://api.escuelajs.co/api/v1/products?limit=4&offset=0`)
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
    <div className="flex flex-col gap-20 m-2 bg-white">
      <Navigation />
      <main className="flex flex-col gap-10 text-2xl font-bold text-center mb-6">
        <h1>Products</h1>
        {!loading && !error && cardProduct.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">

            {cardProduct.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
