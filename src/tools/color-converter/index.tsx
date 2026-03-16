import { useState } from "react";
import colorConvert from "color-convert";
import ToolCard from "@/components/ui/ToolCard";
import CopyButton from "@/components/ui/CopyButton";

function hexToRgb(hex: string): [number, number, number] | null {
  const clean = hex.replace("#", "");
  if (!/^[0-9a-fA-F]{6}$/.test(clean)) return null;
  return colorConvert.hex.rgb(clean) as [number, number, number];
}

function parseRgb(s: string): [number, number, number] | null {
  const m = s.match(/(\d+)[,\s]+(\d+)[,\s]+(\d+)/);
  if (!m) return null;
  return [Number(m[1]), Number(m[2]), Number(m[3])];
}

function parseHsl(s: string): [number, number, number] | null {
  const m = s.match(/(\d+)[,\s]+(\d+)%?[,\s]+(\d+)%?/);
  if (!m) return null;
  return [Number(m[1]), Number(m[2]), Number(m[3])];
}

export default function ColorConverter() {
  const [hex, setHex] = useState("#6366f1");
  const [pickerHex, setPickerHex] = useState("#6366f1");
  const [error, setError] = useState("");

  const rgb = hexToRgb(hex);
  const hsl = rgb ? colorConvert.rgb.hsl(...rgb) : null;

  const rgbStr = rgb ? `${rgb[0]}, ${rgb[1]}, ${rgb[2]}` : "";
  const hslStr = hsl ? `${hsl[0]}°, ${hsl[1]}%, ${hsl[2]}%` : "";

  const handleHexChange = (v: string) => {
    setHex(v);
    const clean = v.replace("#", "");
    if (/^[0-9a-fA-F]{6}$/.test(clean)) {
      setPickerHex(v.startsWith("#") ? v : "#" + v);
      setError("");
    } else {
      setError("Invalid HEX");
    }
  };

  const handleRgbChange = (v: string) => {
    const parsed = parseRgb(v);
    if (parsed) {
      const h = colorConvert.rgb.hex(...parsed);
      setHex("#" + h);
      setPickerHex("#" + h);
      setError("");
    }
  };

  const handleHslChange = (v: string) => {
    const parsed = parseHsl(v);
    if (parsed) {
      const h = colorConvert.hsl.hex(...parsed);
      setHex("#" + h);
      setPickerHex("#" + h);
      setError("");
    }
  };

  return (
    <ToolCard
      title="Color Converter"
      description="Convert between HEX, RGB, and HSL color formats"
      icon="🎨"
    >
      <div style={{ display: "flex", gap: 32, flexWrap: "wrap", height: "100%", overflow: "auto" }}>
        {/* Swatch + picker */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
          <div style={{
            width: 160,
            height: 160,
            borderRadius: 12,
            background: rgb ? `rgb(${rgb.join(",")})` : "#888",
            border: "1px solid var(--border)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          }} />
          <input
            type="color"
            value={pickerHex}
            onChange={(e) => handleHexChange(e.target.value)}
            style={{ width: 160, height: 40, border: "none", cursor: "pointer", borderRadius: 6, background: "none" }}
          />
        </div>

        {/* Input fields */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16, minWidth: 240 }}>
          {error && <div style={{ color: "#ef4444", fontSize: 12 }}>⚠️ {error}</div>}

          {[
            {
              label: "HEX",
              value: hex,
              onChange: handleHexChange,
              placeholder: "#6366f1",
              badge: "#",
              copyText: hex,
            },
            {
              label: "RGB",
              value: rgbStr,
              onChange: handleRgbChange,
              placeholder: "99, 102, 241",
              badge: "rgb",
              copyText: `rgb(${rgbStr})`,
            },
            {
              label: "HSL",
              value: hslStr,
              onChange: handleHslChange,
              placeholder: "239°, 84%, 67%",
              badge: "hsl",
              copyText: `hsl(${hslStr})`,
            },
          ].map(({ label, value, onChange, placeholder, badge, copyText }) => (
            <div key={label}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <label>{label}</label>
                <CopyButton text={copyText} label={badge} />
              </div>
              <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
              />
            </div>
          ))}

          {/* Color info */}
          {rgb && (
            <div style={{
              background: "var(--bg-secondary)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              padding: "12px 14px",
              fontSize: 12,
              color: "var(--text-secondary)",
              lineHeight: 2,
            }}>
              <div>Red: <strong style={{ color: "var(--text-primary)" }}>{rgb[0]}</strong></div>
              <div>Green: <strong style={{ color: "var(--text-primary)" }}>{rgb[1]}</strong></div>
              <div>Blue: <strong style={{ color: "var(--text-primary)" }}>{rgb[2]}</strong></div>
              {hsl && <>
                <div>Hue: <strong style={{ color: "var(--text-primary)" }}>{hsl[0]}°</strong></div>
                <div>Saturation: <strong style={{ color: "var(--text-primary)" }}>{hsl[1]}%</strong></div>
                <div>Lightness: <strong style={{ color: "var(--text-primary)" }}>{hsl[2]}%</strong></div>
              </>}
            </div>
          )}
        </div>
      </div>
    </ToolCard>
  );
}
