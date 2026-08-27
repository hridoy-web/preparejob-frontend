import StartPreparingButton from "@/components/home/StartPreparingButton";

export default function HeroSection() {
    return (
        <section
            aria-labelledby="hero-heading"
            className="relative overflow-hidden bg-background"
        >
            <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-10 lg:py-24">
                <header className='max-w-2xl'>
                    <p className="mb-5 inline-flex rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground">
                        AI-powered interview preparation
                    </p>

                    <h1
                        id='hero-heading'
                        className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl"
                    >
                        Master Your Web Dev Interviews{" "}
                        <span className="ai-gradient-text">with AI</span>
                    </h1>

                    <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
                        Prepare smarter with top tech-stack questions, get instant AI
                        answer feedback, and boost your confidence for global remote jobs.
                    </p>

                    <nav
                        aria-label="Hero navigation"
                        className="mt-8 flex flex-col gap-3 sm:flex-row"
                    >
                        <StartPreparingButton />

                        <a
                            href="#how-it-works"
                            className="inline-flex h-14 w-full min-w-55 max-w-60 items-center justify-center rounded-full border border-border bg-card px-6 text-sm font-semibold text-foreground transition-colors hover:border-brand-accent hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent sm:w-auto"
                        >
                            See how it works
                        </a>
                    </nav>
                </header>
            </div>
        </section>
    )
}