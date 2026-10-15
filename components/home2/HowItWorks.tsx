'use client';

import Image from 'next/image';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import StaggerContainer, { StaggerItem } from '@/components/animations/StaggerContainer';
import { useLanguage } from '@/lib/i18n';

const STEPS_AR = [
  {
    step: '01',
    title: 'حجز موعد الفحص',
    description: 'حجز فوري عبر الموقع أو اتصال مباشر لتحديد موعد زيارة سريعة لعقارك.',
    image: '/assets/company/img2_1_16_21_2.jpg',
  },
  {
    step: '02',
    title: 'معاينة تشخيصية شاملة',
    description: 'فحص دقيق لمواقع التكاثر، أعشاش الآفات، ومنافذ التسلل لتحديد الفصيلة بدقة.',
    image: '/assets/company/img3_1_16_20_1.jpg',
  },
  {
    step: '03',
    title: 'خطة إبادة مخصصة',
    description: 'تطبيق مركبات بيولوجية وجل مركز بأعلى درجات الدقة دون ترك أي روائح ضارة.',
    image: '/assets/company/img5_1_16_20.jpg',
  },
  {
    step: '04',
    title: 'تحصين وقائي ومتابعة دورية',
    description: 'تحصين محيطي شامل للعقار مع متابعات مستمرة وضمان معتمد لمنع عودة الآفات.',
    image: '/assets/company/img4_1_16_21_1.jpg',
  },
];

const STEPS_EN = [
  {
    step: '01',
    title: 'Book Inspection',
    description: 'Direct online booking or quick call to schedule your property assessment.',
    image: '/assets/company/img2_1_16_21_2.jpg',
  },
  {
    step: '02',
    title: 'Comprehensive Diagnostic Exam',
    description: 'Thorough inspection of nesting sites, entry points, and pest infestation severity.',
    image: '/assets/company/img3_1_16_20_1.jpg',
  },
  {
    step: '03',
    title: 'Targeted Treatment Plan',
    description: 'Application of odorless German/US gel and certified eco-safe compounds.',
    image: '/assets/company/img5_1_16_20.jpg',
  },
  {
    step: '04',
    title: 'Shielding & Follow-Up Warranty',
    description: 'Complete perimeter barrier protection with verified follow-up warranty.',
    image: '/assets/company/img4_1_16_21_1.jpg',
  },
];

export default function HowItWorks() {
  const { t, isRTL, locale } = useLanguage();
  const steps = locale === 'en' ? STEPS_EN : STEPS_AR;

  return (
    <section
      className={`py-20 lg:py-28 bg-[#F6F8F5] ${
        isRTL ? 'text-right' : 'text-left'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <ScrollReveal direction="down" duration={0.6}>
            <div className="section-subtitle mx-auto">
              <span>{t.howSubtitle}</span>
            </div>
          </ScrollReveal>
          <div>
            <TextReveal
              as="h2"
              text={t.howHeadline}
              highlightWords={t.howHighlightWords}
              highlightClass="text-[#033F2D] underline decoration-[#C7F268] decoration-4 underline-offset-4"
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#033F2D] leading-[1.25]"
            />
          </div>
        </div>

        {/* 4 Steps Grid with Stagger */}
        <StaggerContainer
          staggerDelay={0.12}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {steps.map((s) => (
            <StaggerItem key={s.step} yOffset={35}>
              <div
                className={`bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-gray-100 flex flex-col h-full group ${
                  isRTL ? 'text-right' : 'text-left'
                }`}
              >
                {/* Image & Step Number */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div
                    className={`absolute top-4 ${
                      isRTL ? 'right-4' : 'left-4'
                    } w-10 h-10 rounded-xl bg-[#033F2D] text-[#C7F268] font-black text-sm flex items-center justify-center shadow-lg group-hover:bg-[#C7F268] group-hover:text-[#033F2D] transition-colors`}
                  >
                    {s.step}
                  </div>
                </div>

                {/* Text */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-2">
                  <h3 className="text-lg font-bold text-[#033F2D] leading-snug">{s.title}</h3>
                  <p className="text-xs text-[#484C44] leading-relaxed">{s.description}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
