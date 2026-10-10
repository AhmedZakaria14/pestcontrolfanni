'use client';

import Image from 'next/image';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import StaggerContainer, { StaggerItem } from '@/components/animations/StaggerContainer';

const STEPS = [
  {
    step: '01',
    title: 'حجز موعد الفحص',
    description: 'حجز فوري عبر الموقع أو اتصال مباشر بالخط الساخن لتحديد موعد زيارة سريعة لعقارك.',
    image: '/assets/company/img2_1_16_21_2.jpg',
  },
  {
    step: '02',
    title: 'معاينة تشخيصية شاملة',
    description: 'فحص دقيق لمواقع التكاثر، أعشاش الآفات، ومنافذ التسلل الهيكلية باستخدام أجهزة المسح الحراري.',
    image: '/assets/company/img3_1_16_20_1.jpg',
  },
  {
    step: '03',
    title: 'خطة إبادة مخصصة',
    description: 'تطبيق مركبات بيولوجية مركزة ومصرحة بأعلى درجات الدقة دون ترك أي رواسب أو روائح ضارة.',
    image: '/assets/company/img5_1_16_20.jpg',
  },
  {
    step: '04',
    title: 'تحصين وقائي ومتابعة دورية',
    description: 'تحصين محيطي شامل للعقار مع متابعات دورية مجانية وضمان معتمد لمنع عودة الآفات.',
    image: '/assets/company/img4_1_16_21_1.jpg',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 lg:py-28 bg-[#F6F8F5] text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <ScrollReveal direction="down" duration={0.6}>
            <div className="section-subtitle mx-auto">
              <span>كيف نعمل</span>
            </div>
          </ScrollReveal>
          <div>
            <TextReveal
              as="h2"
              text="من الفحص وحتى التحصين الكامل منهجيتنا المعتمدة"
              highlightWords={['منهجيتنا', 'المعتمدة']}
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
          {STEPS.map((s) => (
            <StaggerItem key={s.step} yOffset={35}>
              <div
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-gray-100 flex flex-col h-full group text-right"
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
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-[#033F2D] text-[#C7F268] font-black text-sm flex items-center justify-center shadow-lg group-hover:bg-[#C7F268] group-hover:text-[#033F2D] transition-colors">
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
