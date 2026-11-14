import {
  ArrowRight,
  Award,
  Briefcase,
  Check,
  Compass,
  FileCheck2,
  Headphones,
  MapPin,
  Navigation,
  Phone,
  Route,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  Truck,
} from 'lucide-react';
import {
  CAB_INTERIOR_IMAGE,
  COMPANY_INFO,
  DRIVER_BENEFITS_LIST,
  DRIVER_REQUIREMENTS_LIST,
  LOGISTICS_HUB_IMAGE,
  WHY_PRODRIVER_ITEMS,
} from '../data/prodriverData';
import { ResilientImage } from './ResilientImage';

const WHY_ICONS = [Truck, FileCheck2, Compass, Headphones, Award, Briefcase] as const;
const BENEFIT_ICONS = [Route, Compass, MapPin, TrendingUp, Briefcase, Award] as const;

export function WhyChooseProDriverSection({ onApplyClick }: { onApplyClick: () => void }) {
  return (
    <section className="py-16 lg:py-24 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Editorial Visual Column */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-[#EA580C]">
                Why Choose ProDriver
              </p>
              <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase text-slate-900 tracking-tight leading-[1.05] text-balance">
                Built Around Real CDL Drivers
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Finding your next commercial driving fit should not require filling out dozens of
                repetitive carrier portals. ProDriver keeps the process direct, respectful of your
                privacy, and focused on your CDL background.
              </p>
            </div>

            <div className="rounded-xl overflow-hidden border border-slate-200 aspect-[4/3] lg:flex-1">
              <ResilientImage
                src={CAB_INTERIOR_IMAGE}
                alt="Professional commercial truck driver inside a Class 8 semi-truck cab looking out at an American highway at sunrise"
                fallbackLabel="ProDriver Commercial Careers"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="pt-1 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onApplyClick}
                className="inline-flex items-center gap-2 min-h-[44px] px-6 py-2.5 bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold uppercase tracking-wide text-sm rounded-md transition-colors cursor-pointer"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <a
                href={COMPANY_INFO.phoneHref}
                className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 text-sm font-semibold text-[#0A1628] hover:text-[#EA580C] tabular-nums transition-colors"
              >
                <Phone className="w-4 h-4 text-[#EA580C]" aria-hidden="true" />
                <span>{COMPANY_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>

          {/* Right 6-Point Structured Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHY_PRODRIVER_ITEMS.map((item, idx) => {
              const Icon = WHY_ICONS[idx % WHY_ICONS.length];
              return (
                <div
                  key={item.number}
                  className="p-6 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between gap-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-lg bg-[#0A1628] text-white flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#FB923C]" aria-hidden="true" />
                    </div>
                    <span className="font-display text-2xl font-bold text-slate-300 tabular-nums">
                      {item.number}
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-display text-xl font-bold uppercase text-slate-900 tracking-wide">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ApplicationProcessSection({ onApplyClick }: { onApplyClick: () => void }) {
  const steps = [
    {
      num: '01',
      title: 'Submit Your Application',
      description:
        'Complete our driver application form with your basic information and CDL details.',
    },
    {
      num: '02',
      title: 'Share Your Driving Experience',
      description:
        'Tell us about your CDL class, endorsements, driving experience, and preferred driving opportunities.',
    },
    {
      num: '03',
      title: 'Discuss Available Opportunities',
      description:
        'Our team can review your information and discuss relevant opportunities where available.',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#0A1628] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-[#FB923C]">
              Driver Application Process
            </p>
            <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight text-balance">
              Three Straightforward Steps to Get Started
            </h2>
          </div>
          <button
            type="button"
            onClick={onApplyClick}
            className="inline-flex items-center justify-center gap-2 min-h-[48px] px-7 py-3 bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold uppercase tracking-wide text-sm rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Apply Now</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="p-7 rounded-xl bg-white/5 border border-white/10 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Step {step.num}
                </span>
                <span className="font-display text-3xl font-bold text-[#FB923C] tabular-nums">
                  {step.num}
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-white">
                {step.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DriverRequirementsSection({ onApplyClick }: { onApplyClick: () => void }) {
  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-5">
            <p className="text-xs font-bold uppercase tracking-widest text-[#EA580C]">
              Driver Requirements
            </p>
            <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase text-slate-900 tracking-tight leading-[1.05] text-balance">
              General CDL Driver Qualifications
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Commercial driving roles across the United States follow federal safety regulations
              and carrier-specific hiring criteria. Below are typical qualifications associated with
              CDL opportunities.
            </p>

            <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <ShieldAlert className="w-4 h-4 text-[#EA580C]" aria-hidden="true" />
                <span>Qualification Disclaimer</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Specific qualifications, minimum experience thresholds, endorsement mandates, and
                MVR review criteria vary by hiring employer and individual job opportunity.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onApplyClick}
                className="inline-flex items-center gap-2 min-h-[44px] px-6 py-2.5 bg-[#0A1628] hover:bg-slate-800 text-white font-bold uppercase tracking-wide text-sm rounded-md transition-colors cursor-pointer"
              >
                <span>Start Your Application</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl divide-y divide-slate-200">
            {DRIVER_REQUIREMENTS_LIST.map((req) => (
              <div key={req.title} className="p-5 sm:p-6 flex items-start gap-4">
                <div className="w-7 h-7 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-[#EA580C]" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-base">{req.title}</h3>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">{req.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function DriverBenefitsSection() {
  return (
    <section className="py-16 lg:py-24 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-[#EA580C]">
            Driver Benefits
          </p>
          <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase text-slate-900 tracking-tight text-balance">
            Exploring Potential Trucking Career Benefits
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Every commercial driver values different aspects of life on the road—whether regular
            home time, steady regional lanes, or independent owner-operator freedom.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DRIVER_BENEFITS_LIST.map((benefit, idx) => {
            const Icon = BENEFIT_ICONS[idx % BENEFIT_ICONS.length];
            return (
              <div
                key={benefit.title}
                className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-3"
              >
                <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#EA580C]" aria-hidden="true" />
                </div>
                <h3 className="font-display text-2xl font-bold uppercase text-slate-900 tracking-wide">
                  {benefit.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">{benefit.description}</p>
              </div>
            );
          })}
        </div>

        <div className="p-5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 leading-relaxed">
          <strong className="text-slate-800">Important Notice:</strong> Compensation, pay structures,
          benefit packages, equipment types, routes, schedules, and employment conditions depend
          entirely on the specific hiring employer and individual position.
        </div>
      </div>
    </section>
  );
}

export function AboutSection({
  onContactClick,
  onApplyClick,
  expanded = false,
}: {
  onContactClick: () => void;
  onApplyClick: () => void;
  expanded?: boolean;
}) {
  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          <div className="lg:col-span-6 rounded-xl overflow-hidden border border-slate-200 min-h-[300px]">
            <ResilientImage
              src={LOGISTICS_HUB_IMAGE}
              alt="American freight transportation terminal yard illuminated at twilight with commercial semi-trucks"
              fallbackLabel="ProDriver Operations"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center space-y-5">
            <p className="text-xs font-bold uppercase tracking-widest text-[#EA580C]">
              About ProDriver
            </p>
            <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase text-slate-900 tracking-tight leading-[1.05] text-balance">
              Connecting Professional CDL Drivers With Trucking Opportunities
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              At ProDriver, our goal is to help professional commercial drivers explore trucking
              career opportunities that align with their experience, qualifications, and
              preferences. Whether you are looking for local, regional, or over-the-road driving
              opportunities, we aim to make your search simpler and more convenient.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onApplyClick}
                className="inline-flex items-center gap-2 min-h-[44px] px-6 py-2.5 bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold uppercase tracking-wide text-sm rounded-md transition-colors cursor-pointer"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={onContactClick}
                className="inline-flex items-center gap-2 min-h-[44px] px-6 py-2.5 border border-slate-300 bg-white hover:bg-slate-50 text-slate-900 font-bold uppercase tracking-wide text-sm rounded-md transition-colors cursor-pointer"
              >
                <span>Contact Us</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mission, Approach, Support */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-7 rounded-xl bg-white border border-slate-200 space-y-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#0A1628] text-white flex items-center justify-center">
              <Navigation className="w-4 h-4 text-[#FB923C]" aria-hidden="true" />
            </div>
            <h3 className="font-display text-2xl font-bold uppercase text-slate-900">
              Our Mission
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Provide commercial drivers across the United States with a clear, honest, and
              accessible starting point for exploring CDL-A and CDL-B driving careers without
              confusion or unnecessary personal data requests.
            </p>
          </div>

          <div className="p-7 rounded-xl bg-white border border-slate-200 space-y-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#0A1628] text-white flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-[#FB923C]" aria-hidden="true" />
            </div>
            <h3 className="font-display text-2xl font-bold uppercase text-slate-900">
              Our Approach
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              We focus on matching your stated CDL class, endorsements, commercial experience, and
              preferred haul category—local, regional, OTR, dedicated, or owner-operator—with
              relevant opportunities where available.
            </p>
          </div>

          <div className="p-7 rounded-xl bg-white border border-slate-200 space-y-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#0A1628] text-white flex items-center justify-center">
              <Headphones className="w-4 h-4 text-[#FB923C]" aria-hidden="true" />
            </div>
            <h3 className="font-display text-2xl font-bold uppercase text-slate-900">
              Driver-Focused Support
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Whether you prefer applying online or speaking directly with our team at{' '}
              <a href={COMPANY_INFO.phoneHref} className="font-semibold text-[#EA580C] underline tabular-nums">
                {COMPANY_INFO.phoneDisplay}
              </a>
              , ProDriver prioritizes straightforward communication every step of the way.
            </p>
          </div>
        </div>

        {expanded && (
          <div className="p-8 rounded-xl bg-[#0A1628] text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase">
                Ready to Discuss Your Next Commercial Driving Step?
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Call our driver recruitment line directly or submit your online application in just a
                few minutes.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <a
                href={COMPANY_INFO.phoneHref}
                className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-md tabular-nums"
              >
                <Phone className="w-4 h-4 text-[#FB923C]" aria-hidden="true" />
                <span>{COMPANY_INFO.phoneDisplay}</span>
              </a>
              <button
                type="button"
                onClick={onApplyClick}
                className="inline-flex items-center gap-2 min-h-[44px] px-6 py-2.5 bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold uppercase tracking-wide text-sm rounded-md cursor-pointer"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
