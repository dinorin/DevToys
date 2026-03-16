import { useState } from "react";
import { fromBase64 } from "js-base64";
import ToolCard from "@/components/ui/ToolCard";
import CopyButton from "@/components/ui/CopyButton";

function decodeSegment(seg: string): unknown {
  try {
    const padded = seg.replace(/-/g, "+").replace(/_/g, "/");
    const json = fromBase64(padded);
    return JSON.parse(json);
  } catch {
    return { error: "Invalid segment" };
  }
}

function JsonBlock({ data, color }: { data: unknown; color: string }) {
  return (
    <pre style={{
      background: "var(--bg-secondary)",
      border: `1px solid ${color}40`,
      borderLeft: `3px solid ${color}`,
      borderRadius: 6,
      padding: 12,
      margin: 0,
      fontSize: 12,
      overflow: "auto",
      fontFamily: "monospace",
      color: "var(--text-primary)",
      whiteSpace: "pre-wrap",
      wordBreak: "break-word",
    }}>
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}

export default function JwtDecoder() {
  const [token, setToken] = useState("");

  const parts = token.trim().split(".");
  const isValid = parts.length === 3;

  const header = isValid ? decodeSegment(parts[0]) as Record<string, unknown> : null;
  const payload = isValid ? decodeSegment(parts[1]) as Record<string, unknown> : null;

  const exp = payload && typeof payload.exp === "number" ? payload.exp as number : null;
  const iat = payload && typeof payload.iat === "number" ? payload.iat as number : null;
  const isExpired = exp !== null && Date.now() / 1000 > exp;

  return (
    <ToolCard
      title="JWT Decoder"
      description="Decode and inspect JWT tokens"
      icon="🎫"
      actions={<CopyButton text={token} label="Copy Token" />}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16, height: "100%", overflow: "auto" }}>
        <div>
          <label>JWT Token</label>
          <textarea
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Paste your JWT token here..."
            style={{ height: 80, marginTop: 6 }}
          />
        </div>

        {isValid ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {/* Status */}
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {exp !== null && (
                <span style={{
                  padding: "3px 10px",
                  borderRadius: 12,
                  fontSize: 12,
                  fontWeight: 600,
                  background: isExpired ? "#ef444420" : "#22c55e20",
                  color: isExpired ? "#ef4444" : "#22c55e",
                  border: `1px solid ${isExpired ? "#ef4444" : "#22c55e"}40`,
                }}>
                  {isExpired ? "⚠️ EXPIRED" : "✅ Valid"}
                </span>
              )}
              {iat !== null && (
                <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                  Issued: {new Date(iat * 1000).toLocaleString()}
                </span>
              )}
              {exp !== null && (
                <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                  Expires: {new Date(exp * 1000).toLocaleString()}
                </span>
              )}
            </div>

            {/* Header */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#f59e0b", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Header — Algorithm & Token Type
              </div>
              <JsonBlock data={header} color="#f59e0b" />
            </div>

            {/* Payload */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#6366f1", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Payload — Data
              </div>
              <JsonBlock data={payload} color="#6366f1" />
            </div>

            {/* Signature */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#22c55e", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Signature — (not verified)
              </div>
              <pre style={{
                background: "var(--bg-secondary)",
                border: "1px solid #22c55e40",
                borderLeft: "3px solid #22c55e",
                borderRadius: 6,
                padding: 12,
                margin: 0,
                fontSize: 12,
                fontFamily: "monospace",
                color: "var(--text-secondary)",
                wordBreak: "break-all",
                whiteSpace: "pre-wrap",
              }}>
                {parts[2]}
              </pre>
            </div>
          </div>
        ) : token.trim() ? (
          <div style={{ color: "#ef4444", fontSize: 13 }}>
            ⚠️ Invalid JWT format. A JWT must have exactly 3 parts separated by dots.
          </div>
        ) : null}
      </div>
    </ToolCard>
  );
}
