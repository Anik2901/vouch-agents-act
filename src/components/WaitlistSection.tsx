import { motion, useMotionValue, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { ArrowRight, Zap, Globe, Shield } from "lucide-react";
import { toast } from "sonner";

/* ── Animated Globe (canvas) ── */
const AnimatedGlobe = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    timeRef.current += 0.003;
    const t = timeRef.current;

    ctx.clearRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h / 2;
    const r = Math.min(w, h) * 0.38;

    // Outer glow
    const glow = ctx.createRadialGradient(cx, cy, r * 0.8, cx, cy, r * 1.4);
    glow.addColorStop(0, "rgba(0, 242, 255, 0.06)");
    glow.addColorStop(0.5, "rgba(255, 0, 229, 0.03)");
    glow.addColorStop(1, "transparent");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);

    // Globe outline
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(0, 242, 255, 0.15)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Latitude lines
    for (let i = -3; i <= 3; i++) {
      const lat = (i / 4) * r;
      const rLine = Math.sqrt(r * r - lat * lat);
      ctx.beginPath();
      ctx.ellipse(cx, cy + lat, rLine, rLine * 0.15, 0, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0, 242, 255, ${0.06 + Math.abs(i) * 0.01})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    // Longitude lines (rotating)
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI + t;
      ctx.beginPath();
      const squish = Math.cos(angle);
      ctx.ellipse(cx, cy, Math.abs(squish) * r, r, 0, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0, 242, 255, ${0.04 + Math.abs(squish) * 0.08})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    // Connection dots
    const dots: { x: number; y: number; pulse: number }[] = [];
    const dotCount = 40;
    for (let i = 0; i < dotCount; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / dotCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i + t * 0.5;

      const x3d = r * Math.sin(phi) * Math.cos(theta);
      const y3d = r * Math.cos(phi);
      const z3d = r * Math.sin(phi) * Math.sin(theta);

      if (z3d < -r * 0.1) continue; // behind globe

      const scale = (z3d + r) / (2 * r);
      const sx = cx + x3d;
      const sy = cy + y3d;
      const dotR = 1 + scale * 2;
      const alpha = 0.2 + scale * 0.6;

      const pulse = Math.sin(t * 2 + i) * 0.5 + 0.5;
      dots.push({ x: sx, y: sy, pulse });

      ctx.beginPath();
      ctx.arc(sx, sy, dotR + pulse * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 242, 255, ${alpha * (0.5 + pulse * 0.5)})`;
      ctx.fill();
    }

    // Connection arcs between nearby dots
    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dx = dots[i].x - dots[j].x;
        const dy = dots[i].y - dots[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < r * 0.5 && dist > r * 0.1) {
          ctx.beginPath();
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(dots[j].x, dots[j].y);
          const lineAlpha = (1 - dist / (r * 0.5)) * 0.12;
          ctx.strokeStyle = `rgba(0, 242, 255, ${lineAlpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    // Orbiting ring
    ctx.beginPath();
    ctx.ellipse(cx, cy, r * 1.15, r * 0.25, t * 0.3, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255, 0, 229, 0.08)";
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 8]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Orbiting dot on ring
    const orbX = cx + r * 1.15 * Math.cos(t * 1.5) * Math.cos(t * 0.3) - r * 0.25 * Math.sin(t * 1.5) * Math.sin(t * 0.3);
    const orbY = cy + r * 1.15 * Math.cos(t * 1.5) * Math.sin(t * 0.3) + r * 0.25 * Math.sin(t * 1.5) * Math.cos(t * 0.3);

    ctx.beginPath();
    ctx.arc(orbX, orbY, 3, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 0, 229, 0.8)";
    ctx.fill();

    // Pulse ring around orbiter
    const pulseR = 3 + Math.sin(t * 4) * 4 + 4;
    ctx.beginPath();
    ctx.arc(orbX, orbY, pulseR, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(255, 0, 229, ${0.3 - (pulseR - 3) * 0.03})`;
    ctx.lineWidth = 1;
    ctx.stroke();

    animationRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animationRef.current);
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ width: "100%", height: "100%" }}
    />
  );
};

/* ── Floating particles ── */
const Particle = ({ delay, x, size }: { delay: number; x: number; size: number }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      left: `${x}%`,
      width: size,
      height: size,
      background: `radial-gradient(circle, rgba(0,242,255,0.4), transparent)`,
    }}
    initial={{ bottom: "-5%", opacity: 0 }}
    animate={{
      bottom: ["0%", "100%"],
      opacity: [0, 0.6, 0],
      x: [0, Math.sin(x) * 30, 0],
    }}
    transition={{
      duration: 8 + delay * 2,
      delay,
      repeat: Infinity,
      ease: "linear",
    }}
  />
);

/* ── Main Section ── */
const WaitlistSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
    toast.success("You're on the list. We'll reach out soon.");
  };

  const stats = [
    { icon: Globe, label: "Countries", value: "140+" },
    { icon: Zap, label: "Agents Queued", value: "12K+" },
    { icon: Shield, label: "Protocols", value: "3" },
  ];

  return (
    <section ref={ref} className="relative py-32 px-6 overflow-hidden">
      {/* Background particles */}
      {[...Array(12)].map((_, i) => (
        <Particle key={i} delay={i * 0.8} x={8 + (i * 7.5) % 85} size={2 + (i % 3)} />
      ))}

      {/* Radial glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(0,242,255,0.08)_0%,rgba(255,0,229,0.04)_40%,transparent_70%)]" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-square max-w-lg mx-auto w-full order-2 lg:order-1"
          >
            <AnimatedGlobe />
            {/* Stats overlay */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 + i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="glass-card rounded-xl px-4 py-3 text-center pointer-events-none"
                >
                  <stat.icon className="w-3.5 h-3.5 text-neon-cyan mx-auto mb-1" />
                  <div className="font-mono-tech text-sm font-bold">{stat.value}</div>
                  <div className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Form side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 lg:order-2"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-neon-lime animate-pulse-glow" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground">
                Early Access
              </span>
            </motion.div>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-black uppercase leading-none tracking-tighter mb-6">
              Join the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-lime">
                Network
              </span>
            </h2>

            <p className="text-lg text-muted-foreground font-mono-tech leading-relaxed mb-10 max-w-md">
              Be among the first to deploy autonomous agents with verified identities
              and programmable spending mandates on mainnet.
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                <div className="relative group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="agent@protocol.ai"
                    required
                    className="w-full px-5 py-4 rounded-xl bg-white/[0.04] border border-white/10 text-foreground font-mono-tech text-sm placeholder:text-muted-foreground focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan/30 transition-all"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-neon-cyan/10 via-transparent to-neon-magenta/10 opacity-0 group-focus-within:opacity-100 transition-opacity -z-10 blur-xl" />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-primary py-4 text-sm font-bold uppercase tracking-widest disabled:opacity-50 group"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                      <span>Initializing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <span>Request Early Access</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </motion.button>

                <p className="text-[11px] text-muted-foreground text-center font-mono-tech">
                  No spam. Priority access for builders shipping agents.
                </p>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="glass-card rounded-2xl p-8 max-w-md text-center"
              >
                <div className="w-12 h-12 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-5 h-5 text-neon-cyan" />
                </div>
                <h3 className="font-display text-xl font-bold uppercase tracking-tight mb-2">
                  You're In
                </h3>
                <p className="text-sm text-muted-foreground font-mono-tech">
                  We'll notify you when your agent slot opens. <br />
                  <span className="text-neon-cyan">Position #{Math.floor(Math.random() * 500 + 100)}</span> in the queue.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WaitlistSection;
