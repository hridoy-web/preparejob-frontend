import {
  SiNextdotjs,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiCss,
  SiHtml5,
} from "react-icons/si";
import { Code2 } from "lucide-react";

interface TechnologyIconProps {
  name: string;
  className?: string;
}

const iconMap = {
  nextjs: SiNextdotjs,
  react: SiReact,
  nodejs: SiNodedotjs,
  express: SiExpress,
  mongodb: SiMongodb,
  javascript: SiJavascript,
  typescript: SiTypescript,
  tailwind: SiTailwindcss,
  css3: SiCss,
  html5: SiHtml5,
} satisfies Record<string, React.ComponentType<{ className?: string }>>;

export function TechnologyIcon({
  name,
  className = "size-7",
}: TechnologyIconProps) {
  const Icon = iconMap[name as keyof typeof iconMap] ?? Code2;
  return <Icon aria-hidden="true" className={className} />;
}