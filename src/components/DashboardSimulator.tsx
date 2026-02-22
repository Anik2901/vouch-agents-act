import { Wallet, ShieldCheck, Bot, Activity, ExternalLink, RefreshCw } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const statusCards = [
  {
    label: "Protocol Balance",
    value: "$14,250.00",
    subtitle: "USDC / BASE Network",
    icon: Wallet,
    color: "cyan" as const,
  },
  {
    label: "Identity Score",
    value: "98.4/100",
    subtitle: "Elite Reputation Level",
    icon: ShieldCheck,
    color: "magenta" as const,
  },
  {
    label: "Active Agents",
    value: "12",
    subtitle: "Across 4 Active Mandates",
    icon: Bot,
    color: "lime" as const,
  },
  {
    label: "System Health",
    value: "OPERATIONAL",
    subtitle: "LATENCY: 42ms  •  RELAY: B-09",
    icon: Activity,
    color: "cyan" as const,
    pulse: true,
  },
];

const transactions = [
  { agent: "TravelAgent-v2.0", address: "0x7a9...f82e", action: "Marriott_BKN_4291", amount: "$245.00", status: "Settled" },
  { agent: "DataMiner_PRO", address: "0x12c...881c", action: "OpenAI_CREDITS_REF", amount: "$12.50", status: "Settled" },
  { agent: "ShopBot_α", address: "0x9b1...4401", action: "Inventory_Sync_REQ", amount: "$0.00", status: "Authorized" },
];

const colorMap = {
  cyan: "text-neon-cyan",
  magenta: "text-neon-magenta",
  lime: "text-neon-lime",
};

const DashboardSimulator = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-32 px-6 relative" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12"
        >
          <div>
            <span className="font-mono-tech text-[10px] tracking-[0.3em] uppercase text-white/40 font-bold block mb-2">
              Live Preview
            </span>
            <h2 className="text-4xl md:text-5xl font-display uppercase tracking-tighter">
              Command Center
            </h2>
            <p className="text-white/40 font-mono-tech mt-2 max-w-lg text-sm">
              Real-time cryptographic monitoring of your global verified agent workforce.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-widest font-bold text-white/40 border border-white/10 rounded-xl px-4 py-2 hover:border-neon-cyan/30 hover:text-neon-cyan transition-all"
          >
            <RefreshCw className="w-3 h-3" /> Sync Global State
          </motion.button>
        </motion.div>

        {/* Status Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statusCards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono-tech uppercase tracking-widest text-white/40 font-bold">
                  {card.label}
                </span>
                <card.icon className={`w-4 h-4 ${colorMap[card.color]}`} />
              </div>
              <div className={`text-2xl md:text-3xl font-display ${card.pulse ? colorMap[card.color] : ""}`}>
                {card.value}
              </div>
              <div className="flex items-center gap-2 mt-2">
                {card.pulse && (
                  <span className="w-2 h-2 rounded-full bg-neon-lime animate-pulse-glow" />
                )}
                <span className="text-[10px] font-mono-tech uppercase tracking-wider text-white/30">
                  {card.subtitle}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Transaction Table + Sparkline */}
        <div className="grid lg:grid-cols-[2fr_1fr] gap-4">
          {/* Transaction Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
            className="glass-card rounded-2xl p-6 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display uppercase text-lg">Real-time Transactions</h3>
              <a href="#" className="text-[10px] font-mono-tech uppercase tracking-widest text-neon-cyan flex items-center gap-1 hover:underline">
                Explorer <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="pb-3 text-[10px] font-mono-tech uppercase tracking-widest text-white/30 font-bold">Agent Reference</th>
                    <th className="pb-3 text-[10px] font-mono-tech uppercase tracking-widest text-white/30 font-bold">Action Sequence</th>
                    <th className="pb-3 text-[10px] font-mono-tech uppercase tracking-widest text-white/30 font-bold">Volume</th>
                    <th className="pb-3 text-[10px] font-mono-tech uppercase tracking-widest text-white/30 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx, i) => (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
                      className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="py-4">
                        <div className="font-mono-tech text-sm font-bold">{tx.agent}</div>
                        <div className="text-[10px] text-white/30 font-mono-tech">{tx.address}</div>
                      </td>
                      <td className="py-4 font-mono-tech text-xs text-white/50">{tx.action}</td>
                      <td className="py-4 font-mono-tech text-sm font-bold">{tx.amount}</td>
                      <td className="py-4">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${
                          tx.status === "Settled" 
                            ? "bg-neon-lime/10 text-neon-lime" 
                            : "bg-neon-cyan/10 text-neon-cyan"
                        }`}>
                          {tx.status}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Spend Velocity Sparkline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display uppercase text-lg">Spend Velocity</h3>
              <div className="flex gap-2">
                <span className="w-2 h-2 rounded-full bg-neon-cyan" />
                <span className="w-2 h-2 rounded-full bg-neon-magenta" />
              </div>
            </div>

            {/* SVG Sparkline */}
            <div className="relative h-48">
              <svg viewBox="0 0 300 120" className="w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="sparkline-gradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="hsl(186, 100%, 50%)" />
                    <stop offset="100%" stopColor="hsl(310, 100%, 50%)" />
                  </linearGradient>
                  <linearGradient id="sparkline-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(186, 100%, 50%)" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="hsl(186, 100%, 50%)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Grid lines */}
                {[0, 30, 60, 90, 120].map((y) => (
                  <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                ))}
                {/* Fill area */}
                <motion.path
                  d="M0,80 Q30,70 50,60 T100,45 T150,55 T200,30 T250,40 T300,20 L300,120 L0,120 Z"
                  fill="url(#sparkline-fill)"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
                {/* Line */}
                <motion.path
                  d="M0,80 Q30,70 50,60 T100,45 T150,55 T200,30 T250,40 T300,20"
                  fill="none"
                  stroke="url(#sparkline-gradient)"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
                />
                {/* Current point */}
                <motion.circle
                  cx="300"
                  cy="20"
                  r="4"
                  fill="hsl(310, 100%, 50%)"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 1.5 }}
                />
              </svg>
            </div>

            {/* Day labels */}
            <div className="flex justify-between mt-2 text-[10px] font-mono-tech text-white/20 uppercase">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DashboardSimulator;
