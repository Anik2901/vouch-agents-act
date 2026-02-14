import { useState, useEffect } from "react";
import { Shield, Plus, CheckCircle, PauseCircle, X, Globe, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Scanline from "@/components/Scanline";

interface MandateRow {
  id: string;
  mandate_name: string;
  spending_limit: number;
  spent: number;
  status: string;
  time_window: string;
  tx_limit: number;
  verification_mode: string;
}

interface MerchantRow {
  id: string;
  domain: string;
  category: string | null;
  auto_approved: boolean;
  mfa_required: boolean;
  mandate_id: string;
}

const Mandates = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [mandateName, setMandateName] = useState("");
  const [spendingLimit, setSpendingLimit] = useState(500);
  const [txLimit, setTxLimit] = useState(100);
  const [timeWindow, setTimeWindow] = useState("24h");
  const [verificationMode, setVerificationMode] = useState("strict");
  const [mandates, setMandates] = useState<MandateRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [deploying, setDeploying] = useState(false);

  // Merchant whitelist state for creation
  const [newDomain, setNewDomain] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [pendingMerchants, setPendingMerchants] = useState<Array<{ domain: string; category: string; auto_approved: boolean; mfa_required: boolean }>>([
    { domain: "marriott.com", category: "Travel & Accommodation", auto_approved: true, mfa_required: false },
    { domain: "amazon.com", category: "General Commerce", auto_approved: false, mfa_required: true },
  ]);

  useEffect(() => {
    if (user) fetchMandates();
  }, [user]);

  const fetchMandates = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("mandates")
      .select("*")
      .eq("user_id", user!.id)
      .order("created_at", { ascending: false });
    if (data) setMandates(data);
    setLoading(false);
  };

  const addMerchant = () => {
    if (!newDomain.trim()) return;
    setPendingMerchants((prev) => [
      ...prev,
      { domain: newDomain.trim(), category: newCategory.trim() || "General", auto_approved: false, mfa_required: true },
    ]);
    setNewDomain("");
    setNewCategory("");
  };

  const removeMerchant = (domain: string) => {
    setPendingMerchants((prev) => prev.filter((m) => m.domain !== domain));
  };

  const deployMandate = async () => {
    if (!mandateName.trim()) {
      toast.error("Please enter a mandate name.");
      return;
    }

    setDeploying(true);
    const { data: mandate, error } = await supabase
      .from("mandates")
      .insert({
        user_id: user!.id,
        mandate_name: mandateName.trim(),
        spending_limit: spendingLimit,
        tx_limit: txLimit,
        time_window: timeWindow,
        verification_mode: verificationMode,
      })
      .select()
      .single();

    if (error || !mandate) {
      toast.error("Failed to create mandate.");
      setDeploying(false);
      return;
    }

    // Insert merchant whitelist entries
    if (pendingMerchants.length > 0) {
      await supabase.from("merchant_whitelist").insert(
        pendingMerchants.map((m) => ({
          mandate_id: mandate.id,
          user_id: user!.id,
          domain: m.domain,
          category: m.category,
          auto_approved: m.auto_approved,
          mfa_required: m.mfa_required,
        }))
      );
    }

    toast.success("Mandate deployed on-chain successfully!");
    setDeploying(false);
    setMandateName("");
    setSpendingLimit(500);
    setTxLimit(100);
    fetchMandates();
  };

  const toggleMandateStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "paused" : "active";
    await supabase.from("mandates").update({ status: newStatus }).eq("id", id);
    fetchMandates();
    toast.success(`Mandate ${newStatus === "active" ? "activated" : "paused"}.`);
  };

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
              Each mandate is an on-chain rule set that your agents cannot override.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Sidebar - Active Mandates */}
            <div className="space-y-6">
              <h3 className="font-display uppercase text-sm tracking-widest text-white/40">
                Active Mandates
              </h3>

              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="w-6 h-6 border-2 border-white/20 border-t-neon-lime rounded-full animate-spin" />
                </div>
              ) : mandates.length === 0 ? (
                <div className="glass-card rounded-2xl p-6 border-l-4 border-l-white/10">
                  <p className="text-xs font-mono-tech text-white/40">
                    No mandates yet. Create your first one to enable agent spending.
                  </p>
                </div>
              ) : (
                mandates.map((mandate) => (
                  <div
                    key={mandate.id}
                    className={`glass-card rounded-2xl p-6 border-l-4 cursor-pointer ${
                      mandate.status === "active" ? "border-l-neon-lime" : "border-l-white/20"
                    }`}
                    onClick={() => toggleMandateStatus(mandate.id, mandate.status)}
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
                      <span className="text-[8px] font-mono-tech text-white/20">Click to toggle</span>
                    </div>
                    <h4 className="font-display uppercase text-lg mb-3">{mandate.mandate_name}</h4>
                    <div className="flex justify-between text-xs font-mono-tech mb-2">
                      <span className="text-white/40 uppercase">Usage</span>
                      <span>${Number(mandate.spent).toFixed(2)} / ${Number(mandate.spending_limit).toFixed(2)}</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${mandate.status === "active" ? "bg-neon-lime" : "bg-white/20"}`}
                        style={{ width: `${Math.min((Number(mandate.spent) / Number(mandate.spending_limit)) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Main Config Area */}
            <div className="lg:col-span-2">
              <div className="glass-card rounded-3xl p-8 border-white/10">
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
                    Secure
                  </div>
                </div>

                <div className="space-y-8">
                  {/* Mandate Name */}
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-white/50 ml-1">
                      Mandate Name
                    </label>
                    <input
                      type="text"
                      value={mandateName}
                      onChange={(e) => setMandateName(e.target.value)}
                      placeholder="e.g. Concierge-AI-Budget"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-neon-lime focus:bg-white/10 transition-all font-mono-tech text-sm placeholder:opacity-30"
                    />
                  </div>

                  {/* Spending Limit */}
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-white/50 ml-1">
                      Spending Limit (USDC)
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min={10}
                        max={5000}
                        step={10}
                        value={spendingLimit}
                        onChange={(e) => setSpendingLimit(Number(e.target.value))}
                        className="flex-1 accent-neon-lime h-1"
                      />
                      <div className="glass-card px-4 py-2 rounded-xl font-mono-tech text-sm min-w-[100px] text-center">
                        ${spendingLimit.toFixed(2)}
                      </div>
                    </div>
                    <p className="text-[10px] font-mono-tech text-white/30 ml-1">MAX $5,000</p>
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
                      Transaction Limit (per-tx MFA threshold)
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min={10}
                        max={1000}
                        step={10}
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
                    </div>

                    {/* Add merchant input */}
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={newDomain}
                        onChange={(e) => setNewDomain(e.target.value)}
                        placeholder="domain.com"
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-neon-cyan transition-all font-mono-tech text-sm placeholder:opacity-30"
                      />
                      <input
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="Category"
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-neon-cyan transition-all font-mono-tech text-sm placeholder:opacity-30"
                      />
                      <button
                        onClick={addMerchant}
                        className="px-4 py-2 rounded-xl bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30 hover:bg-neon-cyan/20 transition-all"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      {pendingMerchants.map((m) => (
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
                              <p className="text-[10px] text-white/40 uppercase tracking-wider mt-0.5">{m.category}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <span className="text-[10px] font-bold uppercase tracking-widest text-neon-lime block">
                                {m.auto_approved ? "Auto-Approved" : "Requires Approval"}
                              </span>
                              <span className="text-[10px] text-white/30 uppercase">
                                {m.mfa_required ? "MFA Enabled" : "No MFA Required"}
                              </span>
                            </div>
                            <button
                              onClick={() => removeMerchant(m.domain)}
                              className="p-1 text-white/20 hover:text-red-400 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/5">
                    <button
                      onClick={() => {
                        setMandateName("");
                        setSpendingLimit(500);
                        setTxLimit(100);
                        setTimeWindow("24h");
                        setVerificationMode("strict");
                      }}
                      className="flex-1 py-4 border border-white/10 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-white/5 transition-colors"
                    >
                      Discard Changes
                    </button>
                    <button
                      onClick={deployMandate}
                      disabled={deploying}
                      className="flex-1 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-xs uppercase tracking-widest hover:scale-[1.02] transition-transform disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {deploying ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        "Deploy Mandate to On-Chain Wallet"
                      )}
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
