import { useState, useMemo } from "react";
import ToolCard from "@/components/ui/ToolCard";
import CopyButton from "@/components/ui/CopyButton";

const BASES = [
  { label: "Binary", base: 2, prefix: "0b" },
  { label: "Octal", base: 8, prefix: "0o" },
  { label: "Decimal", base: 10, prefix: "" },
  { label: "Hexadecimal", base: 16, prefix: "0x" },
];

export default function NumberBase() {
  const [value, setValue] = useState("255");
  const [inputBase, setInputBase] = useState(10);

  const { num, error } = useMemo(() => {
    try {
      const n = parseInt(value, inputBase);
      if (isNaN(n)) throw new Error("Invalid number");
      return { num: n, error: "" };
    } catch {
      return { num: null, error: "Invalid input for selected base" };
    }
  }, [value, inputBase]);

  return (
    <ToolCard
      title="Number Base Converter"
      description="Convert between binary, octal, decimal, and hexadecimal"
      icon="🔢"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 20, height: "100%", overflow: "auto" }}>
        {/* Input */}
        <div style={{ display: "flex", gap: 12, alignItems: "flex-end", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <label>Input Value</label>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              style={{ marginTop: 4 }}
              placeholder="Enter a number..."
            />
            {error && <div style={{ color: "#ef4444", fontSize: 11, marginTop: 4 }}>⚠️ {error}</div>}
          </div>
          <div>
            <label>Input Base</label>
            <select value={inputBase} onChange={(e) => setInputBase(Number(e.target.value))} style={{ marginTop: 4, display: "block" }}>
              {BASES.map((b) => (
                <option key={b.base} value={b.base}>{b.label} (base {b.base})</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
          {BASES.map(({ label, base, prefix }) => {
            const result = num !== null ? num.toString(base).toUpperCase() : "—";
            const full = num !== null ? prefix + result : "";
            return (
              <div key={base} style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                padding: "14px 16px",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    {label} (base {base})
                  </span>
                  {full && <CopyButton text={full} />}
                </div>
                <code style={{ fontFamily: "monospace", fontSize: 16, fontWeight: 600, color: "var(--text-primary)", wordBreak: "break-all" }}>
                  {prefix && <span style={{ color: "var(--text-secondary)", fontWeight: 400 }}>{prefix}</span>}
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
