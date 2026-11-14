import { useEffect, useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Lock,
  Phone,
} from 'lucide-react';
import { CDL_ENDORSEMENTS, COMPANY_INFO, US_STATES } from '../data/prodriverData';
import {
  submitDriverApplication,
  type DriverApplicationInput,
} from '../lib/firebase';

interface DriverApplicationFormProps {
  initialCdlClass?: 'A' | 'B' | 'Other';
  initialDrivingType?:
    | 'Local'
    | 'Regional'
    | 'OTR'
    | 'Dedicated'
    | 'Owner-Operator'
    | 'Open to Opportunities';
  sourceOpportunity?: string;
  onNavigatePrivacy?: () => void;
}

const STEPS = [
  { id: 1, label: 'Personal Info' },
  { id: 2, label: 'CDL Details' },
  { id: 3, label: 'Job Preferences' },
  { id: 4, label: 'Availability & Submit' },
] as const;

const DRIVING_TYPES: DriverApplicationInput['preferredDrivingType'][] = [
  'Local',
  'Regional',
  'OTR',
  'Dedicated',
  'Owner-Operator',
  'Open to Opportunities',
];

const EMPLOYMENT_TYPES: DriverApplicationInput['preferredEmploymentType'][] = [
  'Full-Time',
  'Part-Time',
  'Contract',
  'Flexible',
];

const EXPERIENCE_BRACKETS: DriverApplicationInput['yearsExperience'][] = [
  'Less than 1 year',
  '1-2 years',
  '3-5 years',
  '6-10 years',
  '10+ years',
];

const START_DATES: DriverApplicationInput['availableStartDate'][] = [
  'Immediately',
  'Within 2 weeks',
  'Within 30 days',
  'Flexible / Exploring',
];

