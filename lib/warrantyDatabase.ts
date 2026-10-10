import { company } from './company';

export interface WarrantyCertificate {
  id: string;
  code: string; // e.g. HARD-2026-8841
  customerName: string;
  customerPhone: string;
  serviceTitle: string;
  serviceCategory: string;
  propertyAddress: string;
  city: string;
  issueDate: string; // ISO date format YYYY-MM-DD
  expiryDate: string; // ISO date format YYYY-MM-DD
  durationYears: number;
  status: 'active' | 'expired' | 'pending_renewal';
  pesticideDetails: string;
  followUpVisitsTotal: number;
  followUpVisitsCompleted: number;
  nextFollowUpDate?: string;
  notes?: string;
  createdAt: string;
}

// In-memory active database pre-loaded with realistic certificates
const initialCertificates: WarrantyCertificate[] = [
  {
    id: 'cert-1',
    code: 'HARD-2026-8841',
    customerName: 'أ. أحمد صبري العوضي',
    customerPhone: '01012345678',
    serviceTitle: 'إبادة ومكافحة صراصير المطابخ بالجل الألماني الفائق',
    serviceCategory: 'مكافحة صراصير وقوارض منزلية',
    propertyAddress: 'شقة 402 - الحي الخامس - التجمع الخامس',
    city: 'القاهرة الجديدة',
    issueDate: '2026-01-10',
    expiryDate: '2029-01-10',
    durationYears: 3,
    status: 'active',
    pesticideDetails: 'مركبات جل ألمانية مصرح بها من وزارة الصحة المصرية بدون رائحة ولا تتطلب إخلاء الأواني',
    followUpVisitsTotal: 4,
    followUpVisitsCompleted: 1,
    nextFollowUpDate: '2026-05-15',
    notes: 'تم فحص جميع أجهزة المطبخ وسد كافة الشقوق الحائطية وتطبيق الطعوم بالحقن الفني',
    createdAt: '2026-01-10T10:00:00Z',
  },
  {
    id: 'cert-2',
    code: 'HARD-2026-9205',
    customerName: 'م. شريف عبد المنعم',
    customerPhone: '01198765432',
    serviceTitle: 'المعاملة الشاملة لإبادة بق الفراش وتبخير الأسرة والفرشات',
    serviceCategory: 'مكافحة حشرات فراش وتطهير',
    propertyAddress: 'فيلا 18 - الحي الدبلوماسي - الشيخ زايد',
    city: 'الجيزة / 6 أكتوبر',
    issueDate: '2026-02-15',
    expiryDate: '2028-02-15',
    durationYears: 2,
    status: 'active',
    pesticideDetails: 'ميكرو كبسولات مخصصة لمكافحة بق الفراش مع المعالجة الحرارية المساعدة للمراتب',
    followUpVisitsTotal: 3,
    followUpVisitsCompleted: 2,
    nextFollowUpDate: '2026-08-10',
    notes: 'تم تطهير جميع الغرف والأسرة بالكامل وتوصية العميل بغسيل المفروشات على حرارة عالية',
    createdAt: '2026-02-15T14:30:00Z',
  },
  {
    id: 'cert-3',
    code: 'HARD-2026-3112',
    customerName: 'شركة النيل للتطوير والعمران (أ. محمود طاهر)',
    customerPhone: '01000112233',
    serviceTitle: 'الحماية الهندسية وحقن خرسانة المبنى ضد النمل الأبيض قبل البناء',
    serviceCategory: 'وقاية هندسية ونمل أبيض',
    propertyAddress: 'قطعة 104 - حي المال والأعمال',
    city: 'العاصمة الإدارية الجديدة',
    issueDate: '2025-03-01',
    expiryDate: '2035-03-01',
    durationYears: 10,
    status: 'active',
    pesticideDetails: 'محاليل وقائية طويلة المدى غير قابلة للتحلل المائي لحماية القواعد والأساسات الخرسانية',
    followUpVisitsTotal: 10,
    followUpVisitsCompleted: 1,
    nextFollowUpDate: '2026-03-01',
    notes: 'شهادة ضمان معتمدة هندسياً وموثقة لحماية الخرسانة وكتل البناء لمدة 10 سنوات كاملة',
    createdAt: '2025-03-01T09:00:00Z',
  },
  {
    id: 'cert-4',
    code: 'HARD-2026-1044',
    customerName: 'د. نورهان السيد',
    customerPhone: '01234567890',
    serviceTitle: 'المكافحة الدورية الشاملة للحشرات والقوارض بالحدايق',
    serviceCategory: 'مكافحة وقائية عامة',
    propertyAddress: 'شارع 9 - المقطم',
    city: 'القاهرة',
    issueDate: '2024-10-05',
    expiryDate: '2025-10-05',
    durationYears: 1,
    status: 'expired',
    pesticideDetails: 'رش ضبابي وقائي ومحطات طعوم قوارض آمنة حول الأسوار',
    followUpVisitsTotal: 2,
    followUpVisitsCompleted: 2,
    nextFollowUpDate: undefined,
    notes: 'انتهت فترة الضمان الأولية ويمكن طلب تجديد الضمان بخصم 25% للعملاء الدائمين',
    createdAt: '2024-10-05T12:00:00Z',
  },
];

