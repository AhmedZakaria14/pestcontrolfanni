'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import { Calendar, User, ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

export default function BlogListPage() {
  const { t, siteData, isRTL, locale, dir } = useLanguage();

  return (
    <div
      className={`min-h-screen flex flex-col bg-white ${
        isRTL ? 'text-right' : 'text-left'
      }`}
      dir={dir}
    >
      <Header />

      <main className="flex-1">
        <PageBanner
          title={t.navBlog}
          breadcrumbs={[{ label: t.navBlog }]}
        />

        <div className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <div className="section-subtitle mx-auto">
                <span>{locale === 'en' ? 'Pest Knowledge & Prevention' : 'المعرفة والوقاية من الآفات'}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#033F2D] leading-[1.25]">
                {locale === 'en'
                  ? 'Pest Control Guidelines & Seasonal Protection Insights'
                  : 'إرشادات مكافحة الآفات وتوجيهات الحماية الموسمية'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {siteData.blogPosts.map((post) => (
                <article
                  key={post.id}
                  className={`group bg-[#F6F8F5] rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${
                    isRTL ? 'text-right' : 'text-left'
                  }`}
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-200">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div
                      className={`absolute top-4 ${
                        isRTL ? 'right-4' : 'left-4'
                      } bg-[#C7F268] text-[#033F2D] px-3 py-1 rounded-full text-xs font-bold shadow-md`}
                    >
                      {post.category}
                    </div>
                  </div>

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
                          {locale === 'en' ? `By ${post.author}` : `بواسطة ${post.author}`}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-[#033F2D] group-hover:text-[#022a1e] transition-colors leading-snug">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>

                      <p className="text-sm text-[#484C44] leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-bold text-[#033F2D] group/link"
                      >
                        <span>{t.blogReadArticle}</span>
                        <div
                          className={`w-7 h-7 rounded-full bg-[#C7F268] text-[#033F2D] flex items-center justify-center transition-transform ${
                            isRTL
                              ? 'group-hover/link:-translate-x-1'
                              : 'group-hover/link:translate-x-1'
                          }`}
                        >
                          {isRTL ? (
                            <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
                          ) : (
                            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                          )}
                        </div>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
