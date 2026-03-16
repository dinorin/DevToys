import { useState } from "react";
import ToolCard from "@/components/ui/ToolCard";
import CopyButton from "@/components/ui/CopyButton";

const WORDS = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum curabitur pretium tincidunt lacus nulla gravida orci a odio nullam varius turpis euismod suscipit posuere eros cursus fringilla mattis lacinia mi risus fermentum est pulvinar purus fermentum sapien posuere blandit".split(" ");

function randomWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

function generateSentence(wordCount = 8 + Math.floor(Math.random() * 8)) {
  const words = Array.from({ length: wordCount }, randomWord);
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(" ") + ".";
}

function generateParagraph(sentenceCount = 4 + Math.floor(Math.random() * 4)) {
  return Array.from({ length: sentenceCount }, generateSentence).join(" ");
}

export default function LoremIpsum() {
  const [mode, setMode] = useState<"paragraphs" | "sentences" | "words">("paragraphs");
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState(() =>
    Array.from({ length: 3 }, generateParagraph).join("\n\n")
  );

  const generate = () => {
    let result = "";
    if (mode === "paragraphs") {
      result = Array.from({ length: count }, generateParagraph).join("\n\n");
    } else if (mode === "sentences") {
      result = Array.from({ length: count }, generateSentence).join(" ");
    } else {
      result = Array.from({ length: count }, randomWord).join(" ");
    }
    setOutput(result);
  };

  return (
    <ToolCard
      title="Lorem Ipsum"
      description="Generate placeholder Lorem Ipsum text"
      icon="📝"
      actions={
        <>
          <select value={mode} onChange={(e) => setMode(e.target.value as typeof mode)}>
            <option value="paragraphs">Paragraphs</option>
            <option value="sentences">Sentences</option>
            <option value="words">Words</option>
          </select>
          <input
            type="number"
            value={count}
            min={1}
            max={100}
            onChange={(e) => setCount(Math.max(1, Number(e.target.value)))}
            style={{ width: 64 }}
          />
          <button className="btn btn-primary" onClick={generate}>⚡ Generate</button>
          <CopyButton text={output} />
        </>
      }
    >
      <textarea
        value={output}
        readOnly
        style={{ height: "calc(100vh - 160px)", cursor: "default", lineHeight: 1.8 }}
      />
    </ToolCard>
  );
}
