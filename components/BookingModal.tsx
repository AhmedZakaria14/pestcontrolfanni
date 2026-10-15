'use client';

import { useState } from 'react';
import { X, CheckCircle2, PhoneCall, ArrowLeft, ArrowRight, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

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

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const message =
      locale === 'en'
        ? `*New Pest Control Inspection Request:*
• *Name:* ${formData.name}
• *Phone:* ${formData.phone}
• *Service:* ${formData.service}
• *City / Area:* ${formData.area || 'Not specified'}
• *Problem Details:* ${formData.notes || 'None'}`
        : `*طلب خدمة مكافحة جديدة عبر الموقع:*
• *الاسم:* ${formData.name}
• *رقم الهاتف:* ${formData.phone}
• *نوع الخدمة:* ${formData.service}
• *المنطقة/المحافظة:* ${formData.area || 'غير محدد'}
• *تفاصيل المشكلة:* ${formData.notes || 'لا توجد ملاحظات إضافية'}`;

    const waUrl = `${company.whatsappUrl}?text=${encodeURIComponent(message)}`;
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 600);
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
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`${company.whatsappUrl}?text=${encodeURIComponent(
                    locale === 'en'
                      ? `Hello, I am ${formData.name}, confirming my request for ${formData.service}`
                      : `مرحباً، أنا ${formData.name}، أود تأكيد طلبي لخدمة ${formData.service}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#20ba59] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t.bookingOpenWhatsappBtn}</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-bold text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  {t.bookingCloseBtn}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
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
                      value={locale === 'en' ? 'General Full Inspection' : 'معاينة وفحص عام شامل'}
                    >
                      {locale === 'en' ? 'General Comprehensive Inspection' : 'معاينة وفحص عام شامل'}
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
