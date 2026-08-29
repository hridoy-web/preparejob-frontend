import "server-only"
import { HotTopic } from "@/types/hot-topic";
import { MOCK_HOT_TOPICS } from "./mock-data";

export async function getHotTopics () : Promise<HotTopic[]> {
    return MOCK_HOT_TOPICS;
}