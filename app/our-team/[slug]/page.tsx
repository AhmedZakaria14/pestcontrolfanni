'use client';

import { use, useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import { TEAM_MEMBERS } from '@/lib/siteData';
import { Phone, Mail } from 'lucide-react';

export default function TeamMemberDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const [messageSent, setMessageSent] = useState(false);

  const member =
    TEAM_MEMBERS.find((m) => m.slug === resolvedParams.slug) || TEAM_MEMBERS[0];

  if (!member) {
    notFound();
  }

  const handleMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setMessageSent(true);
    setTimeout(() => setMessageSent(false), 4000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-right">
      <Header />

      <main className="flex-1">
        <PageBanner
          title={member.name}
          breadcrumbs={[
            { label: 'فريق العمل', href: '/our-team' },
            { label: member.name },
          ]}
        />

        <div className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Image & Contact Column (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl bg-gray-200">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    priority
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-6 right-6 bg-[#033F2D] text-white p-4 rounded-2xl shadow-xl border border-white/10 text-right">
                    <span className="text-xs text-[#C7F268] uppercase font-bold tracking-wider block">
                      الخبرة الميدانية
                    </span>
                    <span className="text-2xl font-black text-white">{member.experience}</span>
                  </div>
                </div>

                {/* Direct Contact Info */}
                <div className="p-6 rounded-3xl bg-[#F6F8F5] border border-gray-100 space-y-3 text-right">
                  <h4 className="text-sm font-bold text-[#033F2D] uppercase tracking-wider">
                    بيانات التواصل المباشر
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-[#033F2D] shrink-0" />
                      <a href={`tel:${member.phone}`} dir="ltr" className="font-bold text-[#033F2D]">
                        {member.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio & Skills Column (7 cols) */}
              <div className="lg:col-span-7 space-y-8">
                <div>
                  <span className="text-xs font-bold tracking-wider text-[#033F2D] bg-[#C7F268]/40 px-3 py-1 rounded-full">
                    {member.role}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-black text-[#033F2D] mt-3">
                    {member.name}
                  </h2>
                </div>

                <div className="space-y-4 text-base text-[#484C44] leading-relaxed">
                  <p>{member.bio}</p>
                  <p>
                    متخصص في أحدث تقنيات الفحص والتشخيص الميداني، يقود عمليات المسح الدقيقة، ومعايرة الجرعات البيولوجية العضوية الآمنة، وتشييد حواجز الحماية الوقائية لضمان استئصال الآفات نهائياً.
                  </p>
                </div>

                {/* Technical Skills Progress Bars */}
                <div className="space-y-5 pt-4 border-t border-gray-100">
                  <h3 className="text-xl font-bold text-[#033F2D]">المهارات والكفاءات الفنية المعتمدة</h3>
                  <div className="space-y-4">
                    {member.skills.map((skill, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <div className="flex justify-between text-sm font-bold text-[#033F2D]">
                          <span>{skill.name}</span>
                          <span dir="ltr">{skill.percentage}%</span>
                        </div>
                        <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#033F2D] rounded-full"
                            style={{ width: `${skill.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Consultation Message Box */}
                <div className="p-8 rounded-3xl bg-[#F6F8F5] border border-gray-100 space-y-4 text-right">
                  <h3 className="text-xl font-bold text-[#033F2D]">
                    طلب استشارة مباشرة من الأخصائي
                  </h3>
                  {messageSent ? (
                    <div className="p-4 rounded-xl bg-[#033F2D] text-white text-center text-sm font-bold">
                      تم تحويل استفسارك إلى {member.name}. سيتواصل معك في أقرب وقت!
                    </div>
                  ) : (
                    <form onSubmit={handleMessage} className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          required
                          placeholder="الاسم الكريم"
                          className="px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white text-right"
                        />
                        <input
                          type="tel"
                          required
                          placeholder="رقم الجوال"
                          className="px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white text-left"
                          dir="ltr"
                        />
                      </div>
                      <textarea
                        rows={3}
                        required
                        placeholder={`اكتب تفاصيل استفسارك للأخصائي ${member.name}...`}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white resize-none text-right"
                      />
                      <button type="submit" className="btn-default py-3 px-6 text-sm font-bold cursor-pointer">
                        إرسال الاستفسار للأخصائي
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
