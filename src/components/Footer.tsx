import { ShieldCheck } from "lucide-react";

const Footer = () => {
  const footerLinks = [
    {
      title: "Product",
      links: [
        { label: "Pricing", href: "#" },
        { label: "Security", href: "#" },
        { label: "Compliance", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "SDK Docs", href: "#" },
        { label: "API Spec", href: "#" },
        { label: "GitHub", href: "#" },
      ],
    },
    {
      title: "Connect",
      links: [
        { label: "Twitter", href: "#" },
        { label: "Discord", href: "#" },
        { label: "Contact", href: "#" },
      ],
    },
  ];

  return (
    <footer className="py-20 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white flex items-center justify-center rounded-md">
              <ShieldCheck className="w-3.5 h-3.5 text-black" />
            </div>
            <span className="font-display text-lg tracking-tighter">VOUCH</span>
          </div>
          <p className="text-xs font-mono-tech text-white/40 tracking-widest uppercase">
            The Trust Layer for AI Agents.
          </p>
          <p className="text-xs text-white/20">
            © 2024 Vouch Framework. All rights reserved.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-12 gap-y-6">
          {footerLinks.map((section) => (
            <div key={section.title} className="flex flex-col gap-3">
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-30">
                {section.title}
              </span>
              {section.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
