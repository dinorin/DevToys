import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ToolCard from "@/components/ui/ToolCard";
import CopyButton from "@/components/ui/CopyButton";

export default function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([uuidv4()]);
  const [count, setCount] = useState(1);
  const [uppercase, setUppercase] = useState(false);

  const generate = () => {
    setUuids(Array.from({ length: count }, () => uuidv4()));
  };

  const fmt = (s: string) => uppercase ? s.toUpperCase() : s;
  const allText = uuids.map(fmt).join("\n");

  return (
    <ToolCard
      title="UUID Generator"
      description="Generate random UUIDs (v4)"
      icon="🆔"
      actions={
        <>
          <label style={{ display: "flex", alignItems: "center", gap: 6, textTransform: "none", fontSize: 13, cursor: "pointer" }}>
            <input type="checkbox" checked={uppercase} onChange={(e) => setUppercase(e.target.checked)} />
            UPPERCASE
          </label>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <label style={{ textTransform: "none", fontSize: 13 }}>Count:</label>
            <input
              type="number"
              value={count}
              min={1}
              max={100}
              onChange={(e) => setCount(Math.max(1, Math.min(100, Number(e.target.value))))}
              style={{ width: 64 }}
            />
          </div>
          <button className="btn btn-primary" onClick={generate}>⚡ Generate</button>
          <CopyButton text={allText} label="Copy All" />
        </>
      }
    >
      <div style={{ height: "100%", display: "flex", flexDirection: "column", gap: 8, overflow: "auto" }}>
        {uuids.map((id, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "var(--bg-secondary)",
              border: "1px solid var(--border)",
              borderRadius: 6,
              padding: "10px 14px",
            }}
          >
            <code style={{ fontFamily: "monospace", fontSize: 13, color: "var(--text-primary)" }}>
              {fmt(id)}
            </code>
            <CopyButton text={fmt(id)} />
          </div>
        ))}
      </div>
    </ToolCard>
  );
}
