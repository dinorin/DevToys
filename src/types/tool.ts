import React from "react";

export type ToolCategory =
  | "Encoders / Decoders"
  | "Formatters"
  | "Generators"
  | "Text"
  | "Converters"
  | "Testers";

export interface ToolDefinition {
  id: string;
  label: string;
  category: ToolCategory;
  icon: string;
  description: string;
  keywords: string[];
  component: React.LazyExoticComponent<React.FC>;
}
