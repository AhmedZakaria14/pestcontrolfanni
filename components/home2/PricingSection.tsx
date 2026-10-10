'use client';

import { Check, ArrowLeft, MessageCircle } from 'lucide-react';
import { PRICING_PLANS } from '@/lib/siteData';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import StaggerContainer, { StaggerItem } from '@/components/animations/StaggerContainer';
import { company } from '@/lib/company';

interface PricingSectionProps {
  onOpenBooking: () => void;
}

export default function PricingSection({ onOpenBooking }: PricingSectionProps) {
  return (
    <section className="py-20 lg:py-28 bg-[#FFFFFF] relative overflow-hidden text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <ScrollReveal direction="down" duration={0.6}>
            <div className="section-subtitle mx-auto">
              <span>خطط المعاينة والتسعير</span>
            </div>
          </ScrollReveal>

          <div>
            <TextReveal
              as="h2"
              text="تسعير عادل وشفاف يحدد حسب نوع المشكلة ومساحة المكان"
              highlightWords={['عادل', 'وشفاف']}
              highlightClass="text-[#033F2D] underline decoration-[#C7F268] decoration-4 underline-offset-4"
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#033F2D] leading-[1.25]"
            />
          </div>

          <ScrollReveal direction="up" delay={0.2} duration={0.6}>
            <p className="text-[#484C44] text-sm sm:text-base leading-relaxed">
              نقدم في {company.name} تسعيراً شفافاً يعتمد على المعاينة الميدانية الدقيقة لتحديد التكلفة الأنسب بدون أي مبالغة وبأعلى فاعلية.
            </p>
          </ScrollReveal>
        </div>

        {/* 3 Pricing Cards */}
        <StaggerContainer
          staggerDelay={0.15}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
        >
          {PRICING_PLANS.map((plan) => {
            const isPop = plan.popular;

            return (
              <StaggerItem key={plan.id} yOffset={35} className="flex">
                <div
                  className={`w-full rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative text-right ${
                    isPop
                      ? 'bg-[#033F2D] text-white shadow-2xl scale-105 z-10 border-2 border-[#C7F268]'
                      : 'bg-[#F6F8F5] text-[#484C44] border border-gray-100 hover:shadow-xl hover:-translate-y-1'
                  }`}
                >
                  {isPop && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#C7F268] text-[#033F2D] text-xs font-black tracking-wider px-4 py-1 rounded-full shadow-md">
                      الأكثر طلباً
                    </div>
                  )}

                  <div>
                    <div className="pb-6 border-b border-gray-200/20">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-md inline-block mb-3 ${
                        isPop ? 'bg-white/10 text-[#C7F268]' : 'bg-[#033F2D]/10 text-[#033F2D]'
                      }`}>
                        {plan.idealFor}
                      </span>
                      <h3
                        className={`text-2xl font-bold mb-2 ${
                          isPop ? 'text-white' : 'text-[#033F2D]'
                        }`}
                      >
                        {plan.name}
                      </h3>
                      <p className={`text-xs leading-relaxed ${isPop ? 'text-white/80' : 'text-gray-500'}`}>
                        {plan.description}
                      </p>
                      
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <span className={`text-sm font-bold block ${isPop ? 'text-[#C7F268]' : 'text-[#033F2D]'}`}>
                          معاينة وتحديد أفضل تكلفة
                        </span>
                        <span className={`text-[11px] block mt-0.5 ${isPop ? 'text-white/70' : 'text-gray-500'}`}>
                          حسب المساحة ونوع الحشرة المعالجة
                        </span>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="py-6 space-y-3">
                      <span
                        className={`text-xs font-bold tracking-wider block ${
                          isPop ? 'text-[#C7F268]' : 'text-[#033F2D]'
                        }`}
                      >
                        تشمل الخدمة:
                      </span>
                      <ul className="space-y-2.5 text-xs sm:text-sm">
                        {plan.features.map((feat, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <Check
                              className={`w-4 h-4 shrink-0 mt-0.5 ${
                                isPop ? 'text-[#C7F268]' : 'text-[#033F2D]'
                              }`}
                            />
                            <span className={isPop ? 'text-white/90' : 'text-[#484C44]'}>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 space-y-2">
                    <button
                      onClick={onOpenBooking}
                      className={`w-full py-3 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        isPop
                          ? 'btn-default'
                          : 'bg-[#033F2D] text-white hover:bg-[#02281d]'
                      }`}
                    >
                      <span>طلب معاينة لهذه الخدمة</span>
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <a
                      href={`${company.whatsappUrl}?text=${encodeURIComponent(`مرحباً، أود الاستفسار عن تفاصيل وتكلفة ${plan.name}`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors ${
                        isPop ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-gray-200/70 hover:bg-gray-300 text-gray-800'
                      }`}
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>استفسر عبر واتساب</span>
                    </a>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
