'use client';

import { useState } from 'react';
import { Phone, CheckCircle2, MessageCircle } from 'lucide-react';
import { SERVICES_DATA } from '@/lib/siteData';
import { company } from '@/lib/company';
import ScrollReveal from '@/components/animations/ScrollReveal';

export default function InspectionBarSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    area: '',
    service: SERVICES_DATA[0]?.title || 'مكافحة حشرات المنازل والفلل',
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    const text = encodeURIComponent(
      `طلب معاينة وخدمة مكافحة:\n• الاسم: ${formData.name}\n• الهاتف: ${formData.phone}\n• المنطقة: ${formData.area || 'غير محدد'}\n• الخدمة: ${formData.service}`
    );
    setTimeout(() => {
      window.open(`${company.whatsappUrl}?text=${text}`, '_blank');
      setSuccess(false);
      setFormData({
        name: '',
        phone: '',
        area: '',
        service: SERVICES_DATA[0]?.title || 'مكافحة حشرات المنازل والفلل',
      });
    }, 1200);
  };

  return (
    <section className="relative z-20 -mt-10 sm:-mt-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
      <ScrollReveal direction="up" duration={0.7} distance={25}>
        <div className="bg-[#FFFFFF] rounded-2xl shadow-2xl border border-gray-100 p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Title & Callout (4 cols) */}
            <div className="lg:col-span-4 space-y-3 lg:border-l lg:border-gray-200 lg:pl-6">
              <span className="text-xs font-bold tracking-wider text-[#033F2D] bg-[#C7F268]/40 px-3 py-1 rounded-full inline-block">
                طلب معاينة وتحديد الخطة المناسبة
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#033F2D] leading-tight">
                تواصل مباشرة مع فنيي المكافحة
              </h3>
              <p className="text-xs sm:text-sm text-[#484C44] leading-relaxed">
                خدمة تغطي القاهرة الكبرى والجيزة ومحافظات مصر مع استجابة سريعة.
              </p>

              <div className="pt-2 flex flex-wrap gap-2">
                <a
                  href={company.phonePrimaryRaw}
                  className="inline-flex items-center gap-2.5 p-2.5 px-3.5 rounded-xl bg-[#033F2D] text-white hover:bg-[#022a1e] transition-colors text-xs font-bold"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#C7F268] text-[#033F2D] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-white/70">اتصال مباشر:</span>
                    <span className="text-sm font-bold text-[#C7F268]" dir="ltr">{company.phonePrimary}</span>
                  </div>
                </a>

                <a
                  href={company.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 p-2.5 px-3.5 rounded-xl bg-[#25D366] text-white hover:bg-[#20ba59] transition-colors text-xs font-bold"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>محادثة واتساب</span>
                </a>
              </div>
            </div>

            {/* Live Form (8 cols) */}
            <div className="lg:col-span-8 lg:pr-2">
              {success ? (
                <div className="p-6 rounded-xl bg-[#033F2D] text-white text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-[#C7F268] mx-auto" />
                  <h4 className="text-lg font-bold text-white">تم استلام طلبك وجارٍ فتح محادثة الواتساب!</h4>
                  <p className="text-xs text-white/80 max-w-md mx-auto">
                    شكراً لك يا <span className="text-[#C7F268] font-bold">{formData.name}</span>. سيقوم الفني المختص بمتابعة التفاصيل معك فوراً.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#033F2D] mb-1">
                        الاسم الكريم *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="محمد علي"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#033F2D] focus:ring-1 focus:ring-[#033F2D] outline-none text-right"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#033F2D] mb-1">
                        رقم الهاتف *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="010XXXXXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#033F2D] focus:ring-1 focus:ring-[#033F2D] outline-none text-right"
                        dir="ltr"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#033F2D] mb-1">
                        المنطقة / المحافظة
                      </label>
                      <input
                        type="text"
                        placeholder="القاهرة، الجيزة..."
                        value={formData.area}
                        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#033F2D] focus:ring-1 focus:ring-[#033F2D] outline-none text-right"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#033F2D] mb-1">
                        نوع الخدمة *
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#033F2D] focus:ring-1 focus:ring-[#033F2D] outline-none bg-white text-right"
                      >
                        {SERVICES_DATA.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                        <option value="معاينة وفحص عام شامل">معاينة وفحص عام</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end pt-1">
                    <button
                      type="submit"
                      className="btn-default py-2.5 px-6 font-bold text-sm shadow-md cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <span>إرسال طلب المعاينة</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
