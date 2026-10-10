'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import { TEAM_MEMBERS } from '@/lib/siteData';
import { ArrowLeft } from 'lucide-react';

export default function OurTeamPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-right">
      <Header />

      <main className="flex-1">
        <PageBanner
          title="فريق خبرائنا"
          breadcrumbs={[{ label: 'فريق العمل' }]}
        />

        <div className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <div className="section-subtitle mx-auto">
                <span>فريقنا المتخصص</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#033F2D] leading-[1.25]">
                تعرّف على الخبراء المعتمدين لحماية منشأتك وممتلكاتك
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {TEAM_MEMBERS.map((member) => (
                <div
                  key={member.id}
                  className="group bg-[#F6F8F5] rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-right"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-gray-200">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 bg-[#033F2D] text-[#C7F268] text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      خبرة {member.experience}
                    </div>
                  </div>

                  <div className="p-7 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-[#033F2D]">
                        <Link href={`/our-team/${member.slug}`} className="hover:underline">
                          {member.name}
                        </Link>
                      </h3>
                      <p className="text-xs font-bold text-[#033F2D]/70 uppercase tracking-wider mt-0.5">
                        {member.role}
                      </p>
                    </div>

                    <p className="text-xs text-[#484C44] leading-relaxed line-clamp-3">
                      {member.bio}
                    </p>

                    <div className="pt-4 border-t border-gray-200 flex items-center justify-between text-xs font-bold text-[#033F2D]">
                      <Link
                        href={`/our-team/${member.slug}`}
                        className="inline-flex items-center gap-1 hover:text-[#02271c]"
                      >
                        <span>عرض الملف الشخصي</span>
                        <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                      </Link>

                      <div className="flex items-center gap-2">
                        <a
                          href={`tel:${member.phone}`}
                          className="w-7 h-7 rounded-full bg-white hover:bg-[#C7F268] flex items-center justify-center transition-colors shadow-sm text-xs font-bold"
                          aria-label="Phone"
                        >
                          📞
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
