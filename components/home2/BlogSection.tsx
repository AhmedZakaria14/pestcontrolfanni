'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/siteData';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import StaggerContainer, { StaggerItem } from '@/components/animations/StaggerContainer';

export default function BlogSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#FFFFFF] relative overflow-hidden text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl space-y-3">
            <ScrollReveal direction="down" duration={0.6}>
              <div className="section-subtitle">
                <span>أحدث مقالات المدونة</span>
              </div>
            </ScrollReveal>

            <div>
              <TextReveal
                as="h2"
                text="ابقَ على اطلاع دائم مع مدونتنا ونصائحنا الوقائية"
                highlightWords={['مدونتنا', 'ونصائحنا']}
                highlightClass="text-[#033F2D] underline decoration-[#C7F268] decoration-4 underline-offset-4"
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#033F2D] leading-[1.25]"
              />
            </div>
          </div>

          <ScrollReveal direction="right" delay={0.2} duration={0.6}>
            <Link href="/blog" className="btn-default py-3.5 px-7">
              <span>عرض كل المقالات</span>
              <ArrowLeft className="w-4 h-4 mr-2" />
            </Link>
          </ScrollReveal>
        </div>

        {/* 3 Articles Grid with Stagger */}
        <StaggerContainer
          staggerDelay={0.15}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {BLOG_POSTS.slice(0, 3).map((post) => (
            <StaggerItem key={post.id} yOffset={35}>
              <article
                className="group bg-[#F6F8F5] rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full text-right"
              >
                {/* Image & Date Badge */}
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-200">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-[#C7F268] text-[#033F2D] px-3 py-1 rounded-full text-xs font-bold shadow-md">
                    {post.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-7 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#033F2D]" />
                        {post.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#033F2D]" />
                        بواسطة {post.author}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#033F2D] group-hover:text-[#022a1e] transition-colors leading-snug">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>

                    <p className="text-sm text-[#484C44] leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#033F2D] hover:text-[#02271c] group/link"
                    >
                      <span>اقرأ المقال بالكامل</span>
                      <div className="w-7 h-7 rounded-full bg-[#C7F268] text-[#033F2D] flex items-center justify-center group-hover/link:-translate-x-1 transition-transform">
                        <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                    </Link>
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
