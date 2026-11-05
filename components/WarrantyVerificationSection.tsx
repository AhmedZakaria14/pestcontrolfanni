'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Wrench,
  RefreshCw,
  Award,
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import type { Warranty } from '@/lib/pest-data';

type WarrantyData = Pick<Warranty, 'code' | 'serviceType' | 'issueDate' | 'expiryDate' | 'status'>;

interface WarrantyVerificationSectionProps {
  isStandalonePage?: boolean;
}

export default function WarrantyVerificationSection({}: WarrantyVerificationSectionProps = {}) {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<WarrantyData | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [lookupError, setLookupError] = useState(false);
  const { t, isRTL, locale } = useLanguage();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setLoading(true);
    setResult(null);
    setNotFound(false);
    setLookupError(false);

    try {
      const res = await fetch(`/api/warranty?code=${encodeURIComponent(code.trim())}`);
      if (res.status === 404) {
        setNotFound(true);
        return;
      }
      if (!res.ok) throw new Error(`Warranty lookup failed (${res.status})`);
      const { certificate } = await res.json();
      setResult(certificate);
    } catch (error) {
      console.error('Error verifying warranty:', error);
      setLookupError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className={`py-20 lg:py-28 bg-gradient-to-b from-[#FFFFFF] via-[#F6F8F5] to-[#FFFFFF] overflow-hidden ${
        isRTL ? 'text-right' : 'text-left'
      }`}
      id="warranty-verify"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 bg-[#033F2D]/10 text-[#033F2D] px-4 py-1.5 rounded-full text-xs font-bold">
            <Award className="w-4 h-4 text-[#059669]" />
            <span>{t.warrantyBadge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#033F2D] tracking-tight">
            {t.warrantyHeadline}
          </h2>
          <p className="text-[#484C44] text-base max-w-2xl mx-auto leading-relaxed">
            {t.warrantyDesc}
          </p>
        </div>

        {/* Search Box */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-gray-100 mb-8">
          <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <span
                className={`absolute ${
                  isRTL ? 'right-4' : 'left-4'
                } top-1/2 -translate-y-1/2 text-gray-400`}
              >
                <Search className="w-5 h-5" />
              </span>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder={t.warrantyInputPlaceholder}
                className={`w-full ${
                  isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'
                } py-4 rounded-2xl bg-[#F6F8F5] border border-gray-200 text-base font-bold text-[#033F2D] focus:outline-none focus:border-[#033F2D] focus:bg-white transition-all uppercase tracking-wider ${
                  isRTL ? 'text-right' : 'text-left'
                }`}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#C7F268] hover:bg-[#b5e050] text-[#033F2D] py-4 px-8 text-base font-bold rounded-2xl inline-flex items-center justify-center gap-2 shadow-lg cursor-pointer shrink-0 transition-transform hover:scale-[1.02]"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-[#033F2D] border-t-transparent rounded-full animate-spin" />
                  <span>{locale === 'en' ? 'Verifying...' : 'جاري التحقق...'}</span>
                </>
              ) : (
                <>
                  <span>{t.warrantyVerifyBtn}</span>
                  <ShieldCheck className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Display */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-3xl shadow-2xl border-2 border-emerald-500 overflow-hidden"
            >
              {/* Certificate Header Banner */}
              <div
                className={`bg-[#033F2D] text-white p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative overflow-hidden ${
                  isRTL ? 'text-right' : 'text-left'
                }`}
              >
                <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-[#C7F268]/10 rounded-full blur-2xl pointer-events-none" />
                <div>
                  <div className="inline-flex items-center gap-2 bg-[#C7F268] text-[#033F2D] px-3 py-1 rounded-full text-xs font-black mb-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{t.warrantyCertTitle}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black">
                    {locale === 'en'
                      ? 'Technical Specialized Center Egypt'
                      : 'المركز الفني المتخصص لمكافحة الحشرات'}
                  </h3>
                  <p className="text-xs text-white/70 mt-1 font-mono">
                    {locale === 'en' ? 'Certificate Code:' : 'كود الشهادة:'} {result.code}
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20 text-center shrink-0">
                  <span className="text-[11px] text-[#C7F268] font-bold block mb-0.5">
                    {t.warrantyStatusLabel}
                  </span>
                  <span className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    {t.warrantyActiveStatus}
                  </span>
                </div>
              </div>

              {/* Certificate Body */}
              <div className="p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-4 rounded-2xl bg-[#F6F8F5] border border-gray-100 flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#033F2D] text-[#C7F268] flex items-center justify-center shrink-0">
                      <Wrench className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 font-bold block">
                        {t.warrantyServiceLabel}
                      </span>
                      <p className="text-base font-bold text-[#033F2D] mt-0.5">
                        {result.serviceType}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F6F8F5] border border-gray-100 flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#033F2D] text-[#C7F268] flex items-center justify-center shrink-0">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 font-bold block">
                        {t.warrantyPeriodLabel}
                      </span>
                      <p className="text-sm font-bold text-[#033F2D] mt-0.5" dir="ltr">
                        {result.issueDate} ➔ {result.expiryDate}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="bg-[#C7F268]/20 text-[#033F2D] px-4 py-2 rounded-xl font-bold border border-[#C7F268]">
                    ✓ {locale === 'en' ? 'Verified in the warranty database' : 'موثق رسميًا في قاعدة بيانات الضمان'}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {lookupError && (
            <p role="alert" className="rounded-xl bg-amber-50 p-4 text-center text-amber-900">
              {locale === 'en' ? 'Could not verify the warranty. Please try again.' : 'تعذّر التحقق من الضمان. حاول مرة أخرى.'}
            </p>
          )}
          {notFound && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-amber-50 border-2 border-amber-200 rounded-3xl p-6 sm:p-8 text-center space-y-3"
            >
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-black text-amber-900">{t.warrantyNotFoundTitle}</h4>
              <p className="text-sm text-amber-700 max-w-md mx-auto">
                {t.warrantyNotFoundDesc}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
