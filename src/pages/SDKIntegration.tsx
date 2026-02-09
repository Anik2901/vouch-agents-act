import { Copy, CheckSquare, Square, Terminal } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SDKIntegration = () => {
  const checklistItems = [
    { label: "Verify DID Metadata", completed: true },
    { label: "Set Spending Guards", completed: true },
    { label: "KYC Partner Sync", completed: false },
    { label: "Mainnet Activation", completed: false },
  ];

  return (
    <div className="min-h-screen grid-bg relative">
      <Navbar />
      
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <div className="mb-16 border-l-4 border-neon-cyan pl-8">
            <span className="font-mono-tech text-neon-cyan uppercase tracking-widest text-xs font-bold">
              Integration v1.4.2
            </span>
            <h1 className="text-5xl md:text-7xl font-display uppercase mt-2">SDK Integration</h1>
            <p className="text-white/50 font-mono-tech mt-4 max-w-2xl">
              Connect your AI agents to the Fob Trust Layer using the Model Context Protocol (MCP). Zero-config identity and spending mandates.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_300px] gap-12">
            {/* Documentation Body */}
            <div className="space-y-16">
              {/* Step 1: Install */}
              <section id="installation" className="scroll-mt-32">
                <div className="flex items-start gap-6">
                  <span className="text-5xl font-display text-neon-cyan opacity-20">01</span>
                  <div className="flex-1">
                    <h3 className="text-2xl font-display uppercase mb-4">Install Core Package</h3>
                    <p className="text-white/60 mb-6">
                      Add the Fob MCP server to your project. Works with Claude Desktop, LangChain, and custom agent frameworks.
                    </p>
                    
                    <div className="bg-[#0d0d0d] border border-white/10 rounded-xl p-4 font-mono-tech text-sm">
                      <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                        <span className="text-white/40">Terminal</span>
                        <Copy className="w-4 h-4 hover:text-neon-cyan cursor-pointer transition-colors" />
                      </div>
                      <code className="text-neon-cyan block">npm install @fob/mcp-server</code>
                      <code className="text-neon-cyan block mt-1">pip install fob-sdk</code>
                    </div>
                  </div>
                </div>
              </section>

              {/* Step 2: Initialize */}
              <section id="init" className="scroll-mt-32">
                <div className="flex items-start gap-6">
                  <span className="text-5xl font-display text-neon-magenta opacity-20">02</span>
                  <div className="flex-1">
                    <h3 className="text-2xl font-display uppercase mb-4">Initialize MCP Server</h3>
                    <p className="text-white/60 mb-6">
                      Configure your environment variables and boot the Fob engine. Ensure your Base wallet private key is stored securely.
                    </p>
                    
                    <div className="bg-[#0d0d0d] border border-white/10 rounded-xl p-6 font-mono-tech text-sm leading-relaxed overflow-x-auto">
                      <div className="flex gap-4 mb-4 border-b border-white/10 pb-2">
                        <span className="text-white border-b border-neon-magenta">Python</span>
                        <span className="text-white/40">TypeScript</span>
                      </div>
                      <pre className="text-white">
<span className="text-neon-magenta">from</span> fob <span className="text-neon-magenta">import</span> FobClient{"\n\n"}
<span className="text-white/40"># Initialize with your API Key</span>{"\n"}
client = FobClient({"\n"}
{"    "}api_key=<span className="text-neon-lime">"fob_sk_test_..."</span>,{"\n"}
{"    "}environment=<span className="text-neon-lime">"mainnet"</span>{"\n"}
){"\n\n"}
<span className="text-white/40"># Start MCP Server</span>{"\n"}
client.mcp.start_server()
                      </pre>
                    </div>
                  </div>
                </div>
              </section>

              {/* Step 3: Use Tools */}
              <section id="usage" className="scroll-mt-32">
                <div className="flex items-start gap-6">
                  <span className="text-5xl font-display text-neon-lime opacity-20">03</span>
                  <div className="flex-1">
                    <h3 className="text-2xl font-display uppercase mb-4">Authorize & Pay</h3>
                    <p className="text-white/60 mb-6">
                      Enable your agent to call Fob tools. When an agent needs to pay, it triggers a Mandate request.
                    </p>
                    
                    <div className="bg-[#0d0d0d] border border-white/10 rounded-xl p-6 font-mono-tech text-sm leading-relaxed">
                      <pre className="text-white">
<span className="text-white/40">// Example: Agent calling a payment tool</span>{"\n"}
<span className="text-neon-magenta">const</span> payment = <span className="text-neon-magenta">await</span> agent.use_tool(<span className="text-neon-lime">"fob_pay"</span>, {"{"}{"\n"}
{"    "}amount: <span className="text-neon-cyan">150.00</span>,{"\n"}
{"    "}currency: <span className="text-neon-cyan">"USDC"</span>,{"\n"}
{"    "}mandate_id: <span className="text-neon-lime">"mandate_8823"</span>,{"\n"}
{"    "}recipient: <span className="text-neon-lime">"0x742d..."</span>{"\n"}
{"}"});
                      </pre>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="hidden lg:block space-y-8">
              <div className="glass-card rounded-2xl p-6 border-white/10">
                <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-6">
                  Deployment Checklist
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
                  Support
                </h4>
                <p className="text-xs text-white/40 leading-relaxed mb-4">
                  Integration issues? Join our Discord or contact the protocol engineers.
                </p>
                <a href="#contact" className="text-xs font-bold border-b border-neon-cyan pb-1">
                  Developer Discord →
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
