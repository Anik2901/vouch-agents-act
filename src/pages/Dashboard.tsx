import { useEffect, useState } from "react";
import { Wallet, Fingerprint, Cpu, TrendingUp, ShieldCheck, Activity, Copy, PlusCircle, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Scanline from "@/components/Scanline";

interface Profile {
  full_name: string | null;
  kyc_status: string | null;
  identity_score: number | null;
  wallet_address: string | null;
  did_identifier: string | null;
}

interface Agent {
  id: string;
  agent_name: string;
  agent_code: string;
  status: string;
  tasks_processed: number;
}

interface Transaction {
  id: string;
  merchant: string;
  amount: number;
  status: string;
  currency: string;
  created_at: string;
  agent_id: string | null;
  agents?: { agent_name: string; agent_code: string } | null;
}

interface Mandate {
  id: string;
  mandate_name: string;
  spending_limit: number;
  spent: number;
  status: string;
}

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [mandates, setMandates] = useState<Mandate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) fetchData();
  }, [user]);

  const fetchData = async () => {
    setLoading(true);
    const [profileRes, agentsRes, txRes, mandatesRes] = await Promise.all([
      supabase.from("profiles").select("*").eq("user_id", user!.id).single(),
      supabase.from("agents").select("*").eq("user_id", user!.id).order("created_at", { ascending: false }),
      supabase.from("transactions").select("*, agents(agent_name, agent_code)").eq("user_id", user!.id).order("created_at", { ascending: false }).limit(10),
      supabase.from("mandates").select("*").eq("user_id", user!.id).order("created_at", { ascending: false }),
    ]);

    if (profileRes.data) setProfile(profileRes.data);
    if (agentsRes.data) setAgents(agentsRes.data);
    if (txRes.data) setTransactions(txRes.data as Transaction[]);
    if (mandatesRes.data) setMandates(mandatesRes.data);
    setLoading(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const totalBalance = transactions
    .filter((t) => t.status === "settled")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const colorClasses = {
    cyan: { bg: "bg-neon-cyan/10", text: "text-neon-cyan", border: "border-l-neon-cyan" },
    magenta: { bg: "bg-neon-magenta/10", text: "text-neon-magenta", border: "border-l-neon-magenta" },
    lime: { bg: "bg-neon-lime/10", text: "text-neon-lime", border: "border-l-neon-lime" },
  };

  const statusClasses: Record<string, string> = {
    settled: "bg-neon-lime/10 text-neon-lime",
    pending: "bg-neon-cyan/10 text-neon-cyan",
    flagged: "bg-red-400/10 text-red-400",
    rejected: "bg-red-400/10 text-red-400",
  };

  const chartBars = [40, 75, 60, 45, 90, 30, 80, 65, 55, 100, 70, 85];

  return (
    <div className="min-h-screen grid-bg relative overflow-hidden">
      <Scanline />
      <Navbar />

      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <span className="text-neon-cyan font-mono-tech text-xs tracking-widest uppercase font-bold">
              {profile?.kyc_status === "verified" ? "System Status: Verified" : "System Status: Active"}
            </span>
            <h1 className="text-4xl md:text-5xl font-display uppercase tracking-tight">
              Agent Command <span className="text-white/40">Center</span>
            </h1>
            {user && (
              <p className="text-xs font-mono-tech text-white/40">
                {user.email}
              </p>
            )}
          </div>
          <div className="flex gap-4 items-center">
            <div className="glass-card px-4 py-2 rounded-xl flex items-center gap-3 font-mono-tech text-sm">
              <div className="w-2 h-2 rounded-full bg-neon-lime animate-pulse" />
              <span className="opacity-60 uppercase text-xs">Base Network</span>
            </div>
            <button
              onClick={handleSignOut}
              className="glass-card px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors"
            >
              <LogOut className="w-3 h-3" /> Sign Out
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-white/20 border-t-neon-cyan rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className={`glass-card p-6 rounded-3xl border-l-4 ${colorClasses.cyan.border}`}>
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl ${colorClasses.cyan.bg} ${colorClasses.cyan.text}`}>
                    <Wallet className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono-tech text-white/30 uppercase">Settled Volume</span>
                </div>
                <div>
                  <span className="text-3xl font-display">{totalBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>{" "}
                  <span className="text-sm font-bold text-neon-cyan">USDC</span>
                </div>
                <p className="text-xs text-white/40 mt-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-neon-cyan" />
                  {transactions.length} transactions total
                </p>
              </div>

              <div className={`glass-card p-6 rounded-3xl border-l-4 ${colorClasses.magenta.border}`}>
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl ${colorClasses.magenta.bg} ${colorClasses.magenta.text}`}>
                    <Fingerprint className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono-tech text-white/30 uppercase">Identity Score</span>
                </div>
                <div>
                  <span className="text-3xl font-display">{profile?.identity_score ?? 0}</span>{" "}
                  <span className="text-sm font-bold text-neon-magenta">/ 100</span>
                </div>
                <p className="text-xs text-white/40 mt-4 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-neon-magenta" />
                  {profile?.kyc_status === "verified" ? "W3C Passport Verified" : "Verification Required"}
                </p>
              </div>

              <div className={`glass-card p-6 rounded-3xl border-l-4 ${colorClasses.lime.border}`}>
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl ${colorClasses.lime.bg} ${colorClasses.lime.text}`}>
                    <Cpu className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono-tech text-white/30 uppercase">Active Agents</span>
                </div>
                <div>
                  <span className="text-3xl font-display">{agents.filter((a) => a.status === "active").length}</span>{" "}
                  <span className="text-sm text-white/40">/ {agents.length} total</span>
                </div>
                <p className="text-xs text-white/40 mt-4 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-neon-lime" />
                  {agents.reduce((acc, a) => acc + a.tasks_processed, 0).toLocaleString()} tasks processed
                </p>
              </div>
            </div>

            {/* Main Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {/* Transaction History */}
                <div className="glass-card rounded-3xl overflow-hidden">
                  <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <h3 className="font-display uppercase tracking-wider">Transaction History</h3>
                  </div>
                  <div className="overflow-x-auto">
                    {transactions.length === 0 ? (
                      <div className="p-12 text-center">
                        <p className="text-white/40 font-mono-tech text-sm">No transactions yet. Deploy an agent and create a mandate to get started.</p>
                      </div>
                    ) : (
                      <table className="w-full text-left font-mono-tech text-xs">
                        <thead className="bg-white/[0.02] border-b border-white/5 text-white/40">
                          <tr>
                            <th className="px-6 py-4 uppercase">Agent</th>
                            <th className="px-6 py-4 uppercase">Merchant</th>
                            <th className="px-6 py-4 uppercase">Status</th>
                            <th className="px-6 py-4 uppercase">Amount</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {transactions.map((tx) => (
                            <tr key={tx.id} className="hover:bg-white/[0.01] transition-colors">
                              <td className="px-6 py-4">
                                <span>{tx.agents?.agent_name ?? "—"}</span>
                              </td>
                              <td className="px-6 py-4">{tx.merchant}</td>
                              <td className="px-6 py-4">
                                <span className={`px-2 py-1 rounded-full capitalize ${statusClasses[tx.status] || ""}`}>
                                  {tx.status}
                                </span>
                              </td>
                              <td className={`px-6 py-4 font-bold ${tx.status === "flagged" ? "text-white/30" : ""}`}>
                                {Number(tx.amount).toFixed(2)} {tx.currency}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>

                {/* Network Activity Chart */}
                <div className="glass-card rounded-3xl p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="font-display uppercase tracking-wider">Network Activity</h3>
                    <div className="flex items-center gap-4 text-[10px] font-bold uppercase">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-neon-cyan" /> Settlements
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-neon-magenta" /> Intents
                      </div>
                    </div>
                  </div>
                  <div className="h-48 w-full flex items-end gap-2 px-2">
                    {chartBars.map((height, idx) => (
                      <div
                        key={idx}
                        className={`w-full ${idx % 2 === 0 ? "bg-neon-cyan/20" : "bg-neon-magenta/20"} rounded-t-lg transition-all hover:opacity-80`}
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between mt-4 text-[10px] font-mono-tech opacity-30 uppercase">
                    <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>Now</span>
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-8">
                {/* Active Mandates */}
                <div className="glass-card rounded-3xl p-6 border-l-4 border-l-neon-lime">
                  <div className="flex items-center gap-3 mb-6">
                    <Activity className="w-5 h-5 text-neon-lime" />
                    <h3 className="font-display uppercase text-sm tracking-widest">Active Mandates</h3>
                  </div>
                  {mandates.length === 0 ? (
                    <p className="text-xs text-white/40 font-mono-tech">No mandates configured yet.</p>
                  ) : (
                    <div className="space-y-6">
                      {mandates.slice(0, 3).map((mandate) => (
                        <div key={mandate.id} className="space-y-2">
                          <div className="flex justify-between text-xs font-mono-tech">
                            <span className="opacity-60 uppercase">{mandate.mandate_name}</span>
                            <span>${Number(mandate.spent).toFixed(0)} / ${Number(mandate.spending_limit).toFixed(0)}</span>
                          </div>
                          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-neon-lime"
                              style={{ width: `${Math.min((Number(mandate.spent) / Number(mandate.spending_limit)) * 100, 100)}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <Link
                    to="/mandates"
                    className="mt-8 w-full block text-center py-3 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-colors"
                  >
                    Manage Mandates
                  </Link>
                </div>

                {/* Deploy New Agent */}
                <div className="glass-card rounded-3xl p-6 bg-gradient-to-br from-neon-cyan/10 to-transparent">
                  <div className="flex items-center gap-3 mb-4">
                    <PlusCircle className="w-5 h-5 text-neon-cyan" />
                    <h3 className="font-display uppercase text-sm tracking-widest">Deploy New Agent</h3>
                  </div>
                  <p className="text-xs text-white/50 leading-relaxed mb-6 font-mono-tech">
                    Connect your MCP server to authorize a new autonomous instance with verified credentials.
                  </p>
                  <Link
                    to="/sdk"
                    className="w-full bg-primary text-primary-foreground py-3 rounded-xl text-center font-bold text-xs uppercase tracking-widest hover:scale-[1.02] transition-transform block"
                  >
                    View Integration Guide
                  </Link>
                </div>

                {/* Developer Keys */}
                <div className="glass-card rounded-3xl p-6">
                  <h3 className="font-display uppercase text-xs tracking-[0.2em] mb-4 opacity-40">
                    Developer Keys
                  </h3>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/5 font-mono-tech text-[10px]">
                    <span className="text-white/40">sk_live_fob_...{user?.id.slice(-4)}</span>
                    <Copy
                      className="w-4 h-4 cursor-pointer hover:text-white transition-colors"
                      onClick={() => {
                        toast.success("API key copied to clipboard");
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
