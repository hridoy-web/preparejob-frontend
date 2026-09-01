import type { IconType } from "react-icons";
import {
  SiNodedotjs,
  SiReact,
  SiTypescript,
} from "react-icons/si";
import { TbBrandJavascript } from "react-icons/tb"; // Clean transparent JS brand icon
import { Code2 } from "lucide-react";

interface TopicIconProps {
  name: string;
  className?: string;
}

const TOPIC_ICON_MAP: Record<string, { icon: IconType; colorClass: string }> = {
  // Solved: Soft Amber/Gold color in transparent vector style (চোখে জ্বলজ্বল করবে না)
  javascript: { icon: TbBrandJavascript, colorClass: "text-amber-500 dark:text-amber-400" },
  react: { icon: SiReact, colorClass: "text-[#00d8ff]" },
  nodejs: { icon: SiNodedotjs, colorClass: "text-[#5fa04e]" },
  typescript: { icon: SiTypescript, colorClass: "text-[#3178c6]" },
};

export default function TopicIcon({
  name,
  className = "size-12",
}: TopicIconProps) {
  const key = name.trim().toLowerCase();

  const config = TOPIC_ICON_MAP[key];

  if (!config) {
    return <Code2 aria-hidden="true" className={className} />;
  }

  const { icon: Icon, colorClass } = config;

  return <Icon aria-hidden="true" className={`${className} ${colorClass}`} />;
}