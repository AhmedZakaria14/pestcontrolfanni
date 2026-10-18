export interface CompanyInfo {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  country: string;
  countryArabic: string;
  phonePrimary: string;
  phonePrimaryRaw: string;
  phoneSecondary: string;
  phoneSecondaryRaw: string;
  whatsapp: string;
  whatsappNumber: string;
  whatsappUrl: string;
  workingHours: string;
  coverage: string;
}

export const COMPANY_AR: CompanyInfo = {
  name: 'المركز الفني المتخصص لمكافحة الحشرات والقوارض',
  shortName: 'المركز الفني المتخصص',
  tagline: 'لمكافحة الحشرات والقوارض',
  description:
    'حلول متخصصة لمكافحة الحشرات والقوارض في المنازل والفلل والمنشآت داخل جمهورية مصر العربية، مع الاهتمام بفحص المشكلة واختيار طريقة المكافحة الآمنة والفعالة لكل حالة.',
  country: 'مصر',
  countryArabic: 'جمهورية مصر العربية',
  phonePrimary: '01000989063',
  phonePrimaryRaw: 'tel:01000989063',
  phoneSecondary: '01000989064',
  phoneSecondaryRaw: 'tel:01000989064',
  whatsapp: '01000989063',
  whatsappNumber: '201000989063',
  whatsappUrl: 'https://wa.me/201000989063',
  workingHours: 'خدمة متواصلة يومياً لتلقي طلبات المعاينة والمكافحة',
  coverage: 'تغطية شاملة للقاهرة الكبرى والجيزة ومحافظات جمهورية مصر العربية',
};

export const COMPANY_EN: CompanyInfo = {
  name: 'Specialized Technical Center for Pest & Rodent Control',
  shortName: 'Specialized Technical Center',
  tagline: 'For Pest & Rodent Control',
  description:
    'Specialized pest and rodent control solutions for homes, villas, and commercial facilities across Egypt, with thorough technical inspection and safe, odorless treatment tailored to every case.',
  country: 'Egypt',
  countryArabic: 'Arab Republic of Egypt',
  phonePrimary: '01000989063',
  phonePrimaryRaw: 'tel:01000989063',
  phoneSecondary: '01000989064',
  phoneSecondaryRaw: 'tel:01000989064',
  whatsapp: '01000989063',
  whatsappNumber: '201000989063',
  whatsappUrl: 'https://wa.me/201000989063',
  workingHours: 'Daily 24/7 service for inspection & pest control requests',
  coverage: 'Full coverage across Greater Cairo, Giza, and all governorates of Egypt',
};

export const company = COMPANY_AR;

export function getCompanyByLocale(locale: 'ar' | 'en'): CompanyInfo {
  return locale === 'en' ? COMPANY_EN : COMPANY_AR;
}
