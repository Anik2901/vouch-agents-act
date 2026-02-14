import { ShieldCheck } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4">
      <div className="glass-card rounded-full px-6 py-3 flex items-center justify-between border-white/10">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary flex items-center justify-center rounded-lg">
            <ShieldCheck className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl tracking-tighter">FOB</span>
        </Link>

        <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10 font-mono-tech text-xs uppercase tracking-widest font-bold">
          <Link
            to="/sdk"
            className={`px-4 py-2 rounded-full transition-colors ${
              isActive("/sdk") ? "text-neon-cyan bg-white/10" : "hover:text-neon-cyan"
            }`}
          >
            Agent Builders
          </Link>
          <Link
            to="/verify"
            className={`px-4 py-2 rounded-full transition-colors ${
              isActive("/verify") ? "text-neon-magenta bg-white/10" : "hover:text-neon-magenta"
            }`}
          >
            End Users
          </Link>
          <Link
            to="/mandates"
            className={`px-4 py-2 rounded-full transition-colors ${
              isActive("/mandates") ? "text-neon-lime bg-white/10" : "hover:text-neon-lime"
            }`}
          >
            Mandates
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <Link
            to="/sdk"
            className="text-sm font-bold border-b border-transparent hover:border-foreground transition-all"
          >
            DOCS
          </Link>
          {user ? (
            <Link
              to="/dashboard"
              className={`text-sm font-bold border-b transition-all ${
                isActive("/dashboard") ? "text-neon-cyan border-neon-cyan" : "text-neon-cyan border-transparent hover:border-neon-cyan"
              }`}
            >
              CONSOLE
            </Link>
          ) : (
            <Link
              to="/auth"
              className="text-sm font-bold text-neon-cyan border-b border-transparent hover:border-neon-cyan transition-all"
            >
              SIGN IN
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
