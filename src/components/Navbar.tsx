import { ShieldCheck, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { label: "Agent Builders", href: "/sdk", color: "text-neon-cyan" },
    { label: "End Users", href: "/verify", color: "text-neon-magenta" },
    { label: "Mandates", href: "/mandates", color: "text-neon-lime" },
  ];

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        className="fixed top-6 left-0 right-0 mx-auto z-50 w-full max-w-4xl px-4"
      >
        <div className="glass-card rounded-full px-6 py-3 flex items-center justify-between border-white/10">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary flex items-center justify-center rounded-lg">
              <ShieldCheck className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl tracking-tighter">FOB</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10 font-mono-tech text-xs uppercase tracking-widest font-bold">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 rounded-full transition-colors ${
                  isActive(link.href) ? `${link.color} bg-white/10` : `hover:${link.color}`
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            {/* System Active */}
            <div className="hidden md:flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-neon-lime animate-pulse-glow" />
              <span className="text-[9px] font-mono-tech uppercase tracking-widest text-white/40 font-bold">
                Active
              </span>
            </div>

            <Link
              to="/sdk"
              className="hidden md:inline text-sm font-bold border-b border-transparent hover:border-foreground transition-all"
            >
              DOCS
            </Link>

            {user ? (
              <Link
                to="/dashboard"
                className={`text-sm font-bold border-b transition-all ${
                  isActive("/dashboard")
                    ? "text-neon-cyan border-neon-cyan"
                    : "text-neon-cyan border-transparent hover:border-neon-cyan"
                }`}
              >
                CONSOLE
              </Link>
            ) : (
              <Link
                to="/auth"
                className="hidden md:inline text-sm font-bold text-neon-cyan border-b border-transparent hover:border-neon-cyan transition-all"
              >
                SIGN IN
              </Link>
            )}

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex flex-col gap-1.5 p-1"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="block w-6 h-0.5 bg-foreground origin-center"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-6 h-0.5 bg-foreground"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="block w-6 h-0.5 bg-foreground origin-center"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
              >
                <Link
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-3xl font-display uppercase tracking-tighter ${
                    isActive(link.href) ? link.color : "text-foreground hover:text-white/70"
                  } transition-colors`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.24 }}
            >
              <Link
                to="/sdk"
                onClick={() => setMobileOpen(false)}
                className="text-xl font-display uppercase tracking-tighter text-white/40 hover:text-foreground transition-colors"
              >
                Docs
              </Link>
            </motion.div>
            {!user && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: 0.32 }}
              >
                <Link
                  to="/auth"
                  onClick={() => setMobileOpen(false)}
                  className="text-xl font-display uppercase tracking-tighter text-neon-cyan"
                >
                  Sign In
                </Link>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
