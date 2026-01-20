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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="h-10 w-10 bg-linear-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:rotate-12 transition-transform duration-300">
                <span className="text-white font-black text-xl">L</span>
              </div>
              <span className="font-black text-2xl text-slate-900 tracking-tighter">Largify</span>
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
                      'text-[13px] font-black uppercase tracking-[0.15em] transition-all flex items-center gap-1.5 py-2 group',
                      pathname === item.href || (item.href !== '#' && pathname.startsWith(item.href))
                        ? 'text-blue-600'
                        : 'text-slate-500 hover:text-slate-900'
                    )}
                  >
                    {item.name}
                    <svg className={cn("h-4 w-4 transition-transform duration-300", 
                      (item.type === 'services' && servicesDropdownOpen) || (item.type === 'products' && productsDropdownOpen) || (item.type === 'more' && moreDropdownOpen) ? "rotate-180" : ""
                    )} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* Products Dropdown - Enhanced Premium */}
                  {item.type === 'products' && productsDropdownOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-0 w-screen max-w-2xl animate-in fade-in slide-in-from-top-4 duration-500">
                      <div className="bg-slate-950/95 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.4)] border border-white/10 p-10 mt-4 mx-4 overflow-hidden relative group/dropdown">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-blue-600 via-cyan-400 to-blue-600 animate-gradient-x"></div>
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl group-hover/dropdown:bg-blue-600/30 transition-all duration-700"></div>
                        
                        <div className="relative z-10 grid grid-cols-2 gap-8">
                          {mockCMSProducts.filter(p => p.isPublished).map((product) => (
                            <Link
                              key={product.id}
                              href={`/products/${product.slug}`}
                              className="group p-6 rounded-3xl hover:bg-white/5 transition-all duration-500 border border-transparent hover:border-white/10"
                              onClick={() => setProductsDropdownOpen(false)}
                            >
                              <div className="flex items-start gap-5">
                                <div className="h-14 w-14 bg-linear-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shrink-0">
                                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                  </svg>
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-black text-white mb-2 group-hover:text-cyan-400 transition-colors uppercase text-sm tracking-widest">
                                    {product.name}
                                  </h3>
                                  <p className="text-[11px] text-gray-400 font-medium leading-relaxed uppercase tracking-[0.05em] line-clamp-2 italic">
                                    "{product.tagline}"
                                  </p>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                        
                        <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center px-4">
                          <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Enterprise Standards</p>
                          <div className="flex gap-4">
                            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">v4.0 Ready</span>
                            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Cloud Native</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Services Dropdown - Enhanced Premium */}
                  {item.type === 'services' && servicesDropdownOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-0 w-screen max-w-2xl animate-in fade-in slide-in-from-top-4 duration-500">
                      <div className="bg-slate-950/95 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.4)] border border-white/10 p-10 mt-4 mx-4 overflow-hidden relative group/dropdown">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-cyan-400 via-blue-600 to-cyan-400 animate-gradient-x"></div>
                        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyan-600/20 rounded-full blur-3xl group-hover/dropdown:bg-cyan-600/30 transition-all duration-700"></div>
                        
                        <div className="relative z-10 grid grid-cols-2 gap-8">
                          {mockCMSServices.filter(s => s.isPublished).map((service) => (
                            <Link
                              key={service.id}
                              href={`/services/${service.slug}`}
                              className="group p-6 rounded-3xl hover:bg-white/5 transition-all duration-500 border border-transparent hover:border-white/10"
                              onClick={() => setServicesDropdownOpen(false)}
                            >
                              <div className="flex items-start gap-5">
                                <div className="h-14 w-14 bg-linear-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 shrink-0">
                                  {service.iconType === 'code' ? (
                                    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                    </svg>
                                  ) : (
                                    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                  )}
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-black text-white mb-2 group-hover:text-blue-400 transition-colors uppercase text-sm tracking-widest">
                                    {service.title}
                                  </h3>
                                  <p className="text-[11px] text-gray-400 font-medium leading-relaxed uppercase tracking-[0.05em] line-clamp-2">
                                    {service.description}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center px-4">
                          <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Deployment Protocol</p>
                          <div className="flex gap-4">
                            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">SOC2 Vetted</span>
                            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">24/7 Intel</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* More Dropdown - Enhanced Premium */}
                  {item.type === 'more' && moreDropdownOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-0 w-screen max-w-xs animate-in fade-in slide-in-from-top-4 duration-500">
                      <div className="bg-slate-950/95 backdrop-blur-3xl rounded-[2rem] shadow-[0_40px_100px_rgba(0,0,0,0.4)] border border-white/10 p-6 mt-4 mx-4 overflow-hidden relative group/dropdown">
                        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-600 via-cyan-400 to-blue-600 animate-gradient-x"></div>
                        
                        <div className="relative z-10 space-y-1">
                          {[
                            { name: 'About Us', href: '/about', desc: 'Our mission & philosphy', icon: (
                              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            )},
                            { name: 'Contact', href: '/contact', desc: 'Secure channels', icon: (
                              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            )},
                            { name: 'Careers', href: '/careers', desc: 'Join the team', icon: (
                              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            )},
                          ].map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10 group/item"
                              onClick={() => setMoreDropdownOpen(false)}
                            >
                              <div className="h-8 w-8 bg-linear-to-br from-blue-600/20 to-cyan-500/20 rounded-lg flex items-center justify-center text-blue-400 group-hover/item:text-white group-hover/item:from-blue-600 group-hover/item:to-cyan-500 transition-all duration-500">
                                {subItem.icon}
                              </div>
                              <div>
                                <h4 className="text-xs font-black text-white uppercase tracking-widest">{subItem.name}</h4>
                                <p className="text-[9px] text-gray-500 font-medium uppercase tracking-wider">{subItem.desc}</p>
                              </div>
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
                    'text-[13px] font-black uppercase tracking-[0.15em] transition-all py-2',
                    pathname === item.href
                      ? 'text-blue-600'
                      : 'text-slate-500 hover:text-slate-900'
                  )}
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>

          {/* User & Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/book">
              <Button className="bg-slate-950 hover:bg-blue-600 text-white transition-all duration-500 px-8 rounded-xl h-12 text-[12px] font-black uppercase tracking-[0.2em] shadow-xl shadow-slate-950/20 border-none">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-3 rounded-xl bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all"
            >
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 animate-in slide-in-from-top duration-300">
          <div className="px-4 py-8 space-y-2 max-h-[80vh] overflow-y-auto">
            {navigation.map((item) => (
              item.type === 'more' ? (
                <div key={item.name} className="py-2">
                  <div className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">{item.name}</div>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { name: 'About Us', href: '/about' },
                      { name: 'Contact', href: '/contact' },
                      { name: 'Careers', href: '/careers' },
                    ].map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className={cn(
                          'block px-6 py-4 rounded-2xl text-[12px] font-black uppercase tracking-widest transition-all',
                          pathname === sub.href
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'block px-4 py-4 rounded-2xl text-[13px] font-black uppercase tracking-widest transition-all',
                    pathname === item.href
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            ))}
            <div className="pt-6">
              <Link href="/book" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-[11px] bg-slate-950">
                  Book Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
