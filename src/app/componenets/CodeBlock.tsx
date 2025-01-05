"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = "javascript",
}) => {
  return <SyntaxHighlighter language={language}>{code}</SyntaxHighlighter>;
};

export default CodeBlock;
