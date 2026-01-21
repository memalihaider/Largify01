'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';
import { mockCMSServices, mockCMSProducts } from '@/lib/mock-data';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products', hasDropdown: true, type: 'products' },
  { name: 'Services', href: '/services', hasDropdown: true, type: 'services' },
  { name: 'Case Studies', href: '/case-studies' },
  { name: 'More', href: '#', hasDropdown: true, type: 'more' },
];

export function PublicNavbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-900 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-4 group">
              <div className="h-10 w-10 bg-slate-900 border border-blue-500/50 flex items-center justify-center relative shadow-[0_0_15px_rgba(37,99,235,0.2)] group-hover:border-blue-500 transition-all duration-300">
                <div className="absolute inset-0 bg-blue-500/10 group-hover:bg-blue-500/20 transition-all" />
                <span className="text-white font-black text-xl italic relative z-10">L</span>
                <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-500" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-2xl text-white tracking-tighter italic uppercase leading-none">Largify</span>
                <span className="text-[8px] font-mono font-bold text-blue-500 tracking-[0.4em] uppercase leading-none mt-1">Solutions</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navigation.map((item) => (
              item.hasDropdown ? (
                <div
                  key={item.name}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => {
                    if (item.type === 'services') {
                      setServicesDropdownOpen(true);
                      setProductsDropdownOpen(false);
                      setMoreDropdownOpen(false);
                    }
                    if (item.type === 'products') {
                      setProductsDropdownOpen(true);
                      setServicesDropdownOpen(false);
                      setMoreDropdownOpen(false);
                    }
                    if (item.type === 'more') {
                      setMoreDropdownOpen(true);
                      setServicesDropdownOpen(false);
                      setProductsDropdownOpen(false);
                    }
                  }}
                  onMouseLeave={() => {
                    if (item.type === 'services') setServicesDropdownOpen(false);
                    if (item.type === 'products') setProductsDropdownOpen(false);
                    if (item.type === 'more') setMoreDropdownOpen(false);
                  }}
                >
                  <button
                    className={cn(
                      'text-[11px] font-mono font-bold uppercase tracking-[0.2em] transition-all flex items-center gap-2 py-2 group italic',
                      pathname === item.href || (item.href !== '#' && pathname.startsWith(item.href))
                        ? 'text-blue-500'
                        : 'text-slate-500 hover:text-white'
                    )}
                  >
                    {item.name}
                    <div className={cn("w-1.5 h-1.5 border border-current rotate-45 transition-transform duration-300", 
                      (item.type === 'services' && servicesDropdownOpen) || (item.type === 'products' && productsDropdownOpen) || (item.type === 'more' && moreDropdownOpen) ? "rotate-225 bg-blue-500 border-blue-500" : ""
                    )} />
                  </button>
                  
                  {/* Dropdowns - Tactical Style */}
                  {((item.type === 'products' && productsDropdownOpen) || (item.type === 'services' && servicesDropdownOpen)) && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-0 w-screen max-w-2xl animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="bg-slate-950/95 backdrop-blur-md border border-slate-900 shadow-[0_30px_60px_rgba(0,0,0,0.5)] p-0 mt-4 mx-4 overflow-hidden relative">
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600"></div>
                        <div className="relative z-10 grid grid-cols-2 gap-px bg-slate-900 border-l border-slate-900">
                          {(item.type === 'products' ? mockCMSProducts : mockCMSServices)
                            .filter(x => x.isPublished)
                            .slice(0, 4)
                            .map((x) => (
                            <Link
                              key={x.id}
                              href={`/${item.type}/${(x as any).slug || (x as any).title?.toLowerCase().replace(/ /g, '-')}`}
                              className="group p-8 bg-slate-950 hover:bg-slate-900 transition-all duration-300"
                              onClick={() => {
                                setProductsDropdownOpen(false);
                                setServicesDropdownOpen(false);
                              }}
                            >
                              <div className="flex items-start gap-6">
                                <div className="h-12 w-12 bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-500 group-hover:border-blue-500 group-hover:bg-blue-500/5 transition-all">
                                   <div className="font-mono text-[10px] font-bold">0{x.id}</div>
                                </div>
                                <div>
                                  <h4 className="text-[12px] font-black italic uppercase tracking-widest text-white mb-2 group-hover:text-blue-400 transition-colors">
                                    {(x as any).name || (x as any).title}
                                  </h4>
                                  <p className="text-[10px] font-mono text-slate-500 uppercase leading-relaxed line-clamp-2">
                                    {x.description}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* More Dropdown */}
                  {item.type === 'more' && moreDropdownOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-0 w-screen max-w-sm animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="bg-slate-950/95 backdrop-blur-md border border-slate-900 shadow-[0_30px_60px_rgba(0,0,0,0.5)] p-0 mt-4 mx-4 overflow-hidden relative">
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600"></div>
                        <div className="relative z-10 space-y-px bg-slate-900">
                          {[
                            { name: 'About', href: '/about' },
                            { name: 'Careers', href: '/careers' },
                            { name: 'Contact', href: '/contact' },
                          ].map((link) => (
                            <Link
                              key={link.name}
                              href={link.href}
                              className="group p-6 bg-slate-950 hover:bg-slate-900 transition-all duration-300 block border-b border-slate-900 last:border-b-0"
                              onClick={() => setMoreDropdownOpen(false)}
                            >
                              <h4 className="text-[12px] font-black italic uppercase tracking-widest text-white group-hover:text-blue-400 transition-colors">
                                {link.name}
                              </h4>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'text-[11px] font-mono font-bold uppercase tracking-[0.2em] transition-all italic py-2',
                    pathname === item.href
                      ? 'text-blue-500 border-b border-blue-500'
                      : 'text-slate-500 hover:text-white'
                  )}
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/login" className="text-[11px] font-mono font-black text-slate-500 hover:text-white uppercase italic tracking-widest transition-colors">
              [Authorized_Login]
            </Link>
            <Link href="/book">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-black italic uppercase tracking-[0.2em] text-[10px] h-10 px-6 rounded-none border border-blue-400/50 shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-all active:scale-95">
                Initialize_Deployment
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-400 hover:text-white p-2"
            >
              <div className="w-6 h-5 flex flex-col justify-between items-end">
                 <div className={cn("h-0.5 bg-current transition-all duration-300", mobileMenuOpen ? "w-6 rotate-45 translate-y-2" : "w-6")} />
                 <div className={cn("h-0.5 bg-current transition-all duration-300", mobileMenuOpen ? "opacity-0" : "w-4")} />
                 <div className={cn("h-0.5 bg-current transition-all duration-300", mobileMenuOpen ? "w-6 -rotate-45 -translate-y-2" : "w-5")} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-t border-slate-900 animate-in slide-in-from-top-2 duration-300 h-screen">
          <div className="px-6 py-12 space-y-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'block text-2xl font-black italic uppercase tracking-tighter transition-all',
                  pathname === item.href ? 'text-blue-500' : 'text-slate-400'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
                <div className="text-[8px] font-mono text-slate-700 tracking-[0.5em] mt-1">GOTO_MODULE:_{item.name.toUpperCase()}</div>
              </Link>
            ))}
            <div className="pt-8 border-t border-slate-900 flex flex-col gap-6">
               <Link href="/login" className="text-sm font-mono font-black text-slate-500 uppercase italic tracking-widest">
                  [SECURE_ACCESS]
               </Link>
               <Link href="/book">
                  <Button className="w-full bg-blue-600 text-white font-black italic uppercase tracking-[0.2em] text-xs h-14 rounded-none">
                    Start_Deployment
                  </Button>
               </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
