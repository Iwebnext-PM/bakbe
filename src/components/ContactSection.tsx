import { useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Mail, Phone, Send } from 'lucide-react';
import { COMPANY_INFO } from '../data/prodriverData';
import { submitContactInquiry } from '../lib/firebase';

export function ContactSection() {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const validate = () => {
    const next: Record<string, string> = {};
    if (fullName.trim().length < 2) next.fullName = 'Please enter your full name.';
    if (phone.replace(/\D/g, '').length < 10) next.phone = 'Please enter a valid 10-digit phone number.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = 'Please enter a valid email address.';
    if (subject.trim().length < 2) next.subject = 'Please enter a subject.';
    if (message.trim().length < 5) next.message = 'Please enter a brief message.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;

    setSubmitting(true);
    try {
      const { inquiryId } = await submitContactInquiry({
        fullName,
        phone,
        email,
        subject,
        message,
      });
      setSubmittedId(inquiryId);
      setFullName('');
      setPhone('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err) {
      console.error('Contact form submission error:', err);
      setSubmitError(
        'Unable to send your message right now. Please call us directly at (888) 445-5423 or email iwebnext.com@gmail.com.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* Direct Contact Card */}
      <div className="lg:col-span-5 bg-[#0A1628] text-white rounded-xl p-7 sm:p-10 flex flex-col justify-between">
        <div className="space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#FB923C] mb-2">
              Direct Driver Support
            </p>
            <h3 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-wide">
              Speak With ProDriver
            </h3>
            <p className="mt-3 text-slate-300 text-[15px] leading-relaxed">
              Have questions about CDL-A, CDL-B, local, regional, OTR, or owner-operator
              opportunities? Reach our team directly by phone or email.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="text-xs uppercase tracking-wider text-slate-400 mb-1">
                Toll-Free Phone
              </div>
              <a
                href={COMPANY_INFO.phoneHref}
                className="text-xl font-bold text-white hover:text-[#FB923C] transition-colors tabular-nums"
              >
                {COMPANY_INFO.phoneDisplay}
              </a>
            </div>

            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="text-xs uppercase tracking-wider text-slate-400 mb-1">
                Email Address
              </div>
              <a
                href={COMPANY_INFO.emailHref}
                className="inline-flex items-center gap-2 text-base font-semibold text-white hover:text-[#FB923C] transition-colors break-all"
              >
                <Mail className="w-4 h-4 text-[#EA580C] shrink-0" aria-hidden="true" />
                <span>{COMPANY_INFO.email}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8">
          <a
            href={COMPANY_INFO.phoneHref}
            className="w-full inline-flex items-center justify-center gap-2.5 min-h-[48px] px-6 py-3 bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold uppercase tracking-wide text-base rounded-md transition-colors tabular-nums"
          >
            <Phone className="w-5 h-5" aria-hidden="true" />
            <span>Call Now · {COMPANY_INFO.phoneDisplay}</span>
          </a>
        </div>
      </div>

      {/* Contact Form */}
      <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 sm:p-10">
        {submittedId ? (
          <div className="h-full flex flex-col items-center justify-center text-center py-10 space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7 text-emerald-600" aria-hidden="true" />
            </div>
            <h4 className="font-display text-2xl font-bold uppercase text-slate-900">
              Message Sent Successfully
            </h4>
            <p className="text-slate-600 max-w-md text-sm leading-relaxed">
              Thank you for contacting ProDriver. Your inquiry has been saved (Reference:{' '}
              <span className="font-mono font-semibold text-slate-900">{submittedId}</span>) and our
              team will follow up with you shortly.
            </p>
            <button
              type="button"
              onClick={() => setSubmittedId(null)}
              className="min-h-[44px] px-5 py-2 border border-slate-300 rounded-md text-sm font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-slate-900">
                Send Us a Message
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                Complete the form below and a ProDriver representative will respond as soon as possible.
              </p>
            </div>

            {submitError && (
              <div
                role="alert"
                className="flex items-start gap-2.5 p-3.5 rounded-md bg-red-50 border border-red-200 text-red-800 text-sm"
              >
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{submitError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-semibold text-slate-800 mb-1.5">
                  Full Name <span className="text-[#EA580C]">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your full name"
                  className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-md border text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#EA580C] ${
                    errors.fullName ? 'border-red-500' : 'border-slate-300'
                  }`}
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs font-medium text-red-600">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label htmlFor="contact-phone" className="block text-sm font-semibold text-slate-800 mb-1.5">
                  Phone Number <span className="text-[#EA580C]">*</span>
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(555) 234-5678"
                  className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-md border text-slate-900 tabular-nums focus:outline-none focus:ring-2 focus:ring-[#EA580C] ${
                    errors.phone ? 'border-red-500' : 'border-slate-300'
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs font-medium text-red-600">{errors.phone}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-email" className="block text-sm font-semibold text-slate-800 mb-1.5">
                  Email Address <span className="text-[#EA580C]">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="driver@example.com"
                  className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-md border text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#EA580C] ${
                    errors.email ? 'border-red-500' : 'border-slate-300'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs font-medium text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-sm font-semibold text-slate-800 mb-1.5">
                  Subject <span className="text-[#EA580C]">*</span>
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="CDL-A Opportunity Question"
                  className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-md border text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#EA580C] ${
                    errors.subject ? 'border-red-500' : 'border-slate-300'
                  }`}
                />
                {errors.subject && (
                  <p className="mt-1 text-xs font-medium text-red-600">{errors.subject}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-sm font-semibold text-slate-800 mb-1.5">
                Message <span className="text-[#EA580C]">*</span>
              </label>
              <textarea
                id="contact-message"
                rows={4}
                maxLength={2000}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us how we can assist you with your CDL career search."
                className={`w-full px-3.5 py-2.5 rounded-md border text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#EA580C] ${
                  errors.message ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.message && (
                <p className="mt-1 text-xs font-medium text-red-600">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-7 py-2.5 bg-[#EA580C] hover:bg-[#C2410C] disabled:opacity-60 text-white font-bold uppercase tracking-wide text-sm rounded-md transition-colors cursor-pointer"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" aria-hidden="true" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
