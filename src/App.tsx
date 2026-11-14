import { useCallback, useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import {
  COMPANY_INFO,
  HERO_IMAGE,
  OPPORTUNITY_CATEGORIES,
  type OpportunityCategory,
} from './data/prodriverData';
import { testFirestoreConnection } from './lib/firebase';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ResilientImage } from './components/ResilientImage';
import { OpportunityCards } from './components/OpportunityCards';
import {
  AboutSection,
  ApplicationProcessSection,
  DriverBenefitsSection,
  DriverRequirementsSection,
  WhyChooseProDriverSection,
} from './components/SiteSections';
import { DriverApplicationForm } from './components/DriverApplicationForm';
import { FaqAccordion } from './components/FaqAccordion';
import { ContactSection } from './components/ContactSection';
import { LegalPage } from './components/LegalPages';
import { AdminPortal } from './components/AdminPortal';

interface SeoMeta {
  title: string;
  description: string;
}

function getSeoForPath(pathname: string): SeoMeta {
  const matchedOpp = OPPORTUNITY_CATEGORIES.find((o) => o.route === pathname);
  if (matchedOpp) {
    return {
      title: matchedOpp.seoTitle,
      description: matchedOpp.seoDescription,
    };
  }

  switch (pathname) {
    case '/about-us':
      return {
        title: 'About ProDriver – CDL Driver Recruitment & Trucking Careers',
        description:
          'Learn how ProDriver helps CDL-A and CDL-B truck drivers explore local, regional, OTR, and owner-operator trucking opportunities across the USA.',
      };
    case '/cdl-opportunities':
      return {
        title: 'CDL Driver Jobs & Trucking Opportunities in USA | ProDriver',
        description:
          'Explore CDL-A, CDL-B, local, regional, OTR, and owner-operator truck driving opportunities with ProDriver. Apply online or call (888) 445-5423.',
      };
    case '/driver-benefits':
      return {
        title: 'CDL Driver Benefits & Trucking Career Options | ProDriver',
        description:
          'Explore route variety, flexible schedules, local and long-distance options, and commercial driving career benefits with ProDriver.',
      };
    case '/driver-requirements':
      return {
        title: 'CDL Driver Requirements & Qualifications | ProDriver',
        description:
          'Review general CDL-A and CDL-B qualifications, DOT/FMCSA compliance, endorsements, and experience guidelines before applying with ProDriver.',
      };
    case '/apply':
      return {
        title: 'Apply Now – CDL Truck Driver Application | ProDriver',
        description:
          'Complete the quick ProDriver multi-step CDL driver application online. Share your CDL class, experience, and preferred driving opportunities.',
      };
    case '/faqs':
      return {
        title: 'CDL Driver Recruitment FAQs | ProDriver',
        description:
          'Find honest answers to frequently asked questions about applying for CDL-A, CDL-B, local, regional, OTR, and owner-operator jobs with ProDriver.',
      };
    case '/contact-us':
      return {
        title: 'Contact ProDriver – Call (888) 445-5423 | CDL Recruitment',
        description:
          'Contact ProDriver by phone at (888) 445-5423, email iwebnext.com@gmail.com, or send a message online about CDL driving opportunities.',
      };
    case '/privacy-policy':
      return {
        title: 'Privacy Policy | ProDriver',
        description: 'Read how ProDriver protects and handles CDL driver applicant information.',
      };
    case '/terms-and-conditions':
      return {
        title: 'Terms & Conditions | ProDriver',
        description: 'Review ProDriver website terms and conditions for CDL applicants.',
      };
    case '/disclaimer':
      return {
        title: 'Recruitment Disclaimer | ProDriver',
        description: 'Important qualification and opportunity disclaimers for ProDriver visitors.',
      };
    case '/admin':
      return {
        title: 'Recruiter Portal | ProDriver',
        description: 'Authorized ProDriver recruiter portal.',
      };
    default:
      return {
        title: 'ProDriver – CDL Driver Jobs & American Trucking Careers',
        description:
          'Explore CDL-A and CDL-B truck driver opportunities across the USA with ProDriver. Apply online for local, regional, OTR, and owner-operator driving careers or call (888) 445-5423.',
      };
  }
}

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    const path = window.location.pathname || '/';
    return path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
  });

  const [prefillCdlClass, setPrefillCdlClass] = useState<'A' | 'B' | 'Other'>('A');
  const [prefillDrivingType, setPrefillDrivingType] = useState<
    'Local' | 'Regional' | 'OTR' | 'Dedicated' | 'Owner-Operator' | 'Open to Opportunities'
  >('Open to Opportunities');
  const [prefillSource, setPrefillSource] = useState<string | undefined>(undefined);

  useEffect(() => {
    testFirestoreConnection();
  }, []);

  useEffect(() => {
    const onPopState = () => {
      const path = window.location.pathname || '/';
      setCurrentPath(path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    const seo = getSeoForPath(currentPath);
    document.title = seo.title;
    const descTag = document.querySelector('meta[name="description"]');
    if (descTag) descTag.setAttribute('content', seo.description);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', seo.title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', seo.description);
  }, [currentPath]);

  const navigate = useCallback((path: string, scrollTargetId?: string) => {
    const normalized = path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
    if (window.location.pathname !== normalized) {
      window.history.pushState({}, '', normalized);
      setCurrentPath(normalized);
    }
    if (scrollTargetId) {
      setTimeout(() => {
        const el = document.getElementById(scrollTargetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const handleApplyClick = useCallback(
    (opp?: OpportunityCategory) => {
      if (opp) {
        setPrefillCdlClass(opp.defaultCdlClass);
        setPrefillDrivingType(opp.defaultDrivingType);
        setPrefillSource(opp.slug);
      } else {
        setPrefillSource(undefined);
      }
      if (currentPath === '/') {
        const formEl = document.getElementById('apply-form');
        if (formEl) {
          formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
      }
      navigate('/apply');
    },
    [currentPath, navigate]
  );

  const handleFindJobsClick = useCallback(() => {
    if (currentPath === '/') {
      const oppEl = document.getElementById('opportunities');
      if (oppEl) {
        oppEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    navigate('/cdl-opportunities');
  }, [currentPath, navigate]);

  const matchedOpportunity = OPPORTUNITY_CATEGORIES.find((o) => o.route === currentPath);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header
        currentPath={currentPath}
        onNavigate={(path) => navigate(path)}
        onApplyClick={() => handleApplyClick()}
      />

      <main className="flex-1">
        {/* DEDICATED OPPORTUNITY DETAIL PAGE */}
        {matchedOpportunity ? (
          <>
            <section className="bg-[#0A1628] text-white py-14 lg:py-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <a
                  href="/cdl-opportunities"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/cdl-opportunities');
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-white mb-6"
                >
                  <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>All CDL Opportunities</span>
                </a>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  <div className="lg:col-span-7 space-y-5">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#FB923C]">
                      {matchedOpportunity.kicker}
                    </p>
                    <h1 className="font-display text-4xl sm:text-6xl font-bold uppercase tracking-tight leading-[1.02] text-balance">
                      {matchedOpportunity.title}
                    </h1>
                    <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl">
                      {matchedOpportunity.fullDescription}
                    </p>
                    <div className="pt-2 flex flex-wrap items-center gap-4">
                      <button
                        type="button"
                        onClick={() => handleApplyClick(matchedOpportunity)}
                        className="inline-flex items-center gap-2 min-h-[48px] px-7 py-3 bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold uppercase tracking-wide text-sm rounded-md transition-colors cursor-pointer"
                      >
                        <span>Apply for This Category</span>
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </button>
                      <a
                        href={COMPANY_INFO.phoneHref}
                        className="inline-flex items-center gap-2 min-h-[48px] px-5 py-3 bg-white/10 hover:bg-white/15 text-white font-semibold text-sm rounded-md tabular-nums"
                      >
                        <Phone className="w-4 h-4 text-[#FB923C]" aria-hidden="true" />
                        <span>Call {COMPANY_INFO.phoneDisplay}</span>
                      </a>
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <div className="aspect-[4/3] rounded-xl overflow-hidden border border-white/15">
                      <ResilientImage
                        src={matchedOpportunity.image}
                        alt={matchedOpportunity.imageAlt}
                        fallbackLabel={matchedOpportunity.title}
                        loading="eager"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="py-14 lg:py-20 bg-white border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-7 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                  <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase text-slate-900">
                    Category Highlights
                  </h2>
                  <ul className="space-y-3">
                    {matchedOpportunity.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#EA580C] shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-7 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                  <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase text-slate-900">
                    General Qualifications
                  </h2>
                  <ul className="space-y-3">
                    {matchedOpportunity.typicalQualifications.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                        <ShieldCheck className="w-4 h-4 text-[#0A1628] shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-slate-500 pt-2">
                    Specific requirements, schedules, and availability depend on the hiring employer
                    and location.
                  </p>
                </div>
              </div>
            </section>

            <section className="py-14 lg:py-20 bg-slate-50">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                <div className="text-center space-y-2">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#EA580C]">
                    Apply Online
                  </p>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase text-slate-900">
                    Submit Your Application for {matchedOpportunity.title}
                  </h2>
                </div>
                <DriverApplicationForm
                  initialCdlClass={matchedOpportunity.defaultCdlClass}
                  initialDrivingType={matchedOpportunity.defaultDrivingType}
                  sourceOpportunity={matchedOpportunity.slug}
                  onNavigatePrivacy={() => navigate('/privacy-policy')}
                />
              </div>
            </section>
          </>
        ) : currentPath === '/about-us' ? (
          <>
            <div className="bg-[#0A1628] text-white py-14 lg:py-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-[#FB923C]">
                  About ProDriver
                </p>
                <h1 className="font-display text-4xl sm:text-6xl font-bold uppercase tracking-tight max-w-3xl text-balance">
                  Connecting Professional CDL Drivers With Trucking Opportunities
                </h1>
              </div>
            </div>
            <AboutSection
              expanded
              onContactClick={() => navigate('/contact-us')}
              onApplyClick={() => handleApplyClick()}
            />
            <WhyChooseProDriverSection onApplyClick={() => handleApplyClick()} />
          </>
        ) : currentPath === '/cdl-opportunities' ? (
          <>
            <div className="bg-[#0A1628] text-white py-14 lg:py-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
                <p className="text-xs font-bold uppercase tracking-widest text-[#FB923C]">
                  Commercial Truck Driving Careers
                </p>
                <h1 className="font-display text-4xl sm:text-6xl font-bold uppercase tracking-tight max-w-3xl text-balance">
                  CDL Driver Opportunities Across the USA
                </h1>
                <p className="text-slate-300 max-w-2xl text-base leading-relaxed">
                  Explore CDL-A, CDL-B, local, regional, over-the-road (OTR), and owner-operator
                  opportunity categories. Select a category below to learn more or start your
                  application.
                </p>
              </div>
            </div>
            <section className="py-14 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <OpportunityCards
                onLearnMore={(opp) => navigate(opp.route)}
                onApply={(opp) => handleApplyClick(opp)}
              />
            </section>
            <ApplicationProcessSection onApplyClick={() => handleApplyClick()} />
          </>
        ) : currentPath === '/driver-benefits' ? (
          <>
            <div className="bg-[#0A1628] text-white py-14 lg:py-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-[#FB923C]">
                  Career Advantages
                </p>
                <h1 className="font-display text-4xl sm:text-6xl font-bold uppercase tracking-tight max-w-3xl text-balance">
                  CDL Driver Benefits &amp; Route Options
                </h1>
              </div>
            </div>
            <DriverBenefitsSection />
            <ApplicationProcessSection onApplyClick={() => handleApplyClick()} />
          </>
        ) : currentPath === '/driver-requirements' ? (
          <>
            <div className="bg-[#0A1628] text-white py-14 lg:py-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-[#FB923C]">
                  Qualification Overview
                </p>
                <h1 className="font-display text-4xl sm:text-6xl font-bold uppercase tracking-tight max-w-3xl text-balance">
                  CDL Driver Requirements &amp; Compliance
                </h1>
              </div>
            </div>
            <DriverRequirementsSection onApplyClick={() => handleApplyClick()} />
          </>
        ) : currentPath === '/apply' ? (
          <>
            <div className="bg-[#0A1628] text-white py-12 lg:py-16">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-[#FB923C]">
                  Online Application
                </p>
                <h1 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight">
                  CDL Driver Career Application
                </h1>
                <p className="text-slate-300 text-sm sm:text-base max-w-2xl">
                  Complete the four short steps below to share your CDL details and driving
                  preferences. No Social Security number or full CDL number is required.
                </p>
              </div>
            </div>
            <section className="py-12 lg:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <DriverApplicationForm
                initialCdlClass={prefillCdlClass}
                initialDrivingType={prefillDrivingType}
                sourceOpportunity={prefillSource}
                onNavigatePrivacy={() => navigate('/privacy-policy')}
              />
            </section>
          </>
        ) : currentPath === '/faqs' ? (
          <>
            <div className="bg-[#0A1628] text-white py-14 lg:py-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-[#FB923C]">
                  Driver Questions Answered
                </p>
                <h1 className="font-display text-4xl sm:text-6xl font-bold uppercase tracking-tight">
                  Frequently Asked Questions
                </h1>
              </div>
            </div>
            <section className="py-14 lg:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <FaqAccordion />
              <div className="text-center pt-4">
                <button
                  type="button"
                  onClick={() => handleApplyClick()}
                  className="inline-flex items-center gap-2 min-h-[48px] px-7 py-3 bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold uppercase tracking-wide text-sm rounded-md cursor-pointer"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </section>
          </>
        ) : currentPath === '/contact-us' ? (
          <>
            <div className="bg-[#0A1628] text-white py-14 lg:py-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-[#FB923C]">
                  Direct Support
                </p>
                <h1 className="font-display text-4xl sm:text-6xl font-bold uppercase tracking-tight">
                  Contact ProDriver
                </h1>
              </div>
            </div>
            <section className="py-14 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ContactSection />
            </section>
          </>
        ) : currentPath === '/privacy-policy' ? (
          <LegalPage type="privacy" onBackHome={() => navigate('/')} />
        ) : currentPath === '/terms-and-conditions' ? (
          <LegalPage type="terms" onBackHome={() => navigate('/')} />
        ) : currentPath === '/disclaimer' ? (
          <LegalPage type="disclaimer" onBackHome={() => navigate('/')} />
        ) : currentPath === '/admin' ? (
          <AdminPortal />
        ) : (
          /* HOMEPAGE (FULL CONVERSION-OPTIMIZED EXPERIENCE) */
          <>
            {/* 4. HERO SECTION */}
            <section className="relative bg-[#07101E] text-white overflow-hidden">
              <div className="absolute inset-0">
                <ResilientImage
                  src={HERO_IMAGE}
                  alt="American Class 8 semi-truck hauling a trailer down an open US highway at golden hour"
                  fallbackLabel="ProDriver Trucking Careers"
                  loading="eager"
                  className="w-full h-full object-cover object-center"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-r from-[#07101E]/95 via-[#0A1628]/80 to-[#07101E]/35"
                />
              </div>

              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 lg:pt-24 lg:pb-16">
                <div className="max-w-3xl space-y-6">
                  <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#FB923C]">
                    ProDriver · Commercial Truck Driving Careers Across the USA
                  </p>
                  <h1 className="font-display text-4xl sm:text-6xl lg:text-[4.25rem] font-bold uppercase tracking-tight leading-[0.98] text-balance">
                    Your Next Trucking Opportunity Starts Here
                  </h1>
                  <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl">
                    Looking for your next CDL driving opportunity? ProDriver helps professional
                    truck drivers explore trucking career opportunities that match their
                    experience, preferences, and career goals.
                  </p>

                  {/* Hero CTAs */}
                  <div className="pt-2 flex flex-wrap items-center gap-3.5">
                    <button
                      type="button"
                      onClick={handleFindJobsClick}
                      className="inline-flex items-center justify-center gap-2 min-h-[48px] px-7 py-3 bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold uppercase tracking-wide text-sm sm:text-base rounded-md transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <span>Find CDL Jobs</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleApplyClick()}
                      className="inline-flex items-center justify-center min-h-[48px] px-7 py-3 bg-white text-[#0A1628] hover:bg-slate-100 font-bold uppercase tracking-wide text-sm sm:text-base rounded-md transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Apply Now
                    </button>

                    <a
                      href={COMPANY_INFO.phoneHref}
                      className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm sm:text-base rounded-md transition-colors tabular-nums whitespace-nowrap"
                    >
                      <Phone className="w-4 h-4 text-[#FB923C]" aria-hidden="true" />
                      <span>Call {COMPANY_INFO.phoneDisplay}</span>
                    </a>
                  </div>
                </div>

                {/* Trust Highlights Architectural Strip */}
                <div className="mt-12 lg:mt-16 pt-6 border-t border-white/15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    'CDL-A & CDL-B Opportunities',
                    'Local, Regional & OTR Positions',
                    'Opportunities for Experienced Drivers',
                    'Simple Application Process',
                  ].map((highlight) => (
                    <div key={highlight} className="flex items-center gap-2.5 text-sm font-medium text-slate-100">
                      <Check className="w-4 h-4 text-[#FB923C] shrink-0" aria-hidden="true" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 5. CDL DRIVER OPPORTUNITIES */}
            <section id="opportunities" className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div className="max-w-2xl space-y-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#EA580C]">
                    CDL Driver Opportunities
                  </p>
                  <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase text-slate-900 tracking-tight text-balance">
                    Explore Commercial Driving Categories
                  </h2>
                  <p className="text-slate-600 text-base leading-relaxed">
                    Browse truck driver opportunity areas across Class A, Class B, local delivery,
                    regional freight, over-the-road routes, and owner-operator operations.
                  </p>
                </div>
                <a
                  href="/cdl-opportunities"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/cdl-opportunities');
                  }}
                  className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-[#0A1628] hover:text-[#EA580C] whitespace-nowrap shrink-0"
                >
                  <span>View All Categories</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>

              <OpportunityCards
                onLearnMore={(opp) => navigate(opp.route)}
                onApply={(opp) => handleApplyClick(opp)}
              />
            </section>

            {/* 6. WHY CHOOSE PRODRIVER */}
            <WhyChooseProDriverSection onApplyClick={() => handleApplyClick()} />

            {/* 7. 3-STEP APPLICATION PROCESS */}
            <ApplicationProcessSection onApplyClick={() => handleApplyClick()} />

            {/* 8. DRIVER REQUIREMENTS */}
            <DriverRequirementsSection onApplyClick={() => handleApplyClick()} />

            {/* 9. MULTI-STEP CDL DRIVER APPLICATION FORM */}
            <section id="apply-form" className="py-16 lg:py-24 bg-slate-100 border-t border-slate-200">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                <div className="text-center space-y-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#EA580C]">
                    Driver Application Form
                  </p>
                  <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase text-slate-900 tracking-tight text-balance">
                    Apply for CDL Driving Opportunities
                  </h2>
                  <p className="text-slate-600 max-w-2xl mx-auto text-base leading-relaxed">
                    Complete our secure four-step application to share your CDL class, experience,
                    endorsements, and preferred driving arrangements.
                  </p>
                </div>

                <DriverApplicationForm
                  initialCdlClass={prefillCdlClass}
                  initialDrivingType={prefillDrivingType}
                  sourceOpportunity={prefillSource}
                  onNavigatePrivacy={() => navigate('/privacy-policy')}
                />
              </div>
            </section>

            {/* 10. DRIVER BENEFITS */}
            <DriverBenefitsSection />

            {/* 11. ABOUT PRODRIVER */}
            <AboutSection
              onContactClick={() => navigate('/contact-us')}
              onApplyClick={() => handleApplyClick()}
            />

            {/* 12. FAQ SECTION */}
            <section id="faqs" className="py-16 lg:py-24 bg-white border-t border-slate-200">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                <div className="text-center space-y-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#EA580C]">
                    Frequently Asked Questions
                  </p>
                  <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase text-slate-900 tracking-tight">
                    Common Questions From CDL Drivers
                  </h2>
                </div>
                <FaqAccordion />
              </div>
            </section>

            {/* 13. CONTACT SECTION */}
            <section id="contact" className="py-16 lg:py-24 bg-slate-50 border-t border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                <div className="max-w-2xl space-y-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#EA580C]">
                    Contact ProDriver
                  </p>
                  <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase text-slate-900 tracking-tight">
                    Ready to Talk? Reach Out Directly
                  </h2>
                </div>
                <ContactSection />
              </div>
            </section>
          </>
        )}
      </main>

      <Footer onNavigate={(path) => navigate(path)} />
    </div>
  );
}
