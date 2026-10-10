import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';

export const metadata = {
  title: 'الشروط والأحكام – المركز الفني المتخصص لمكافحة الحشرات',
  description: 'الشروط والأحكام الخاصة بخدمات مكافحة الآفات وإبادة الحشرات من المركز الفني المتخصص.',
};

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-right">
      <Header />

      <main className="flex-1">
        <PageBanner
          title="الشروط والأحكام"
          breadcrumbs={[{ label: 'الشروط والأحكام' }]}
        />

        <div className="py-20 lg:py-28 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-[#484C44] text-base leading-relaxed text-right">
            <div>
              <h2 className="text-2xl font-bold text-[#033F2D] mb-3">1. نطاق تقديم الخدمات</h2>
              <p>
                يقدم المركز الفني المتخصص لمكافحة الحشرات والقوارض خدمات المعاينة والرش الوقائي والعلاجي ومكافحة الآفات للمباني السكنية والتجارية باستخدام مبيدات ومركبات آمنة معتمدة من الهيئات المختصة، وفقاً لما يتم الاتفاق عليه في عقد الخدمة المحدد.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#033F2D] mb-3">2. تحضير الموقع وإتاحة الوصول</h2>
              <p>
                يلتزم العميل بتعليمات التحضير المسبق (مثل حفظ وتغطية الأطعمة المكشوفة، وتسهيل وصول الفنيين إلى الزوايا ومنافذ الصرف والحدائق، وإخلاء الموقع خلال وقت الرش الموصى به إن تطلب ذلك).
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#033F2D] mb-3">3. الضمان وإعادة الرش المجاني</h2>
              <p>
                بموجب شهادة الضمان الصادرة مع الباقة المعتمدة، في حال ظهور أي بؤرة إصابة حشرية للحشرات المستهدفة خلال فترة سريان الضمان، يلتزم الفريق بإجراء زيارة إعادة معالجة مجاناً وبدون أي رسوم إضافية.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#033F2D] mb-3">4. تعديل المواعيد والإلغاء</h2>
              <p>
                يمكن تعديل أو تأجيل موعد الزيارة الميدانية بإشعار مسبق قبل 24 ساعة على الأقل من الموعد المحدد دون أي غرامات أو تكاليف.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
