import React from 'react';
import Link from 'next/link';

const footerLinks = {
  services: [
    { name: 'Custom ERP', href: '/services#erp' },
    { name: 'Custom Software', href: '/services#software' },
    { name: 'Security by Design', href: '/services#security' },
    { name: 'Consultation', href: '/services#consultation' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Contact', href: '/contact' },
    { name: 'Book a Call', href: '/book' },
  ],
  resources: [
    { name: 'Blog', href: '/blog' },
    { name: 'Documentation', href: '/docs' },
    { name: 'FAQs', href: '/faqs' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
};

export function PublicFooter() {
  return (
    <footer className="bg-slate-950 text-white border-t border-slate-900 overflow-hidden relative">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="footer-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#footer-grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-12 lg:gap-16 pb-20 border-b border-slate-900">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="flex items-center gap-4 mb-8 group">
              <div className="h-10 w-10 bg-slate-900 border border-blue-500/50 flex items-center justify-center relative group-hover:border-blue-500 transition-all duration-300">
                <span className="text-white font-black text-xl italic relative z-10">L</span>
                <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-500" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-2xl tracking-tighter italic uppercase leading-none">Largify Solutions</span>
                <span className="text-[8px] font-mono font-bold text-blue-500 tracking-[0.4em] uppercase leading-none mt-1">Tactical_OS</span>
              </div>
            </Link>
            <p className="text-slate-500 text-[10px] font-mono leading-relaxed mb-8 max-w-xs uppercase italic tracking-tight">
              ENGINEERING THE NEXT GENERATION OF ENTERPRISE ARCHITECTURE. HIGH-FIDELITY SYSTEMS FOR WORLD-CLASS ORGANIZATIONS. STATUS_OK.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {[1, 2, 3].map((i) => (
                <a key={i} href="#" className="h-10 w-10 border border-slate-900 flex items-center justify-center text-slate-500 hover:border-blue-500 hover:text-blue-500 transition-all duration-300">
                  <span className="sr-only">Social Link</span>
                  <div className="w-4 h-4 border border-current rotate-45" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-blue-500 mb-8 italic">
              // EXPERTISE
            </h3>
            <ul className="space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-500 hover:text-white text-[9px] font-mono font-bold uppercase tracking-widest transition-colors flex items-center gap-2 group italic"
                  >
                    <span className="h-px w-2 bg-slate-800 group-hover:w-4 group-hover:bg-blue-500 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-blue-500 mb-8 italic">
              // ENTERPRISE
            </h3>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-500 hover:text-white text-[9px] font-mono font-bold uppercase tracking-widest transition-colors flex items-center gap-2 group italic"
                  >
                    <span className="h-px w-2 bg-slate-800 group-hover:w-4 group-hover:bg-blue-500 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-blue-500 mb-8 italic">
              // INTELLIGENCE
            </h3>
            <ul className="space-y-4">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-500 hover:text-white text-[9px] font-mono font-bold uppercase tracking-widest transition-colors flex items-center gap-2 group italic"
                  >
                    <span className="h-px w-2 bg-slate-800 group-hover:w-4 group-hover:bg-blue-500 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-blue-500 mb-8 italic">
              // PROTOCOLS
            </h3>
            <ul className="space-y-4">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-500 hover:text-white text-[9px] font-mono font-bold uppercase tracking-widest transition-colors flex items-center gap-2 group italic"
                  >
                    <span className="h-px w-2 bg-slate-800 group-hover:w-4 group-hover:bg-blue-500 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
             <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
             <p className="text-[8px] font-mono text-slate-600 uppercase tracking-[0.4em]">SYSTEM_VERSION_4.2.0_STABLE</p>
          </div>
          <p className="text-[8px] font-mono text-slate-600 uppercase tracking-[0.4em]">
            © {new Date().getFullYear()} LARGIFY_SOLUTIONS_TACTICAL_DEVELOPMENT. ALL_INTEL_RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
