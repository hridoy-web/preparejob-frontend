import {
  Atom,
  Braces,
  FileCode2,
  ServerCog,
  type LucideIcon,
} from "lucide-react";

interface TopicIconProps {
  name: string;
}

const TOPIC_ICON_MAP: Record<string, LucideIcon> = {
  javascript: FileCode2,
  react: Atom,
  nodejs: ServerCog,
  typescript: Braces,
};

export default function TopicIcon({
  name,
}: TopicIconProps) {
  const Icon =
    TOPIC_ICON_MAP[name.trim().toLowerCase()] ?? FileCode2;

  return (
    <Icon
      aria-hidden="true"
      className="size-5 transition-transform duration-200 ease-out group-hover:scale-105"
      strokeWidth={1.8}
    />
  );
}