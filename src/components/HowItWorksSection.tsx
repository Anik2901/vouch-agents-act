import { Fingerprint, Shield, Zap, ArrowRight, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const steps = [
  {
    number: "01",
    icon: Fingerprint,
    title: "Verify Identity",
    subtitle: "Fob Passport",
    description:
      "Agents and users undergo cryptographic identity verification. A W3C Verifiable Credential is anchored on-chain, creating a tamper-proof digital identity.",
    detail: "DID anchored on Base → Identity Score computed → Passport issued",
    color: "cyan" as const,
    href: "/verify",
  },
  {
    number: "02",
    icon: Lock,
    title: "Set Guardrails",
    subtitle: "Mandates",
    description:
      "Define spending limits, merchant whitelists, and time windows. These on-chain rules govern what agents can do — protocol-level control, not promises.",
    detail: "Budget cap → Merchant whitelist → Time window → Tx limits",
    color: "magenta" as const,
    href: "/mandates",
  },
  {
    number: "03",
    icon: Shield,
    title: "Integrate SDK",
    subtitle: "MCP Bridge",
    description:
      "Connect your AI agent via the Model Context Protocol. Three lines of code gives your LLM a compliant USDC wallet with full mandate enforcement.",
    detail: "Install SDK → Configure MCP → Agent transacts autonomously",
    color: "lime" as const,
    href: "/sdk",
  },
  {
    number: "04",
    icon: Zap,
    title: "Transact",
    subtitle: "Settlement",
    description:
      "Agents execute payments within their mandates. Every transaction is validated against rules before settlement in USDC on Base L2.",
    detail: "Mandate check → Merchant verify → USDC settle → Receipt",
    color: "cyan" as const,
    href: "/dashboard",
  },
];

const colorMap = {
  cyan: {
    text: "text-neon-cyan",
    bg: "bg-neon-cyan/10",
    border: "border-neon-cyan/20",
    glow: "shadow-[0_0_30px_-10px_hsl(var(--neon-cyan))]",
    line: "bg-neon-cyan",
  },
  magenta: {
    text: "text-neon-magenta",
    bg: "bg-neon-magenta/10",
    border: "border-neon-magenta/20",
    glow: "shadow-[0_0_30px_-10px_hsl(var(--neon-magenta))]",
    line: "bg-neon-magenta",
  },
  lime: {
    text: "text-neon-lime",
    bg: "bg-neon-lime/10",
    border: "border-neon-lime/20",
    glow: "shadow-[0_0_30px_-10px_hsl(var(--neon-lime))]",
    line: "bg-neon-lime",
  },
};

const HowItWorksSection = () => {
  return (
    <section className="py-32 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24"
        >
          <span className="font-mono-tech text-[10px] tracking-[0.3em] uppercase text-white/40 font-bold block mb-4">
            Protocol Flow
          </span>
          <h2 className="text-4xl md:text-6xl font-display uppercase tracking-tighter">
            How It{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-magenta">
              Works
            </span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-[39px] top-0 bottom-0 w-px bg-gradient-to-b from-neon-cyan/20 via-neon-magenta/20 to-neon-lime/20 hidden md:block" />

          <div className="space-y-16 md:space-y-24">
            {steps.map((step, index) => {
              const colors = colorMap[step.color];
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex gap-8 md:gap-12 items-start"
                >
                  {/* Step indicator */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: 0.2,
                      type: "spring",
                      stiffness: 200,
                    }}
                    className={`shrink-0 w-20 h-20 rounded-2xl ${colors.bg} border ${colors.border} flex flex-col items-center justify-center relative`}
                  >
                    <span className={`text-2xl font-display ${colors.text}`}>
                      {step.number}
                    </span>
                    {/* Pulse dot */}
                    <span
                      className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${colors.line} animate-pulse-glow`}
                    />
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1">
                    <span
                      className={`${colors.text} font-mono-tech text-[10px] tracking-[0.3em] uppercase font-bold block mb-2`}
                    >
                      {step.subtitle}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-display uppercase mb-4">
                      {step.title}
                    </h3>
                    <p className="text-white/50 leading-relaxed mb-4 max-w-xl">
                      {step.description}
                    </p>

                    {/* Technical flow */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.02] border border-white/5 font-mono-tech text-[10px] tracking-wider text-white/30"
                    >
                      {step.detail}
                    </motion.div>

                    <div className="mt-6">
                      <Link
                        to={step.href}
                        className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${colors.text} hover:underline underline-offset-4 transition-all group`}
                      >
                        Learn More
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
