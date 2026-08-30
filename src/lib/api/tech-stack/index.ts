import { TechStackItem } from "@/types/tech-stack";
import { MOCK_TECH_STACKS } from "./mock-data";

export async function getTechStacks(): Promise<TechStackItem[]> {
  // TODO: Future Backend API Integration
  /*
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tech-stacks`, {
      next: { revalidate: 3600 }, // SSG / ISR caching option
    });

    if (!res.ok) {
      throw new Error("Failed to fetch tech stack items");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching tech stacks:", error);
    return MOCK_TECH_STACKS; // Fallback to mock data on error
  }
  */

  // Simulating network latency for realistic development
  await new Promise((resolve) => setTimeout(resolve, 100));

  return MOCK_TECH_STACKS;
}