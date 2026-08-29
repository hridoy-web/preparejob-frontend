import type { HotTopic } from "@/types/hot-topic";
export const MOCK_HOT_TOPICS: HotTopic[] = [
    {
        id: "javascript",
        slug: "javascript",
        name: "JavaScript",
        description: "Master the fundamentals recruiters use to assess frontend depth.",
        icon: "javascript",
        questionCount: 24,
    },
    {
        id: "react",
        slug: "react",
        name: "React",
        description: "Prepare for hooks, rendering, performance, and component architecture.",
        icon: "react",
        questionCount: 20,
    },
    {
        id: "nodejs",
        slug: "nodejs",
        name: "Node.js",
        description: "Build confidence with runtime, APIs, async patterns, and backend concepts.",
        icon: "nodejs",
        questionCount: 18,
    },
    {
        id: "typescript",
        slug: "typescript",
        name: "TypeScript",
        description: "Strengthen the type system knowledge modern engineering teams expect.",
        icon: "typescript",
        questionCount: 16,
    }
]