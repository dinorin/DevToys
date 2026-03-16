import { useState } from "react";
import { fromBase64, toBase64 } from "js-base64";
import ToolCard, { TwoPanel } from "@/components/ui/ToolCard";
import CopyButton from "@/components/ui/CopyButton";

export default function Base64Tool() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("");

  const output = (() => {
    try {
      return mode === "encode" ? toBase64(input) : fromBase64(input);
    } catch {
      return "⚠️ Invalid input";
    }
  })();

  return (
    <ToolCard
      title="Base64"
      description="Encode and decode Base64 strings"
      icon="🔐"
      actions={
        <>
          <div style={{ display: "flex", gap: 4 }}>
            {(["encode", "decode"] as const).map((m) => (
              <button
                key={m}
                className={`btn ${mode === m ? "btn-primary" : ""}`}
                onClick={() => setMode(m)}
              >
                {m === "encode" ? "🔒 Encode" : "🔓 Decode"}
              </button>
            ))}
          </div>
          <CopyButton text={output} />
        </>
      }
    >
      <TwoPanel
        leftLabel={mode === "encode" ? "Plain Text" : "Base64 Input"}
        rightLabel={mode === "encode" ? "Base64 Output" : "Decoded Text"}
        left={
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64 to decode..."}
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
