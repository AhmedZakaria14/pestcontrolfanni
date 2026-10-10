'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import PestIdentifierTool from '@/components/PestIdentifierTool';
import { ShieldCheck, Zap, Phone, CheckCircle2, Award, Clock } from 'lucide-react';
import { company } from '@/lib/company';

export default function PestIdentifierPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6F4]/40" dir="rtl">
      {/* Header */}
      <Header />

      {/* Page Banner */}
      <PageBanner
        title="أداة التشخيص والتعرف الذكي على الحشرات"
        breadcrumbs={[{ label: 'تشخيص الحشرات' }]}
      />

      {/* Main Content Area */}
      <main className="flex-1 py-14 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top highlight card */}
          <div className="bg-[#033F2D] text-white rounded-3xl p-6 sm:p-8 mb-10 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#C7F268]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-2 text-right relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C7F268]/20 text-[#C7F268] text-xs font-black rounded-full">
                <Zap className="w-3.5 h-3.5" />
                <span>دليل تشخيصي تفاعلي من المركز الفني المتخصص</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                هل لاحظت وجود حشرة غريبة أو آثار تلف في منزلك؟
              </h2>
              <p className="text-white/80 text-sm max-w-2xl leading-relaxed">
                استخدم أداة التشخيص التفاعلية أدناه لمطابقة مكان الرصد، الحجم، اللون والأضرار لتحديد فصيلة الآفة بدقة وتلقي الإرشادات الأولية الفورية مجاناً.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 relative z-10 w-full md:w-auto">
              <a
                href={company.phonePrimaryRaw}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#C7F268] hover:bg-[#b8e358] text-[#033F2D] font-black text-sm transition-all shadow-md cursor-pointer"
                dir="ltr"
              >
                <Phone className="w-4 h-4" />
                <span>اتصال مباشر: {company.phonePrimary}</span>
              </a>
            </div>
          </div>

          {/* Interactive Pest Identifier Component */}
          <PestIdentifierTool />

          {/* Value props & Trust Badges below tool */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-right">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#C7F268]/30 text-[#033F2D] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <h4 className="font-bold text-[#033F2D] text-base mb-1">حلول معتمدة 100%</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  تركيبات عضوية آمنة معتمدة من الهيئات الصحية بدون روائح كريهة أو مغادرة للمنزل.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#C7F268]/30 text-[#033F2D] flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <h4 className="font-bold text-[#033F2D] text-base mb-1">استجابة طوارئ خلال ساعة</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  فرق طوارئ ميدانية مجهزة بكاميرات رادار وحرارية للتدخل السريع على مدار 24/7.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#C7F268]/30 text-[#033F2D] flex items-center justify-center shrink-0">
                <Award className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <h4 className="font-bold text-[#033F2D] text-base mb-1">ضمان ذهبي موثق</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  زيارات متابعة مجانية وإعادة رش دون أي تكلفة إضافية طوال فترة سريان الضمان.
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
