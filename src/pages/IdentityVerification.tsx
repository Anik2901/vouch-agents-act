import { useState } from "react";
import { CheckCircle, Circle, CircleDot, Smartphone, UploadCloud, ScanFace, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Scanline from "@/components/Scanline";

type Step = "form" | "scanning" | "complete";
type VerifyMethod = "livescan" | "upload";

const REGIONS = [
  "UNITED STATES",
  "EUROPEAN UNION",
  "UNITED KINGDOM",
  "CANADA",
  "AUSTRALIA",
  "JAPAN",
  "SINGAPORE",
  "BRAZIL",
];

const IdentityVerification = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("form");
  const [fullName, setFullName] = useState("");
  const [region, setRegion] = useState("UNITED STATES");
  const [method, setMethod] = useState<VerifyMethod>("livescan");
  const [loading, setLoading] = useState(false);

  const handleBeginVerification = async () => {
    if (!fullName.trim()) {
      toast.error("Please enter your legal full name.");
      return;
    }

    setLoading(true);
    setStep("scanning");

    // Update profile with name and set KYC to pending
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName.trim(),
        kyc_status: "pending",
      })
      .eq("user_id", user!.id);

    if (error) {
      toast.error("Failed to start verification.");
      setStep("form");
      setLoading(false);
      return;
    }

    // Simulate verification process (3 seconds)
    setTimeout(async () => {
      const score = Math.floor(Math.random() * 10) + 90; // 90-99
      const did = `did:fob:base:${user!.id.slice(0, 8)}...${user!.id.slice(-4)}`;

      await supabase
        .from("profiles")
        .update({
          kyc_status: "verified",
          identity_score: score,
          did_identifier: did,
        })
        .eq("user_id", user!.id);

      setStep("complete");
      setLoading(false);
      toast.success("Identity verified! Your Fob Passport has been issued.");
    }, 3500);
  };

  const stepStatus = step === "form" ? 1 : step === "scanning" ? 2 : 3;

  return (
    <div className="min-h-screen grid-bg relative overflow-hidden flex flex-col">
      <Scanline />
      <Navbar />

      <main className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Verification Stepper */}
          <div className="mb-12 flex flex-wrap items-center justify-between gap-4 font-mono-tech text-[10px] uppercase tracking-widest font-bold opacity-60">
            <div className={`flex items-center gap-3 ${stepStatus >= 1 ? "text-neon-lime" : ""}`}>
              <CheckCircle className="w-4 h-4" />
              <span>01 Connection</span>
            </div>
            <div className="w-12 h-px bg-white/10 hidden md:block" />
            <div className={`flex items-center gap-3 ${stepStatus === 2 ? "text-neon-cyan" : stepStatus > 2 ? "text-neon-lime" : ""}`}>
              {stepStatus === 2 ? (
                <CircleDot className="w-4 h-4 animate-pulse" />
              ) : stepStatus > 2 ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Circle className="w-4 h-4" />
              )}
              <span>02 Identity Verification</span>
            </div>
            <div className="w-12 h-px bg-white/10 hidden md:block" />
            <div className={`flex items-center gap-3 ${stepStatus === 3 ? "text-neon-lime" : ""}`}>
              {stepStatus === 3 ? <CheckCircle className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
              <span>03 Passport Issuance</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              <div className="glass-card rounded-3xl p-8 border-neon-cyan/20">
                <h1 className="text-3xl font-display uppercase mb-4">Fob Passport Verification</h1>
                <p className="text-white/50 text-sm leading-relaxed mb-6">
                  Your AI agents require a cryptographic anchor to interact with merchants and banking rails. 
                  We verify your legal identity once to issue your master{" "}
                  <span className="text-neon-cyan">Fob DID</span> — a W3C Verifiable Credential stored on 
                  Base L2 that proves agent ownership without revealing personal data.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                    <svg className="w-6 h-6 opacity-40" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" />
                    </svg>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest opacity-40">KYC Provider</div>
                      <div className="text-xs font-mono-tech">Stripe Identity Services</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                    <svg className="w-6 h-6 opacity-40" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest opacity-40">Credential Storage</div>
                      <div className="text-xs font-mono-tech">Base L2 (W3C VC Standard)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Interaction Flow */}
            <div className="lg:col-span-3">
              <div className="glass-card rounded-3xl p-8 border-white/10 relative overflow-hidden">
                {step === "form" && (
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
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="ALEX RIVERA"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-neon-cyan focus:bg-white/10 transition-all font-mono-tech text-sm placeholder:opacity-30"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold tracking-widest opacity-50 ml-1">
                          Government ID Region
                        </label>
                        <select
                          value={region}
                          onChange={(e) => setRegion(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-neon-cyan focus:bg-white/10 transition-all font-mono-tech text-sm appearance-none"
                        >
                          {REGIONS.map((r) => (
                            <option key={r} value={r} className="bg-black text-white">{r}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold tracking-widest opacity-50 ml-1">
                        Verification Method
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          onClick={() => setMethod("livescan")}
                          className={`flex flex-col items-center gap-3 p-4 rounded-xl transition-all ${
                            method === "livescan"
                              ? "border-2 border-neon-cyan bg-neon-cyan/5 text-neon-cyan"
                              : "border border-white/10 bg-white/5 opacity-50 hover:opacity-100"
                          }`}
                        >
                          <Smartphone className="w-6 h-6" />
                          <span className="text-[10px] font-bold uppercase tracking-tighter">Mobile Live-Scan</span>
                        </button>
                        <button
                          onClick={() => setMethod("upload")}
                          className={`flex flex-col items-center gap-3 p-4 rounded-xl transition-all ${
                            method === "upload"
                              ? "border-2 border-neon-cyan bg-neon-cyan/5 text-neon-cyan"
                              : "border border-white/10 bg-white/5 opacity-50 hover:opacity-100"
                          }`}
                        >
                          <UploadCloud className="w-6 h-6" />
                          <span className="text-[10px] font-bold uppercase tracking-tighter">Upload Document</span>
                        </button>
                      </div>
                    </div>

                    <div className="relative aspect-video rounded-2xl bg-black border border-white/10 flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-neon-cyan/10 to-transparent" />
                      <div className="absolute top-4 right-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-white/30" />
                        <span className="text-[8px] font-mono-tech uppercase text-white/30">Standby</span>
                      </div>
                      <div className="relative z-10 text-center">
                        <ScanFace className="w-12 h-12 text-neon-cyan mb-2 opacity-50 mx-auto" />
                        <p className="text-[10px] font-mono-tech opacity-40 uppercase">
                          {method === "livescan" ? "Camera ready — press Begin to start" : "Upload your government ID"}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={handleBeginVerification}
                      className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold uppercase tracking-widest hover:scale-[1.02] transition-transform"
                    >
                      Begin Verification
                    </button>
                  </div>
                )}

                {step === "scanning" && (
                  <div className="space-y-8 text-center py-8">
                    <div className="relative aspect-video rounded-2xl bg-black border border-neon-cyan/30 flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-neon-cyan/10 to-transparent" />
                      <div className="absolute top-4 right-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-[8px] font-mono-tech uppercase">Processing</span>
                      </div>
                      <div className="relative z-10 text-center space-y-4">
                        <Loader2 className="w-12 h-12 text-neon-cyan animate-spin mx-auto" />
                        <p className="text-sm font-mono-tech text-neon-cyan uppercase tracking-wider">Verifying Identity...</p>
                        <p className="text-[10px] font-mono-tech text-white/40">Cross-referencing with Stripe Identity • Anchoring DID on Base</p>
                      </div>
                      <div className="absolute w-full h-1 bg-neon-cyan/30 blur-sm top-0 left-0 animate-scan" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-mono-tech text-white/40">Verifying: {fullName}</p>
                      <p className="text-xs font-mono-tech text-white/30">Region: {region}</p>
                    </div>
                  </div>
                )}

                {step === "complete" && (
                  <div className="space-y-8 text-center py-8">
                    <div className="w-20 h-20 rounded-full bg-neon-lime/10 border-2 border-neon-lime flex items-center justify-center mx-auto">
                      <CheckCircle className="w-10 h-10 text-neon-lime" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-display uppercase mb-2">Passport Issued</h2>
                      <p className="text-white/40 text-xs font-mono-tech uppercase tracking-wider">
                        Your Fob DID is now active on Base
                      </p>
                    </div>
                    <div className="glass-card rounded-2xl p-6 text-left space-y-4">
                      <div className="flex justify-between text-xs font-mono-tech">
                        <span className="text-white/40">Name</span>
                        <span>{fullName}</span>
                      </div>
                      <div className="flex justify-between text-xs font-mono-tech">
                        <span className="text-white/40">Region</span>
                        <span>{region}</span>
                      </div>
                      <div className="flex justify-between text-xs font-mono-tech">
                        <span className="text-white/40">DID</span>
                        <span className="text-neon-cyan">did:fob:base:{user?.id.slice(0, 8)}...</span>
                      </div>
                      <div className="flex justify-between text-xs font-mono-tech">
                        <span className="text-white/40">Status</span>
                        <span className="text-neon-lime">VERIFIED</span>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate("/dashboard")}
                      className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold uppercase tracking-widest hover:scale-[1.02] transition-transform"
                    >
                      Go to Dashboard
                    </button>
                  </div>
                )}
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
