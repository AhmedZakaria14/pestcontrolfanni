'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import { SERVICES_DATA } from '@/lib/siteData';
import { company } from '@/lib/company';
import { Phone, MapPin, CheckCircle2, Send, ShieldCheck, MessageCircle, Clock } from 'lucide-react';

export default function ContactUsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    area: '',
    service: SERVICES_DATA[0]?.title || 'مكافحة حشرات المنازل والفلل',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const msg = `*طلب اتصال ومعاينة جديد:*
• *الاسم:* ${formData.name}
• *الهاتف:* ${formData.phone}
• *المنطقة/المحافظة:* ${formData.area || 'غير محدد'}
• *نوع الخدمة:* ${formData.service}
• *تفاصيل المشكلة:* ${formData.message || 'لا توجد ملاحظات إضافية'}`;

    setTimeout(() => {
      window.open(`${company.whatsappUrl}?text=${encodeURIComponent(msg)}`, '_blank');
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-right" dir="rtl">
      <Header />

      <main className="flex-1">
        <PageBanner
          title="تواصل معنا"
          breadcrumbs={[{ label: 'تواصل معنا' }]}
        />

        <div className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Top 3 Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {/* WhatsApp Card */}
              <a
                href={company.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="p-8 rounded-3xl bg-[#F6F8F5] border border-gray-100 flex items-start gap-4 hover:shadow-lg hover:border-[#25D366] transition-all text-right group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs uppercase font-bold text-[#25D366] tracking-wider block">
                    محادثة واتساب فورية
                  </span>
                  <span dir="ltr" className="text-xl font-black text-[#033F2D] block">
                    {company.whatsapp}
                  </span>
                  <p className="text-xs text-gray-500">انقر لفتح محادثة واتساب مباشرة مع الفني</p>
                </div>
              </a>

              {/* Phone Card */}
              <div className="p-8 rounded-3xl bg-[#F6F8F5] border border-gray-100 flex items-start gap-4 hover:shadow-lg transition-all text-right">
                <div className="w-14 h-14 rounded-2xl bg-[#033F2D] text-[#C7F268] flex items-center justify-center shrink-0 shadow-md">
                  <Phone className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs uppercase font-bold text-gray-500 tracking-wider block">
                    الاتصال الهاتفي المباشر
                  </span>
                  <a
                    href={company.phonePrimaryRaw}
                    dir="ltr"
                    className="text-lg font-black text-[#033F2D] hover:underline block"
                  >
                    {company.phonePrimary}
                  </a>
                  <a
                    href={company.phoneSecondaryRaw}
                    dir="ltr"
                    className="text-sm font-bold text-[#033F2D]/80 hover:underline block"
                  >
                    خط إضافي: {company.phoneSecondary}
                  </a>
                </div>
              </div>

              {/* Area & Hours Card */}
              <div className="p-8 rounded-3xl bg-[#F6F8F5] border border-gray-100 flex items-start gap-4 hover:shadow-lg transition-all text-right">
                <div className="w-14 h-14 rounded-2xl bg-[#033F2D] text-[#C7F268] flex items-center justify-center shrink-0 shadow-md">
                  <MapPin className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs uppercase font-bold text-gray-500 tracking-wider block">
                    نطاق الخدمة وساعات العمل
                  </span>
                  <p className="text-sm font-bold text-[#033F2D] leading-snug">
                    {company.coverage}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#033F2D]" />
                    <span>{company.workingHours}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Form & Direct Contact Cards Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Form (7 cols) */}
              <div className="lg:col-span-7 bg-[#F6F8F5] p-8 sm:p-10 rounded-3xl border border-gray-100 shadow-sm space-y-6 text-right">
                <div>
                  <span className="section-subtitle">
                    <span>طلب معاينة فنية</span>
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#033F2D] mt-2">
                    أرسل تفاصيل المشكرة وسنتواصل معك فوراً
                  </h3>
                  <p className="text-xs sm:text-sm text-[#484C44] mt-1">
                    املأ البيانات أدناه ليقوم الفني المختص بالتواصل معك وتحديد الإجراء الأنسب.
                  </p>
                </div>

                {submitted ? (
                  <div className="p-8 bg-[#033F2D] text-white rounded-2xl text-center space-y-3">
                    <CheckCircle2 className="w-12 h-12 text-[#C7F268] mx-auto" />
                    <h4 className="text-xl font-bold">تم تسجيل طلبك وجارٍ نقلك للواتساب!</h4>
                    <p className="text-sm text-white/80 max-w-md mx-auto">
                      شكراً لك يا <span className="text-[#C7F268] font-bold">{formData.name}</span>. يمكنك أيضاً التواصل معنا هاتفياً مباشرة على <span className="font-bold" dir="ltr">{company.phonePrimary}</span>.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#033F2D] mb-1">
                          الاسم الكريم *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="الاسم بالكامل"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white outline-none focus:border-[#033F2D] text-right"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#033F2D] mb-1">
                          رقم الهاتف (مصر) *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="010XXXXXXXX"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white outline-none focus:border-[#033F2D] text-right"
                          dir="ltr"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#033F2D] mb-1">
                          نوع الخدمة أو الحشرة *
                        </label>
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white outline-none focus:border-[#033F2D] text-right"
                        >
                          {SERVICES_DATA.map((s) => (
                            <option key={s.id} value={s.title}>
                              {s.title}
                            </option>
                          ))}
                          <option value="معاينة وفحص عام شامل">معاينة وفحص عام شامل</option>
                          <option value="مكافحة طارئة وفورية">مكافحة طارئة وفورية</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#033F2D] mb-1">
                          المنطقة أو المحافظة
                        </label>
                        <input
                          type="text"
                          placeholder="القاهرة، الجيزة، الإسكندرية..."
                          value={formData.area}
                          onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white outline-none focus:border-[#033F2D] text-right"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#033F2D] mb-1">
                        تفاصيل الإصابة أو نوع المكان
                      </label>
                      <textarea
                        rows={3}
                        placeholder="صف لنا مشكلة الآفات، نوع العقار (شقة، فيلا، مطعم، مخزن)..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white outline-none focus:border-[#033F2D] resize-none text-right"
                      />
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                      <button type="submit" className="btn-default py-3.5 px-8 font-bold text-sm cursor-pointer w-full sm:w-auto inline-flex items-center justify-center gap-2">
                        <Send className="w-4 h-4 ml-1" />
                        <span>إرسال وتأكيد الطلب</span>
                      </button>
                      <a
                        href={company.whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 px-6 rounded-xl font-bold text-sm hover:bg-[#20ba59] transition-colors w-full sm:w-auto"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>محادثة واتساب مباشرة</span>
                      </a>
                    </div>
                  </form>
                )}
              </div>

              {/* Service Details Card (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="p-8 rounded-3xl bg-[#033F2D] text-white shadow-xl space-y-6 text-right">
                  <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                    <ShieldCheck className="w-8 h-8 text-[#C7F268] shrink-0" />
                    <div>
                      <h4 className="font-bold text-base text-white">{company.name}</h4>
                      <p className="text-xs text-white/70">جمهورية مصر العربية</p>
                    </div>
                  </div>

                  <div className="space-y-4 text-xs sm:text-sm text-white/85 leading-relaxed">
                    <p>
                      نحن مستعدون لتلبية طلبات الفحص والمعالجة في جميع أنحاء القاهرة الكبرى والجيزة ومحافظات مصر.
                    </p>
                    <ul className="space-y-2.5">
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#C7F268]" />
                        <span>مكافحة الصراصير بالجل الألماني والأمريكي بدون روائح</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#C7F268]" />
                        <span>جلسات متخصصة لحشرة بق الفراش والقضاء على البيض</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#C7F268]" />
                        <span>معالجة النمل الأبيض للأبواب والأساسات والباركيه</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#C7F268]" />
                        <span>محطات طعوم آمنة ومصائد متطورة للقوارض والفئران</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
                    <span className="text-xs font-bold text-[#C7F268]">تواصل سريع ومباشر:</span>
                    <a
                      href={company.phonePrimaryRaw}
                      className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-between"
                      dir="ltr"
                    >
                      <span className="text-sm font-black text-white">{company.phonePrimary}</span>
                      <span className="text-xs text-[#C7F268] font-bold">اتصال هاتفي</span>
                    </a>
                    <a
                      href={company.whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/40 transition-colors flex items-center justify-between"
                      dir="ltr"
                    >
                      <span className="text-sm font-black text-[#25D366]">{company.whatsapp}</span>
                      <span className="text-xs text-[#25D366] font-bold">محادثة واتساب</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
