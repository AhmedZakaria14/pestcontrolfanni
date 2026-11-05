'use client';

import { useState } from 'react';
import { X, CheckCircle2, PhoneCall, ArrowLeft, ArrowRight, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { useBookingSubmission } from '@/hooks/useBookingSubmission';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
  initialService?: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  defaultService,
  initialService: propInitialService,
}: BookingModalProps) {
  const { t, company, siteData, isRTL, locale } = useLanguage();

  const chosenService =
    propInitialService || defaultService || siteData.services[0]?.title || (locale === 'en' ? 'Residential Pest Control' : 'مكافحة حشرات المنازل والفلل');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: chosenService,
    area: '',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const { submit, isSubmitting, error: bookingError } = useBookingSubmission(locale);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!(await submit({
      name: formData.name,
      phone: formData.phone,
      service: formData.service,
      area: formData.area,
      notes: formData.notes,
      source: 'Popup Booking Modal',
    }))) return;
    setSubmitted(true);
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 ${
        isRTL ? 'text-right' : 'text-left'
      }`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#033F2D] text-white p-6 relative">
          <button
            onClick={onClose}
            className={`absolute top-5 ${
              isRTL ? 'left-5' : 'right-5'
            } text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer`}
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C7F268]/20 text-[#C7F268] text-xs font-bold rounded-full tracking-wider mb-2">
            {t.bookingBadge}
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">{company.name}</h3>
          <p className="text-white/80 text-xs sm:text-sm mt-1">
            {t.bookingSubtitlePrompt}:{' '}
            <a
              href={company.phonePrimaryRaw}
              dir="ltr"
              className="text-[#C7F268] font-bold underline inline-block"
            >
              {company.phonePrimary}
            </a>{' '}
            {locale === 'en' ? 'or via' : 'أو عبر'}{' '}
            <a
              href={company.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[#25D366] font-bold underline inline-block"
            >
              WhatsApp
            </a>
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-[#C7F268]/30 text-[#033F2D] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-[#033F2D]">{t.bookingSuccessTitle}</h4>
              <p className="text-[#484C44] max-w-md mx-auto text-sm leading-relaxed">
                {t.bookingSuccessDesc(formData.name, formData.phone)}
              </p>
              <div className="pt-2 flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#C7F268] text-[#033F2D] font-bold text-sm hover:bg-[#b5e050] transition-colors cursor-pointer"
                >
                  {t.bookingCloseBtn}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {bookingError && <p role="alert" className="text-sm text-red-500">{bookingError}</p>}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#033F2D] tracking-wider mb-1">
                    {t.bookingNameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t.bookingNamePlaceholder}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#033F2D] focus:ring-1 focus:ring-[#033F2D] outline-none text-sm ${
                      isRTL ? 'text-right' : 'text-left'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#033F2D] tracking-wider mb-1">
                    {t.bookingPhoneLabel}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder={t.bookingPhonePlaceholder}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#033F2D] focus:ring-1 focus:ring-[#033F2D] outline-none text-sm text-left"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#033F2D] tracking-wider mb-1">
                    {t.bookingServiceLabel}
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#033F2D] focus:ring-1 focus:ring-[#033F2D] outline-none text-sm bg-white ${
                      isRTL ? 'text-right' : 'text-left'
                    }`}
                  >
                    {siteData.services.map((srv) => (
                      <option key={srv.id} value={srv.title}>
                        {srv.title}
                      </option>
                    ))}
                    <option
                      value={locale === 'en' ? 'Comprehensive Pest Control Booking' : 'حجز فحص ومكافحة شاملة'}
                    >
                      {locale === 'en' ? 'Comprehensive Pest Control Booking' : 'حجز فحص ومكافحة شاملة'}
                    </option>
                    <option
                      value={locale === 'en' ? 'Emergency Rapid Pest Control' : 'مكافحة طارئة وفورية'}
                    >
                      {locale === 'en' ? 'Emergency Rapid Extermination' : 'مكافحة طارئة وفورية'}
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#033F2D] tracking-wider mb-1">
                    {t.bookingAreaLabel}
                  </label>
                  <input
                    type="text"
                    placeholder={t.bookingAreaPlaceholder}
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#033F2D] focus:ring-1 focus:ring-[#033F2D] outline-none text-sm ${
                      isRTL ? 'text-right' : 'text-left'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#033F2D] tracking-wider mb-1">
                  {t.bookingNotesLabel}
                </label>
                <textarea
                  rows={2}
                  placeholder={t.bookingNotesPlaceholder}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#033F2D] focus:ring-1 focus:ring-[#033F2D] outline-none text-sm resize-none ${
                    isRTL ? 'text-right' : 'text-left'
                  }`}
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-gray-500 flex items-center gap-1.5 order-2 sm:order-1">
                  <PhoneCall className="w-3.5 h-3.5 text-[#033F2D]" />
                  <span>{t.directPhoneOrWhatsapp}</span>
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#C7F268] hover:bg-[#b5e050] text-[#033F2D] font-bold py-2.5 px-6 rounded-xl text-sm w-full sm:w-auto order-1 sm:order-2 flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md"
                >
                  <span>{t.bookingSubmitBtn}</span>
                  {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
