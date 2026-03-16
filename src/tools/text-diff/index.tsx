import { useState, useMemo } from "react";
import * as Diff from "diff";
import ToolCard from "@/components/ui/ToolCard";

export default function TextDiff() {
  const [left, setLeft] = useState("Hello World\nThis is line two\nAnd line three");
  const [right, setRight] = useState("Hello World\nThis is line 2\nAnd line four\nExtra line");
  const [mode, setMode] = useState<"lines" | "words" | "chars">("lines");

  const diff = useMemo(() => {
    if (mode === "lines") return Diff.diffLines(left, right);
    if (mode === "words") return Diff.diffWords(left, right);
    return Diff.diffChars(left, right);
  }, [left, right, mode]);

  const added = diff.filter((d) => d.added).reduce((a, d) => a + d.count!, 0);
  const removed = diff.filter((d) => d.removed).reduce((a, d) => a + d.count!, 0);

  return (
    <ToolCard
      title="Text Diff"
      description="Compare two texts and highlight differences"
      icon="🔀"
      actions={
        <div style={{ display: "flex", gap: 4 }}>
          {(["lines", "words", "chars"] as const).map((m) => (
            <button key={m} className={`btn ${mode === m ? "btn-primary" : ""}`} onClick={() => setMode(m)}>
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16, height: "100%" }}>
        {/* Inputs */}
        <div style={{ display: "flex", gap: 16, flexShrink: 0 }}>
          <div style={{ flex: 1 }}>
            <label>Original</label>
            <textarea value={left} onChange={(e) => setLeft(e.target.value)} style={{ height: 140, marginTop: 4 }} />
          </div>
          <div style={{ flex: 1 }}>
            <label>Modified</label>
            <textarea value={right} onChange={(e) => setRight(e.target.value)} style={{ height: 140, marginTop: 4 }} />
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 12, flexShrink: 0 }}>
          <span style={{ padding: "3px 10px", borderRadius: 12, background: "#22c55e20", color: "#22c55e", fontSize: 12, fontWeight: 600, border: "1px solid #22c55e40" }}>
            +{added} added
          </span>
          <span style={{ padding: "3px 10px", borderRadius: 12, background: "#ef444420", color: "#ef4444", fontSize: 12, fontWeight: 600, border: "1px solid #ef444440" }}>
            -{removed} removed
          </span>
        </div>

        {/* Diff output */}
        <div style={{ flex: 1, minHeight: 0, overflow: "auto" }}>
          <label>Diff Output</label>
          <div style={{
            background: "var(--bg-secondary)",
            border: "1px solid var(--border)",
            borderRadius: 6,
            padding: "10px 12px",
            fontFamily: "monospace",
            fontSize: 12,
            lineHeight: 1.7,
            marginTop: 4,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}>
            {diff.map((part, i) => (
              <span
                key={i}
                style={{
                  background: part.added ? "#22c55e20" : part.removed ? "#ef444420" : "transparent",
                  color: part.added ? "#22c55e" : part.removed ? "#ef4444" : "var(--text-primary)",
                  textDecoration: part.removed ? "line-through" : "none",
                }}
              >
                {part.value}
              </span>
            ))}
          </div>
        </div>
      </div>
    </ToolCard>
  );
}
