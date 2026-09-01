import { getHotTopics } from "@/lib/api/hot-topics";
import TopicCard from "@/components/home/HotTopicsSection/TopicCard";
import TopicCardError from "@/components/home/HotTopicsSection/TopicCardError";

export default async function HotTopicsCards() {
  let topics;

  try {
    topics = await getHotTopics();
  } catch {
    topics = null;
  }

  return (
    <section
      aria-labelledby="hot-topics-title"
      className="relative isolate overflow-hidden bg-background py-16 sm:py-20 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/2 top-0 h-80 w-[44rem] -translate-x-1/2 rounded-full bg-brand-accent/[0.07] blur-3xl" />

        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-brand-accent/[0.04] to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center rounded-full border border-brand-accent/30 bg-brand-accent/10 px-3 py-1 text-xs font-semibold tracking-wide text-brand-accent">
            Interview preparation
          </p>

          <h2
            id="hot-topics-title"
            className="mt-4 font-urbanist text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            Hot Topics Recruiters Ask About
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            Focus your preparation on the technologies that appear most often
            in modern developer interviews.
          </p>
        </header>

        <div className="mt-10 sm:mt-12">
          {topics === null ? (
            <TopicCardError />
          ) : topics.length === 0 ? (
            <TopicCardError message="No interview topics are available yet." />
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {topics.slice(0, 4).map((topic) => (
                <TopicCard key={topic.id} topic={topic} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}