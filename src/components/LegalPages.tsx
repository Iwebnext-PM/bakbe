import { COMPANY_INFO } from '../data/prodriverData';

interface LegalPageProps {
  type: 'privacy' | 'terms' | 'disclaimer';
  onBackHome: () => void;
}

export function LegalPage({ type, onBackHome }: LegalPageProps) {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
      <div className="bg-white border border-slate-200 rounded-xl p-7 sm:p-12 space-y-8">
        <div className="border-b border-slate-200 pb-6 space-y-2">
          <p className="text-xs font-bold uppercase tracking-widest text-[#EA580C]">
            ProDriver Legal &amp; Compliance
          </p>
          <h1 className="font-display text-3xl sm:text-5xl font-bold uppercase text-slate-900">
            {type === 'privacy'
              ? 'Privacy Policy'
              : type === 'terms'
              ? 'Terms & Conditions'
              : 'Recruitment Disclaimer'}
          </h1>
          <p className="text-xs text-slate-500">Effective Date: November 2026</p>
        </div>

        {type === 'privacy' && (
          <div className="space-y-5 text-sm text-slate-700 leading-relaxed">
            <p>
              ProDriver respects your privacy and handles the information you submit through our
              website responsibly. This Privacy Policy describes what data we collect when you submit
              a CDL driver application or contact inquiry and how that information is used.
            </p>
            <h2 className="font-display text-2xl font-bold uppercase text-slate-900 pt-2">
              1. Information We Collect
            </h2>
            <p>
              Our initial driver application collects basic contact details (name, phone number,
              email address, city, state, ZIP code), commercial licensing summary (CDL class, issuing
              state, years of experience, endorsements, optional MVR summary), and your route and
              schedule preferences. We do not request Social Security numbers, full driver license
              numbers, or banking credentials on our initial online application.
            </p>
            <h2 className="font-display text-2xl font-bold uppercase text-slate-900 pt-2">
              2. How We Use Your Information
            </h2>
            <p>
              Information submitted through ProDriver is used solely to review your commercial
              driving background, communicate with you regarding potential CDL driving
              opportunities, and respond to direct questions submitted via our contact form.
            </p>
            <h2 className="font-display text-2xl font-bold uppercase text-slate-900 pt-2">
              3. Data Security &amp; Retention
            </h2>
            <p>
              Applications and contact inquiries are stored in access-controlled cloud database
              infrastructure restricted to authorized personnel. You may request review or deletion
              of your submitted information at any time by emailing{' '}
              <a href={COMPANY_INFO.emailHref} className="text-[#EA580C] font-semibold underline">
                {COMPANY_INFO.email}
              </a>{' '}
              or calling{' '}
              <a href={COMPANY_INFO.phoneHref} className="text-[#EA580C] font-semibold underline tabular-nums">
                {COMPANY_INFO.phoneDisplay}
              </a>
              .
            </p>
          </div>
        )}

        {type === 'terms' && (
          <div className="space-y-5 text-sm text-slate-700 leading-relaxed">
            <p>
              By accessing or submitting information through the ProDriver website, you agree to
              these Terms &amp; Conditions.
            </p>
            <h2 className="font-display text-2xl font-bold uppercase text-slate-900 pt-2">
              1. Accuracy of Submitted Information
            </h2>
            <p>
              When submitting a CDL driver application or inquiry, you represent that the contact
              details, licensing class, experience level, and endorsement selections you provide are
              accurate to the best of your knowledge.
            </p>
            <h2 className="font-display text-2xl font-bold uppercase text-slate-900 pt-2">
              2. No Fee to Apply
            </h2>
            <p>
              ProDriver charges no fee to prospective CDL drivers to submit an application or speak
              with our team about commercial driving opportunities.
            </p>
            <h2 className="font-display text-2xl font-bold uppercase text-slate-900 pt-2">
              3. Communications
            </h2>
            <p>
              By checking the application privacy consent box and submitting your application, you
              authorize ProDriver to reach out to you via phone or email regarding driving
              opportunities matching your submitted profile. For questions, contact{' '}
              <a href={COMPANY_INFO.emailHref} className="text-[#EA580C] font-semibold underline">
                {COMPANY_INFO.email}
              </a>
              .
            </p>
          </div>
        )}

        {type === 'disclaimer' && (
          <div className="space-y-5 text-sm text-slate-700 leading-relaxed">
            <p>
              ProDriver provides CDL driver recruitment and career exploration support across the
              United States. Please review the following important notices carefully:
            </p>
            <h2 className="font-display text-2xl font-bold uppercase text-slate-900 pt-2">
              No Guarantee of Employment or Placement
            </h2>
            <p>
              Submitting an application or inquiry through ProDriver does not constitute an offer of
              employment and does not guarantee job placement, interviews, specific routes, or
              specific start dates.
            </p>
            <h2 className="font-display text-2xl font-bold uppercase text-slate-900 pt-2">
              Opportunity Categories &amp; Employer Terms
            </h2>
            <p>
              Descriptions of CDL-A, CDL-B, local, regional, over-the-road (OTR), and
              owner-operator categories on this website represent general driving opportunity types
              and do not represent confirmed individual open vacancies. Compensation, benefits,
              home time, equipment, and qualification standards depend entirely on the specific
              hiring employer and available position.
            </p>
          </div>
        )}

        <div className="pt-4 border-t border-slate-200">
          <button
            type="button"
            onClick={onBackHome}
            className="min-h-[44px] px-5 py-2.5 bg-[#0A1628] hover:bg-slate-800 text-white font-bold uppercase tracking-wide text-sm rounded-md cursor-pointer"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    </section>
  );
}
