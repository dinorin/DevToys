import { useState } from "react";
import ToolCard from "@/components/ui/ToolCard";
import CopyButton from "@/components/ui/CopyButton";

const toWords = (s: string) =>
  s
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_\-]+/g, " ")
    .toLowerCase()
    .trim()
    .split(/\s+/);

const cases = [
  {
    id: "camelCase",
    label: "camelCase",
    fn: (s: string) => { const w = toWords(s); return w[0] + w.slice(1).map((x) => x.charAt(0).toUpperCase() + x.slice(1)).join(""); },
  },
  {
    id: "PascalCase",
    label: "PascalCase",
    fn: (s: string) => toWords(s).map((x) => x.charAt(0).toUpperCase() + x.slice(1)).join(""),
  },
  {
    id: "snake_case",
    label: "snake_case",
    fn: (s: string) => toWords(s).join("_"),
  },
  {
    id: "SCREAMING_SNAKE",
    label: "SCREAMING_SNAKE_CASE",
    fn: (s: string) => toWords(s).join("_").toUpperCase(),
  },
  {
    id: "kebab-case",
    label: "kebab-case",
    fn: (s: string) => toWords(s).join("-"),
  },
  {
    id: "UPPER CASE",
    label: "UPPER CASE",
    fn: (s: string) => s.toUpperCase(),
  },
  {
    id: "lower case",
    label: "lower case",
    fn: (s: string) => s.toLowerCase(),
  },
  {
    id: "Title Case",
    label: "Title Case",
    fn: (s: string) => toWords(s).map((x) => x.charAt(0).toUpperCase() + x.slice(1)).join(" "),
  },
  {
    id: "Sentence case",
    label: "Sentence case",
    fn: (s: string) => { const r = s.toLowerCase(); return r.charAt(0).toUpperCase() + r.slice(1); },
  },
  {
    id: "dot.case",
    label: "dot.case",
    fn: (s: string) => toWords(s).join("."),
  },
];

export default function TextCase() {
  const [input, setInput] = useState("hello world example text");

  return (
    <ToolCard
      title="Text Case Converter"
      description="Convert text between different naming conventions"
      icon="🔤"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16, height: "100%", overflow: "auto" }}>
        <div>
          <label>Input Text</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to convert..."
            style={{ height: 80, marginTop: 4 }}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 10 }}>
          {cases.map(({ id, label, fn }) => {
            const result = fn(input);
            return (
              <div key={id} style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                padding: "12px 14px",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "var(--accent)", textTransform: "none", letterSpacing: 0 }}>{label}</span>
                  <CopyButton text={result} />
                </div>
                <code style={{ fontSize: 13, color: "var(--text-primary)", wordBreak: "break-all", fontFamily: "monospace" }}>
                  {result}
                </code>
              </div>
            );
          })}
        </div>
      </div>
    </ToolCard>
  );
}
