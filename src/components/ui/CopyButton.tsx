import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button className="btn" onClick={copy} disabled={!text}>
      {copied ? <Check size={13} /> : <Copy size={13} />}
      {copied ? "Copied" : label}
    </button>
  );
}
