import { useState } from "react";
import { Copy, Check, Terminal } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

const CodeBlock = ({ code, language = "Terminal", title }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    toast({ title: "Copied!", description: "Code copied to clipboard." });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative group rounded-xl overflow-hidden border border-white/[0.08] bg-[#0a0a0a]"
    >
      {/* Window bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="text-white/40 text-[10px] font-mono-tech flex items-center gap-1.5">
            <Terminal className="w-3 h-3" />
            {title || language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 text-[10px] font-mono-tech uppercase tracking-wider text-white/50 hover:text-neon-cyan px-2 py-1 rounded-md border border-white/10 hover:border-neon-cyan/30"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-neon-lime" />
              <span className="text-neon-lime">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              Copy
            </>
          )}
        </button>
      </div>
      {/* Code content */}
      <pre className="p-6 font-mono-tech text-xs leading-relaxed overflow-x-auto">
        <code>{code}</code>
      </pre>
    </motion.div>
  );
};

export default CodeBlock;
