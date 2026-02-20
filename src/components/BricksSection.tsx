import { Fingerprint, Lock, Zap, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const BricksSection = () => {
  const bricks = [
    {
      icon: Fingerprint,
      title: "Fob Passport",
      description:
        "Cryptographic identity verification for agents. Uses W3C Verifiable Credentials to prove origin, owner, and compliance without sacrificing privacy.",
      features: ["ZK-Proof Identity", "Multi-chain DIDs"],
      color: "cyan" as const,
    },
    {
      icon: Lock,
      title: "AP2 Mandates",
      description:
        "Spending controls that live on-chain. Set budgets, whitelisted merchants, and transaction limits that agents cannot override.",
      features: ["Protocol-level Escrow", "Time-locked Auth"],
      color: "magenta" as const,
    },
    {
      icon: Zap,
      title: "MCP Protocol",
      description:
        "The Model Context Protocol bridge. 3 lines of code to give your LLM agent a USDC wallet on Base. Zero friction commerce.",
      features: ["One-click SDK", "USDC/Base Settlement"],
      color: "lime" as const,
    },
  ];

  const colorClasses = {
    cyan: {
      bg: "bg-neon-cyan/10",
      border: "border-neon-cyan/30",
      hoverBg: "group-hover:bg-neon-cyan",
      text: "text-neon-cyan",
      neonBorder: "neon-border-cyan",
    },
    magenta: {
      bg: "bg-neon-magenta/10",
      border: "border-neon-magenta/30",
      hoverBg: "group-hover:bg-neon-magenta",
      text: "text-neon-magenta",
      neonBorder: "neon-border-magenta",
    },
    lime: {
      bg: "bg-neon-lime/10",
      border: "border-neon-lime/30",
      hoverBg: "group-hover:bg-neon-lime",
      text: "text-neon-lime",
      neonBorder: "neon-border-lime",
    },
  };

  return (
    <section id="bricks" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-display uppercase mb-4">
            The Three Bricks
          </h2>
          <p className="text-white/40 font-mono-tech max-w-xl">
            A complete infrastructure stack for the agentic economy.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {bricks.map((brick, index) => {
            const colors = colorClasses[brick.color];
            return (
              <motion.div
                key={brick.title}
                initial={{ opacity: 0, y: 60, rotateX: 8 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className={`glass-card rounded-3xl p-8 ${colors.neonBorder} group cursor-default`}
                style={{ transformPerspective: 800 }}
              >
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
                  className={`w-14 h-14 rounded-2xl ${colors.bg} flex items-center justify-center mb-8 border ${colors.border} ${colors.hoverBg} group-hover:text-black transition-all`}
                >
                  <brick.icon className="w-7 h-7" />
                </motion.div>
                <h3 className="text-2xl font-display uppercase mb-4">
                  {brick.title}
                </h3>
                <p className="text-white/60 mb-8 leading-relaxed">
                  {brick.description}
                </p>
                <div className="pt-4 border-t border-white/10">
                  <ul className="space-y-3 text-sm font-mono-tech">
                    {brick.features.map((feature, idx) => (
                      <li
                        key={feature}
                        className={`flex items-center gap-2 ${
                          idx === 0 ? colors.text : "opacity-60"
                        }`}
                      >
                        <CheckCircle className="w-4 h-4" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BricksSection;
