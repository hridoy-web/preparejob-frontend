import StartPreparingButton from "@/components/home/StartPreparingButton";
import HeroInterviewJourney from "./HeroInterviewJourney";

export default function HeroSection() {
    return (
        <section
            aria-labelledby="hero-heading"
            aria-describedby="hero-description"
            className="relative isolate overflow-hidden bg-background"
        >
            {/* Subtle brand atmosphere */}
            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-0
                    -z-10
                    h-[420px]
                    w-[720px]
                    -translate-x-1/2
                    rounded-full
                    bg-brand-accent/[0.035]
                    blur-3xl
                    sm:h-[500px]
                    sm:w-[850px]
                "
            />

            <div
                className="
                    mx-auto
                    grid
                    max-w-7xl
                    items-center
                    gap-12
                    px-5
                    py-14
                    sm:px-8
                    sm:py-16
                    lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]
                    lg:gap-10
                    lg:px-10
                    lg:py-20
                    xl:gap-16
                    xl:py-24
                "
            >
                {/* ==================================================
                    Hero Content
                ================================================== */}

                <header className="min-w-0 max-w-2xl">
                    {/* Eyebrow */}
                    <p
                        className="
                            mb-5
                            inline-flex
                            items-center
                            rounded-full
                            border
                            border-border
                            bg-card
                            px-4
                            py-2
                            text-xs
                            font-medium
                            tracking-wide
                            text-muted-foreground
                            shadow-sm
                            sm:text-sm
                        "
                    >
                        <span
                            aria-hidden="true"
                            className="
                                mr-2
                                size-1.5
                                shrink-0
                                rounded-full
                                bg-brand-accent
                            "
                        />

                        AI-powered interview preparation
                    </p>

                    {/* Main Heading */}
                    <h1
                        id="hero-heading"
                        className="
                            max-w-2xl
                            text-balance
                            text-4xl
                            font-bold
                            leading-[1.08]
                            tracking-[-0.035em]
                            text-foreground
                            sm:text-5xl
                            lg:text-[3.25rem]
                            xl:text-6xl
                            xl:leading-[1.05]
                        "
                    >
                        Master Your Web Dev Interviews{" "}
                        <span className="ai-gradient-text">
                            with AI
                        </span>
                    </h1>

                    {/* Description */}
                    <p
                        id="hero-description"
                        className="
                            mt-6
                            max-w-xl
                            text-pretty
                            text-sm
                            leading-7
                            text-muted-foreground
                            sm:text-base
                            sm:leading-8
                            lg:text-lg
                        "
                    >
                        Prepare smarter with top tech-stack questions,
                        get instant AI answer feedback, and boost your
                        confidence for global remote jobs.
                    </p>

                    {/* CTA */}
                    <div
                        className="
                            mt-8
                            flex
                            flex-col
                            gap-3
                            sm:flex-row
                            sm:items-center
                        "
                    >
                        <StartPreparingButton />

                        <a
                            href="#how-it-works"
                            className="
                                inline-flex
                                h-14
                                w-full
                                min-w-55
                                max-w-60
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-border
                                bg-card
                                px-6
                                text-sm
                                font-semibold
                                text-foreground
                                shadow-sm
                                transition-all
                                duration-200
                                hover:-translate-y-0.5
                                hover:border-brand-accent/40
                                hover:bg-accent
                                hover:shadow-md
                                focus-visible:outline-2
                                focus-visible:outline-offset-2
                                focus-visible:outline-brand-accent
                                active:translate-y-0
                                sm:w-auto
                            "
                        >
                            See how it works
                        </a>
                    </div>

                    {/* Trust / value line */}
                    <p
                        className="
                            mt-5
                            max-w-lg
                            text-xs
                            leading-5
                            text-muted-foreground
                            sm:text-sm
                        "
                    >
                        Practice real-world questions. Improve with
                        instant AI feedback.
                    </p>
                </header>

                {/* ==================================================
                    Interactive Product Visual
                ================================================== */}

                <div
                    className="
                        min-w-0
                        w-full
                        lg:flex
                        lg:items-center
                        lg:justify-end
                    "
                >
                    <HeroInterviewJourney />
                </div>
            </div>
        </section>
    );
}