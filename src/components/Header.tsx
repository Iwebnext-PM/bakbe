import { useState } from 'react';
import { Menu, Phone, X, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/prodriverData';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onApplyClick: () => void;
}

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about-us' },
  { label: 'CDL Opportunities', path: '/cdl-opportunities' },
  { label: 'Driver Benefits', path: '/driver-benefits' },
  { label: 'Driver Requirements', path: '/driver-requirements' },
  { label: 'FAQs', path: '/faqs' },
  { label: 'Contact Us', path: '/contact-us' },
] as const;

export function Header({ currentPath, onNavigate, onApplyClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(path);
  };

  const handleApply = () => {
    setMobileMenuOpen(false);
    onApplyClick();
  };

  const isActivePath = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath === path || currentPath.startsWith(`${path}/`);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#0A1628]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 lg:h-16 flex items-center justify-between gap-4 lg:gap-8">
          {/* Zone 1: Brand wordmark (single-line, no descriptors or pill badges) */}
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            className="flex items-center gap-2.5 text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] rounded-sm"
            aria-label="ProDriver Home"
          >
            <svg
              width="28"
              height="24"
              viewBox="0 0 28 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0"
              aria-hidden="true"
            >
              <path d="M2 4H15L22 12L15 20H2L9 12L2 4Z" fill="#EA580C" />
              <path d="M13 4H20L27 12L20 20H13L20 12L13 4Z" fill="#FFFFFF" />
            </svg>
            <span className="font-display text-2xl font-bold tracking-wider uppercase text-white">
              ProDriver
            </span>
          </a>

          {/* Zone 2: Single-line navigation links */}
          <nav aria-label="Main navigation" className="hidden xl:flex items-center gap-6">
            {NAV_ITEMS.map((item) => {
              const active = isActivePath(item.path);
              return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => handleLinkClick(e, item.path)}
                  className={`text-sm font-medium whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] ${
                    active
                      ? 'text-white border-[#EA580C]'
                      : 'text-slate-300 border-transparent hover:text-white hover:border-white/40'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Click-to-call + Primary Orange CTA */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={COMPANY_INFO.phoneHref}
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-slate-200 hover:text-white whitespace-nowrap shrink-0 tabular-nums transition-colors px-2 py-1.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]"
            >
              <Phone className="w-4 h-4 text-[#F97316]" aria-hidden="true" />
              <span>{COMPANY_INFO.phoneDisplay}</span>
            </a>

            <button
              type="button"
              onClick={handleApply}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-bold uppercase tracking-wide text-white bg-[#EA580C] hover:bg-[#C2410C] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Apply Now</span>
            </button>

            {/* Compact mobile phone shortcut inside header */}
            <a
              href={COMPANY_INFO.phoneHref}
              aria-label={`Call ProDriver at ${COMPANY_INFO.phoneDisplay}`}
              className="sm:hidden inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 rounded-md whitespace-nowrap shrink-0 tabular-nums"
            >
              <Phone className="w-3.5 h-3.5 text-[#F97316]" aria-hidden="true" />
              <span>Call</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="xl:hidden inline-flex items-center justify-center w-10 h-10 text-white hover:bg-white/10 rounded-md transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#0A1628] border-t border-white/10 px-4 pt-3 pb-6 space-y-1">
            <nav aria-label="Mobile navigation" className="flex flex-col space-y-1">
              {NAV_ITEMS.map((item) => {
                const active = isActivePath(item.path);
                return (
                  <a
                    key={item.path}
                    href={item.path}
                    onClick={(e) => handleLinkClick(e, item.path)}
                    className={`px-3 py-3 rounded-md text-base font-medium transition-colors ${
                      active
                        ? 'bg-white/10 text-white'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            <div className="pt-4 mt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={COMPANY_INFO.phoneHref}
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 text-sm font-semibold text-white bg-white/10 hover:bg-white/15 rounded-md tabular-nums"
              >
                <Phone className="w-4 h-4 text-[#F97316]" aria-hidden="true" />
                <span>Call {COMPANY_INFO.phoneDisplay}</span>
              </a>
              <button
                type="button"
                onClick={handleApply}
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-white bg-[#EA580C] hover:bg-[#C2410C] rounded-md cursor-pointer"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Bottom Sticky Action Bar (44px height + 48px header = 92px <= 15% of mobile viewport) */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 h-11 bg-[#0A1628] border-t border-white/15 grid grid-cols-2">
        <a
          href={COMPANY_INFO.phoneHref}
          className="flex items-center justify-center gap-1.5 text-xs font-semibold text-white hover:bg-white/10 tabular-nums border-r border-white/10"
        >
          <Phone className="w-3.5 h-3.5 text-[#F97316]" aria-hidden="true" />
          <span>Call Now</span>
        </a>
        <button
          type="button"
          onClick={onApplyClick}
          className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wide text-white bg-[#EA580C] hover:bg-[#C2410C] cursor-pointer"
        >
          <span>Apply Now</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      </div>
    </>
  );
}
