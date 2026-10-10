'use client';

import { useState } from 'react';
import { X, CheckCircle2, PhoneCall, ArrowLeft, MessageCircle } from 'lucide-react';
import { SERVICES_DATA } from '@/lib/siteData';
import { company } from '@/lib/company';

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
  const chosenService = propInitialService || defaultService || SERVICES_DATA[0]?.title || 'مكافحة حشرات المنازل والفلل';
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
    // Prepare WhatsApp message
    const message = `*طلب خدمة مكافحة جديدة عبر الموقع:*
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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 text-right">
      <div
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#033F2D] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 left-5 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C7F268]/20 text-[#C7F268] text-xs font-bold rounded-full tracking-wider mb-2">
            طلب معاينة وخدمة مكافحة
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">المركز الفني المتخصص لمكافحة الحشرات</h3>
          <p className="text-white/80 text-xs sm:text-sm mt-1">
            للتواصل المباشر والسريع: اتصل بنا على{' '}
            <a href={company.phonePrimaryRaw} dir="ltr" className="text-[#C7F268] font-bold underline inline-block">
              {company.phonePrimary}
            </a>
            {' '}أو{' '}
            <a href={company.whatsappUrl} target="_blank" rel="noreferrer" className="text-[#25D366] font-bold underline inline-block">
              واتساب
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
              <h4 className="text-xl font-bold text-[#033F2D]">تم تسجيل طلبك وجارٍ تحويلك للواتساب!</h4>
              <p className="text-[#484C44] max-w-md mx-auto text-sm leading-relaxed">
                شكراً لك يا <span className="font-bold">{formData.name}</span>. تم تجهيز تفاصيل طلبك لمتابعتها مع الفني المختص مباشرة عبر الواتساب أو الاتصال الهاتفي على <span className="font-bold" dir="ltr">{formData.phone}</span>.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`${company.whatsappUrl}?text=${encodeURIComponent(`مرحباً، أنا ${formData.name}، أود تأكيد طلبي لخدمة ${formData.service}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#20ba59] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>فتح محادثة الواتساب</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-bold text-sm hover:bg-gray-200 transition-colors"
                >
                  إغلاق
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#033F2D] tracking-wider mb-1">
                    الاسم بالكامل *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: محمد علي"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#033F2D] focus:ring-1 focus:ring-[#033F2D] outline-none text-sm text-right"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#033F2D] tracking-wider mb-1">
                    رقم الهاتف (مصر) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="010XXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#033F2D] focus:ring-1 focus:ring-[#033F2D] outline-none text-sm text-right"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#033F2D] tracking-wider mb-1">
                    نوع الخدمة المطلوبة *
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#033F2D] focus:ring-1 focus:ring-[#033F2D] outline-none text-sm bg-white text-right"
                  >
                    {SERVICES_DATA.map((srv) => (
                      <option key={srv.id} value={srv.title}>
                        {srv.title}
                      </option>
                    ))}
                    <option value="معاينة وفحص عام شامل">معاينة وفحص عام شامل</option>
                    <option value="مكافحة طارئة وفورية">مكافحة طارئة وفورية</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#033F2D] tracking-wider mb-1">
                    المنطقة أو المحافظة
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: التجمع، مدينة نصر، الشيخ زايد..."
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#033F2D] focus:ring-1 focus:ring-[#033F2D] outline-none text-sm text-right"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#033F2D] tracking-wider mb-1">
                  ملاحظات أو نوع الحشرة الملاحظة (اختياري)
                </label>
                <textarea
                  rows={2}
                  placeholder="صِف المشكلة (مثال: صراصير في المطبخ، بق فراش في غرفة النوم، نمل أبيض...)"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#033F2D] focus:ring-1 focus:ring-[#033F2D] outline-none text-sm resize-none text-right"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-gray-500 flex items-center gap-1.5 order-2 sm:order-1">
                  <PhoneCall className="w-3.5 h-3.5 text-[#033F2D]" /> تواصل فوري مباشر عبر الهاتف أو الواتساب
                </span>
                <button type="submit" className="btn-default py-2.5 px-6 text-sm w-full sm:w-auto order-1 sm:order-2 font-bold">
                  <span>إرسال وتأكيد الطلب</span>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
