import { getExploreTechItems } from "@/lib/api/explore";
import { ExploreClient } from "@/components/explore/ExploreClient";

export default async function ExplorePage() {
  const techItems = await getExploreTechItems();

  return <ExploreClient initialItems={techItems} />;
}