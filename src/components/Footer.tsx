import { Phone, Mail, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO, OPPORTUNITY_CATEGORIES } from '../data/prodriverData';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <footer className="bg-[#07101E] text-slate-300 border-t border-white/10 pb-16 sm:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <a
              href="/"
              onClick={(e) => handleLink(e, '/')}
              className="inline-flex items-center gap-2.5 text-white whitespace-nowrap"
            >
              <svg
                width="28"
                height="24"
                viewBox="0 0 28 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M2 4H15L22 12L15 20H2L9 12L2 4Z" fill="#EA580C" />
                <path d="M13 4H20L27 12L20 20H13L20 12L13 4Z" fill="#FFFFFF" />
              </svg>
              <span className="font-display text-2xl font-bold tracking-wider uppercase text-white">
                ProDriver
              </span>
            </a>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              ProDriver helps qualified CDL-A and CDL-B truck drivers explore local, regional,
              over-the-road, and owner-operator driving opportunities across the United States.
            </p>
            <div className="pt-2 flex flex-col space-y-2 text-sm">
              <a
                href={COMPANY_INFO.phoneHref}
                className="inline-flex items-center gap-2 text-white font-semibold hover:text-[#F97316] transition-colors tabular-nums w-fit"
              >
                <Phone className="w-4 h-4 text-[#F97316]" aria-hidden="true" />
                <span>{COMPANY_INFO.phoneDisplay}</span>
              </a>
              <a
                href={COMPANY_INFO.emailHref}
                className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors w-fit"
              >
                <Mail className="w-4 h-4 text-[#F97316]" aria-hidden="true" />
                <span>{COMPANY_INFO.email}</span>
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-base font-bold uppercase tracking-wider text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="/" onClick={(e) => handleLink(e, '/')} className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/about-us" onClick={(e) => handleLink(e, '/about-us')} className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/driver-benefits" onClick={(e) => handleLink(e, '/driver-benefits')} className="hover:text-white transition-colors">
                  Driver Benefits
                </a>
              </li>
              <li>
                <a href="/driver-requirements" onClick={(e) => handleLink(e, '/driver-requirements')} className="hover:text-white transition-colors">
                  Driver Requirements
                </a>
              </li>
              <li>
                <a href="/faqs" onClick={(e) => handleLink(e, '/faqs')} className="hover:text-white transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="/contact-us" onClick={(e) => handleLink(e, '/contact-us')} className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/apply" onClick={(e) => handleLink(e, '/apply')} className="text-[#F97316] font-semibold hover:text-[#FB923C] transition-colors">
                  Apply Now
                </a>
              </li>
            </ul>
          </div>

          {/* CDL Opportunities */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-base font-bold uppercase tracking-wider text-white mb-4">
              CDL Opportunities
            </h3>
            <ul className="space-y-2.5 text-sm">
              {OPPORTUNITY_CATEGORIES.map((opp) => (
                <li key={opp.slug}>
                  <a
                    href={opp.route}
                    onClick={(e) => handleLink(e, opp.route)}
                    className="hover:text-white transition-colors"
                  >
                    {opp.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & Legal */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <h3 className="font-display text-base font-bold uppercase tracking-wider text-white mb-4">
                Connect With Us
              </h3>
              <div className="flex flex-wrap gap-3 text-sm">
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 border border-white/15 rounded hover:border-[#F97316] hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 border border-white/15 rounded hover:border-[#F97316] hover:text-white transition-colors"
                >
                  Facebook
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 border border-white/15 rounded hover:border-[#F97316] hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                Legal &amp; Compliance
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/privacy-policy" onClick={(e) => handleLink(e, '/privacy-policy')} className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms-and-conditions" onClick={(e) => handleLink(e, '/terms-and-conditions')} className="hover:text-white transition-colors">
                    Terms &amp; Conditions
                  </a>
                </li>
                <li>
                  <a href="/disclaimer" onClick={(e) => handleLink(e, '/disclaimer')} className="hover:text-white transition-colors">
                    Disclaimer
                  </a>
                </li>
                <li>
                  <a
                    href="/admin"
                    onClick={(e) => handleLink(e, '/admin')}
                    className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Recruiter Portal</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Honest Disclaimer */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400">
          <p>{COMPANY_INFO.copyright}</p>
          <p className="max-w-xl">
            ProDriver connects prospective CDL drivers with potential trucking opportunities.
            Specific positions, compensation, benefits, and schedules vary by hiring employer and availability.
          </p>
        </div>
      </div>
    </footer>
  );
}
