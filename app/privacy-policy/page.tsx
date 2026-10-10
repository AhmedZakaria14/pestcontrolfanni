import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';

export const metadata = {
  title: 'سياسة الخصوصية – المركز الفني المتخصص لمكافحة الحشرات',
  description: 'سياسة الخصوصية وحماية بيانات العملاء في المركز الفني المتخصص لمكافحة الحشرات والقوارض.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-right">
      <Header />

      <main className="flex-1">
        <PageBanner
          title="سياسة الخصوصية"
          breadcrumbs={[{ label: 'سياسة الخصوصية' }]}
        />

        <div className="py-20 lg:py-28 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-[#484C44] text-base leading-relaxed text-right">
            <div>
              <h2 className="text-2xl font-bold text-[#033F2D] mb-3">1. البيانات والمعلومات التي نجمعها</h2>
              <p>
                عند طلبك لخدمة المعاينة، أو حجز موعد رش ومكافحة، أو التواصل معنا عبر نماذج الموقع، قد نجمع بيانات شخصية تشمل الاسم، وعنوان العقار أو المنشأة، ورقم الهاتف، والبريد الإلكتروني، وتفاصيل الإصابة الحشرية المرصودة في الموقع.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#033F2D] mb-3">2. كيف نستخدم معلوماتك</h2>
              <p>
                نستخدم هذه البيانات حصرياً لتقديم عروض الأسعار الدقيقة، وإرسال فرق الفنيين المتخصصين إلى موقعك، وتفعيل شهادات الضمان المعتمدة، ومتابعة الزيارات الدورية الوقائية. نحن لا نبيع ولا نشارك بيانات عملائنا مع أي جهة خارجية أو طرف ثالث.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#033F2D] mb-3">3. أمان وسرية البيانات</h2>
              <p>
                نطبق معايير تشفير وحماية مشددة لضمان بقاء تقارير المعاينة وبيانات عقارك وسجلات الخدمة سرية ومحمية بالكامل.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#033F2D] mb-3">4. التواصل والاستفسارات</h2>
              <p>
                إذا كان لديك أي استفسار بخصوص سياسة الخصوصية أو ترغب في تحديث بياناتك المسجلة لدينا، يمكنك التواصل مع فريق الدعم الفني عبر البريد: info@hard-pest.com.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
