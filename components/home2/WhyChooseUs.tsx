'use client';

import Image from 'next/image';
import { Leaf, Search, ShieldCheck } from 'lucide-react';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import StaggerContainer, { StaggerItem } from '@/components/animations/StaggerContainer';
import { company } from '@/lib/company';
import { COMPANY_IMAGES } from '@/lib/media';

export default function WhyChooseUs() {
  return (
    <section className="py-20 lg:py-28 bg-[#FFFFFF] overflow-hidden text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text & Features (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <ScrollReveal direction="down" duration={0.6}>
              <div className="section-subtitle">
                <span>لماذا تختار المركز الفني المتخصص</span>
              </div>
            </ScrollReveal>

            <div>
              <TextReveal
                as="h2"
                text="مكافحة فنية احترافية بأساليب متطورة يمكنك الاعتماد عليها"
                highlightWords={['احترافية', 'متطورة']}
                highlightClass="text-[#033F2D] underline decoration-[#C7F268] decoration-4 underline-offset-4"
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#033F2D] leading-[1.25]"
              />
            </div>

            <ScrollReveal direction="up" delay={0.2} duration={0.6}>
              <p className="text-[#484C44] text-base leading-relaxed">
                يتبع فنيونا إجراءات فحص ومعالجة متأنية تضمن التعامل مع أسباب انتشار الحشرات وتحديد طرق المعالجة المخصصة لكل حالة، مع الاهتمام بسلامة الأسرة وتقديم إرشادات وقائية مستمرة.
              </p>
            </ScrollReveal>

            {/* 3 Pillars */}
            <StaggerContainer staggerDelay={0.15} className="space-y-4 pt-2">
              {/* Item 1 */}
              <StaggerItem yOffset={25}>
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#F6F8F5] border border-gray-100 hover:border-[#033F2D]/20 hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-[#033F2D] text-[#C7F268] flex items-center justify-center shrink-0">
                    <Leaf className="w-6 h-6 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#033F2D]">مبيدات آمنة ومصرحة</h4>
                    <p className="text-sm text-[#484C44] mt-1 leading-relaxed">
                      تركيبات بدون روائح نفاذة وبدون حاجة لإخلاء المنزل أو تفريغ الأواني في المطبخ.
                    </p>
                  </div>
                </div>
              </StaggerItem>

              {/* Item 2 */}
              <StaggerItem yOffset={25}>
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#F6F8F5] border border-gray-100 hover:border-[#033F2D]/20 hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-[#033F2D] text-[#C7F268] flex items-center justify-center shrink-0">
                    <Search className="w-6 h-6 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#033F2D]">فحص وتشخيص دقيق</h4>
                    <p className="text-sm text-[#484C44] mt-1 leading-relaxed">
                      تحديد نوع الحشرة بدقة ومسارات حركتها واستهداف بؤر التكاثر بدلاً من الرش العشوائي.
                    </p>
                  </div>
                </div>
              </StaggerItem>

              {/* Item 3 */}
              <StaggerItem yOffset={25}>
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#F6F8F5] border border-gray-100 hover:border-[#033F2D]/20 hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-[#033F2D] text-[#C7F268] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#033F2D]">متابعة وإرشادات وقائية</h4>
                    <p className="text-sm text-[#484C44] mt-1 leading-relaxed">
                      نقدم نصائح عملية لمنع تسلل الحشرات مستقبلاً والتواصل لمتابعة استقرار النتيجة.
                    </p>
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>

          {/* Right Image Composition (6 cols) */}
          <div className="lg:col-span-6 relative">
            <ScrollReveal direction="right" duration={0.8}>
              <div className="relative mx-auto max-w-lg lg:max-w-none grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-xl group">
                    <Image
                      src={COMPANY_IMAGES.precisionGelInjection}
                      alt="فحص ونشر الجل النقطي"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  {/* Verified Pillar Card 1 */}
                  <div className="bg-[#033F2D] text-white p-6 rounded-3xl text-center transform transition-transform hover:scale-105 duration-300">
                    <ShieldCheck className="w-8 h-8 text-[#C7F268] mx-auto mb-2" />
                    <span className="text-base font-bold text-white block">
                      مبيدات بدون روائح
                    </span>
                    <span className="text-xs text-white/80 mt-1 block">
                      آمنة للأطفال والحيوانات الأليفة
                    </span>
                  </div>
                </div>

                <div className="space-y-4 pt-8">
                  {/* Verified Pillar Card 2 */}
                  <div className="bg-[#C7F268] text-[#033F2D] p-6 rounded-3xl text-center transform transition-transform hover:scale-105 duration-300">
                    <Search className="w-8 h-8 text-[#033F2D] mx-auto mb-2" />
                    <span className="text-base font-black text-[#033F2D] block">
                      معاينة فنية متخصصة
                    </span>
                    <span className="text-xs font-bold text-[#033F2D]/80 mt-1 block">
                      تحديد دقيق لنوع الآفة
                    </span>
                  </div>
                  <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-xl group">
                    <Image
                      src={COMPANY_IMAGES.outdoorSpraying}
                      alt="معدات المعاملة الخارجية"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
