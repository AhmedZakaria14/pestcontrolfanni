'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Phone } from 'lucide-react';
import { TEAM_MEMBERS } from '@/lib/siteData';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import StaggerContainer, { StaggerItem } from '@/components/animations/StaggerContainer';
import { company } from '@/lib/company';

export default function TeamSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#FFFFFF] relative overflow-hidden text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl space-y-3">
            <ScrollReveal direction="down" duration={0.6}>
              <div className="section-subtitle">
                <span>فريق العمل الميداني</span>
              </div>
            </ScrollReveal>

            <div>
              <TextReveal
                as="h2"
                text="فريق فني متخصص ومدرب على أحدث أساليب المكافحة"
                highlightWords={['متخصص', 'مدرب']}
                highlightClass="text-[#033F2D] underline decoration-[#C7F268] decoration-4 underline-offset-4"
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#033F2D] leading-[1.25]"
              />
            </div>
          </div>

          <ScrollReveal direction="right" delay={0.2} duration={0.6}>
            <Link href="/our-team" className="btn-default py-3.5 px-7">
              <span>عرض الفريق الفني</span>
              <ArrowLeft className="w-4 h-4 mr-2" />
            </Link>
          </ScrollReveal>
        </div>

        {/* Team Grid */}
        <StaggerContainer
          staggerDelay={0.12}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 max-w-3xl mx-auto gap-8"
        >
          {TEAM_MEMBERS.map((member) => (
            <StaggerItem key={member.id} yOffset={35}>
              <div
                className="group bg-[#F6F8F5] rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 h-full flex flex-col justify-between text-center"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-200">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="p-6 text-center space-y-2">
                  <h3 className="text-lg font-bold text-[#033F2D]">
                    <Link href={`/our-team/${member.slug}`} className="hover:underline">
                      {member.name}
                    </Link>
                  </h3>
                  <p className="text-xs font-bold text-[#033F2D]/70">{member.role}</p>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{member.bio}</p>

                  <div className="pt-3 border-t border-gray-200 flex items-center justify-center">
                    <a
                      href={company.phonePrimaryRaw}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#033F2D] hover:text-[#047857] transition-colors"
                      dir="ltr"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#047857]" />
                      <span>{member.phone}</span>
                    </a>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
