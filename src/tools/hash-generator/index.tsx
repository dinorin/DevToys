import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import ToolCard from "@/components/ui/ToolCard";
import CopyButton from "@/components/ui/CopyButton";

interface HashResult {
  md5: string;
  sha1: string;
  sha256: string;
  sha512: string;
}

const EMPTY: HashResult = { md5: "", sha1: "", sha256: "", sha512: "" };

function HashRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{
      background: "var(--bg-secondary)",
      border: "1px solid var(--border)",
      borderRadius: 8,
      padding: "12px 14px",
      display: "flex",
      flexDirection: "column",
      gap: 6,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          {label}
        </span>
        <CopyButton text={value} label="Copy" />
      </div>
      <code style={{
        fontSize: 12,
        fontFamily: "monospace",
        color: "var(--text-primary)",
        wordBreak: "break-all",
        lineHeight: 1.6,
      }}>
        {value || <span style={{ color: "var(--text-secondary)" }}>—</span>}
      </code>
    </div>
  );
}

export default function HashGenerator() {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<HashResult>(EMPTY);
  const [uppercase, setUppercase] = useState(false);

  useEffect(() => {
    if (!input.trim()) { setHashes(EMPTY); return; }
    invoke<HashResult>("generate_hashes", { input }).then(setHashes).catch(console.error);
  }, [input]);

  const fmt = (s: string) => uppercase ? s.toUpperCase() : s;

  return (
    <ToolCard
      title="Hash Generator"
      description="Generate MD5, SHA1, SHA256, SHA512 hashes"
      icon="#️⃣"
      actions={
        <label style={{ display: "flex", alignItems: "center", gap: 6, textTransform: "none", fontSize: 13, cursor: "pointer" }}>
          <input type="checkbox" checked={uppercase} onChange={(e) => setUppercase(e.target.checked)} />
          UPPERCASE
        </label>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16, height: "100%", overflow: "auto" }}>
        <div>
          <label>Input Text</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to hash..."
            style={{ height: 120, marginTop: 6 }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <HashRow label="MD5" value={fmt(hashes.md5)} />
          <HashRow label="SHA-1" value={fmt(hashes.sha1)} />
          <HashRow label="SHA-256" value={fmt(hashes.sha256)} />
          <HashRow label="SHA-512" value={fmt(hashes.sha512)} />
        </div>
      </div>
    </ToolCard>
  );
}
