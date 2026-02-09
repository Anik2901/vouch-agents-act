import { Bell, Wallet, Fingerprint, Cpu, TrendingUp, ShieldCheck, Activity, Copy, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Scanline from "@/components/Scanline";

const Dashboard = () => {
  const statsCards = [
    {
      icon: Wallet,
      label: "Main Wallet",
      value: "14,250.00",
      unit: "USDC",
      subtext: "+12% from last epoch",
      subIcon: TrendingUp,
      color: "cyan" as const,
    },
    {
      icon: Fingerprint,
      label: "Identity Score",
      value: "98.4",
      unit: "/ 100",
      subtext: "W3C Passport Verified",
      subIcon: ShieldCheck,
      color: "magenta" as const,
    },
    {
      icon: Cpu,
      label: "Active Agents",
      value: "12",
      unit: "Instances",
      subtext: "2,408 Tasks Processed",
      subIcon: Activity,
      color: "lime" as const,
    },
  ];

  const transactions = [
    { id: "A1", name: "Alpha-09", merchant: "CloudCompute Instance-X4", status: "Settled", amount: "42.00", color: "cyan" },
    { id: "B2", name: "Beta-22", merchant: "Marriott Intl (Intent #482)", status: "Pending", amount: "295.00", color: "magenta" },
    { id: "C8", name: "Gamma-01", merchant: "API Marketplace", status: "Settled", amount: "12.50", color: "lime" },
    { id: "A1", name: "Alpha-09", merchant: "OpenAI Credits", status: "Flagged", amount: "50.00", color: "cyan" },
  ];

  const mandates = [
    { label: "Compute Budget", current: 840, max: 1000, color: "bg-neon-lime" },
    { label: "Travel & Logistics", current: 295, max: 500, color: "bg-neon-magenta" },
    { label: "API Subscriptions", current: 12, max: 50, color: "bg-neon-cyan" },
  ];

  const chartBars = [40, 75, 60, 45, 90, 30, 80, 65, 55, 100, 70, 85];

  const colorClasses = {
    cyan: { bg: "bg-neon-cyan/10", text: "text-neon-cyan", border: "border-l-neon-cyan" },
    magenta: { bg: "bg-neon-magenta/10", text: "text-neon-magenta", border: "border-l-neon-magenta" },
    lime: { bg: "bg-neon-lime/10", text: "text-neon-lime", border: "border-l-neon-lime" },
  };

  const statusClasses: Record<string, string> = {
    Settled: "bg-neon-lime/10 text-neon-lime",
    Pending: "bg-neon-cyan/10 text-neon-cyan",
    Flagged: "bg-red-400/10 text-red-400",
  };

  return (
    <div className="min-h-screen grid-bg relative overflow-hidden">
      <Scanline />
      <Navbar />

      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <span className="text-neon-cyan font-mono-tech text-xs tracking-widest uppercase font-bold">
              System Status: Active
            </span>
            <h1 className="text-4xl md:text-5xl font-display uppercase tracking-tight">
              Agent Command <span className="text-white/40">Center</span>
            </h1>
          </div>
          <div className="flex gap-4 font-mono-tech text-sm">
            <div className="glass-card px-4 py-2 rounded-xl flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-neon-lime animate-pulse" />
              <span className="opacity-60 uppercase">Base Network</span>
              <span className="font-bold text-neon-lime">0.002s latency</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {statsCards.map((card) => {
            const colors = colorClasses[card.color];
            return (
              <div
                key={card.label}
                className={`glass-card p-6 rounded-3xl group border-l-4 ${colors.border}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl ${colors.bg} ${colors.text}`}>
                    <card.icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono-tech text-white/30 uppercase">{card.label}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-3xl font-display">{card.value}</span>{" "}
                  <span className={`text-sm font-bold ${card.color === "lime" ? "text-white/40" : colors.text}`}>
                    {card.unit}
                  </span>
                </div>
                <p className="text-xs text-white/40 mt-4 flex items-center gap-2">
                  <card.subIcon className={`w-4 h-4 ${colors.text}`} />
                  {card.subtext}
                </p>
              </div>
            );
          })}
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Transaction History */}
            <div className="glass-card rounded-3xl overflow-hidden">
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <h3 className="font-display uppercase tracking-wider">Transaction History</h3>
                <button className="px-3 py-1 text-[10px] font-bold uppercase rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  Export CSV
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono-tech text-xs">
                  <thead className="bg-white/[0.02] border-b border-white/5 text-white/40">
                    <tr>
                      <th className="px-6 py-4 uppercase">Agent ID</th>
                      <th className="px-6 py-4 uppercase">Merchant / Intent</th>
                      <th className="px-6 py-4 uppercase">Status</th>
                      <th className="px-6 py-4 uppercase">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {transactions.map((tx, idx) => (
                      <tr key={idx} className="hover:bg-white/[0.01] transition-colors">
                        <td className="px-6 py-4 flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg ${colorClasses[tx.color as keyof typeof colorClasses].bg} flex items-center justify-center ${colorClasses[tx.color as keyof typeof colorClasses].text} font-bold`}>
                            {tx.id}
                          </div>
                          <span>{tx.name}</span>
                        </td>
                        <td className="px-6 py-4">{tx.merchant}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full ${statusClasses[tx.status]}`}>
                            {tx.status}
                          </span>
                        </td>
                        <td className={`px-6 py-4 font-bold ${tx.status === "Flagged" ? "text-white/30" : ""}`}>
                          {tx.amount} USDC
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
                    className={`w-full ${idx % 2 === 0 ? "bg-neon-cyan/20" : "bg-neon-magenta/20"} rounded-t-lg relative group transition-all hover:opacity-80`}
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-4 text-[10px] font-mono-tech opacity-30 uppercase">
                <span>00:00</span>
                <span>06:00</span>
                <span>12:00</span>
                <span>18:00</span>
                <span>Now</span>
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
              <div className="space-y-6">
                {mandates.map((mandate) => (
                  <div key={mandate.label} className="space-y-2">
                    <div className="flex justify-between text-xs font-mono-tech">
                      <span className="opacity-60 uppercase">{mandate.label}</span>
                      <span>${mandate.current} / ${mandate.max}</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${mandate.color}`}
                        style={{ width: `${(mandate.current / mandate.max) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="#"
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
                Spawn Instance
              </Link>
            </div>

            {/* Developer Keys */}
            <div className="glass-card rounded-3xl p-6">
              <h3 className="font-display uppercase text-xs tracking-[0.2em] mb-4 opacity-40">
                Developer Keys
              </h3>
              <div className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/5 font-mono-tech text-[10px]">
                <span className="text-white/40">sk_live_fob_...4a2b</span>
                <Copy className="w-4 h-4 cursor-pointer hover:text-white transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
