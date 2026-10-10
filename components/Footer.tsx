'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Phone, Clock, ArrowLeft, CheckCircle2, MessageCircle, MapPin } from 'lucide-react';
import { SITE_INFO, SERVICES_DATA } from '@/lib/siteData';
import { company } from '@/lib/company';
import Logo from '@/components/Logo';

export default function Footer() {
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryPhone) return;
    // Redirect to WhatsApp with pre-filled message
    const msg = encodeURIComponent(`مرحباً، أود الاستفسار عن خدمة مكافحة الحشرات. رقم هاتفي للمتابعة: ${inquiryPhone}`);
    window.open(`${company.whatsappUrl}?text=${msg}`, '_blank');
    setSubmitted(true);
    setTimeout(() => {
      setInquiryPhone('');
      setSubmitted(false);
    }, 4000);
  };

  return (
    <footer className="bg-[#022A1E] text-white pt-16 pb-8 border-t border-white/10 relative overflow-hidden text-right">
      {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C7F268]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C7F268]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top 3 Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-14 border-b border-white/10">
          {/* WhatsApp Card */}
          <a
            href={company.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#25D366] transition-all group"
          >
            <div className="w-14 h-14 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform">
              <MessageCircle className="w-7 h-7 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-[#C7F268] font-bold">تواصل واتساب مباشر:</span>
              <span className="block text-lg font-black text-white group-hover:text-[#25D366] transition-colors mt-0.5" dir="ltr">
                {company.whatsapp}
              </span>
            </div>
          </a>

          {/* Primary Phone Card */}
          <a
            href={company.phonePrimaryRaw}
            className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#C7F268]/50 transition-all group"
          >
            <div className="w-14 h-14 rounded-xl bg-[#C7F268] text-[#033F2D] flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform">
              <Phone className="w-7 h-7 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-[#C7F268] font-bold">اتصال هاتفي مباشر:</span>
              <span className="block text-lg font-black text-white group-hover:text-[#C7F268] transition-colors mt-0.5" dir="ltr">
                {company.phonePrimary}
              </span>
              <span className="block text-xs text-white/70 mt-0.5" dir="ltr">
                أو: {company.phoneSecondary}
              </span>
            </div>
          </a>

          {/* Working Area & Hours Card */}
          <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#C7F268]/50 transition-colors">
            <div className="w-14 h-14 rounded-xl bg-[#033F2D] text-[#C7F268] border border-[#C7F268]/30 flex items-center justify-center shrink-0">
              <MapPin className="w-7 h-7 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-[#C7F268] font-bold">نطاق التغطية والمواعيد:</span>
              <p className="text-sm font-bold text-white mt-0.5">القاهرة الكبرى والجيزة ومحافظات مصر</p>
              <p className="text-xs text-white/70 mt-0.5">{company.workingHours}</p>
            </div>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 py-14">
          {/* Column 1: Brand & Contact (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block" aria-label={company.name}>
              <Logo variant="light" />
            </Link>
            <p className="text-white/80 text-sm leading-relaxed max-w-sm">
              {company.description}
            </p>
            <div className="pt-2">
              <div className="flex flex-wrap gap-2 text-xs">
                <a
                  href={company.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 bg-[#25D366] text-white font-bold px-3 py-2 rounded-lg hover:bg-[#20ba59] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>محادثة واتساب سريعة</span>
                </a>
                <a
                  href={company.phonePrimaryRaw}
                  className="inline-flex items-center gap-1.5 bg-white/10 text-white font-bold px-3 py-2 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#C7F268]" />
                  <span>اتصل الآن</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (2.5 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-base font-bold text-white border-b-2 border-[#C7F268] inline-block pb-1">
              روابط سريعة
            </h4>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li>
                <Link href="/" className="hover:text-[#C7F268] transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-[#C7F268] transition-colors">
                  عن المركز
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#C7F268] transition-colors">
                  خدمات المكافحة
                </Link>
              </li>
              <li>
                <Link href="/pest-identifier" className="text-[#C7F268] font-bold hover:underline transition-colors flex items-center gap-1.5">
                  <span>أداة تشخيص الحشرات</span>
                  <span className="text-[10px] px-1.5 py-0.2 bg-[#C7F268] text-[#033F2D] rounded-full font-black">جديد</span>
                </Link>
              </li>
              <li>
                <Link href="/warranty-verification" className="text-[#C7F268] font-bold hover:underline transition-colors flex items-center gap-1.5">
                  <span>التحقق من الضمان الإلكتروني</span>
                  <span className="text-[10px] px-1.5 py-0.2 bg-[#C7F268] text-[#033F2D] rounded-full font-black">معتمد</span>
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-[#C7F268] transition-colors">
                  أعمال ميدانية
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-[#C7F268] transition-colors">
                  الأسئلة الشائعة
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-[#C7F268] transition-colors">
                  تواصل معنا
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services (2.5 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-base font-bold text-white border-b-2 border-[#C7F268] inline-block pb-1">
              خدمات المكافحة
            </h4>
            <ul className="space-y-2.5 text-sm text-white/80">
              {SERVICES_DATA.slice(0, 6).map((srv) => (
                <li key={srv.id}>
                  <Link
                    href={`/services/${srv.slug}`}
                    className="hover:text-[#C7F268] transition-colors flex items-center gap-1.5"
                  >
                    <span>{srv.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Quick callback / Inquiry (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-base font-bold text-white border-b-2 border-[#C7F268] inline-block pb-1">
              طلب اتصال سريع
            </h4>
            <p className="text-sm text-white/80 leading-relaxed">
              اترك رقم هاتفك وسيقوم فني متخصص بالتواصل معك فوراً لتحديد نوع الحشرة وخطة المكافحة المناسبة.
            </p>

            <form onSubmit={handleInquiry} className="space-y-3">
              <div className="relative">
                <input
                  type="tel"
                  value={inquiryPhone}
                  onChange={(e) => setInquiryPhone(e.target.value)}
                  placeholder="أدخل رقم هاتفك (مثال: 010...)"
                  dir="ltr"
                  required
                  className="w-full bg-white/10 text-white placeholder-white/50 text-sm px-4 py-3 rounded-xl border border-white/20 focus:outline-none focus:border-[#C7F268] transition-colors text-right"
                />
              </div>
              <button
                type="submit"
                className="w-full btn-default py-3 text-sm flex items-center justify-center gap-2 font-bold"
              >
                <span>طلب اتصال ومعاينة</span>
                <ArrowLeft className="w-4 h-4 mr-1" />
              </button>

              {submitted && (
                <div className="flex items-center gap-2 text-[#C7F268] text-xs font-bold pt-1 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>تم تحويل طلبك، نتواصل معك في أقرب وقت.</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Policy */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© {new Date().getFullYear()} {company.name}. جميع الحقوق محفوظة لخدمات مكافحة الحشرات في مصر.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-[#C7F268] transition-colors">
              سياسة الخصوصية
            </Link>
            <Link href="/terms-conditions" className="hover:text-[#C7F268] transition-colors">
              الشروط والأحكام
            </Link>
            <Link href="/faqs" className="hover:text-[#C7F268] transition-colors">
              الأسئلة الشائعة
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
