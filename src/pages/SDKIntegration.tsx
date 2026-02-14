import { Copy, CheckSquare, Square, ExternalLink, BookOpen, Code2, Cpu, Zap, Shield, Terminal } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SDKIntegration = () => {
  const checklistItems = [
    { label: "Generate API Key", completed: true },
    { label: "Install MCP Server", completed: true },
    { label: "Configure Agent Wallet", completed: false },
    { label: "Set Spending Mandates", completed: false },
    { label: "Deploy to Mainnet", completed: false },
  ];

  return (
    <div className="min-h-screen grid-bg relative">
      <Navbar />

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <div className="mb-16 border-l-4 border-neon-cyan pl-8">
            <span className="font-mono-tech text-neon-cyan uppercase tracking-widest text-xs font-bold">
              Fob SDK v1.4.2 — Model Context Protocol
            </span>
            <h1 className="text-5xl md:text-7xl font-display uppercase mt-2">SDK Integration</h1>
            <p className="text-white/50 font-mono-tech mt-4 max-w-2xl">
              Connect your AI agents to the Fob Trust Layer using the Model Context Protocol (MCP). 
              Fob provides three core primitives: cryptographic identity (Passport), spending guardrails (Mandates), 
              and USDC settlement on Base.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_300px] gap-12">
            {/* Documentation Body */}
            <div className="space-y-16">

              {/* Overview */}
              <section className="glass-card rounded-2xl p-8 border-white/10">
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
                  <div className="p-4 rounded-xl bg-neon-cyan/5 border border-neon-cyan/20">
                    <Shield className="w-5 h-5 text-neon-cyan mb-2" />
                    <span className="text-xs font-bold uppercase tracking-wider">Passport</span>
                    <p className="text-[10px] text-white/40 mt-1">W3C Verifiable Credential anchored on Base. Proves agent origin and owner identity.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-neon-magenta/5 border border-neon-magenta/20">
                    <Zap className="w-5 h-5 text-neon-magenta mb-2" />
                    <span className="text-xs font-bold uppercase tracking-wider">Mandates</span>
                    <p className="text-[10px] text-white/40 mt-1">On-chain spending rules: budget caps, merchant whitelists, time-locked authorization windows.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-neon-lime/5 border border-neon-lime/20">
                    <Cpu className="w-5 h-5 text-neon-lime mb-2" />
                    <span className="text-xs font-bold uppercase tracking-wider">MCP Bridge</span>
                    <p className="text-[10px] text-white/40 mt-1">Three lines of code to give your LLM agent a USDC wallet. Compatible with Claude, GPT, LangChain.</p>
                  </div>
                </div>
              </section>

              {/* Step 1: Install */}
              <section id="installation" className="scroll-mt-32">
                <div className="flex items-start gap-6">
                  <span className="text-5xl font-display text-neon-cyan opacity-20">01</span>
                  <div className="flex-1">
                    <h3 className="text-2xl font-display uppercase mb-4">Install the Fob MCP Server</h3>
                    <p className="text-white/60 mb-6">
                      The Fob MCP server runs alongside your agent process and exposes Fob tools (identity verification, 
                      mandate checks, USDC payments) via the standard MCP tool-calling interface. It supports Claude Desktop, 
                      LangChain agents, CrewAI, AutoGen, and any framework that implements the MCP client spec.
                    </p>

                    <div className="bg-[#0d0d0d] border border-white/10 rounded-xl p-4 font-mono-tech text-sm mb-4">
                      <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                        <span className="text-white/40 flex items-center gap-2"><Terminal className="w-3 h-3" /> Terminal</span>
                        <Copy className="w-4 h-4 hover:text-neon-cyan cursor-pointer transition-colors" />
                      </div>
                      <code className="text-neon-cyan block"># Node.js / TypeScript</code>
                      <code className="text-white block">npm install @fob/mcp-server @fob/core</code>
                      <code className="text-white/30 block mt-3"># Python</code>
                      <code className="text-white block">pip install fob-sdk fob-mcp</code>
                    </div>

                    <div className="bg-[#0d0d0d] border border-white/10 rounded-xl p-4 font-mono-tech text-sm">
                      <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                        <span className="text-white/40">Claude Desktop — claude_desktop_config.json</span>
                        <Copy className="w-4 h-4 hover:text-neon-cyan cursor-pointer transition-colors" />
                      </div>
                      <pre className="text-white text-xs leading-relaxed">{`{
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
}`}</pre>
                    </div>
                  </div>
                </div>
              </section>

              {/* Step 2: Initialize */}
              <section id="init" className="scroll-mt-32">
                <div className="flex items-start gap-6">
                  <span className="text-5xl font-display text-neon-magenta opacity-20">02</span>
                  <div className="flex-1">
                    <h3 className="text-2xl font-display uppercase mb-4">Initialize the Client</h3>
                    <p className="text-white/60 mb-6">
                      The FobClient manages your agent's identity, validates mandates before every transaction, and 
                      handles USDC settlement via Base. Your API key is scoped to your organization and can be rotated 
                      from the Dashboard.
                    </p>

                    <div className="bg-[#0d0d0d] border border-white/10 rounded-xl p-6 font-mono-tech text-sm leading-relaxed overflow-x-auto mb-4">
                      <div className="flex gap-4 mb-4 border-b border-white/10 pb-2">
                        <span className="text-white border-b-2 border-neon-magenta pb-1">TypeScript</span>
                        <span className="text-white/40">Python</span>
                      </div>
                      <pre className="text-white text-xs">{`import { FobClient } from "@fob/core";

const fob = new FobClient({
  apiKey: process.env.FOB_API_KEY,     // fob_sk_live_...
  network: "base-mainnet",              // or "base-sepolia" for testnet
  walletAddress: "0x742d35Cc...",        // Agent's Base wallet
});

// Verify the agent's Passport DID is valid
const passport = await fob.passport.verify();
console.log(passport.did);  // did:fob:base:0x742d...
console.log(passport.score); // 98.4 (identity confidence)

// Start the MCP tool server
await fob.mcp.serve({ port: 3001 });`}</pre>
                    </div>

                    <div className="bg-[#0d0d0d] border border-white/10 rounded-xl p-6 font-mono-tech text-sm leading-relaxed overflow-x-auto">
                      <div className="flex gap-4 mb-4 border-b border-white/10 pb-2">
                        <span className="text-white/40">TypeScript</span>
                        <span className="text-white border-b-2 border-neon-magenta pb-1">Python</span>
                      </div>
                      <pre className="text-white text-xs">{`from fob import FobClient

client = FobClient(
    api_key="fob_sk_live_...",
    network="base-mainnet",
    wallet="0x742d35Cc..."
)

# Verify Passport
passport = client.passport.verify()
print(f"DID: {passport.did}")        # did:fob:base:0x742d...
print(f"Score: {passport.score}")     # 98.4

# Boot MCP server for Claude/LangChain
client.mcp.serve(port=3001)`}</pre>
                    </div>
                  </div>
                </div>
              </section>

              {/* Step 3: MCP Tools */}
              <section id="tools" className="scroll-mt-32">
                <div className="flex items-start gap-6">
                  <span className="text-5xl font-display text-neon-lime opacity-20">03</span>
                  <div className="flex-1">
                    <h3 className="text-2xl font-display uppercase mb-4">Use Fob MCP Tools</h3>
                    <p className="text-white/60 mb-6">
                      Once the MCP server is running, your AI agent can call these tools natively. The Fob server 
                      validates each call against your Mandate rules before executing — if a payment exceeds the 
                      budget or targets an un-whitelisted merchant, it's rejected before hitting the chain.
                    </p>

                    <h4 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-4">Available MCP Tools</h4>

                    <div className="space-y-4 mb-8">
                      {[
                        { tool: "fob_pay", desc: "Execute a USDC payment on Base. Validates against active Mandate before settlement.", color: "neon-lime" },
                        { tool: "fob_check_balance", desc: "Query the agent's current USDC balance and remaining mandate budget.", color: "neon-cyan" },
                        { tool: "fob_verify_merchant", desc: "Check if a merchant is on the whitelist before initiating payment.", color: "neon-magenta" },
                        { tool: "fob_get_passport", desc: "Retrieve the agent's DID, identity score, and verification status.", color: "neon-cyan" },
                        { tool: "fob_create_mandate", desc: "Programmatically create a new spending mandate with budget and time window.", color: "neon-lime" },
                      ].map((t) => (
                        <div key={t.tool} className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                          <Code2 className={`w-5 h-5 text-${t.color} mt-0.5 shrink-0`} />
                          <div>
                            <code className="font-mono-tech text-sm font-bold">{t.tool}</code>
                            <p className="text-xs text-white/40 mt-1">{t.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-[#0d0d0d] border border-white/10 rounded-xl p-6 font-mono-tech text-sm leading-relaxed">
                      <div className="mb-4 border-b border-white/10 pb-2">
                        <span className="text-white/40">Example: Agent executing a payment</span>
                      </div>
                      <pre className="text-white text-xs">{`// Your AI agent calls this via MCP tool-use
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
}`}</pre>
                    </div>
                  </div>
                </div>
              </section>

              {/* Step 4: Error Handling */}
              <section id="errors" className="scroll-mt-32">
                <div className="flex items-start gap-6">
                  <span className="text-5xl font-display text-white/10 opacity-20">04</span>
                  <div className="flex-1">
                    <h3 className="text-2xl font-display uppercase mb-4">Error Handling & Mandate Rejections</h3>
                    <p className="text-white/60 mb-6">
                      When a payment violates a Mandate rule, the SDK returns a structured rejection with the specific 
                      constraint that was violated. Your agent can use this to inform the user or adjust its strategy.
                    </p>

                    <div className="bg-[#0d0d0d] border border-white/10 rounded-xl p-6 font-mono-tech text-sm leading-relaxed">
                      <pre className="text-white text-xs">{`// Mandate violation response
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
// INSUFFICIENT_BALANCE — wallet USDC balance too low`}</pre>
                    </div>
                  </div>
                </div>
              </section>

              {/* API Reference */}
              <section id="api-ref" className="scroll-mt-32">
                <div className="flex items-start gap-6">
                  <span className="text-5xl font-display text-white/10 opacity-20">05</span>
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
                      ].map((ep) => (
                        <div key={ep.path + ep.method} className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${ep.method === "POST" ? "bg-neon-magenta/20 text-neon-magenta" : "bg-neon-cyan/20 text-neon-cyan"}`}>
                            {ep.method}
                          </span>
                          <code className="font-mono-tech text-xs flex-1">{ep.path}</code>
                          <span className="text-[10px] text-white/30">{ep.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="hidden lg:block space-y-8">
              <div className="glass-card rounded-2xl p-6 border-white/10 sticky top-28">
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
              </div>

              <div className="glass-card rounded-2xl p-6 border-white/10">
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
              </div>

              <div className="glass-card rounded-2xl p-6 border-white/10 bg-gradient-to-br from-neon-cyan/5 to-transparent">
                <h4 className="text-xs font-bold uppercase tracking-widest text-neon-cyan mb-4">
                  Need Help?
                </h4>
                <p className="text-xs text-white/40 leading-relaxed mb-4">
                  Join the Fob developer community for integration support, code reviews, and early access to new features.
                </p>
                <a href="#" className="text-xs font-bold border-b border-neon-cyan pb-1 flex items-center gap-1">
                  Developer Discord <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SDKIntegration;
