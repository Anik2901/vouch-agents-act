import { ShieldCheck } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4">
      <div className="glass-card rounded-full px-6 py-3 flex items-center justify-between border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white flex items-center justify-center rounded-lg">
            <ShieldCheck className="w-5 h-5 text-black" />
          </div>
          <span className="font-display text-xl tracking-tighter">VOUCH</span>
        </div>

        <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10 font-mono-tech text-xs uppercase tracking-widest font-bold">
          <a
            href="#builders"
            className="px-4 py-2 rounded-full hover:text-neon-cyan transition-colors"
          >
            Agent Builders
          </a>
          <a
            href="#users"
            className="px-4 py-2 rounded-full hover:text-neon-magenta transition-colors"
          >
            End Users
          </a>
          <a
            href="#api"
            className="px-4 py-2 rounded-full hover:text-neon-lime transition-colors"
          >
            API Access
          </a>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="#docs"
            className="text-sm font-bold border-b border-transparent hover:border-white transition-all"
          >
            DOCS
          </a>
          <a
            href="#console"
            className="text-sm font-bold text-neon-cyan border-b border-transparent hover:border-neon-cyan transition-all"
          >
            CONSOLE
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
