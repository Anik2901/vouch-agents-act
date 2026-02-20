import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative pt-44 pb-24 px-6">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 -z-10 opacity-60">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,242,255,0.1)_0%,rgba(255,0,229,0.05)_30%,transparent_70%)] animate-move-gradient" />
      </div>

      <div className="max-w-6xl mx-auto text-center">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse-glow" />
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-70">
            The Protocol for Autonomous Commerce
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-6xl md:text-8xl lg:text-9xl font-display uppercase leading-none tracking-tighter mb-8"
        >
          Agents that <br />
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-lime inline-block"
          >
            ACT.
          </motion.span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-white/60 mb-12 font-mono-tech leading-relaxed"
        >
          Fob provides the missing trust layer for AI. Identity verification via{" "}
          <span className="text-neon-cyan">Passport</span>, spending guardrails via{" "}
          <span className="text-neon-magenta">Mandates</span>, and seamless payments through{" "}
          <span className="text-neon-lime">MCP</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <a href="#docs" className="btn-primary group">
            <span>Initialize Integration</span>
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#schema" className="btn-secondary">
            View Protocol Schema
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
