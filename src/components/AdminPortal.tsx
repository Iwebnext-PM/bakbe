import { useCallback, useEffect, useState } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import {
  AlertCircle,
  LogIn,
  LogOut,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';
import {
  auth,
  fetchContactInquiries,
  fetchDriverApplications,
  signInAdminWithGoogle,
  signOutAdmin,
  updateContactInquiryStatus,
  updateDriverApplicationStatus,
  type ApplicationStatus,
  type InquiryStatus,
  type StoredContactInquiry,
  type StoredDriverApplication,
} from '../lib/firebase';

export function AdminPortal() {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [activeTab, setActiveTab] = useState<'applications' | 'inquiries'>('applications');
  const [applications, setApplications] = useState<StoredDriverApplication[]>([]);
  const [inquiries, setInquiries] = useState<StoredContactInquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthReady(true);
    });
    return () => unsub();
  }, []);

  const loadData = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const [apps, inqs] = await Promise.all([
        fetchDriverApplications(),
        fetchContactInquiries(),
      ]);
      setApplications(apps);
      setInquiries(inqs);
    } catch (err) {
      console.error('Admin load error:', err);
      setError(
        'Access denied or connection error. Only authorized ProDriver administrator accounts can view driver applications.'
      );
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (authReady && user) {
      loadData();
    }
  }, [authReady, user, loadData]);

  const handleSignIn = async () => {
    setError(null);
    try {
      await signInAdminWithGoogle();
    } catch (err) {
      console.error('Sign in failed:', err);
      setError('Google sign-in was cancelled or failed.');
    }
  };

  const handleAppStatusChange = async (id: string, status: ApplicationStatus) => {
    try {
      await updateDriverApplicationStatus(id, status);
      setApplications((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status } : item))
      );
    } catch (err) {
      console.error('Failed updating application status:', err);
      setError('Failed to update application status.');
    }
  };

  const handleInquiryStatusChange = async (id: string, status: InquiryStatus) => {
    try {
      await updateContactInquiryStatus(id, status);
      setInquiries((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status } : item))
      );
    } catch (err) {
      console.error('Failed updating inquiry status:', err);
      setError('Failed to update inquiry status.');
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#EA580C] mb-1">
              <ShieldCheck className="w-4 h-4" aria-hidden="true" />
              <span>Authorized Personnel Only</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold uppercase text-slate-900">
              ProDriver Recruiter Portal
            </h1>
          </div>

          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-600">{user.email}</span>
              <button
                type="button"
                onClick={loadData}
                disabled={loading}
                className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 border border-slate-300 rounded-md text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
              <button
                type="button"
                onClick={() => signOutAdmin()}
                className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 bg-[#0A1628] text-white rounded-md text-xs font-semibold hover:bg-slate-800 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleSignIn}
              className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold uppercase tracking-wide text-sm rounded-md cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In With Google</span>
            </button>
          )}
        </div>

        {error && (
          <div
            role="alert"
            className="mt-6 flex items-start gap-3 p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm"
          >
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {!user ? (
          <div className="py-12 text-center max-w-md mx-auto space-y-3">
            <p className="text-slate-600 text-sm leading-relaxed">
              Sign in with an authorized ProDriver recruiter Google account to review incoming CDL
              driver applications and contact inquiries.
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
              <button
                type="button"
                onClick={() => setActiveTab('applications')}
                className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors cursor-pointer ${
                  activeTab === 'applications'
                    ? 'bg-[#0A1628] text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Driver Applications ({applications.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('inquiries')}
                className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors cursor-pointer ${
                  activeTab === 'inquiries'
                    ? 'bg-[#0A1628] text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Contact Inquiries ({inquiries.length})
              </button>
            </div>

            {activeTab === 'applications' ? (
              applications.length === 0 ? (
                <p className="text-sm text-slate-500 py-8 text-center">
                  {loading ? 'Loading applications...' : 'No driver applications recorded yet.'}
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                        <th className="py-3 pr-4">Driver</th>
                        <th className="py-3 pr-4">Location</th>
                        <th className="py-3 pr-4">CDL</th>
                        <th className="py-3 pr-4">Preferences</th>
                        <th className="py-3 pr-4">Availability</th>
                        <th className="py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {applications.map((app) => (
                        <tr key={app.id} className="align-top">
                          <td className="py-4 pr-4">
                            <div className="font-semibold text-slate-900">{app.fullName}</div>
                            <div className="text-slate-600 tabular-nums">{app.phone}</div>
                            <div className="text-slate-500 text-xs">{app.email}</div>
                          </td>
                          <td className="py-4 pr-4 text-slate-700 tabular-nums">
                            {app.city}, {app.state} {app.zipCode}
                          </td>
                          <td className="py-4 pr-4 text-slate-700">
                            <div className="font-semibold">
                              Class {app.cdlClass} ({app.cdlState})
                            </div>
                            <div className="text-xs text-slate-500">{app.yearsExperience}</div>
                            {app.endorsements?.length > 0 && (
                              <div className="text-xs text-slate-500">
                                Endorsements: {app.endorsements.join(', ')}
                              </div>
                            )}
                          </td>
                          <td className="py-4 pr-4 text-slate-700">
                            <div>{app.preferredDrivingType}</div>
                            <div className="text-xs text-slate-500">
                              {app.preferredEmploymentType}
                            </div>
                          </td>
                          <td className="py-4 pr-4 text-slate-700">
                            <div>{app.availableStartDate}</div>
                            <div className="text-xs text-slate-500">
                              Employed: {app.currentlyEmployed}
                            </div>
                          </td>
                          <td className="py-4">
                            <select
                              aria-label={`Status for ${app.fullName}`}
                              value={app.status}
                              onChange={(e) =>
                                handleAppStatusChange(app.id, e.target.value as ApplicationStatus)
                              }
                              className="px-2.5 py-1.5 border border-slate-300 rounded text-xs font-semibold bg-white text-slate-800"
                            >
                              <option value="submitted">Submitted</option>
                              <option value="reviewing">Reviewing</option>
                              <option value="contacted">Contacted</option>
                              <option value="archived">Archived</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            ) : inquiries.length === 0 ? (
              <p className="text-sm text-slate-500 py-8 text-center">
                {loading ? 'Loading inquiries...' : 'No contact inquiries recorded yet.'}
              </p>
            ) : (
              <div className="divide-y divide-slate-200">
                {inquiries.map((inq) => (
                  <div key={inq.id} className="py-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="font-semibold text-slate-900">
                        {inq.subject} — <span className="text-slate-600 font-normal">{inq.fullName}</span>
                      </div>
                      <div className="text-xs text-slate-500 tabular-nums">
                        {inq.phone} · {inq.email}
                      </div>
                      <p className="text-sm text-slate-700 pt-1">{inq.message}</p>
                    </div>
                    <select
                      aria-label={`Inquiry status for ${inq.fullName}`}
                      value={inq.status}
                      onChange={(e) =>
                        handleInquiryStatusChange(inq.id, e.target.value as InquiryStatus)
                      }
                      className="px-2.5 py-1.5 border border-slate-300 rounded text-xs font-semibold bg-white text-slate-800 shrink-0"
                    >
                      <option value="new">New</option>
                      <option value="responded">Responded</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