// Global active store during runtime (persisted in global scope in Node.js server environment)
const globalStore = global as unknown as {
  __WARRANTY_CERTIFICATES__?: WarrantyCertificate[];
};

if (!globalStore.__WARRANTY_CERTIFICATES__) {
  globalStore.__WARRANTY_CERTIFICATES__ = [...initialCertificates];
}

export function getWarrantyCertificates(): WarrantyCertificate[] {
  return globalStore.__WARRANTY_CERTIFICATES__ || initialCertificates;
}

export function findWarrantyByCode(code: string): WarrantyCertificate | null {
  if (!code) return null;
  const cleanCode = code.trim().toUpperCase();
  const certs = getWarrantyCertificates();
  
  // Direct match or partial match
  const match = certs.find(
    (c) => c.code.toUpperCase() === cleanCode || c.code.toUpperCase().replace(/[^A-Z0-9]/g, '') === cleanCode.replace(/[^A-Z0-9]/g, '')
  );

  return match || null;
}

export function createWarrantyCertificate(
  payload: Partial<WarrantyCertificate> & { customerName: string; serviceTitle: string }
): WarrantyCertificate {
  const certs = getWarrantyCertificates();
  
  const issueDateObj = payload.issueDate ? new Date(payload.issueDate) : new Date();
  const issueDate = issueDateObj.toISOString().split('T')[0];
  
  const duration = payload.durationYears || 3;
  const expiryDateObj = new Date(issueDateObj);
  expiryDateObj.setFullYear(expiryDateObj.getFullYear() + duration);
  const expiryDate = expiryDateObj.toISOString().split('T')[0];

  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const generatedCode = payload.code
    ? payload.code.trim().toUpperCase()
    : `HARD-2026-${randomNum}`;

  const newCert: WarrantyCertificate = {
    id: `cert-${Date.now()}`,
    code: generatedCode,
    customerName: payload.customerName.trim(),
    customerPhone: payload.customerPhone || '01000989063',
    serviceTitle: payload.serviceTitle.trim(),
    serviceCategory: payload.serviceCategory || 'مكافحة حشرات متخصصة',
    propertyAddress: payload.propertyAddress || 'القاهرة الكبرى / الجيزة',
    city: payload.city || 'جمهورية مصر العربية',
    issueDate,
    expiryDate,
    durationYears: duration,
    status: payload.status || 'active',
    pesticideDetails: payload.pesticideDetails || 'مركبات ألمانية وأمريكية معتمدة من وزارة الصحة المصرية بدون روائح',
    followUpVisitsTotal: payload.followUpVisitsTotal || 3,
    followUpVisitsCompleted: payload.followUpVisitsCompleted || 0,
    nextFollowUpDate: payload.nextFollowUpDate || issueDate,
    notes: payload.notes || 'شهادة ضمان إلكترونية موثقة صادرة من المركز الفني المتخصص لمكافحة الحشرات والقوارض',
    createdAt: new Date().toISOString(),
  };

  certs.unshift(newCert);
  return newCert;
}
