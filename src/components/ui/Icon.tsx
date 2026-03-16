import * as LucideIcons from "lucide-react";

interface IconProps {
  name: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function Icon({ name, size = 16, className, style }: IconProps) {
  const LucideIcon = (LucideIcons as unknown as Record<string, React.FC<{ size?: number; className?: string; style?: React.CSSProperties }>>)[name];
  if (!LucideIcon) return <span style={{ width: size, height: size, display: "inline-block" }} />;
  return <LucideIcon size={size} className={className} style={style} />;
}
