import { ProductCardProp } from "@/types";

export default function ProductCard({ product }: ProductCardProp) {
    return (
        <>
            <div className="product-card">
                <div>
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
        </>
    )
}