import { EXPLORE_TECH_ITEMS, TechItem } from "./card-data";

export async function getExploreTechItems(): Promise<TechItem[]> {
  return EXPLORE_TECH_ITEMS;
}