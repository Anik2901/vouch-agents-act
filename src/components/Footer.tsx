import { ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
        { label: "SDK Docs", href: "/sdk" },
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
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      className="py-20 px-6 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col gap-4"
        >
          <Link to="/" className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white flex items-center justify-center rounded-md">
              <ShieldCheck className="w-3.5 h-3.5 text-black" />
            </div>
            <span className="font-display text-lg tracking-tighter">FOB</span>
          </Link>
          <p className="text-xs font-mono-tech text-white/40 tracking-widest uppercase">
            The Trust Layer for AI Agents.
          </p>
          <p className="text-xs text-white/20">
            © 2024 Fob Framework. All rights reserved.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-x-12 gap-y-6"
        >
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
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
