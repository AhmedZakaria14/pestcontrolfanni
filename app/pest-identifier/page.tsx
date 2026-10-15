'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import PestIdentifierTool from '@/components/PestIdentifierTool';
import JsonLd from '@/components/JsonLd';
import { ShieldCheck, Zap, Phone, Award, Clock } from 'lucide-react';
import { getPestIdentifierServiceSchema } from '@/lib/schema';
import { useLanguage } from '@/lib/i18n';

export default function PestIdentifierPage() {
  const { t, company, isRTL, locale, dir } = useLanguage();
  const pestServiceSchema = getPestIdentifierServiceSchema(locale);

  return (
    <div
      className={`min-h-screen flex flex-col bg-[#F4F6F4]/40 ${
        isRTL ? 'text-right' : 'text-left'
      }`}
      dir={dir}
    >
      <JsonLd id="schema-pest-identifier-service" data={pestServiceSchema} />
      {/* Header */}
      <Header />

      {/* Page Banner */}
      <PageBanner
        title={t.navPestIdentifier}
        breadcrumbs={[{ label: t.navPestIdentifier }]}
      />

      {/* Main Content Area */}
      <main className="flex-1 py-14 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top highlight card */}
          <div className="bg-[#033F2D] text-white rounded-3xl p-6 sm:p-8 mb-10 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#C7F268]/10 rounded-full blur-3xl pointer-events-none" />

            <div className={`space-y-2 ${isRTL ? 'text-right' : 'text-left'} relative z-10`}>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C7F268]/20 text-[#C7F268] text-xs font-black rounded-full">
                <Zap className="w-3.5 h-3.5" />
                <span>
                  {locale === 'en'
                    ? 'Interactive Diagnostic Guide - Technical Specialized Center'
                    : 'دليل تشخيصي تفاعلي من المركز الفني المتخصص'}
                </span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                {locale === 'en'
                  ? 'Noticed an unusual insect or signs of damage?'
                  : 'هل لاحظت وجود حشرة غريبة أو آثار تلف في منزلك؟'}
              </h2>
              <p className="text-white/80 text-sm max-w-2xl leading-relaxed">
                {locale === 'en'
                  ? 'Use the interactive diagnostic tool below to match observation location, size, color, and damages to accurately diagnose the species and receive immediate guidance.'
                  : 'استخدم أداة التشخيص التفاعلية أدناه لمطابقة مكان الرصد، الحجم، اللون والأضرار لتحديد فصيلة الآفة بدقة وتلقي الإرشادات الأولية الفورية مجاناً.'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 relative z-10 w-full md:w-auto">
              <a
                href={company.phonePrimaryRaw}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#C7F268] hover:bg-[#b8e358] text-[#033F2D] font-black text-sm transition-all shadow-md cursor-pointer"
                dir="ltr"
              >
                <Phone className="w-4 h-4" />
                <span>{company.phonePrimary}</span>
              </a>
            </div>
          </div>

          {/* Interactive Pest Identifier Component */}
          <PestIdentifierTool />

          {/* Value props & Trust Badges below tool */}
          <div
            className={`mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 ${
              isRTL ? 'text-right' : 'text-left'
            }`}
          >
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#C7F268]/30 text-[#033F2D] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <h4 className="font-bold text-[#033F2D] text-base mb-1">
                  {locale === 'en' ? 'Certified Solutions' : 'حلول معتمدة 100%'}
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {locale === 'en'
                    ? 'Safe, odorless formulations compliant with public health guidelines without having to vacate.'
                    : 'تركيبات عضوية آمنة معتمدة من الهيئات الصحية بدون روائح كريهة أو مغادرة للمنزل.'}
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#C7F268]/30 text-[#033F2D] flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <h4 className="font-bold text-[#033F2D] text-base mb-1">
                  {locale === 'en' ? 'Fast Field Scheduling' : 'مواعيد سريعة واستجابة فورية'}
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {locale === 'en'
                    ? 'Prompt field coordination across Cairo, Giza, and all Egyptian governorates.'
                    : 'تنسيق ميداني سريع يغطي القاهرة والجيزة وكافة المحافظات بأعلى درجات الكفاءة.'}
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#C7F268]/30 text-[#033F2D] flex items-center justify-center shrink-0">
                <Award className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <h4 className="font-bold text-[#033F2D] text-base mb-1">
                  {locale === 'en' ? 'Verified Warranty Coverage' : 'ضمان رسمي موثق'}
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {locale === 'en'
                    ? 'Free follow-up inspection visits and guaranteed protection during the entire warranty period.'
                    : 'زيارات متابعة مجانية وإعادة معالجة دون أي تكلفة إضافية طوال فترة سريان الضمان.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
