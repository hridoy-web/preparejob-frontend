import { AlertCircle } from "lucide-react";

interface TopicCardErrorProps {
    message?: string;
}

export default function TopicCardError({
    message = "We couldn't load the interview topics right now.",
}: TopicCardErrorProps) {
    return (
        <article
            role="alert"
            className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm sm:p-8"
        >
            <span className="mx-auto flex size-10 items-center justify-center rounded-xl bg-brand-accent/10 text-brand-accent">
                <AlertCircle
                    aria-hidden="true"
                    className="size-5"
                />
            </span>

            <h3 className="mt-4 text-base font-semibold text-foreground">
                Topics are temporarily unavailable
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                {message}
            </p>
        </article>
    )
}