export function DriverApplicationForm({
  initialCdlClass = 'A',
  initialDrivingType = 'Open to Opportunities',
  sourceOpportunity,
  onNavigatePrivacy,
}: DriverApplicationFormProps) {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedRefId, setSubmittedRefId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<DriverApplicationInput>({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    state: '',
    zipCode: '',
    cdlClass: initialCdlClass,
    cdlState: '',
    yearsExperience: '1-2 years',
    endorsements: [],
    drivingRecordNotes: '',
    preferredDrivingType: initialDrivingType,
    preferredEmploymentType: 'Full-Time',
    currentlyEmployed: 'Yes',
    availableStartDate: 'Immediately',
    additionalComments: '',
    privacyConsent: false,
    sourceOpportunity,
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      cdlClass: initialCdlClass,
      preferredDrivingType: initialDrivingType,
      sourceOpportunity,
    }));
  }, [initialCdlClass, initialDrivingType, sourceOpportunity]);

  const updateField = <K extends keyof DriverApplicationInput>(
    field: K,
    value: DriverApplicationInput[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const toggleEndorsement = (code: string) => {
    setFormData((prev) => {
      if (code === 'None') {
        return {
          ...prev,
          endorsements: prev.endorsements.includes('None') ? [] : ['None'],
        };
      }
      const withoutNone = prev.endorsements.filter((item) => item !== 'None');
      const exists = withoutNone.includes(code);
      return {
        ...prev,
        endorsements: exists
          ? withoutNone.filter((item) => item !== code)
          : [...withoutNone, code],
      };
    });
  };

  const validateStep = (targetStep: number): boolean => {
    const nextErrors: Record<string, string> = {};

    if (targetStep === 1) {
      if (formData.fullName.trim().length < 2) {
        nextErrors.fullName = 'Please enter your full name.';
      }
      const phoneDigits = formData.phone.replace(/\D/g, '');
      if (phoneDigits.length < 10) {
        nextErrors.phone = 'Please enter a valid 10-digit US phone number.';
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        nextErrors.email = 'Please enter a valid email address.';
      }
      if (formData.city.trim().length < 1) {
        nextErrors.city = 'Please enter your city.';
      }
      if (!formData.state) {
        nextErrors.state = 'Please select your state.';
      }
      if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode.trim())) {
        nextErrors.zipCode = 'Please enter a valid 5-digit ZIP code.';
      }
    }

    if (targetStep === 2) {
      if (!formData.cdlClass) {
        nextErrors.cdlClass = 'Please select your CDL class.';
      }
      if (!formData.cdlState) {
        nextErrors.cdlState = 'Please select your CDL issuing state.';
      }
      if (!formData.yearsExperience) {
        nextErrors.yearsExperience = 'Please select your commercial driving experience.';
      }
    }

    if (targetStep === 3) {
      if (!formData.preferredDrivingType) {
        nextErrors.preferredDrivingType = 'Please select a preferred driving type.';
      }
      if (!formData.preferredEmploymentType) {
        nextErrors.preferredEmploymentType = 'Please select a preferred employment type.';
      }
    }

    if (targetStep === 4) {
      if (!formData.currentlyEmployed) {
        nextErrors.currentlyEmployed = 'Please indicate your current employment status.';
      }
      if (!formData.availableStartDate) {
        nextErrors.availableStartDate = 'Please select when you are available to start.';
      }
      if (!formData.privacyConsent) {
        nextErrors.privacyConsent =
          'Please confirm your consent so we can review and respond to your application.';
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handlePrevious = () => {
    setErrors({});
    setSubmitError(null);
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validateStep(4)) return;

    setSubmitting(true);
    try {
      const { applicationId } = await submitDriverApplication(formData);
      setSubmittedRefId(applicationId);
    } catch (err) {
      console.error('Application submission error:', err);
      setSubmitError(
        'We could not save your application right now due to a connection or validation error. Please verify your entries or call us directly at (888) 445-5423.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmittedRefId(null);
    setSubmitError(null);
    setErrors({});
    setStep(1);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      city: '',
      state: '',
      zipCode: '',
      cdlClass: initialCdlClass,
      cdlState: '',
      yearsExperience: '1-2 years',
      endorsements: [],
      drivingRecordNotes: '',
      preferredDrivingType: initialDrivingType,
      preferredEmploymentType: 'Full-Time',
      currentlyEmployed: 'Yes',
      availableStartDate: 'Immediately',
      additionalComments: '',
      privacyConsent: false,
      sourceOpportunity,
    });
  };

  if (submittedRefId) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-10 shadow-sm">
        <div className="max-w-xl mx-auto text-center space-y-5">
          <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8 text-emerald-600" aria-hidden="true" />
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
              Application Received
            </p>
            <h3 className="font-display text-3xl sm:text-4xl font-bold uppercase text-slate-900">
              Thank You, {formData.fullName}
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Your CDL driver application has been securely recorded. Our recruitment team will
              review your qualifications and preferences and contact you regarding relevant
              opportunities where available.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-sm text-slate-700 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Application Reference</span>
              <span className="font-mono font-semibold text-slate-900 tabular-nums">
                {submittedRefId}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">CDL Class / Preference</span>
              <span className="font-semibold text-slate-900">
                Class {formData.cdlClass} · {formData.preferredDrivingType}
              </span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={COMPANY_INFO.phoneHref}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-2.5 bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold uppercase tracking-wide text-sm rounded-md transition-colors tabular-nums"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span>Call {COMPANY_INFO.phoneDisplay}</span>
            </a>
            <button
              type="button"
              onClick={resetForm}
              className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold text-sm rounded-md transition-colors cursor-pointer"
            >
              Submit Another Application
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      {/* Progress Header */}
      <div className="bg-[#0A1628] px-5 sm:px-8 py-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#FB923C]">
              Quick CDL Driver Application
            </p>
            <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wide">
              Step {step} of 4 — {STEPS[step - 1].label}
            </h3>
          </div>
          <div className="inline-flex items-center gap-1.5 text-xs text-slate-300">
            <Lock className="w-3.5 h-3.5 text-[#FB923C]" aria-hidden="true" />
            <span>No SSN or full CDL number required</span>
          </div>
        </div>

        {/* Step Indicator */}
        <ol className="grid grid-cols-4 gap-2" aria-label="Application progress">
          {STEPS.map((item) => {
            const isComplete = step > item.id;
            const isCurrent = step === item.id;
            return (
              <li key={item.id} className="space-y-1.5">
                <div
                  className={`h-1.5 rounded-full transition-colors ${
                    isComplete || isCurrent ? 'bg-[#EA580C]' : 'bg-white/15'
                  }`}
                />
                <div className="flex items-center gap-1.5 text-xs">
                  <span
                    className={`font-bold tabular-nums ${
                      isCurrent ? 'text-white' : isComplete ? 'text-[#FB923C]' : 'text-slate-400'
                    }`}
                  >
                    0{item.id}
                  </span>
                  <span
                    className={`hidden md:inline truncate ${
                      isCurrent ? 'text-white font-semibold' : 'text-slate-400'
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Form Body */}
      <form onSubmit={handleSubmit} noValidate className="p-5 sm:p-8 space-y-6">
        {submitError && (
          <div
            role="alert"
            className="flex items-start gap-3 p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm"
          >
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
            <span>{submitError}</span>
          </div>
        )}

        {/* STEP 1: PERSONAL INFORMATION */}
        {step === 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <label htmlFor="app-fullName" className="block text-sm font-semibold text-slate-800 mb-1.5">
                Full Name <span className="text-[#EA580C]">*</span>
              </label>
              <input
                id="app-fullName"
                type="text"
                autoComplete="name"
                value={formData.fullName}
                onChange={(e) => updateField('fullName', e.target.value)}
                aria-invalid={Boolean(errors.fullName)}
                placeholder="Johnathan Miller"
                className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-md border text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#EA580C] ${
                  errors.fullName ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.fullName && (
                <p className="mt-1.5 text-xs font-medium text-red-600">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label htmlFor="app-phone" className="block text-sm font-semibold text-slate-800 mb-1.5">
                Phone Number <span className="text-[#EA580C]">*</span>
              </label>
              <input
                id="app-phone"
                type="tel"
                autoComplete="tel"
                value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                aria-invalid={Boolean(errors.phone)}
                placeholder="(555) 234-5678"
                className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-md border text-slate-900 bg-white tabular-nums focus:outline-none focus:ring-2 focus:ring-[#EA580C] ${
                  errors.phone ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.phone && (
                <p className="mt-1.5 text-xs font-medium text-red-600">{errors.phone}</p>
              )}
            </div>

            <div>
              <label htmlFor="app-email" className="block text-sm font-semibold text-slate-800 mb-1.5">
                Email Address <span className="text-[#EA580C]">*</span>
              </label>
              <input
                id="app-email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                aria-invalid={Boolean(errors.email)}
                placeholder="driver@example.com"
                className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-md border text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#EA580C] ${
                  errors.email ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs font-medium text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="app-city" className="block text-sm font-semibold text-slate-800 mb-1.5">
                City <span className="text-[#EA580C]">*</span>
              </label>
              <input
                id="app-city"
                type="text"
                autoComplete="address-level2"
                value={formData.city}
                onChange={(e) => updateField('city', e.target.value)}
                aria-invalid={Boolean(errors.city)}
                placeholder="Dallas"
                className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-md border text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#EA580C] ${
                  errors.city ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.city && (
                <p className="mt-1.5 text-xs font-medium text-red-600">{errors.city}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="app-state" className="block text-sm font-semibold text-slate-800 mb-1.5">
                  State <span className="text-[#EA580C]">*</span>
                </label>
                <select
                  id="app-state"
                  autoComplete="address-level1"
                  value={formData.state}
                  onChange={(e) => updateField('state', e.target.value)}
                  aria-invalid={Boolean(errors.state)}
                  className={`w-full min-h-[44px] px-3 py-2.5 rounded-md border text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#EA580C] ${
                    errors.state ? 'border-red-500' : 'border-slate-300'
                  }`}
                >
                  <option value="">Select</option>
                  {US_STATES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
                {errors.state && (
                  <p className="mt-1.5 text-xs font-medium text-red-600">{errors.state}</p>
                )}
              </div>

              <div>
                <label htmlFor="app-zipCode" className="block text-sm font-semibold text-slate-800 mb-1.5">
                  ZIP Code <span className="text-[#EA580C]">*</span>
                </label>
                <input
                  id="app-zipCode"
                  type="text"
                  autoComplete="postal-code"
                  inputMode="numeric"
                  value={formData.zipCode}
                  onChange={(e) => updateField('zipCode', e.target.value)}
                  aria-invalid={Boolean(errors.zipCode)}
                  placeholder="75201"
                  className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-md border text-slate-900 bg-white tabular-nums focus:outline-none focus:ring-2 focus:ring-[#EA580C] ${
                    errors.zipCode ? 'border-red-500' : 'border-slate-300'
                  }`}
                />
                {errors.zipCode && (
                  <p className="mt-1.5 text-xs font-medium text-red-600">{errors.zipCode}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: CDL INFORMATION */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <span className="block text-sm font-semibold text-slate-800 mb-2">
                CDL Class <span className="text-[#EA580C]">*</span>
              </span>
              <div className="grid grid-cols-3 gap-3">
                {(['A', 'B', 'Other'] as const).map((cls) => {
                  const selected = formData.cdlClass === cls;
                  return (
                    <button
                      key={cls}
                      type="button"
                      onClick={() => updateField('cdlClass', cls)}
                      className={`min-h-[48px] px-4 py-2.5 rounded-md border text-sm font-bold transition-colors cursor-pointer ${
                        selected
                          ? 'bg-[#0A1628] text-white border-[#0A1628]'
                          : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
                      }`}
                    >
                      {cls === 'Other' ? 'Other / Permit' : `Class ${cls}`}
                    </button>
                  );
                })}
              </div>
              {errors.cdlClass && (
                <p className="mt-1.5 text-xs font-medium text-red-600">{errors.cdlClass}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="app-cdlState" className="block text-sm font-semibold text-slate-800 mb-1.5">
                  CDL Issuing State <span className="text-[#EA580C]">*</span>
                </label>
                <select
                  id="app-cdlState"
                  value={formData.cdlState}
                  onChange={(e) => updateField('cdlState', e.target.value)}
                  aria-invalid={Boolean(errors.cdlState)}
                  className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-md border text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#EA580C] ${
                    errors.cdlState ? 'border-red-500' : 'border-slate-300'
                  }`}
                >
                  <option value="">Select issuing state</option>
                  {US_STATES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
                {errors.cdlState && (
                  <p className="mt-1.5 text-xs font-medium text-red-600">{errors.cdlState}</p>
                )}
              </div>

              <div>
                <label htmlFor="app-experience" className="block text-sm font-semibold text-slate-800 mb-1.5">
                  Years of Commercial Driving Experience <span className="text-[#EA580C]">*</span>
                </label>
                <select
                  id="app-experience"
                  value={formData.yearsExperience}
                  onChange={(e) =>
                    updateField(
                      'yearsExperience',
                      e.target.value as DriverApplicationInput['yearsExperience']
                    )
                  }
                  className="w-full min-h-[44px] px-3.5 py-2.5 rounded-md border border-slate-300 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#EA580C]"
                >
                  {EXPERIENCE_BRACKETS.map((bracket) => (
                    <option key={bracket} value={bracket}>
                      {bracket}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <span className="block text-sm font-semibold text-slate-800 mb-2">
                CDL Endorsements (Select all that apply)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {CDL_ENDORSEMENTS.map((end) => {
                  const checked = formData.endorsements.includes(end.code);
                  return (
                    <label
                      key={end.code}
                      className={`flex items-center gap-3 min-h-[44px] px-3.5 py-2.5 rounded-md border cursor-pointer transition-colors ${
                        checked
                          ? 'bg-orange-50/70 border-[#EA580C] text-slate-900'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleEndorsement(end.code)}
                        className="w-4 h-4 accent-[#EA580C]"
                      />
                      <span className="text-sm font-medium">{end.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div>
              <label htmlFor="app-recordNotes" className="block text-sm font-semibold text-slate-800 mb-1.5">
                Driving Record Information (Optional initial disclosure)
              </label>
              <textarea
                id="app-recordNotes"
                rows={3}
                maxLength={500}
                value={formData.drivingRecordNotes || ''}
                onChange={(e) => updateField('drivingRecordNotes', e.target.value)}
                placeholder="Optional: Share any relevant MVR notes (e.g., Clean MVR for 5+ years). Do not include license numbers."
                className="w-full px-3.5 py-2.5 rounded-md border border-slate-300 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#EA580C]"
              />
            </div>
          </div>
        )}

        {/* STEP 3: JOB PREFERENCES */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <span className="block text-sm font-semibold text-slate-800 mb-2">
                Preferred Driving Type <span className="text-[#EA580C]">*</span>
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {DRIVING_TYPES.map((type) => {
                  const selected = formData.preferredDrivingType === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => updateField('preferredDrivingType', type)}
                      className={`min-h-[48px] px-4 py-2.5 rounded-md border text-sm font-semibold text-left transition-colors cursor-pointer ${
                        selected
                          ? 'bg-[#0A1628] text-white border-[#0A1628]'
                          : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
                      }`}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
              {errors.preferredDrivingType && (
                <p className="mt-1.5 text-xs font-medium text-red-600">
                  {errors.preferredDrivingType}
                </p>
              )}
            </div>

            <div>
              <span className="block text-sm font-semibold text-slate-800 mb-2">
                Preferred Employment Type <span className="text-[#EA580C]">*</span>
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {EMPLOYMENT_TYPES.map((emp) => {
                  const selected = formData.preferredEmploymentType === emp;
                  return (
                    <button
                      key={emp}
                      type="button"
                      onClick={() => updateField('preferredEmploymentType', emp)}
                      className={`min-h-[48px] px-4 py-2.5 rounded-md border text-sm font-semibold transition-colors cursor-pointer ${
                        selected
                          ? 'bg-[#EA580C] text-white border-[#EA580C]'
                          : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
                      }`}
                    >
                      {emp}
                    </button>
                  );
                })}
              </div>
              {errors.preferredEmploymentType && (
                <p className="mt-1.5 text-xs font-medium text-red-600">
                  {errors.preferredEmploymentType}
                </p>
              )}
            </div>
          </div>
        )}

        {/* STEP 4: ADDITIONAL INFORMATION & CONSENT */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="app-employed" className="block text-sm font-semibold text-slate-800 mb-1.5">
                  Are you currently employed? <span className="text-[#EA580C]">*</span>
                </label>
                <select
                  id="app-employed"
                  value={formData.currentlyEmployed}
                  onChange={(e) =>
                    updateField(
                      'currentlyEmployed',
                      e.target.value as DriverApplicationInput['currentlyEmployed']
                    )
                  }
                  className="w-full min-h-[44px] px-3.5 py-2.5 rounded-md border border-slate-300 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#EA580C]"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              <div>
                <label htmlFor="app-startDate" className="block text-sm font-semibold text-slate-800 mb-1.5">
                  When are you available to start? <span className="text-[#EA580C]">*</span>
                </label>
                <select
                  id="app-startDate"
                  value={formData.availableStartDate}
                  onChange={(e) =>
                    updateField(
                      'availableStartDate',
                      e.target.value as DriverApplicationInput['availableStartDate']
                    )
                  }
                  className="w-full min-h-[44px] px-3.5 py-2.5 rounded-md border border-slate-300 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#EA580C]"
                >
                  {START_DATES.map((sd) => (
                    <option key={sd} value={sd}>
                      {sd}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="app-comments" className="block text-sm font-semibold text-slate-800 mb-1.5">
                Additional Comments (Optional)
              </label>
              <textarea
                id="app-comments"
                rows={3}
                maxLength={1500}
                value={formData.additionalComments || ''}
                onChange={(e) => updateField('additionalComments', e.target.value)}
                placeholder="Share trailer types operated (dry van, reefer, flatbed), preferred schedule, or owner-operator equipment details."
                className="w-full px-3.5 py-2.5 rounded-md border border-slate-300 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#EA580C]"
              />
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Application Summary
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-700">
                <div>
                  <span className="text-slate-500">Applicant:</span>{' '}
                  <span className="font-semibold text-slate-900">{formData.fullName}</span>
                </div>
                <div>
                  <span className="text-slate-500">Location:</span>{' '}
                  <span className="font-semibold text-slate-900">
                    {formData.city}, {formData.state} {formData.zipCode}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500">CDL Class / State:</span>{' '}
                  <span className="font-semibold text-slate-900">
                    Class {formData.cdlClass} ({formData.cdlState}) · {formData.yearsExperience}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500">Preference:</span>{' '}
                  <span className="font-semibold text-slate-900">
                    {formData.preferredDrivingType} · {formData.preferredEmploymentType}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.privacyConsent}
                  onChange={(e) => updateField('privacyConsent', e.target.checked)}
                  className="mt-1 w-4 h-4 accent-[#EA580C] shrink-0"
                />
                <span className="text-sm text-slate-600 leading-relaxed">
                  I agree to the{' '}
                  {onNavigatePrivacy ? (
                    <button
                      type="button"
                      onClick={onNavigatePrivacy}
                      className="text-[#EA580C] underline font-semibold hover:text-[#C2410C] cursor-pointer"
                    >
                      Privacy Policy
                    </button>
                  ) : (
                    'Privacy Policy'
                  )}{' '}
                  and authorize ProDriver to review my application and contact me by phone or email
                  regarding potential CDL driving opportunities. I understand submission does not
                  guarantee job placement. <span className="text-[#EA580C]">*</span>
                </span>
              </label>
              {errors.privacyConsent && (
                <p className="mt-1.5 text-xs font-medium text-red-600">{errors.privacyConsent}</p>
              )}
            </div>
          </div>
        )}

        {/* Navigation Controls */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-4">
          {step > 1 ? (
            <button
              type="button"
              onClick={handlePrevious}
              className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold text-sm rounded-md transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Previous</span>
            </button>
          ) : (
            <div className="text-xs text-slate-500 hidden sm:block">
              Prefer to apply by phone? Call{' '}
              <a href={COMPANY_INFO.phoneHref} className="font-semibold text-[#0A1628] underline tabular-nums">
                {COMPANY_INFO.phoneDisplay}
              </a>
            </div>
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="ml-auto inline-flex items-center gap-2 min-h-[44px] px-6 py-2.5 bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold uppercase tracking-wide text-sm rounded-md transition-colors cursor-pointer"
            >
              <span>Next Step</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className="ml-auto inline-flex items-center justify-center gap-2 min-h-[44px] px-7 py-2.5 bg-[#EA580C] hover:bg-[#C2410C] disabled:opacity-60 text-white font-bold uppercase tracking-wide text-sm rounded-md transition-colors cursor-pointer"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>Submit Application</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
