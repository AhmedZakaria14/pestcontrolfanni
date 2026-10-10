import NotFound from '../not-found';

export const metadata = {
  title: 'خطأ 404 - الصفحة غير موجودة – المركز الفني المتخصص',
  description: 'الصفحة التي تبحث عنها غير متوفرة حالياً.',
};

export default function Custom404Page() {
  return <NotFound />;
}
