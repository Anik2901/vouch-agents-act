import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Camera, Lock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  { number: "01", label: "Connection", active: true },
  { number: "02", label: "ID Proof", active: false },
  { number: "03", label: "Biometrics", active: false },
  { number: "04", label: "Issuance", active: false },
];

const IdentityPortalPreview = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-32 px-6 relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          className="text-center mb-16"
        >
          <span className="font-mono-tech text-[10px] tracking-[0.3em] uppercase text-white/40 font-bold block mb-4">
            Verification Flow
          </span>
          <h2 className="text-4xl md:text-6xl font-display uppercase tracking-tighter">
            Identity Portal
          </h2>
          <p className="text-white/40 font-mono-tech mt-3 max-w-lg mx-auto text-sm">
            Establish persistent, non-custodial Human-in-the-Loop credentials.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="glass-card rounded-3xl p-8 md:p-12 border-white/10"
        >
          {/* Stepper */}
          <div className="flex items-center justify-center gap-4 md:gap-8 mb-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono-tech font-bold uppercase tracking-wider ${
                  step.active 
                    ? "border-neon-cyan/40 text-neon-cyan bg-neon-cyan/5" 
                    : "border-white/10 text-white/20"
                }`}>
                  <span>{step.number}</span>
                  <span className="hidden md:inline">{step.label}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-8 h-px ${step.active ? "bg-neon-cyan/30" : "bg-white/5"}`} />
                )}
              </motion.div>
            ))}
          </div>

          {/* Content grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Form side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
              className="space-y-6"
            >
              <div>
                <label className="text-[10px] font-mono-tech uppercase tracking-widest text-white/40 font-bold block mb-2">
                  Legal Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your legal name"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-sm font-mono-tech placeholder-white/20 focus:outline-none focus:border-neon-cyan/40 focus:ring-1 focus:ring-neon-cyan/20 transition-all"
                  readOnly
                />
              </div>
              <div>
                <label className="text-[10px] font-mono-tech uppercase tracking-widest text-white/40 font-bold block mb-2">
                  Issuing Jurisdiction
                </label>
                <div className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-sm font-mono-tech text-white/40 flex items-center justify-between">
                  <span>United States</span>
                  <svg className="w-4 h-4 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <Lock className="w-4 h-4 text-neon-cyan shrink-0 mt-0.5" />
                <p className="text-[10px] text-white/30 leading-relaxed">
                  Zero-Knowledge verification via Stripe Identity. Private keys never leave your secure enclave. Verified Hash pinned to BASE Mainnet.
                </p>
              </div>

              <Link
                to="/verify"
                className="btn-cyan w-full justify-center group"
              >
                Initialize Biometric Scan
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Biometric Scanner side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
              className="relative rounded-2xl bg-black/60 border border-white/5 overflow-hidden flex flex-col items-center justify-center min-h-[300px]"
            >
              {/* Scanline */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent absolute animate-scan" />
              </div>

              {/* Camera icon */}
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-20 h-20 rounded-full bg-neon-cyan/5 border border-neon-cyan/20 flex items-center justify-center mb-6"
              >
                <Camera className="w-8 h-8 text-neon-cyan/60" />
              </motion.div>

              <p className="font-mono-tech text-sm text-white/60 font-bold">Camera Initialized</p>
              <p className="font-mono-tech text-[10px] text-white/20 mt-1">Secure P2P Link: ACTIVE</p>

              {/* Corner markers */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-neon-cyan/30 rounded-tl-lg" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-neon-cyan/30 rounded-tr-lg" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-neon-cyan/30 rounded-bl-lg" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-neon-cyan/30 rounded-br-lg" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default IdentityPortalPreview;
