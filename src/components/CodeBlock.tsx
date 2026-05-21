"use client";

import { useState } from "react";

interface CodeBlockProps {
  children: React.ReactElement;
  "data-language"?: string;
  "data-theme"?: string;
}

export default function CodeBlock({ children, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const language = props["data-language"] ?? "";

  const handleCopy = async () => {
    const childProps = (children as any)?.props;
    if (!childProps?.children) return;
    const code = extractText(childProps.children);
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {language && (
        <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-[#30363d] text-xs text-[#8b949e] rounded-t-xl">
          <span>{language}</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 hover:text-[#c9d1d9] transition-colors"
          >
            {copied ? (
              <>
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Copy
              </>
            )}
          </button>
        </div>
      )}
      <pre className={`bg-[#0d1117] overflow-x-auto ${language ? "rounded-b-xl" : "rounded-xl"}`}>
        {children}
      </pre>
    </>
  );
}

function extractText(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (!node || typeof node !== "object") return "";
  if (Array.isArray(node)) return node.map(extractText).join("");
  if ("props" in node) {
    const element = node as { props?: { children?: React.ReactNode } };
    if (element.props?.children) {
      return extractText(element.props.children);
    }
  }
  return "";
}
