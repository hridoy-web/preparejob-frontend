import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import Link from "next/link";

export default function NotFoundPage() {
    return (
        <main className="min-h-[calc(100vh-80px)] flex flex-col text-center justify-center items-center space-y-5 px-4">
            <h1 className="text-9xl text-slate-700 font-extrabold">404</h1>
            <h2 className="text-brand-primary/90 text-2xl">Page Not Found</h2>
            <p className="max-w-80 text-brand-primary/60">The page you are looking for does not exist or has been moved!</p>

            <Button asChild size="lg" className="group rounded-full px-6 py-3 gap-1.5">
                <Link href={"/"} >
                    Go Back Home <MoveRight className="transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
            </Button>
        </main>
    )
}