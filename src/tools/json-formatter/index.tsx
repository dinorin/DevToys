import { useState, useMemo } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { useSettingsStore } from "@/store/settingsStore";
import ToolCard, { TwoPanel } from "@/components/ui/ToolCard";
import CopyButton from "@/components/ui/CopyButton";

export default function JsonFormatter() {
  const theme = useSettingsStore((s) => s.theme);
  const [input, setInput] = useState('{\n  "hello": "world"\n}');
  const [indent, setIndent] = useState(2);

  const { output, error } = useMemo(() => {
    if (!input.trim()) return { output: "", error: "" };
    try {
      const parsed = JSON.parse(input);
      return { output: JSON.stringify(parsed, null, indent), error: "" };
    } catch (e: unknown) {
      return { output: "", error: (e as Error).message };
    }
  }, [input, indent]);

  return (
    <ToolCard
      title="JSON Formatter"
      description="Format, validate, and minify JSON"
      icon="📋"
      actions={
        <>
          <select value={indent} onChange={(e) => setIndent(Number(e.target.value))}>
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
            <option value={0}>Minify</option>
          </select>
          <CopyButton text={output} />
          <button className="btn" onClick={() => setInput("")}>🗑️ Clear</button>
        </>
      }
    >
      <TwoPanel
        leftLabel="Input JSON"
        rightLabel={error ? `⚠️ ${error}` : "Formatted Output"}
        left={
          <CodeMirror
            value={input}
            height="calc(100vh - 160px)"
            theme={theme === "dark" ? "dark" : "light"}
            extensions={[json()]}
            onChange={setInput}
            style={{ fontSize: 13 }}
          />
        }
        right={
          <CodeMirror
            value={output}
            height="calc(100vh - 160px)"
            theme={theme === "dark" ? "dark" : "light"}
            extensions={[json()]}
            readOnly
            style={{ fontSize: 13, opacity: error ? 0.5 : 1 }}
          />
        }
      />
    </ToolCard>
  );
}
