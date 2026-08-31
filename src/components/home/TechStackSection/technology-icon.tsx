import {
  Braces,
  Code2,
  Database,
  FileCode2,
  Globe2,
  Layers3,
  Server,
  Terminal,
} from "lucide-react";

interface TechnologyIconProps {
  name: string;
}

const iconMap = {
  nextjs: Terminal,
  react: Layers3,
  nodejs: Server,
  express: Layers3,
  mongodb: Database,
  javascript: Braces,
  typescript: FileCode2,
  tailwind: Code2,
  css3: Code2,
  html5: Globe2,
};

export function TechnologyIcon({ name }: TechnologyIconProps) {
  const Icon = iconMap[name as keyof typeof iconMap] ?? Code2;

  return <Icon aria-hidden="true" className="size-6" strokeWidth={1.8} />;
}