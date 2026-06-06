import Link from "next/link";

export default function Navigation() {

    return (
        <header className="w-full">
            <div className="flex justify-between px-4 text-2xl">
                <Link href="/">RevoShop</Link>
                <nav className="flex items-center gap-10">
                    <Link href={"/products"}>
                        Product
                    </Link>
                    <Link href={"/dashboard"}>
                        Dashboard
                    </Link>
                </nav>
            </div>
        </header>
    )
}