import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-right">
      <Header />

      <main className="flex-1">
        <PageBanner
          title="الصفحة غير موجودة"
          breadcrumbs={[{ label: 'خطأ 404' }]}
        />

        <div className="py-24 lg:py-32 text-center max-w-2xl mx-auto px-4">
          <div className="w-24 h-24 rounded-full bg-[#C7F268]/30 text-[#033F2D] flex items-center justify-center mx-auto mb-6 text-4xl font-black">
            404
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#033F2D] mb-4">
            عذراً! الصفحة التي تبحث عنها غير متوفرة
          </h2>
          <p className="text-sm sm:text-base text-[#484C44] leading-relaxed mb-8">
            ربما تم نقل الصفحة، أو حذفها، أو تم كتابة الرابط بشكل غير صحيح. يمكنك العودة إلى الصفحة الرئيسية واستكشاف خدماتنا الشاملة في مكافحة الآفات.
          </p>
          <Link href="/" className="btn-default py-3.5 px-8 font-bold inline-flex items-center gap-2">
            <Home className="w-4 h-4" />
            <span>العودة للرئيسية</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
