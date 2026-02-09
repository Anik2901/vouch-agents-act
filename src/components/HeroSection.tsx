import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative pt-44 pb-24 px-6">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 -z-10 opacity-60">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,242,255,0.1)_0%,rgba(255,0,229,0.05)_30%,transparent_70%)] animate-move-gradient" />
      </div>

      <div className="max-w-6xl mx-auto text-center">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-8">
          <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse-glow" />
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-70">
            The Protocol for Autonomous Commerce
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-display uppercase leading-none tracking-tighter mb-8">
          Agents that <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-lime">
            ACT.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/60 mb-12 font-mono-tech leading-relaxed">
          Fob provides the missing trust layer for AI. Identity verification via{" "}
          <span className="text-neon-cyan">Passport</span>, spending guardrails via{" "}
          <span className="text-neon-magenta">Mandates</span>, and seamless payments through{" "}
          <span className="text-neon-lime">MCP</span>.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <a href="#docs" className="btn-primary group">
            <span>Initialize Integration</span>
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#schema" className="btn-secondary">
            View Protocol Schema
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
