import { useState, useMemo } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { markdown as mdLang } from "@codemirror/lang-markdown";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { useSettingsStore } from "@/store/settingsStore";
import ToolCard, { TwoPanel } from "@/components/ui/ToolCard";
import CopyButton from "@/components/ui/CopyButton";

const DEFAULT_MD = `# Hello, Markdown!

This is a **live** preview editor.

## Features

- Real-time rendering
- Syntax highlighting
- _Italic_, **bold**, \`code\`

\`\`\`js
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

> Blockquote text here

| Name   | Age |
|--------|-----|
| Alice  | 30  |
| Bob    | 25  |
`;

export default function MarkdownPreview() {
  const theme = useSettingsStore((s) => s.theme);
  const [input, setInput] = useState(DEFAULT_MD);

  const html = useMemo(() => {
    const raw = marked.parse(input) as string;
    return DOMPurify.sanitize(raw);
  }, [input]);

  return (
    <ToolCard
      title="Markdown Preview"
      description="Live Markdown editor with HTML preview"
      icon="📄"
      actions={<CopyButton text={input} label="Copy MD" />}
    >
      <TwoPanel
        leftLabel="Markdown"
        rightLabel="Preview"
        left={
          <CodeMirror
            value={input}
            height="calc(100vh - 160px)"
            theme={theme === "dark" ? "dark" : "light"}
            extensions={[mdLang()]}
            onChange={setInput}
          />
        }
        right={
          <div
            className="markdown-body"
            dangerouslySetInnerHTML={{ __html: html }}
            style={{
              height: "calc(100vh - 160px)",
              overflow: "auto",
              padding: "0 12px",
            }}
          />
        }
      />
    </ToolCard>
  );
}
