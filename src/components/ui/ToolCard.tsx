import React from "react";
import Icon from "@/components/ui/Icon";

interface ToolCardProps {
  title: string;
  description: string;
  icon: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export default function ToolCard({ title, description, icon, children, actions }: ToolCardProps) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: "24px 28px", gap: 18, overflow: "hidden" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Icon name={icon} size={24} style={{ color: "var(--accent)", flexShrink: 0 }} />
          <div>
            <h1 style={{ margin: 0, fontSize: 19, fontWeight: 700, color: "var(--text-primary)" }}>{title}</h1>
            <p style={{ margin: 0, fontSize: 13, color: "var(--text-secondary)", marginTop: 1 }}>{description}</p>
          </div>
        </div>
        {actions && (
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", flexShrink: 0 }}>{actions}</div>
        )}
      </div>
      {/* Content */}
      <div style={{ flex: 1, overflow: "hidden" }}>
        {children}
      </div>
    </div>
  );
}

interface TwoPanelProps {
  left: React.ReactNode;
  right: React.ReactNode;
  leftLabel?: string;
  rightLabel?: string;
}

export function TwoPanel({ left, right, leftLabel = "Input", rightLabel = "Output" }: TwoPanelProps) {
  return (
    <div style={{ display: "flex", gap: 16, height: "100%" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6, minWidth: 0 }}>
        <label>{leftLabel}</label>
        <div style={{ flex: 1, minHeight: 0 }}>{left}</div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6, minWidth: 0 }}>
        <label>{rightLabel}</label>
        <div style={{ flex: 1, minHeight: 0 }}>{right}</div>
      </div>
    </div>
  );
}
