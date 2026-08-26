import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFoundPage() {
    return (
        <main className="min-h-[calc(100vh-80px)] flex flex-col text-center justify-center items-center space-y-5 px-4">
            <h1 className="text-9xl font-extrabold">404</h1>
            <h2 className="text-brand-primary text-2xl">Page Not Found</h2>
            <p className="max-w-80">The page you are looking for does not exist or has been moved.</p>

            <Button  size="lg">
                <Link href={"/"}>
                    Go Back Home
                </Link>
            </Button>

        </main>
    )
}