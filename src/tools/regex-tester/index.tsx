import { useState, useMemo } from "react";
import ToolCard from "@/components/ui/ToolCard";

interface Match {
  value: string;
  index: number;
  groups: Record<string, string>;
}

function escHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export default function RegexTester() {
  const [pattern, setPattern] = useState("[a-z]+");
  const [flags, setFlags] = useState({ g: true, i: false, m: false, s: false });
  const [testStr, setTestStr] = useState("Hello World foo bar");

  const { matches, highlighted, error } = useMemo(() => {
    if (!pattern) return { matches: [], highlighted: escHtml(testStr), error: "" };
    try {
      const f = Object.entries(flags).filter(([, v]) => v).map(([k]) => k).join("");
      const ms: Match[] = [];
      const reCopy = new RegExp(pattern, f.includes("g") ? f : f + "g");
      let m: RegExpExecArray | null;
      while ((m = reCopy.exec(testStr)) !== null) {
        ms.push({ value: m[0], index: m.index, groups: m.groups || {} });
        if (!f.includes("g")) break;
        if (m[0].length === 0) { reCopy.lastIndex++; } // avoid infinite loop on zero-width match
      }

      // Build highlighted HTML
      let html = "";
      let last = 0;
      const reHL = new RegExp(pattern, f.includes("g") ? f : f + "g");
      testStr.replace(reHL, (match, ...args) => {
        const idx = typeof args[args.length - 2] === "number" ? args[args.length - 2] : 0;
        html += escHtml(testStr.slice(last, idx));
        html += `<mark style="background:#f59e0b40;color:var(--text-primary);border-radius:3px;padding:0 2px;">${escHtml(match)}</mark>`;
        last = idx + match.length;
        return match;
      });
      html += escHtml(testStr.slice(last));

      return { matches: ms, highlighted: html, error: "" };
    } catch (e: unknown) {
      return { matches: [], highlighted: escHtml(testStr), error: (e as Error).message };
    }
  }, [pattern, flags, testStr]);

  return (
    <ToolCard
      title="Regex Tester"
      description="Test regular expressions with live match highlighting"
      icon="🔍"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16, height: "100%", overflow: "auto" }}>
        {/* Pattern */}
        <div style={{ display: "flex", gap: 12, alignItems: "flex-end", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <label>Pattern</label>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="Enter regex pattern..."
              style={{ marginTop: 4, fontFamily: "monospace" }}
            />
            {error && <div style={{ color: "#ef4444", fontSize: 11, marginTop: 4 }}>⚠️ {error}</div>}
          </div>
          <div style={{ display: "flex", gap: 10, paddingBottom: 4, flexWrap: "wrap" }}>
            {(Object.keys(flags) as (keyof typeof flags)[]).map((f) => (
              <label key={f} style={{ display: "flex", alignItems: "center", gap: 4, textTransform: "none", fontSize: 13, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={flags[f]}
                  onChange={(e) => setFlags((prev) => ({ ...prev, [f]: e.target.checked }))}
                />
                <code>{f}</code>
              </label>
            ))}
          </div>
        </div>

        {/* Test string */}
        <div>
          <label>Test String ({matches.length} match{matches.length !== 1 ? "es" : ""})</label>
          <textarea
            value={testStr}
            onChange={(e) => setTestStr(e.target.value)}
            style={{ height: 120, marginTop: 4 }}
          />
        </div>

        {/* Highlighted preview */}
        <div>
          <label>Highlighted Matches</label>
          <div
            dangerouslySetInnerHTML={{ __html: highlighted }}
            style={{
              background: "var(--bg-secondary)",
              border: "1px solid var(--border)",
              borderRadius: 6,
              padding: "10px 12px",
              fontFamily: "monospace",
              fontSize: 13,
              lineHeight: 1.6,
              marginTop: 4,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              minHeight: 60,
              color: "var(--text-primary)",
            }}
          />
        </div>

        {/* Matches table */}
        {matches.length > 0 && (
          <div>
            <label>Matches ({matches.length})</label>
            <div style={{ marginTop: 4, display: "flex", flexDirection: "column", gap: 6 }}>
              {matches.map((m, i) => (
                <div key={i} style={{
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border)",
                  borderRadius: 6,
                  padding: "8px 12px",
                  display: "flex",
                  gap: 12,
                  alignItems: "center",
                  fontSize: 12,
                }}>
                  <span style={{ color: "var(--text-secondary)", minWidth: 24 }}>#{i + 1}</span>
                  <code style={{ color: "#f59e0b", flex: 1 }}>{m.value}</code>
                  <span style={{ color: "var(--text-secondary)" }}>@ index {m.index}</span>
                  {Object.keys(m.groups).length > 0 && (
                    <span style={{ color: "var(--text-secondary)" }}>
                      groups: {JSON.stringify(m.groups)}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolCard>
  );
}
