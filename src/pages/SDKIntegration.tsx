import { Copy, Check, CheckSquare, Square, ExternalLink, BookOpen, Code2, Cpu, Zap, Shield, Terminal } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import CodeBlock from "@/components/CodeBlock";
import { toast } from "@/hooks/use-toast";

const SDKIntegration = () => {
  const checklistItems = [
    { label: "Generate API Key", completed: true },
    { label: "Install MCP Server", completed: true },
    { label: "Configure Agent Wallet", completed: false },
    { label: "Set Spending Mandates", completed: false },
    { label: "Deploy to Mainnet", completed: false },
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <div className="min-h-screen grid-bg relative">
      <ScrollProgress />
      <Navbar />

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16 border-l-4 border-neon-cyan pl-8"
          >
            <span className="font-mono-tech text-neon-cyan uppercase tracking-widest text-xs font-bold">
              Fob SDK v1.4.2 — Model Context Protocol
            </span>
            <h1 className="text-5xl md:text-7xl font-display uppercase mt-2">SDK Integration</h1>
            <p className="text-white/50 font-mono-tech mt-4 max-w-2xl">
              Connect your AI agents to the Fob Trust Layer using the Model Context Protocol (MCP). 
              Fob provides three core primitives: cryptographic identity (Passport), spending guardrails (Mandates), 
              and USDC settlement on Base.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-[1fr_300px] gap-12">
            {/* Documentation Body */}
            <div className="space-y-16">

              {/* Overview */}
              <motion.section
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="glass-card rounded-2xl p-8 border-white/10"
              >
                <h3 className="text-lg font-display uppercase mb-4 flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-neon-cyan" /> Architecture Overview
                </h3>
                <p className="text-white/60 leading-relaxed mb-6">
                  The Fob SDK implements the <span className="text-neon-cyan font-bold">Model Context Protocol (MCP)</span>, 
                  an open standard for connecting AI models to external tools and data sources. When your agent needs to 
                  transact, it calls Fob MCP tools which validate spending against on-chain Mandates, verify identity 
                  through the Passport DID, and settle payments in USDC on Base L2.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { icon: Shield, label: "Passport", desc: "W3C Verifiable Credential anchored on Base. Proves agent origin and owner identity.", color: "cyan" },
                    { icon: Zap, label: "Mandates", desc: "On-chain spending rules: budget caps, merchant whitelists, time-locked authorization windows.", color: "magenta" },
                    { icon: Cpu, label: "MCP Bridge", desc: "Three lines of code to give your LLM agent a USDC wallet. Compatible with Claude, GPT, LangChain.", color: "lime" },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className={`p-4 rounded-xl bg-neon-${item.color}/5 border border-neon-${item.color}/20`}
                    >
                      <item.icon className={`w-5 h-5 text-neon-${item.color} mb-2`} />
                      <span className="text-xs font-bold uppercase tracking-wider">{item.label}</span>
                      <p className="text-[10px] text-white/40 mt-1">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Step 1: Install */}
              <motion.section
                id="installation"
                className="scroll-mt-32"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="flex items-start gap-6">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 0.2, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="text-5xl font-display text-neon-cyan"
                  >
                    01
                  </motion.span>
                  <div className="flex-1">
                    <h3 className="text-2xl font-display uppercase mb-4">Install the Fob MCP Server</h3>
                    <p className="text-white/60 mb-6">
                      The Fob MCP server runs alongside your agent process and exposes Fob tools (identity verification, 
                      mandate checks, USDC payments) via the standard MCP tool-calling interface.
                    </p>

                    <CodeBlock
                      title="Terminal"
                      code={`# Node.js / TypeScript
npm install @fob/mcp-server @fob/core

# Python
pip install fob-sdk fob-mcp`}
                    />

                    <div className="mt-4">
                      <CodeBlock
                        title="claude_desktop_config.json"
                        code={`{
  "mcpServers": {
    "fob": {
      "command": "npx",
      "args": ["-y", "@fob/mcp-server"],
      "env": {
        "FOB_API_KEY": "fob_sk_live_...",
        "FOB_NETWORK": "base-mainnet"
      }
    }
  }
}`}
                      />
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* Step 2: Initialize */}
              <motion.section
                id="init"
                className="scroll-mt-32"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="flex items-start gap-6">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 0.2, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="text-5xl font-display text-neon-magenta"
                  >
                    02
                  </motion.span>
                  <div className="flex-1">
                    <h3 className="text-2xl font-display uppercase mb-4">Initialize the Client</h3>
                    <p className="text-white/60 mb-6">
                      The FobClient manages your agent's identity, validates mandates before every transaction, and 
                      handles USDC settlement via Base.
                    </p>

                    <CodeBlock
                      title="TypeScript"
                      code={`import { FobClient } from "@fob/core";

const fob = new FobClient({
  apiKey: process.env.FOB_API_KEY,
  network: "base-mainnet",
  walletAddress: "0x742d35Cc...",
});

// Verify the agent's Passport DID is valid
const passport = await fob.passport.verify();
console.log(passport.did);   // did:fob:base:0x742d...
console.log(passport.score); // 98.4

// Start the MCP tool server
await fob.mcp.serve({ port: 3001 });`}
                    />
                  </div>
                </div>
              </motion.section>

              {/* Step 3: MCP Tools */}
              <motion.section
                id="tools"
                className="scroll-mt-32"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="flex items-start gap-6">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 0.2, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="text-5xl font-display text-neon-lime"
                  >
                    03
                  </motion.span>
                  <div className="flex-1">
                    <h3 className="text-2xl font-display uppercase mb-4">Use Fob MCP Tools</h3>
                    <p className="text-white/60 mb-6">
                      Once the MCP server is running, your AI agent can call these tools natively. The Fob server 
                      validates each call against your Mandate rules before executing.
                    </p>

                    <h4 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-4">Available MCP Tools</h4>

                    <div className="space-y-4 mb-8">
                      {[
                        { tool: "fob_pay", desc: "Execute a USDC payment on Base. Validates against active Mandate before settlement.", color: "neon-lime" },
                        { tool: "fob_check_balance", desc: "Query the agent's current USDC balance and remaining mandate budget.", color: "neon-cyan" },
                        { tool: "fob_verify_merchant", desc: "Check if a merchant is on the whitelist before initiating payment.", color: "neon-magenta" },
                        { tool: "fob_get_passport", desc: "Retrieve the agent's DID, identity score, and verification status.", color: "neon-cyan" },
                        { tool: "fob_create_mandate", desc: "Programmatically create a new spending mandate with budget and time window.", color: "neon-lime" },
                      ].map((t, i) => (
                        <motion.div
                          key={t.tool}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                          className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 hover:-translate-y-1 transition-all duration-300"
                        >
                          <Code2 className={`w-5 h-5 text-${t.color} mt-0.5 shrink-0`} />
                          <div>
                            <code className="font-mono-tech text-sm font-bold">{t.tool}</code>
                            <p className="text-xs text-white/40 mt-1">{t.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <CodeBlock
                      title="Example: Agent executing a payment"
                      code={`// Your AI agent calls this via MCP tool-use
const result = await agent.useTool("fob_pay", {
  amount: 150.00,
  currency: "USDC",
  mandate_id: "mandate_8823",
  recipient: "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD18",
  memo: "Cloud compute instance - 30 day reservation"
});

// Response
{
  "status": "settled",
  "tx_hash": "0xabc123...def456",
  "remaining_budget": 350.00,
  "mandate_utilization": "30%",
  "settlement_time_ms": 1200
}`}
                    />
                  </div>
                </div>
              </motion.section>

              {/* Step 4: Error Handling */}
              <motion.section
                id="errors"
                className="scroll-mt-32"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="flex items-start gap-6">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 0.2, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="text-5xl font-display text-white"
                  >
                    04
                  </motion.span>
                  <div className="flex-1">
                    <h3 className="text-2xl font-display uppercase mb-4">Error Handling & Mandate Rejections</h3>
                    <p className="text-white/60 mb-6">
                      When a payment violates a Mandate rule, the SDK returns a structured rejection with the specific 
                      constraint that was violated.
                    </p>

                    <CodeBlock
                      title="Mandate Violation Response"
                      code={`// Mandate violation response
{
  "status": "rejected",
  "error_code": "MANDATE_BUDGET_EXCEEDED",
  "message": "Transaction of $450.00 exceeds remaining budget of $350.00",
  "mandate_id": "mandate_8823",
  "constraint": {
    "type": "spending_limit",
    "limit": 500.00,
    "spent": 150.00,
    "remaining": 350.00
  },
  "suggestion": "Request mandate increase or split into smaller transactions"
}

// Other error codes:
// MERCHANT_NOT_WHITELISTED — recipient not in mandate whitelist
// MANDATE_EXPIRED — time window has elapsed
// MFA_REQUIRED — transaction exceeds single-tx limit
// PASSPORT_UNVERIFIED — agent DID not yet verified
// INSUFFICIENT_BALANCE — wallet USDC balance too low`}
                    />
                  </div>
                </div>
              </motion.section>

              {/* API Reference */}
              <motion.section
                id="api-ref"
                className="scroll-mt-32"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="flex items-start gap-6">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 0.2, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="text-5xl font-display text-white"
                  >
                    05
                  </motion.span>
                  <div className="flex-1">
                    <h3 className="text-2xl font-display uppercase mb-4">REST API Reference</h3>
                    <p className="text-white/60 mb-6">
                      For non-MCP integrations, Fob exposes a standard REST API. All endpoints require Bearer token 
                      authentication with your API key.
                    </p>

                    <div className="space-y-3">
                      {[
                        { method: "POST", path: "/v1/payments", desc: "Create a USDC payment" },
                        { method: "GET", path: "/v1/mandates", desc: "List active mandates" },
                        { method: "POST", path: "/v1/mandates", desc: "Create a new mandate" },
                        { method: "GET", path: "/v1/passport", desc: "Get passport/DID status" },
                        { method: "POST", path: "/v1/passport/verify", desc: "Initiate identity verification" },
                        { method: "GET", path: "/v1/agents", desc: "List registered agents" },
                        { method: "POST", path: "/v1/agents", desc: "Register a new agent" },
                        { method: "GET", path: "/v1/transactions", desc: "Query transaction history" },
                      ].map((ep, i) => (
                        <motion.div
                          key={ep.path + ep.method}
                          initial={{ opacity: 0, x: -15 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                          className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 hover:-translate-y-0.5 transition-all duration-300"
                        >
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${ep.method === "POST" ? "bg-neon-magenta/20 text-neon-magenta" : "bg-neon-cyan/20 text-neon-cyan"}`}>
                            {ep.method}
                          </span>
                          <code className="font-mono-tech text-xs flex-1">{ep.path}</code>
                          <span className="text-[10px] text-white/30">{ep.desc}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.section>
            </div>

            {/* Sidebar */}
            <aside className="hidden lg:block space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="glass-card rounded-2xl p-6 border-white/10 sticky top-28"
              >
                <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-6">
                  On This Page
                </h4>
                <ul className="space-y-3">
                  {[
                    { label: "Architecture", href: "#" },
                    { label: "Installation", href: "#installation" },
                    { label: "Initialize Client", href: "#init" },
                    { label: "MCP Tools", href: "#tools" },
                    { label: "Error Handling", href: "#errors" },
                    { label: "REST API", href: "#api-ref" },
                  ].map((item) => (
                    <li key={item.label}>
                      <a href={item.href} className="text-sm text-white/40 hover:text-neon-cyan transition-colors">
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="glass-card rounded-2xl p-6 border-white/10"
              >
                <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-6">
                  Integration Checklist
                </h4>
                <ul className="space-y-4">
                  {checklistItems.map((item, index) => (
                    <li
                      key={index}
                      className={`flex items-center gap-3 text-sm ${!item.completed ? "opacity-50" : ""}`}
                    >
                      {item.completed ? (
                        <CheckSquare className="w-4 h-4 text-neon-cyan" />
                      ) : (
                        <Square className="w-4 h-4 text-white/30" />
                      )}
                      <span>{item.label}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="glass-card rounded-2xl p-6 border-white/10 bg-gradient-to-br from-neon-cyan/5 to-transparent"
              >
                <h4 className="text-xs font-bold uppercase tracking-widest text-neon-cyan mb-4">
                  Need Help?
                </h4>
                <p className="text-xs text-white/40 leading-relaxed mb-4">
                  Join the Fob developer community for integration support, code reviews, and early access to new features.
                </p>
                <a href="#" className="text-xs font-bold border-b border-neon-cyan pb-1 flex items-center gap-1">
                  Developer Discord <ExternalLink className="w-3 h-3" />
                </a>
              </motion.div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SDKIntegration;
