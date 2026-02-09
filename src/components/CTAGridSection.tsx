import { Terminal, UserCheck, KeyRound } from "lucide-react";
import { Link } from "react-router-dom";

const CTAGridSection = () => {
  const ctaItems = [
    {
      label: "For Developers",
      title: "Integrate Fob",
      description:
        "Deploy the Fob SDK in minutes. Connect your agents to the economy with full spend control and verified identity.",
      buttonText: "View Documentation",
      buttonIcon: Terminal,
      color: "cyan" as const,
      href: "/sdk",
    },
    {
      label: "For Individuals",
      title: "Verify Identity",
      description:
        "Create your master passport and issue mandates to your agents. You keep control, they get the job done.",
      buttonText: "Claim Passport",
      buttonIcon: UserCheck,
      color: "magenta" as const,
      href: "/verify",
    },
    {
      label: "For Enterprises",
      title: "Get API Access",
      description:
        "Mass verification and reputation checks for agent marketplaces. Scalable trust for the next billion bots.",
      buttonText: "Request Access",
      buttonIcon: KeyRound,
      color: "lime" as const,
      href: "#",
    },
  ];

  const buttonClasses = {
    cyan: "btn-cyan",
    magenta: "btn-magenta",
    lime: "btn-lime",
  };

  const labelClasses = {
    cyan: "text-neon-cyan",
    magenta: "text-neon-magenta",
    lime: "text-neon-lime",
  };

  return (
    <section id="cta-grid" className="py-20 px-6 bg-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-px bg-white/10 rounded-3xl overflow-hidden border border-white/10">
          {ctaItems.map((item) => (
            <div
              key={item.title}
              className="p-12 bg-black hover:bg-black/80 transition-all"
            >
              <span
                className={`${labelClasses[item.color]} font-mono-tech text-xs tracking-[0.3em] font-bold uppercase mb-4 block`}
              >
                {item.label}
              </span>
              <h4 className="text-3xl font-display uppercase mb-6">
                {item.title}
              </h4>
              <p className="text-white/50 mb-10 text-sm">{item.description}</p>
              <Link to={item.href} className={buttonClasses[item.color]}>
                {item.buttonText}
                <item.buttonIcon className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CTAGridSection;
