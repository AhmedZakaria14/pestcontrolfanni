'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import AboutSection from '@/components/home2/AboutSection';
import WhyChooseUs from '@/components/home2/WhyChooseUs';
import BookingModal from '@/components/BookingModal';
import {
  ShieldCheck,
  Award,
  Users,
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  Phone,
  CheckCircle2,
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

export default function AboutUsPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const { t, company, isRTL, locale, dir } = useLanguage();

  return (
    <div
      className={`min-h-screen flex flex-col bg-white ${
        isRTL ? 'text-right' : 'text-left'
      }`}
      dir={dir}
    >
      <Header />

      <main className="flex-1">
        <PageBanner
          title={t.navAbout}
          breadcrumbs={[{ label: t.navAbout }]}
        />

        {/* About Main Component */}
        <AboutSection />

        {/* Value Focus Band */}
        <section className="py-14 bg-[#033F2D] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ${
                isRTL ? 'text-right' : 'text-left'
              }`}
            >
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <ShieldCheck className="w-8 h-8 text-[#C7F268]" />
                <h3 className="text-base font-bold text-white">
                  {locale === 'en' ? 'Certified Odorless Formulations' : 'مبيدات معتمدة ومصرحة'}
                </h3>
                <p className="text-xs text-white/70 leading-relaxed">
                  {locale === 'en'
                    ? 'Official eco-compliant compounds safe for kitchens, children, and pets.'
                    : 'نستخدم مركبات مطابقة للمواصفات الصحية الرسمية عديمة الرائحة وآمنة تماماً للمنازل والمطابخ.'}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <CheckCircle2 className="w-8 h-8 text-[#C7F268]" />
                <h3 className="text-base font-bold text-white">
                  {locale === 'en' ? 'No Need to Vacate Property' : 'بدون مغادرة المنزل'}
                </h3>
                <p className="text-xs text-white/70 leading-relaxed">
                  {locale === 'en'
                    ? 'Targeted spot-gel injection with zero disturbance to your daily household routine.'
                    : 'تطبيق فني دقيق بتقنيات الجل النقطي والحقن الموجه دون الحاجة لإخلاء المنزل أو إفراغ الأواني.'}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <Users className="w-8 h-8 text-[#C7F268]" />
                <h3 className="text-base font-bold text-white">
                  {locale === 'en' ? 'Experienced Certified Engineers' : 'فريق فني متمرس'}
                </h3>
                <p className="text-xs text-white/70 leading-relaxed">
                  {locale === 'en'
                    ? 'Engineers trained in pest life cycles, bed bug detection, and termite colony eradication.'
                    : 'فنيون مدربون على تمييز أطوار الحشرات ومسارات النمل الأبيض وبق الفراش والقوارض.'}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <Award className="w-8 h-8 text-[#C7F268]" />
                <h3 className="text-base font-bold text-white">
                  {locale === 'en' ? 'Egypt-Wide Coverage' : 'تغطية محافظات مصر'}
                </h3>
                <p className="text-xs text-white/70 leading-relaxed">
                  {locale === 'en'
                    ? 'Rapid response teams serving Greater Cairo, Giza, and all Egyptian governorates.'
                    : 'استجابة سريعة تغطي القاهرة الكبرى والجيزة ومختلف محافظات جمهورية مصر العربية.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* Mission & Vision Section */}
        <section className="py-20 bg-[#F6F8F5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
              <span className="text-xs font-bold tracking-wider text-[#033F2D] bg-[#C7F268]/40 px-3 py-1 rounded-full inline-block">
                {locale === 'en' ? 'Our Principles' : 'مبادئ عملنا'}
              </span>
              <h2 className="text-3xl font-black text-[#033F2D]">
                {locale === 'en' ? 'Vision, Mission & Core Values' : 'رؤيتنا ورسالتنا في خدمة العميل'}
              </h2>
            </div>

            <div
              className={`grid grid-cols-1 md:grid-cols-3 gap-8 ${
                isRTL ? 'text-right' : 'text-left'
              }`}
            >
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#033F2D] text-[#C7F268] flex items-center justify-center font-bold">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#033F2D]">
                  {locale === 'en' ? 'Our Mission' : 'رسالتنا'}
                </h3>
                <p className="text-sm text-[#484C44] leading-relaxed">
                  {locale === 'en'
                    ? 'Delivering safe, scientifically grounded pest eradication across Egyptian residences and enterprises while strictly safeguarding people, children, and pets.'
                    : 'تقديم حلول مكافحة حشرات وقوارض آمنة ومدروسة علمياً للمنازل والمنشآت المصرية، مع الحفاظ الكامل على سلامة المقيمين والأطفال والحيوانات الأليفة.'}
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#033F2D] text-[#C7F268] flex items-center justify-center font-bold">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#033F2D]">
                  {locale === 'en' ? 'Our Vision' : 'رؤيتنا'}
                </h3>
                <p className="text-sm text-[#484C44] leading-relaxed">
                  {locale === 'en'
                    ? 'To be Egypt’s premier and most trusted pest management partner, providing proven results without deceptive claims or inflated charges.'
                    : 'أن نكون الخيار الأول والموثوق في مصر لكل أسرة أو منشأة تبحث عن خدمة مكافحة متخصصة تضمن النتيجة الفعلية دون وعود زائفة أو تكاليف مبالغ فيها.'}
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#033F2D] text-[#C7F268] flex items-center justify-center font-bold">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#033F2D]">
                  {locale === 'en' ? 'Our Values' : 'قيمنا'}
                </h3>
                <p className="text-sm text-[#484C44] leading-relaxed">
                  {locale === 'en'
                    ? 'Diagnostic integrity, transparent pricing, punctuality, and reliance on certified, premium international and local formulations.'
                    : 'الأمانة في المعاينة، الشفافية في تحديد الأسعار، الالتزام بالمواعيد، والحرص على استخدام أفضل المواد المستوردة والمحلية المعتمدة رسمياً.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-16 bg-[#033F2D] text-white">
          <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              {locale === 'en'
                ? 'Ready to inspect and resolve your pest problem?'
                : 'هل ترغب في فحص ومعالجة مشكلة الحشرات في عقارك؟'}
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              {locale === 'en'
                ? `Contact ${company.name} today to assess the infestation and schedule an inspection anywhere in Egypt.`
                : `تواصل مع ${company.name} الآن لمناقشة المشكلة وتحديد موعد المعاينة المناسب لموقعك في مصر.`}
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setBookingOpen(true)}
                className="bg-[#C7F268] hover:bg-[#b5e050] text-[#033F2D] py-3.5 px-7 text-sm font-bold rounded-xl shadow-xl cursor-pointer inline-flex items-center gap-2"
              >
                <span>{t.requestInspectionBtn}</span>
                {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
              <a
                href={company.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-3.5 px-6 rounded-xl text-sm shadow-xl transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>
                  {locale === 'en' ? 'WhatsApp:' : 'واتساب:'} {company.whatsapp}
                </span>
              </a>
              <a
                href={company.phonePrimaryRaw}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-colors"
                dir="ltr"
              >
                <Phone className="w-4 h-4 text-[#C7F268]" />
                <span>{company.phonePrimary}</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </div>
  );
}
