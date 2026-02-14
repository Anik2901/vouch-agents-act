import { useState } from "react";
import { Shield, Plus, CheckCircle, PauseCircle, X, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Scanline from "@/components/Scanline";

const Mandates = () => {
  const [spendingLimit, setSpendingLimit] = useState(500);
  const [txLimit, setTxLimit] = useState(100);
  const [timeWindow, setTimeWindow] = useState("24h");
  const [verificationMode, setVerificationMode] = useState("strict");

  const activeMandates = [
    {
      name: "Concierge-AI-01",
      status: "active",
      usage: 142.5,
      max: 500,
    },
    {
      name: "Auto-Refueler-v4",
      status: "paused",
      lastActivity: "2h ago",
    },
  ];

  const merchants = [
    {
      domain: "marriott.com",
      category: "Travel & Accomodation",
      approval: "Auto-Approved",
      mfa: false,
    },
    {
      domain: "amazon.com",
      category: "General Commerce",
      approval: "Verify Every Cart",
      mfa: true,
    },
  ];

  const timeWindows = [
    { label: "Every 24 Hours", value: "24h" },
    { label: "Weekly Reset", value: "weekly" },
    { label: "Monthly Budget", value: "monthly" },
    { label: "One-time Session", value: "onetime" },
  ];

  return (
    <div className="min-h-screen grid-bg relative overflow-hidden flex flex-col">
      <Scanline />
      <Navbar />

      <main className="flex-grow pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-12 border-l-4 border-neon-lime pl-8">
            <span className="font-mono-tech text-neon-lime uppercase tracking-widest text-xs font-bold">
              Mandate Engine v2.0
            </span>
            <h1 className="text-4xl md:text-6xl font-display uppercase mt-2">
              Mandate Configuration
            </h1>
            <p className="text-white/50 font-mono-tech mt-4 max-w-2xl">
              Set spending guardrails and whitelist protocols for your autonomous agents.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Sidebar - Active Mandates */}
            <div className="space-y-6">
              <h3 className="font-display uppercase text-sm tracking-widest text-white/40">
                Active Mandates
              </h3>

              {activeMandates.map((mandate) => (
                <div
                  key={mandate.name}
                  className={`glass-card rounded-2xl p-6 border-l-4 ${
                    mandate.status === "active"
                      ? "border-l-neon-lime"
                      : "border-l-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    {mandate.status === "active" ? (
                      <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-neon-lime">
                        <CheckCircle className="w-3 h-3" /> Active
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/40">
                        <PauseCircle className="w-3 h-3" /> Paused
                      </span>
                    )}
                  </div>
                  <h4 className="font-display uppercase text-lg mb-3">{mandate.name}</h4>
                  {mandate.status === "active" && mandate.usage !== undefined && mandate.max !== undefined ? (
                    <>
                      <div className="flex justify-between text-xs font-mono-tech mb-2">
                        <span className="text-white/40 uppercase">Usage</span>
                        <span>
                          ${mandate.usage.toFixed(2)} / ${mandate.max.toFixed(2)}
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-neon-lime"
                          style={{ width: `${(mandate.usage / mandate.max) * 100}%` }}
                        />
                      </div>
                    </>
                  ) : (
                    <p className="text-xs font-mono-tech text-white/40">
                      Last activity: {mandate.lastActivity}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Main Config Area */}
            <div className="lg:col-span-2">
              <div className="glass-card rounded-3xl p-8 border-white/10">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-neon-lime/10 text-neon-lime">
                      <Shield className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-display uppercase">Create New Mandate</h2>
                      <p className="text-[10px] font-mono-tech text-white/40 uppercase tracking-widest mt-1">
                        Primary Guardrails
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-neon-lime/10 text-neon-lime text-[10px] font-bold uppercase tracking-widest">
                    <div className="w-1.5 h-1.5 rounded-full bg-neon-lime animate-pulse" />
                    Status: Secure
                  </div>
                </div>

                <div className="space-y-8">
                  {/* Spending Limit */}
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-white/50 ml-1">
                      Spending Limit (USDC)
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min={0}
                        max={5000}
                        value={spendingLimit}
                        onChange={(e) => setSpendingLimit(Number(e.target.value))}
                        className="flex-1 accent-neon-lime h-1"
                      />
                      <div className="glass-card px-4 py-2 rounded-xl font-mono-tech text-sm min-w-[100px] text-center">
                        ${spendingLimit.toFixed(2)}
                      </div>
                    </div>
                    <p className="text-[10px] font-mono-tech text-white/30 ml-1">
                      MAX $5,000
                    </p>
                  </div>

                  {/* Time Window */}
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-white/50 ml-1">
                      Time Window
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {timeWindows.map((tw) => (
                        <button
                          key={tw.value}
                          onClick={() => setTimeWindow(tw.value)}
                          className={`px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-wider border transition-all ${
                            timeWindow === tw.value
                              ? "border-neon-lime bg-neon-lime/10 text-neon-lime"
                              : "border-white/10 bg-white/5 text-white/50 hover:bg-white/10"
                          }`}
                        >
                          {tw.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Transaction Limit */}
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-white/50 ml-1">
                      Transaction Limit
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min={0}
                        max={1000}
                        value={txLimit}
                        onChange={(e) => setTxLimit(Number(e.target.value))}
                        className="flex-1 accent-neon-magenta h-1"
                      />
                      <div className="glass-card px-4 py-2 rounded-xl font-mono-tech text-sm min-w-[100px] text-center">
                        ${txLimit.toFixed(2)}
                      </div>
                    </div>
                    <p className="text-[10px] font-mono-tech text-white/30 ml-1">
                      Single transactions above this require biometric MFA.
                    </p>
                  </div>

                  {/* Verification Mode */}
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-white/50 ml-1">
                      Verification Mode
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setVerificationMode("strict")}
                        className={`px-4 py-3 rounded-xl text-xs font-bold uppercase border transition-all ${
                          verificationMode === "strict"
                            ? "border-neon-cyan bg-neon-cyan/10 text-neon-cyan"
                            : "border-white/10 bg-white/5 text-white/50 hover:bg-white/10"
                        }`}
                      >
                        Strict (KYC Only)
                      </button>
                      <button
                        onClick={() => setVerificationMode("flexible")}
                        className={`px-4 py-3 rounded-xl text-xs font-bold uppercase border transition-all ${
                          verificationMode === "flexible"
                            ? "border-neon-cyan bg-neon-cyan/10 text-neon-cyan"
                            : "border-white/10 bg-white/5 text-white/50 hover:bg-white/10"
                        }`}
                      >
                        Flexible
                      </button>
                    </div>
                  </div>

                  {/* Merchant Whitelist */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-white/50 ml-1">
                        Merchant Whitelist
                      </label>
                      <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-neon-cyan hover:text-white transition-colors">
                        <Plus className="w-3 h-3" /> Add Domain
                      </button>
                    </div>

                    <div className="space-y-3">
                      {merchants.map((m) => (
                        <div
                          key={m.domain}
                          className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all"
                        >
                          <div className="flex items-center gap-4">
                            <div className="p-2 rounded-lg bg-white/5">
                              <Globe className="w-4 h-4 text-white/40" />
                            </div>
                            <div>
                              <span className="font-mono-tech text-sm font-bold">{m.domain}</span>
                              <p className="text-[10px] text-white/40 uppercase tracking-wider mt-0.5">
                                {m.category}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <span className="text-[10px] font-bold uppercase tracking-widest text-neon-lime block">
                                {m.approval}
                              </span>
                              <span className="text-[10px] text-white/30 uppercase">
                                {m.mfa ? "MFA Enabled" : "No MFA Required"}
                              </span>
                            </div>
                            <button className="p-1 text-white/20 hover:text-red-400 transition-colors">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/5">
                    <button className="flex-1 py-4 border border-white/10 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-white/5 transition-colors">
                      Discard Changes
                    </button>
                    <button className="flex-1 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-xs uppercase tracking-widest hover:scale-[1.02] transition-transform">
                      Deploy Mandate to On-Chain Wallet
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Mandates;
