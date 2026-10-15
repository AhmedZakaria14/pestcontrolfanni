'use client';

import { use, useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import { Calendar, User, Clock, Tag, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

export default function BlogPostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const [commentSent, setCommentSent] = useState(false);
  const { t, siteData, isRTL, locale, dir } = useLanguage();

  const post =
    siteData.blogPosts.find((p) => p.slug === resolvedParams.slug) || siteData.blogPosts[0];

  if (!post) {
    notFound();
  }

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    setCommentSent(true);
    setTimeout(() => setCommentSent(false), 4000);
  };

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
          title={post.title}
          breadcrumbs={[
            { label: t.navBlog, href: '/blog' },
            { label: post.title },
          ]}
        />

        <div className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Main Article (8 cols) */}
              <div className="lg:col-span-8 space-y-8">
                {/* Feature Image */}
                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    priority
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div
                    className={`absolute top-6 ${
                      isRTL ? 'right-6' : 'left-6'
                    } bg-[#033F2D] text-[#C7F268] text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg`}
                  >
                    {post.category}
                  </div>
                </div>

                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-6 text-xs text-gray-500 font-semibold border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#033F2D]" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User className="w-4 h-4 text-[#033F2D]" />
                    <span>
                      {locale === 'en' ? `By ${post.author}` : `بواسطة ${post.author}`}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#033F2D]" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Article Content */}
                <div className="space-y-6 text-[#484C44] text-base leading-relaxed">
                  <p className="text-lg font-bold text-[#033F2D] leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="space-y-4">
                    {post.content.split('\n\n').map((paragraph, idx) => {
                      if (paragraph.startsWith('### ')) {
                        return (
                          <h3
                            key={idx}
                            className="text-2xl font-black text-[#033F2D] pt-4"
                          >
                            {paragraph.replace('### ', '')}
                          </h3>
                        );
                      }
                      if (paragraph.startsWith('- ')) {
                        const items = paragraph.split('\n');
                        return (
                          <ul
                            key={idx}
                            className={`space-y-2 ${
                              isRTL ? 'pr-4' : 'pl-4'
                            } list-disc text-sm`}
                          >
                            {items.map((item, i) => (
                              <li key={i}>{item.replace('- ', '')}</li>
                            ))}
                          </ul>
                        );
                      }
                      return <p key={idx}>{paragraph}</p>;
                    })}
                  </div>
                </div>

                {/* Tags */}
                <div className="pt-6 border-t border-gray-100 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-[#033F2D] uppercase flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" /> {locale === 'en' ? 'Tags:' : 'الوسوم:'}
                  </span>
                  {post.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-[#F6F8F5] text-xs font-semibold text-[#033F2D]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Comment Form */}
                <div
                  className={`mt-12 p-8 rounded-3xl bg-[#F6F8F5] border border-gray-100 space-y-6 ${
                    isRTL ? 'text-right' : 'text-left'
                  }`}
                >
                  <h3 className="text-2xl font-bold text-[#033F2D]">
                    {locale === 'en' ? 'Leave a Comment or Inquiry' : 'اترك تعليقاً أو استفساراً'}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {locale === 'en'
                      ? 'Your email will not be published. Required fields are marked with *'
                      : 'لن يتم نشر بريدك الإلكتروني للعامة. الحقول الإلزامية محددة بـ *'}
                  </p>

                  {commentSent ? (
                    <div className="p-4 rounded-xl bg-[#033F2D] text-white flex items-center gap-2 text-sm font-semibold">
                      <CheckCircle2 className="w-5 h-5 text-[#C7F268]" />
                      <span>
                        {locale === 'en'
                          ? 'Thank you! Your comment has been received.'
                          : 'شكراً لك! تم استلام تعليقك وبانتظار المراجعة.'}
                      </span>
                    </div>
                  ) : (
                    <form onSubmit={handleComment} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                          type="text"
                          required
                          placeholder={locale === 'en' ? 'Full Name *' : 'الاسم الكريم *'}
                          className={`px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white outline-none focus:border-[#033F2D] ${
                            isRTL ? 'text-right' : 'text-left'
                          }`}
                        />
                        <input
                          type="email"
                          required
                          placeholder={locale === 'en' ? 'Email Address *' : 'البريد الإلكتروني *'}
                          className="px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white outline-none focus:border-[#033F2D] text-left"
                          dir="ltr"
                        />
                      </div>
                      <textarea
                        rows={4}
                        required
                        placeholder={locale === 'en' ? 'Write your comment or question here... *' : 'اكتب تعليقك أو سؤالك هنا... *'}
                        className={`w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white outline-none focus:border-[#033F2D] resize-none ${
                          isRTL ? 'text-right' : 'text-left'
                        }`}
                      />
                      <button
                        type="submit"
                        className="bg-[#033F2D] hover:bg-[#022A1E] text-white py-3 px-6 text-sm font-bold rounded-xl cursor-pointer transition-colors"
                      >
                        {locale === 'en' ? 'Submit Comment' : 'إرسال التعليق'}
                      </button>
                    </form>
                  )}
                </div>
              </div>

              {/* Sidebar (4 cols) */}
              <div className="lg:col-span-4 space-y-8">
                {/* Recent Posts */}
                <div className="p-6 rounded-3xl bg-[#F6F8F5] border border-gray-100 space-y-4">
                  <h4 className="text-lg font-bold text-[#033F2D] border-b border-gray-200 pb-3">
                    {locale === 'en' ? 'Recent Articles' : 'أحدث المقالات'}
                  </h4>
                  <div className="space-y-4">
                    {siteData.blogPosts.map((bp) => (
                      <Link
                        key={bp.id}
                        href={`/blog/${bp.slug}`}
                        className="flex items-center gap-3 group"
                      >
                        <div className="w-16 h-16 rounded-xl overflow-hidden relative shrink-0">
                          <Image
                            src={bp.image}
                            alt={bp.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div>
                          <span className="text-[11px] text-gray-400 block">{bp.date}</span>
                          <h5 className="text-xs font-bold text-[#033F2D] group-hover:underline line-clamp-2 mt-0.5">
                            {bp.title}
                          </h5>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div className="p-6 rounded-3xl bg-[#F6F8F5] border border-gray-100 space-y-4">
                  <h4 className="text-lg font-bold text-[#033F2D] border-b border-gray-200 pb-3">
                    {t.navServices}
                  </h4>
                  <ul className="space-y-2">
                    {siteData.services.map((s) => (
                      <li key={s.id}>
                        <Link
                          href={`/services/${s.slug}`}
                          className="flex items-center justify-between p-2 rounded-lg text-sm text-[#033F2D] hover:bg-white transition-colors font-bold"
                        >
                          <span>{s.title}</span>
                          {isRTL ? (
                            <ChevronLeft className="w-3.5 h-3.5 text-gray-400" />
                          ) : (
                            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
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
