import { useState, useEffect } from "react";
import ToolCard from "@/components/ui/ToolCard";
import CopyButton from "@/components/ui/CopyButton";

function pad(n: number) { return String(n).padStart(2, "0"); }

function toLocalDatetimeValue(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

export default function UnixTimestamp() {
  const [timestamp, setTimestamp] = useState(String(Math.floor(Date.now() / 1000)));
  const [datetime, setDatetime] = useState(toLocalDatetimeValue(new Date()));
  const [now, setNow] = useState(Math.floor(Date.now() / 1000));

  useEffect(() => {
    const id = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(id);
  }, []);

  const fromTimestamp = (() => {
    const n = Number(timestamp);
    if (isNaN(n)) return null;
    const ms = String(timestamp).length >= 13 ? n : n * 1000;
    return new Date(ms);
  })();

  const handleDatetimeChange = (v: string) => {
    setDatetime(v);
    const d = new Date(v);
    if (!isNaN(d.getTime())) setTimestamp(String(Math.floor(d.getTime() / 1000)));
  };

  const handleTimestampChange = (v: string) => {
    setTimestamp(v);
    const n = Number(v);
    if (!isNaN(n)) {
      const ms = String(v).length >= 13 ? n : n * 1000;
      const d = new Date(ms);
      if (!isNaN(d.getTime())) setDatetime(toLocalDatetimeValue(d));
    }
  };

  return (
    <ToolCard
      title="Unix Timestamp"
      description="Convert between Unix timestamps and human-readable dates"
      icon="⏱️"
      actions={
        <button className="btn" onClick={() => { const n = Math.floor(Date.now() / 1000); setTimestamp(String(n)); setDatetime(toLocalDatetimeValue(new Date())); }}>
          🕐 Use Now
        </button>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 20, height: "100%", overflow: "auto" }}>
        {/* Live clock */}
        <div style={{
          background: "var(--bg-secondary)",
          border: "1px solid var(--border)",
          borderRadius: 8,
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}>
          <span style={{ fontSize: 20 }}>🕐</span>
          <div>
            <div style={{ fontSize: 11, color: "var(--text-secondary)", marginBottom: 2 }}>Current Unix Timestamp</div>
            <code style={{ fontSize: 18, fontWeight: 700, color: "var(--accent)" }}>{now}</code>
          </div>
          <CopyButton text={String(now)} label="Copy" />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {/* Timestamp input */}
          <div>
            <label>Unix Timestamp (seconds or ms)</label>
            <input
              type="text"
              value={timestamp}
              onChange={(e) => handleTimestampChange(e.target.value)}
              style={{ marginTop: 4 }}
              placeholder="e.g. 1710000000"
            />
          </div>

          {/* Datetime input */}
          <div>
            <label>Date & Time (local)</label>
            <input
              type="datetime-local"
              value={datetime}
              onChange={(e) => handleDatetimeChange(e.target.value)}
              step="1"
              style={{ marginTop: 4, fontFamily: "inherit" }}
            />
          </div>
        </div>

        {/* Parsed result */}
        {fromTimestamp && !isNaN(fromTimestamp.getTime()) && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
            {[
              { label: "Local", value: fromTimestamp.toLocaleString() },
              { label: "UTC", value: fromTimestamp.toUTCString() },
              { label: "ISO 8601", value: fromTimestamp.toISOString() },
              { label: "Relative", value: getRelative(fromTimestamp) },
            ].map(({ label, value }) => (
              <div key={label} style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                padding: "12px 14px",
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
                  {label}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                  <code style={{ fontSize: 12, color: "var(--text-primary)", flex: 1, wordBreak: "break-all" }}>{value}</code>
                  <CopyButton text={value} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ToolCard>
  );
}

function getRelative(d: Date) {
  const diff = Math.floor((Date.now() - d.getTime()) / 1000);
  if (Math.abs(diff) < 60) return `${Math.abs(diff)} seconds ${diff >= 0 ? "ago" : "from now"}`;
  if (Math.abs(diff) < 3600) return `${Math.floor(Math.abs(diff) / 60)} minutes ${diff >= 0 ? "ago" : "from now"}`;
  if (Math.abs(diff) < 86400) return `${Math.floor(Math.abs(diff) / 3600)} hours ${diff >= 0 ? "ago" : "from now"}`;
  return `${Math.floor(Math.abs(diff) / 86400)} days ${diff >= 0 ? "ago" : "from now"}`;
}
