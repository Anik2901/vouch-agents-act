import { CheckCircle, Circle, CircleDot, Smartphone, UploadCloud, ScanFace } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Scanline from "@/components/Scanline";

const IdentityVerification = () => {
  return (
    <div className="min-h-screen grid-bg relative overflow-hidden flex flex-col">
      <Scanline />
      <Navbar />

      <main className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Verification Stepper */}
          <div className="mb-12 flex flex-wrap items-center justify-between gap-4 font-mono-tech text-[10px] uppercase tracking-widest font-bold opacity-60">
            <div className="flex items-center gap-3 text-neon-lime">
              <CheckCircle className="w-4 h-4" />
              <span>01 Connection</span>
            </div>
            <div className="w-12 h-px bg-white/10 hidden md:block" />
            <div className="flex items-center gap-3 text-neon-cyan">
              <CircleDot className="w-4 h-4 animate-pulse" />
              <span>02 Identity Verification</span>
            </div>
            <div className="w-12 h-px bg-white/10 hidden md:block" />
            <div className="flex items-center gap-3">
              <Circle className="w-4 h-4" />
              <span>03 Passport Issuance</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left Sidebar: Progress Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="glass-card rounded-3xl p-8 border-neon-cyan/20">
                <h1 className="text-3xl font-display uppercase mb-4">Fob Passport Verification</h1>
                <p className="text-white/50 text-sm leading-relaxed mb-6">
                  Your AI agents require a cryptographic anchor to interact with merchants and banking rails. We verify your legal identity once to issue your master{" "}
                  <span className="text-neon-cyan">Fob DID</span>.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                    <svg className="w-6 h-6 opacity-40" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" />
                    </svg>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest opacity-40">Provider</div>
                      <div className="text-xs font-mono-tech">Stripe Identity Services</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                    <svg className="w-6 h-6 opacity-40" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest opacity-40">Storage</div>
                      <div className="text-xs font-mono-tech">Base Network (W3C Standard)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Interaction Flow */}
            <div className="lg:col-span-3">
              <div className="glass-card rounded-3xl p-8 border-white/10 relative overflow-hidden">
                {/* Verification UI */}
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-display uppercase mb-2">Legal Information</h2>
                    <p className="text-white/40 text-xs font-mono-tech mb-6 uppercase tracking-wider">
                      Phase 01: Data Entry
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold tracking-widest opacity-50 ml-1">
                        Legal Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="ALEX RIVERA"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-neon-cyan focus:bg-white/10 transition-all font-mono-tech text-sm placeholder:opacity-30"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold tracking-widest opacity-50 ml-1">
                        Government ID Region
                      </label>
                      <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-neon-cyan focus:bg-white/10 transition-all font-mono-tech text-sm appearance-none">
                        <option>UNITED STATES</option>
                        <option>EUROPEAN UNION</option>
                        <option>UNITED KINGDOM</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-widest opacity-50 ml-1">
                      Verification Method
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button className="flex flex-col items-center gap-3 p-4 rounded-xl border-2 border-neon-cyan bg-neon-cyan/5 text-neon-cyan">
                        <Smartphone className="w-6 h-6" />
                        <span className="text-[10px] font-bold uppercase tracking-tighter">Mobile Live-Scan</span>
                      </button>
                      <button className="flex flex-col items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/5 opacity-50 hover:opacity-100 transition-all">
                        <UploadCloud className="w-6 h-6" />
                        <span className="text-[10px] font-bold uppercase tracking-tighter">Upload Document</span>
                      </button>
                    </div>
                  </div>

                  {/* Mock Live Scan Component */}
                  <div className="relative aspect-video rounded-2xl bg-black border border-white/10 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-neon-cyan/10 to-transparent" />
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-[8px] font-mono-tech uppercase">Live Preview</span>
                    </div>
                    <div className="relative z-10 text-center">
                      <ScanFace className="w-12 h-12 text-neon-cyan mb-2 opacity-50 mx-auto" />
                      <p className="text-[10px] font-mono-tech opacity-40 uppercase">Initializing Camera...</p>
                    </div>
                    {/* Decorative scanning line */}
                    <div className="absolute w-full h-1 bg-neon-cyan/30 blur-sm top-0 left-0 animate-scan" />
                  </div>

                  <button className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold uppercase tracking-widest hover:bg-neon-cyan transition-all">
                    Begin Verification
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default IdentityVerification;
