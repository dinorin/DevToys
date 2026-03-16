import { useState } from "react";
import ToolCard, { TwoPanel } from "@/components/ui/ToolCard";
import CopyButton from "@/components/ui/CopyButton";

export default function UrlEncoder() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [fullUrl, setFullUrl] = useState(false);
  const [input, setInput] = useState("");

  const output = (() => {
    try {
      if (mode === "encode") return fullUrl ? encodeURI(input) : encodeURIComponent(input);
      return fullUrl ? decodeURI(input) : decodeURIComponent(input);
    } catch {
      return "⚠️ Invalid input";
    }
  })();

  return (
    <ToolCard
      title="URL Encoder"
      description="Encode and decode URL components"
      icon="🔗"
      actions={
        <>
          <label style={{ display: "flex", alignItems: "center", gap: 6, textTransform: "none", fontSize: 13, cursor: "pointer" }}>
            <input type="checkbox" checked={fullUrl} onChange={(e) => setFullUrl(e.target.checked)} />
            Full URL
          </label>
          <div style={{ display: "flex", gap: 4 }}>
            {(["encode", "decode"] as const).map((m) => (
              <button key={m} className={`btn ${mode === m ? "btn-primary" : ""}`} onClick={() => setMode(m)}>
                {m === "encode" ? "🔒 Encode" : "🔓 Decode"}
              </button>
            ))}
          </div>
          <CopyButton text={output} />
        </>
      }
    >
      <TwoPanel
        leftLabel="Input"
        rightLabel="Output"
        left={
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter URL or text..."
            style={{ height: "calc(100vh - 160px)" }}
          />
        }
        right={
          <textarea
            value={output}
            readOnly
            style={{ height: "calc(100vh - 160px)", cursor: "default" }}
          />
        }
      />
    </ToolCard>
  );
}
