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
      className="py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <header className="max-w-2xl">
          <p className="text-sm font-medium text-brand-accent">
            Interview preparation
          </p>

          <h2
            id="hot-topics-title"
            className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            Hot Topics Recruiters Ask About
          </h2>

          <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base">
            Focus your preparation on the technologies that appear most often
            in modern developer interviews.
          </p>
        </header>

        <div className="mt-10">
          {topics === null ? (
            <TopicCardError />
          ) : topics.length === 0 ? (
            <TopicCardError message="No interview topics are available yet." />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {topics.map((topic) => (
                <TopicCard key={topic.id} topic={topic} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}