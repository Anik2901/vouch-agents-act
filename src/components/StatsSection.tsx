import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const useCountUp = (end: number, duration: number, isInView: boolean, prefix = "", suffix = "") => {
  const [display, setDisplay] = useState(`${prefix}0${suffix}`);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * eased;

      if (end >= 1000) {
        setDisplay(`${prefix}${(current / 1000).toFixed(1)}K+${suffix}`);
      } else if (end % 1 !== 0) {
        setDisplay(`${prefix}${current.toFixed(1)}M${suffix}`);
      } else {
        setDisplay(`${prefix}${Math.round(current)}${suffix}`);
      }

      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView, end, duration, prefix, suffix]);

  return display;
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 0.6, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const volume = useCountUp(12.4, 1.5, isInView, "$");
  const dids = useCountUp(450000, 1.8, isInView);

  return (
    <section className="py-12 border-y border-white/5 bg-black/40" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center"
        >
          <motion.div variants={item} className="flex flex-col items-center md:items-start">
            <span className="text-3xl font-display font-mono-tech">{volume}</span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-neon-cyan">
              Settled Volume
            </span>
          </motion.div>
          <motion.div variants={item} className="flex flex-col items-center md:items-start">
            <span className="text-3xl font-display font-mono-tech">{dids}</span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-neon-magenta">
              Verified DIDs
            </span>
          </motion.div>
          <motion.div variants={item} className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-1">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4.2c4.305 0 7.8 3.495 7.8 7.8s-3.495 7.8-7.8 7.8-7.8-3.495-7.8-7.8 3.495-7.8 7.8-7.8z"/>
              </svg>
              <span className="text-lg font-bold">BASE</span>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-widest opacity-50">
              Native Chain
            </span>
          </motion.div>
          <motion.div variants={item} className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-1">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z"/>
              </svg>
              <span className="text-lg font-bold uppercase tracking-tighter">Partner</span>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-widest opacity-50">
              KYC Provider
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
