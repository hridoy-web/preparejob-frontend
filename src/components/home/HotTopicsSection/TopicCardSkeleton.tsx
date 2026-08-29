export default function TopicCardSkeleton() {
    return (
        <article
            aria-hidden="true"
            className="flex min-h-[250px] animate-pulse flex-col rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6"
        >
            <header className="flex items-start justify-between gap-4">
                <span className="size-10 rounded-xl bg-muted" />

                <span className="size-4 rounded-full bg-muted" />
            </header>

            <div className="mt-6 space-y-3">
                <span className="block h-6 w-2/5 rounded-md bg-muted" />
                <span className="block h-4 w-full rounded-md bg-muted" />
                <span className="block h-4 w-4/5 rounded-md bg-muted" />
            </div>

            <footer className="mt-auto flex items-center justify-between gap-3 pt-7">
                <span className="h-4 w-2/5 rounded-md bg-muted" />
                <span className="h-4 w-1/3 rounded-md bg-muted" />
            </footer>
        </article>
    )
}