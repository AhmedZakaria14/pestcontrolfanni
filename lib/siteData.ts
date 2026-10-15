import { company, COMPANY_EN } from './company';
import { COMPANY_IMAGES, CLASSIC_IMAGES, PEST_IMAGES } from './media';

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  image: string;
  iconName: string;
  features: string[];
  benefits: string[];
  process: { step: string; title: string; desc: string }[];
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  categoryKey?: 'سكني' | 'تجاري' | 'نمل أبيض' | 'قوارض';
  location: string;
  duration: string;
  image: string;
  overview: string;
  challenge: string;
  solution: string;
  results: string[];
}

export interface TeamMember {
  id: string;
  slug: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  experience: string;
  phone: string;
  email: string;
  social: {
    linkedin: string;
    twitter: string;
    facebook: string;
  };
  skills: { name: string; percentage: number }[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  image: string;
  readTime: string;
  tags: string[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  location?: string;
  rating: number;
  quote: string;
  image?: string;
  company?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  type: string;
  description: string;
  popular?: boolean;
  features: string[];
  idealFor: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
  categoryKey?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  categoryKey?: 'سكني' | 'تجاري' | 'نمل أبيض' | 'صديق للبيئة';
  image: string;
  videoUrl?: string;
}

export const SITE_INFO = {
  name: company.name,
  shortName: company.shortName,
  tagline: company.tagline,
  phone: company.phonePrimary,
  phoneRaw: company.phonePrimary,
  phoneSecondary: company.phoneSecondary,
  whatsapp: company.whatsapp,
  whatsappUrl: company.whatsappUrl,
  address: company.coverage,
  country: company.countryArabic,
  workingHours: company.workingHours,
};

export const SITE_INFO_EN = {
  name: COMPANY_EN.name,
  shortName: COMPANY_EN.shortName,
  tagline: COMPANY_EN.tagline,
  phone: COMPANY_EN.phonePrimary,
  phoneRaw: COMPANY_EN.phonePrimary,
  phoneSecondary: COMPANY_EN.phoneSecondary,
  whatsapp: COMPANY_EN.whatsapp,
  whatsappUrl: COMPANY_EN.whatsappUrl,
  address: COMPANY_EN.coverage,
  country: COMPANY_EN.countryArabic,
  workingHours: COMPANY_EN.workingHours,
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: '1',
    slug: 'residential-pest-control',
    title: 'مكافحة حشرات المنازل والفلل',
    subtitle: 'حماية متكاملة وآمنة لمنزلك وأفراد أسرتك',
    description: 'معالجة فنية متطورة للشقق والفلل والحدائق المنزلية باستخدام مبيدات مرخصة بدون روائح ودون مغادرة المكان.',
    longDescription: 'نقدم في المركز الفني المتخصص لمكافحة الحشرات خدمات فحص ومعالجة شاملة للمنازل والفلل داخل جمهورية مصر العربية. نعتمد على استراتيجيات مكافحة متقدمة تستهدف بؤر اختباء وتكاثر الحشرات مباشرة، مع استخدام تركيبات آمنة تماماً ومصرح بها للأطفال وكبار السن.',
    image: COMPANY_IMAGES.residentialInspection,
    iconName: 'Home',
    features: [
      'فحص دقيق لمناطق المطبخ والحمامات وشبكات الصرف',
      'معالجة الفراغات والشقوق بمركبات مخصصة طويلة الأمد',
      'مبيدات معتمدة آمنة تماماً ولا تتطلب إخلاء المنزل أو تفريغ الأواني',
      'إرشادات وقائية مخصصة تمنع تسلل الحشرات من الشقق المجاورة',
    ],
    benefits: [
      'راحة بال فورية وبيئة صحية نظيفة وخالية من الآفات',
      'معالجة دقيقة وسريعة بأيدي فنيين متمرسين',
      'متابعة دورية تضمن استقرار النتائج وفاعليتها',
    ],
    process: [
      { step: '01', title: 'المعاينة والفحص الفني', desc: 'معاينة دقيقة للموقع لتحديد نوع الحشرة ومدى انتشارها.' },
      { step: '02', title: 'تحديد خطة المكافحة', desc: 'اختيار المركبات المعتمدة المناسبة لنوع الإصابة وطبيعة المكان.' },
      { step: '03', title: 'التنفيذ الدقيق', desc: 'تطبيق محاليل الرش الموجهة والطعوم النقطية بأعلى معايير الأمان.' },
      { step: '04', title: 'المتابعة والإرشادات', desc: 'تقديم نصائح عملية للوقاية المستمرة والتواصل للمتابعة.' },
    ],
  },
  {
    id: '2',
    slug: 'cockroach-ant-control',
    title: 'إبادة الصراصير والنمل',
    subtitle: 'استئصال مستعمرات الصراصير الألمانية والأمريكية',
    description: 'معالجة متخصصة بالجل الألماني والأمريكي النقطي وحقن الزوايا العميقة دون الحاجة لمغادرة المطبخ.',
    longDescription: 'تعد الصراصير من أكثر الحشرات إزعاجاً وخطورة لنقلها الميكروبات إلى الأطعمة. يعتمد المركز الفني المتخصص على استراتيجية الجل البيولوجي عالي الفعالية، حيث تتغذى الحشرات على الطعم وتنقله إلى العش لإبادة المستعمرة من جذورها دون أي روائح نفاذة.',
    image: PEST_IMAGES.cockroachGerman,
    iconName: 'Sparkles',
    features: [
      'طعوم جل مستوردة عالية الفاعلية بدون رائحة',
      'استهداف مباشر لصراصير المطابخ والمطاعم والأجهزة الكهربائية',
      'معالجة فتحات الصرف والبالوعات ومسارات الأنابيب',
      'أمان تام للأطعمة وأواني الطهي دون الحاجة لتفريغ الدواليب',
    ],
    benefits: [
      'توقف فوري لتكاثر الصراصير واختفاؤها التام',
      'حماية كاملة للمطابخ والمخازن ومناطق إعداد الوجبات',
      'نتائج ملموسة تدوم لفترات طويلة مع المتابعة المستمرة',
    ],
    process: [
      { step: '01', title: 'فحص الشقوق والأجهزة', desc: 'تحديد بؤر اختباء الصراصير خلف الثلاجات والبوتاجازات والأحواض.' },
      { step: '02', title: 'وضع الجل النقطي', desc: 'توزيع نقاط الجل بدقة في المسارات المخفية التي تسلكها الحشرات.' },
      { step: '03', title: 'معاملة البالوعات', desc: 'تأمين نقاط الصرف الصحي بمبيدات متخصصة طويلة الأثر.' },
      { step: '04', title: 'متابعة النتيجة', desc: 'التأكد من انهيار المستعمرة تماماً وتقديم نصائح النظافة الوقائية.' },
    ],
  },
  {
    id: '3',
    slug: 'bed-bug-treatment',
    title: 'مكافحة وإبادة بق الفراش',
    subtitle: 'حلول حاسمة للقضاء على حشرة الفراش وبيوضها',
    description: 'بروتوكول متخصص لمعالجة المراتب والأسرة ومفروشات الغرف بأعلى درجات الدقة والحرص.',
    longDescription: 'بق الفراش حشرة عنيدة تختبئ في أصغر الشقوق وثنايا المراتب، وتسبب لدغات ليلية مؤرقة. نوفر في المركز الفني المتخصص خطة علاجية مخصصة تجمع بين الحقن المركز للشقوق واستخدام مركبات موجهة تضمن القضاء على الحشرات البالغة وبيوضها ومنع تكرار الإصابة.',
    image: PEST_IMAGES.bedBug,
    iconName: 'Zap',
    features: [
      'فحص تفصيلي للمراتب والأسرة والستائر وخلف البراويز',
      'حقن دقيق لثنايا الخشب والجبس بورد والوزرات المحيطة',
      'استخدام منظمات نمو حشري تمنع فقس البيض نهائياً',
      'زيارات متابعة تأكيدية لضمان القضاء التام على أطوار الحشرة',
    ],
    benefits: [
      'نوم هادئ والتخلص الفوري من اللدغات والحكة المزعجة',
      'حماية الأثاث والمفروشات من التلف دون الحاجة للتخلص منها',
      'استعادة نظافة وأمان غرف النوم بأعلى درجات السرية والاحترافية',
    ],
    process: [
      { step: '01', title: 'الفحص المجهري للغرفة', desc: 'معاينة المراتب والزوايا والألواح الخلفية للسرير.' },
      { step: '02', title: 'المعالجة الموجهة المركزة', desc: 'تطبيق المبيدات المخصصة للشقوق وتجاويف الأثاث.' },
      { step: '03', title: 'الحزام الوقائي للغرفة', desc: 'معاملة مداخل الغرفة والأرضيات لمنع انتقال الحشرات.' },
      { step: '04', title: 'المتابعة والتأكيد', desc: 'فحص مكمل بعد أسبوع للتأكد من انعدام أي نشاط جديد.' },
    ],
  },
  {
    id: '4',
    slug: 'rodent-control',
    title: 'مكافحة الفئران والقوارض',
    subtitle: 'طرد واصطياد محكم مع تأمين منافذ الدخول',
    description: 'خطط مدروسة للتخلص من الفئران والجرذان وسد الفتحات وتطهير الأماكن المتضررة.',
    longDescription: 'تشكل الفئران خطراً كبيراً بنقل الأمراض وإتلاف الأسلاك الكهربائية والمؤن. يعمل فريقنا الفني على استكشاف آثار القوارض وتوزيع محطات طعوم آمنة ومصائد احترافية، إلى جانب سد الفجوات والمنافذ الإنشائية لمنع دخولها مستقبلاً.',
    image: PEST_IMAGES.mouseRodent,
    iconName: 'ShieldAlert',
    features: [
      'محطات طعوم محكمة ومغلقة لا تشكل أي خطر على الأطفال أو الحيوانات',
      'سد الفتحات والمسارات التي تستغلها القوارض للدخول',
      'تأمين غرف المحركات والأسقف المعلقة والمناور',
      'تطهير شامل للأماكن التي تواجدت فيها القوارض',
    ],
    benefits: [
      'حماية الأسلاك والأجهزة الكهربائية من خطر التماس والحرائق',
      'الحفاظ على سلامة ونظافة المخزون الغذائي والمنزل',
      'تأمين متكامل يمنع عودة الفئران من الخارج',
    ],
    process: [
      { step: '01', title: 'مسح المسارات والمداخل', desc: 'تحديد منافذ دخول الفئران وأماكن اختبائها ونقاط حركتها.' },
      { step: '02', title: 'تثبيت محطات الطعوم', desc: 'توزيع المصائد ومحطات الطعوم في المواقع الاستراتيجية.' },
      { step: '03', title: 'العزل وسد الثغرات', desc: 'إحكام غلق الفتحات بالشبك والمواد المانعة للقرض.' },
      { step: '04', title: 'التفتيش والتأمين النهائي', desc: 'رفع المصائد وتأكيد خلو المنشأة تماماً من أي قوارض.' },
    ],
  },
  {
    id: '5',
    slug: 'termite-control',
    title: 'مكافحة النمل الأبيض (الأرضة)',
    subtitle: 'حماية الأساسات والخرسانة والباركيه والأخشاب',
    description: 'معالجة متخصصة للنمل الأبيض قبل البناء وبعده وحقن الأرضيات والأبواب بمركبات ممتدة المفعول.',
    longDescription: 'يتغذى النمل الأبيض على السيليلوز الموجود في الأخشاب والأبواب والأرضيات الباركية، وقد يسبب تآكلاً خفياً للأثاث والجدران. نوفر حلول حقن التربة والأرضيات بمبيدات متخصصة طويلة الأمد لحماية المباني قبل الإنشاء أو معالجة الإصابات القائمة.',
    image: PEST_IMAGES.termite,
    iconName: 'ShieldCheck',
    features: [
      'معالجة الدفان والتربة قبل الصبة وصب الأساسات للمباني الجديدة',
      'حقن دقيق للأرضيات وحلوق الأبواب دون إتلاف المظهر العام',
      'استخدام مبيدات مخصصة ذات أثر باقٍ يمتد لسنوات',
      'حماية متكاملة للأرضيات الخشبية (الباركيه) والمكتبات والأسقف',
    ],
    benefits: [
      'حماية القيمة الإنشائية والجمالية للمنزل والعقار',
      'منع تآكل حلوق الأبواب والدواليب والمكتبات الخشبية',
      'راحة بال وحاجز وقائي دائم يمنع تفشي المستعمرات',
    ],
    process: [
      { step: '01', title: 'الكشف عن مسارات النمل', desc: 'معاينة الأنابيب الطينية وفحص الأخشاب المصابة.' },
      { step: '02', title: 'تحديد نقاط الحقن', desc: 'حساب المسافات الدقيقة لحقن المحلول الكيميائي الوقائي.' },
      { step: '03', title: 'الحقن الفني المتخصص', desc: 'ضخ المبيد تحت ضغط مناسب لتشكيل حاجز محيطي عازل.' },
      { step: '04', title: 'سد وتجميل الثقوب', desc: 'إغلاق نقاط المعاملة بمواد متطابقة مع لون الأرضيات.' },
    ],
  },
  {
    id: '6',
    slug: 'commercial-pest-control',
    title: 'مكافحة آفات الشركات والمنشآت',
    subtitle: 'عقود صيانة ومكافحة دورية للمطاعم والمصانع والمستودعات',
    description: 'خطط وقائية متكاملة للمنشآت التجارية تلبي أعلى المعايير الصحية وتوفر حماية مستمرة.',
    longDescription: 'تتطلب المنشآت التجارية والمطاعم والمصانع برامج مكافحة دقيقة ومنتظمة للحفاظ على سمعتها والالتزام باشتراطات الصحة والسلامة. يقدم المركز الفني المتخصص خطط مكافحة متكاملة تشمل الزيارات الدورية، محطات المتابعة، والتقارير الفنية المعتمدة.',
    image: CLASSIC_IMAGES.commercialWarehouse,
    iconName: 'Building2',
    features: [
      'زيارات دورية منتظمة وفق جدول زمني يناسب أوقات العمل',
      'تركيب محطات مراقبة وصيد داخلية وخارجية',
      'تقارير فنية تفصيلية بعد كل زيارة توضح حالة المنشأة',
      'استجابة سريعة لأي استفسارات أو حالات طارئة',
    ],
    benefits: [
      'الحفاظ على بيئة عمل نظيفة ومطابقة للاشتراطات الصحية',
      'حماية المنتجات والمخزون من التلف والتلوث',
      'شراكة موثوقة وفريق فني متمرس ومستعد دائماً',
    ],
    process: [
      { step: '01', title: 'المعاينة الأولية الشاملة', desc: 'فحص صالات الإنتاج، المخازن، ومناطق تجميع النفايات.' },
      { step: '02', title: 'وضع جدول الزيارات', desc: 'تحديد مواعيد المعاملة الوقائية بما لا يعطل العمليات اليومية.' },
      { step: '03', title: 'تطبيق خطة المكافحة', desc: 'استخدام المعدات المناسبة والطعوم المعتمدة للمنشآت الغذائية.' },
      { step: '04', title: 'التقارير والمتابعة المستمرة', desc: 'تسليم تقرير مفصل لإدارة المنشأة مع رصد مؤشرات الفاعلية.' },
    ],
  },
];

export const SERVICES_DATA_EN: ServiceItem[] = [
  {
    id: '1',
    slug: 'residential-pest-control',
    title: 'Residential & Villa Pest Control',
    subtitle: 'Complete, Safe & Odorless Protection for Your Family & Home',
    description: 'Advanced technical treatment for apartments, villas, and residential gardens using licensed odorless formulations without leaving home.',
    longDescription: 'At the Specialized Technical Center for Pest & Rodent Control, we provide comprehensive inspection and treatment services for homes and villas across Egypt. We rely on targeted strategies that eliminate pest breeding and hiding spots directly using safe, certified formulations suitable around children and seniors.',
    image: COMPANY_IMAGES.residentialInspection,
    iconName: 'Home',
    features: [
      'Detailed inspection of kitchens, bathrooms, and drainage networks',
      'Long-lasting crevice and void treatment with specialized compounds',
      'Certified safe formulations requiring no evacuation or emptying of cabinets',
      'Custom preventive guidance to block pest entry from neighboring units',
    ],
    benefits: [
      'Immediate peace of mind and a clean, healthy, pest-free home environment',
      'Fast, accurate treatment carried out by experienced field technicians',
      'Periodic follow-ups ensuring stable, long-term effectiveness',
    ],
    process: [
      { step: '01', title: 'Technical Inspection', desc: 'Thorough on-site inspection to identify the exact pest species and infestation level.' },
      { step: '02', title: 'Custom Treatment Plan', desc: 'Selecting the right certified compounds tailored to the infestation and property type.' },
      { step: '03', title: 'Precision Application', desc: 'Applying targeted sprays and precision gel baits with the highest safety standards.' },
      { step: '04', title: 'Follow-Up & Guidance', desc: 'Providing practical preventive advice and continuous follow-up support.' },
    ],
  },
  {
    id: '2',
    slug: 'cockroach-ant-control',
    title: 'Cockroach & Ant Eradication',
    subtitle: 'Total Elimination of German & American Cockroach Colonies',
    description: 'Specialized treatment using German & American precision gel baiting and deep corner injection without vacating your kitchen.',
    longDescription: 'Cockroaches are among the most hazardous household pests due to food contamination. The Specialized Technical Center utilizes high-attraction biological gel baiting where pests feed on the bait and transfer it back to the nest, eradicating the entire colony at its root with zero odor.',
    image: PEST_IMAGES.cockroachGerman,
    iconName: 'Sparkles',
    features: [
      'Imported high-potency, completely odorless gel baits',
      'Direct targeting of kitchens, restaurants, and electrical appliances',
      'Treatment of drain openings, manholes, and plumbing conduits',
      'Complete safety for food and cookware without emptying kitchen cabinets',
    ],
    benefits: [
      'Immediate halt to cockroach reproduction and complete colony collapse',
      'Full protection for kitchens, pantries, and food preparation zones',
      'Long-lasting results backed by continuous technical follow-up',
    ],
    process: [
      { step: '01', title: 'Appliance & Crevice Scan', desc: 'Locating hiding spots behind refrigerators, ovens, and under sinks.' },
      { step: '02', title: 'Precision Gel Baiting', desc: 'Applying micro-gel drops along concealed pest pathways and hinges.' },
      { step: '03', title: 'Drain & Pipe Defense', desc: 'Securing drainage points with long-residual specialized formulations.' },
      { step: '04', title: 'Result Verification', desc: 'Confirming complete colony elimination and sharing preventive sanitation tips.' },
    ],
  },
  {
    id: '3',
    slug: 'bed-bug-treatment',
    title: 'Bed Bug Treatment & Eradication',
    subtitle: 'Decisive Solutions to Eliminate Bed Bugs and Their Eggs',
    description: 'Specialized protocol for treating mattresses, bed frames, and upholstery with maximum precision and care.',
    longDescription: 'Bed bugs are persistent pests that hide in tiny cracks and mattress seams, causing painful nighttime bites. We provide a dedicated treatment plan combining concentrated crevice injection with Insect Growth Regulators (IGRs) that eliminate both adult bugs and unhatched eggs.',
    image: PEST_IMAGES.bedBug,
    iconName: 'Zap',
    features: [
      'Detailed inspection of mattresses, bed frames, curtains, and wall frames',
      'Precision injection into wooden joints, drywall crevices, and baseboards',
      'Use of Insect Growth Regulators (IGRs) to permanently stop egg hatching',
      'Confirmatory follow-up visits to guarantee complete eradication of all life stages',
    ],
    benefits: [
      'Restful sleep and immediate relief from nighttime bites and skin irritation',
      'Preservation of your mattresses and furniture without needing to discard them',
      'Restoring bedroom hygiene and safety with full discretion and professionalism',
    ],
    process: [
      { step: '01', title: 'Microscopic Room Inspection', desc: 'Inspecting mattresses, seams, corners, and headboards.' },
      { step: '02', title: 'Targeted Crevice Treatment', desc: 'Applying specialized formulations to furniture joints and wall cracks.' },
      { step: '03', title: 'Room Perimeter Barrier', desc: 'Treating room entryways and baseboards to prevent pest migration.' },
      { step: '04', title: 'Confirmatory Follow-Up', desc: 'Complementary inspection to verify zero remaining activity.' },
    ],
  },
  {
    id: '4',
    slug: 'rodent-control',
    title: 'Rodent, Mouse & Rat Control',
    subtitle: 'Secure Trapping, Bait Stations & Structural Entry Sealing',
    description: 'Engineered plans to eliminate mice and rats, seal entry gaps, and sanitize affected areas.',
    longDescription: 'Rodents pose severe risks by transmitting diseases and chewing through electrical wiring and food supplies. Our technical team tracks rodent activity, installs tamper-resistant bait stations and professional traps, and seals structural gaps to prevent future entry.',
    image: PEST_IMAGES.mouseRodent,
    iconName: 'ShieldAlert',
    features: [
      'Locked, tamper-resistant bait stations completely safe around children and pets',
      'Sealing of structural openings and pathways used by rodents for entry',
      'Securing motor rooms, suspended ceilings, shafts, and gardens',
      'Comprehensive sanitization of areas affected by rodent activity',
    ],
    benefits: [
      'Protecting electrical wiring and appliances from short-circuits and fire hazards',
      'Preserving the safety and hygiene of food storage and living spaces',
      'Integrated perimeter proofing that prevents rodents from returning',
    ],
    process: [
      { step: '01', title: 'Pathway & Entry Survey', desc: 'Identifying rodent entry points, nesting zones, and movement tracks.' },
      { step: '02', title: 'Bait Station Deployment', desc: 'Installing mechanical traps and locked bait stations in strategic locations.' },
      { step: '03', title: 'Structural Proofing', desc: 'Sealing openings with heavy-duty mesh and gnaw-resistant materials.' },
      { step: '04', title: 'Final Clearance & Audit', desc: 'Inspecting stations and confirming the facility is 100% rodent-free.' },
    ],
  },
  {
    id: '5',
    slug: 'termite-control',
    title: 'Subterranean Termite Control',
    subtitle: 'Protecting Foundations, Concrete, Parquet & Woodwork',
    description: 'Specialized pre-construction and post-construction termite treatment with long-residual floor and door frame injection.',
    longDescription: 'Subterranean termites feed silently on cellulose in wood, door frames, and parquet flooring, causing severe hidden damage. We provide specialized soil and floor injection solutions with multi-year residual protection for both new constructions and existing properties.',
    image: PEST_IMAGES.termite,
    iconName: 'ShieldCheck',
    features: [
      'Pre-construction soil and foundation trench treatment for new buildings',
      'Precision micro-injection for floors and door frames without damaging finishes',
      'Long-residual termiticides providing extended multi-year protection',
      'Complete protection for parquet flooring, wooden libraries, and roofs',
    ],
    benefits: [
      'Protecting the structural and aesthetic value of your property',
      'Preventing hollowing and decay of wooden door frames and cabinetry',
      'Peace of mind with a permanent chemical barrier against termite colonies',
    ],
    process: [
      { step: '01', title: 'Termite Track Detection', desc: 'Inspecting mud tubes, door frames, and affected timber.' },
      { step: '02', title: 'Injection Mapping', desc: 'Calculating precise intervals for protective chemical injection.' },
      { step: '03', title: 'Pressurized Soil Injection', desc: 'Pumping termiticide under calibrated pressure to form an insulating barrier.' },
      { step: '04', title: 'Aesthetic Hole Sealing', desc: 'Sealing treatment points neatly with color-matched floor compounds.' },
    ],
  },
  {
    id: '6',
    slug: 'commercial-pest-control',
    title: 'Commercial & Corporate Pest Control',
    subtitle: 'Periodic Maintenance Contracts for Restaurants, Factories & Warehouses',
    description: 'Integrated preventive pest management programs for commercial facilities meeting strict health and food safety standards.',
    longDescription: 'Commercial facilities, restaurants, hotels, and factories require rigorous, scheduled pest management to protect their reputation and comply with health regulations. The Specialized Technical Center delivers end-to-end IPM contracts including scheduled visits, monitoring stations, and official technical reports.',
    image: CLASSIC_IMAGES.commercialWarehouse,
    iconName: 'Building2',
    features: [
      'Scheduled periodic visits tailored to your business operating hours',
      'Installation of indoor and outdoor monitoring and trapping stations',
      'Detailed technical inspection reports after every visit',
      'Rapid priority response for inquiries or emergency callouts',
    ],
    benefits: [
      'Maintaining a clean workplace compliant with health and food safety standards',
      'Protecting inventory, raw materials, and products from contamination',
      'A reliable technical partner with a dedicated field operations team',
    ],
    process: [
      { step: '01', title: 'Comprehensive Site Audit', desc: 'Inspecting production halls, warehouses, and waste collection zones.' },
      { step: '02', title: 'Service Schedule Design', desc: 'Setting preventive treatment times without disrupting daily operations.' },
      { step: '03', title: 'IPM Program Execution', desc: 'Deploying food-safe baits and specialized monitoring equipment.' },
      { step: '04', title: 'Reporting & Continuous QA', desc: 'Delivering documented reports to management tracking efficacy metrics.' },
    ],
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: '1',
    slug: 'residential-villa-protection-cairo',
    title: 'معالجة وقائية متكاملة لفيلا سكنية',
    category: 'سكني',
    categoryKey: 'سكني',
    location: 'التجمع الخامس، القاهرة الجديدة',
    duration: 'يوم عمل واحد مع متابعة دورية',
    image: COMPANY_IMAGES.outdoorSpraying,
    overview: 'تنفيذ برنامج مكافحة متكامل لفيلا سكنية تشمل الحديقة والمطبخ ومناطق الصرف بعد ملاحظة نشاط موسمي للصراصير والنمل.',
    challenge: 'وجود حديقة خارجية واسعة ومناطق رطوبة حول أحواض الزرع مع رغبة الأسرة في تطبيق آمن لا يؤثر على الأطفال أو المزروعات.',
    solution: 'قام فريق المركز الفني المتخصص بتطبيق مبيدات آمنة مصرح بها حول سور الحديقة مع وضع جل نقطي في المطابخ والحمامات وسد منافذ التسلل.',
    results: [
      'القضاء التام على بؤر الصراصير والنمل في الحديقة والمطبخ',
      'استخدام مركبات خالية من الروائح وبدون مغادرة الأسرة للمنزل',
      'استقرار نظافة الموقع ومتابعة هاتفية دورية ناجحة',
    ],
  },
  {
    id: '2',
    slug: 'commercial-food-storage-giza',
    title: 'برنامج مكافحة وقائي لمنشأة أغذية ومخازن',
    category: 'تجاري',
    categoryKey: 'تجاري',
    location: 'المنطقة الصناعية، مدينة 6 أكتوبر',
    duration: 'عقد متابعة دوري',
    image: CLASSIC_IMAGES.commercialWarehouse,
    overview: 'تأمين مستودع للمواد الغذائية والمخبوزات بمساحة واسعة لمنع أي اقتراب للقوارض والحشرات الزاحفة.',
    challenge: 'حساسية المواد المخزنة وضرورة عدم استخدام أي مبيدات قد تلامس الأغذية أو العبوات الورقية.',
    solution: 'تم توزيع محطات طعوم آمنة ومغلقة حول المحيط الخارجي للمستودع ومصائد داخلية ميكانيكية مع فحص وتدعيم عوازل الأبواب السفلية.',
    results: [
      'حماية المخزون الغذائي بنسبة كاملة وخلو المنشأة من أي إصابات',
      'تقارير فنية موثقة لكل زيارة تفقدية',
      'تطبيق أعلى اشتراطات الأمان والسلامة الغذائية',
    ],
  },
  {
    id: '3',
    slug: 'termite-treatment-wood-foundation',
    title: 'معالجة نمل أبيض وحماية باركيه لشقة سكنية',
    category: 'نمل أبيض',
    categoryKey: 'نمل أبيض',
    location: 'الشيخ زايد، الجيزة',
    duration: 'يومان عمل',
    image: PEST_IMAGES.termite,
    overview: 'معالجة إصابة نمل أبيض ظهرت تحت أرضيات الباركيه وحول حلوق الأبواب الخشبية.',
    challenge: 'ضرورة الحفاظ على الأرضيات الخشبية الثمينة دون كسر أو تلف للألواح والدهانات.',
    solution: 'استخدام أسلوب الحقن المجهري الدقيق بمركبات متخصصة ذات مفعول متدرج يقضي على المستعمرة بالكامل مع سد الفراغات بعناية.',
    results: [
      'توقف تام لتساقط بودرة الخشب وتدمير مستعمرة النمل الأبيض',
      'الحفاظ الكامل على سلامة الباركيه والأثاث دون إتلاف',
      'إرشادات فنية مستمرة للتهوية وعزل الرطوبة',
    ],
  },
  {
    id: '4',
    slug: 'bed-bug-eradication-nasr-city',
    title: 'إبادة بق الفراش لشقة سكنية',
    category: 'سكني',
    categoryKey: 'سكني',
    location: 'مدينة نصر، القاهرة',
    duration: 'جلستان مكافحة ومتابعة',
    image: PEST_IMAGES.bedBug,
    overview: 'مكافحة تفشي حشرة بق الفراش في غرفتي نوم بعد شكوى العميل من اللدغات الليلية المستمرة.',
    challenge: 'انتشار الحشرة في خفايا الأثاث والستائر مع الحاجة لمعاملة سريعة وفعالة بدون تلف المنسوجات.',
    solution: 'تطبيق بروتوكول مكافحة دقيق شمل حقن الشقوق بمبيدات مخصصة ومنظمات نمو تمنع فقس البيض مع زيارة تأكيدية بعد 10 أيام.',
    results: [
      'توقف فوري للدغات واختفاء تام لأي أثر للحشرة',
      'عدم الحاجة للتخلص من المراتب أو قطع الأثاث',
      'رضا تام من العميل والأسرة عن سرعة النتيجة',
    ],
  },
];

export const PROJECTS_DATA_EN: ProjectItem[] = [
  {
    id: '1',
    slug: 'residential-villa-protection-cairo',
    title: 'Integrated Preventive Treatment for a Residential Villa',
    category: 'Residential',
    categoryKey: 'سكني',
    location: 'Fifth Settlement, New Cairo',
    duration: '1 Working Day + Periodic Follow-Up',
    image: COMPANY_IMAGES.outdoorSpraying,
    overview: 'Executed an integrated pest control program for a residential villa including the garden, kitchen, and drainage networks after seasonal cockroach and ant activity was observed.',
    challenge: 'A spacious outdoor garden and high-moisture plant beds combined with the family’s requirement for a child-safe and plant-safe treatment.',
    solution: 'Our technical team applied licensed safe barrier sprays along the garden perimeter, precision gel baiting in kitchens and bathrooms, and sealed entry gaps.',
    results: [
      'Complete elimination of cockroach and ant hotspots in the garden and kitchen',
      'Odorless formulations applied without the family vacating the villa',
      'Long-term site stability verified through scheduled follow-up calls',
    ],
  },
  {
    id: '2',
    slug: 'commercial-food-storage-giza',
    title: 'Preventive Pest Management for Food & Bakery Warehouse',
    category: 'Commercial',
    categoryKey: 'تجاري',
    location: 'Industrial Zone, 6th of October City',
    duration: 'Periodic Maintenance Contract',
    image: CLASSIC_IMAGES.commercialWarehouse,
    overview: 'Secured a large-scale food and bakery storage facility against rodents and crawling insects.',
    challenge: 'High sensitivity of stored food items requiring zero chemical contact with food products or packaging.',
    solution: 'Deployed locked tamper-resistant bait stations around the exterior perimeter and mechanical interior traps, while reinforcing lower door sweeps and seals.',
    results: [
      '100% protection of food inventory with zero pest incidents',
      'Documented technical inspection reports for every scheduled visit',
      'Full compliance with strict food safety and hygiene standards',
    ],
  },
  {
    id: '3',
    slug: 'termite-treatment-wood-foundation',
    title: 'Subterranean Termite Treatment & Parquet Protection',
    category: 'Termites',
    categoryKey: 'نمل أبيض',
    location: 'Sheikh Zayed, Giza',
    duration: '2 Working Days',
    image: PEST_IMAGES.termite,
    overview: 'Treated an active subterranean termite infestation discovered beneath parquet flooring and around wooden door frames.',
    challenge: 'Preserving valuable hardwood parquet floors without breaking boards or damaging paintwork.',
    solution: 'Utilized precision micro-injection with specialized non-repellent termiticides that eradicate the entire underground colony, followed by seamless hole sealing.',
    results: [
      'Complete stop to wood powder shedding and full destruction of the termite colony',
      'Full preservation of parquet flooring and wooden furniture without damage',
      'Ongoing technical guidance for ventilation and moisture isolation',
    ],
  },
  {
    id: '4',
    slug: 'bed-bug-eradication-nasr-city',
    title: 'Bedroom Bed Bug Eradication for Residential Apartment',
    category: 'Residential',
    categoryKey: 'سكني',
    location: 'Nasr City, Cairo',
    duration: '2 Treatment & Follow-Up Sessions',
    image: PEST_IMAGES.bedBug,
    overview: 'Eradicated a severe bed bug infestation across two bedrooms following persistent nighttime bites.',
    challenge: 'Hidden spread inside furniture seams and curtains requiring rapid, fabric-safe eradication.',
    solution: 'Applied a precision treatment protocol combining crevice injection and Insect Growth Regulators (IGRs) to stop egg hatching, plus a 10-day confirmatory visit.',
    results: [
      'Immediate cessation of bites and complete disappearance of all pest traces',
      'No need to discard mattresses or bedroom furniture',
      'Complete family satisfaction with the rapid and odorless result',
    ],
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: '1',
    slug: 'technical-director',
    name: 'مهندس المكافحة والعمليات',
    role: 'المشرف الفني للعمليات الميدانية',
    bio: 'إشراف مباشر على خطط المكافحة وفحص المواقع وتحديد المركبات الفنية الأنسب لكل نوع حشرة وفق الضوابط الصحية والبيئية.',
    image: 'https://demo.awaikenthemes.com/bugfree/wp-content/uploads/2026/01/team-5.jpg',
    experience: 'خبرة ميدانية متخصصة',
    phone: company.phonePrimary,
    email: 'info@hard-pest.com',
    social: { linkedin: '#', twitter: '#', facebook: '#' },
    skills: [
      { name: 'فحص وتشخيص الإصابات الحشرية', percentage: 98 },
      { name: 'معايير الأمان والسلامة البيئية', percentage: 96 },
      { name: 'مكافحة النمل الأبيض وبق الفراش', percentage: 95 },
    ],
  },
  {
    id: '2',
    slug: 'field-operations-supervisor',
    name: 'أخصائي المعاينة والرش الفني',
    role: 'أخصائي المعاينة والتطبيق الميداني',
    bio: 'متمرس في أحدث أجهزة الحقن المجهري والرش الضبابي وتوزيع الجل في الأماكن الحساسة كالمطابخ والمنشآت الغذائية.',
    image: 'https://demo.awaikenthemes.com/bugfree/wp-content/uploads/2026/01/team-7.jpg',
    experience: 'خبرة ميدانية متخصصة',
    phone: company.phoneSecondary,
    email: 'support@hard-pest.com',
    social: { linkedin: '#', twitter: '#', facebook: '#' },
    skills: [
      { name: 'استخدام أجهزة الحقن والرش الحديثة', percentage: 96 },
      { name: 'تطبيق الجل النقطي بدون روائح', percentage: 97 },
      { name: 'عزل مسارات القوارض والفتحات', percentage: 93 },
    ],
  },
];

export const TEAM_MEMBERS_EN: TeamMember[] = [
  {
    id: '1',
    slug: 'technical-director',
    name: 'Pest Control & Operations Engineer',
    role: 'Technical Supervisor of Field Operations',
    bio: 'Direct supervision of pest control plans, site inspections, and selecting the most effective certified compounds for each pest species in accordance with health and environmental standards.',
    image: 'https://demo.awaikenthemes.com/bugfree/wp-content/uploads/2026/01/team-5.jpg',
    experience: 'Specialized Field Expertise',
    phone: company.phonePrimary,
    email: 'info@hard-pest.com',
    social: { linkedin: '#', twitter: '#', facebook: '#' },
    skills: [
      { name: 'Pest Infestation Inspection & Diagnosis', percentage: 98 },
      { name: 'Environmental & Family Safety Standards', percentage: 96 },
      { name: 'Termite & Bed Bug Eradication', percentage: 95 },
    ],
  },
  {
    id: '2',
    slug: 'field-operations-supervisor',
    name: 'Technical Inspection & Treatment Specialist',
    role: 'Field Inspection & Application Specialist',
    bio: 'Experienced in modern micro-injection equipment, misting systems, and precision odorless gel application in sensitive areas such as kitchens and food facilities.',
    image: 'https://demo.awaikenthemes.com/bugfree/wp-content/uploads/2026/01/team-7.jpg',
    experience: 'Specialized Field Expertise',
    phone: company.phoneSecondary,
    email: 'support@hard-pest.com',
    social: { linkedin: '#', twitter: '#', facebook: '#' },
    skills: [
      { name: 'Modern Injection & Spraying Equipment', percentage: 96 },
      { name: 'Odorless Precision Gel Baiting', percentage: 97 },
      { name: 'Rodent Pathway Proofing & Isolation', percentage: 93 },
    ],
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'kitchen-cockroaches-elimination-guide',
    title: 'دليل التخلص من صراصير المطابخ نهائياً بدون روائح مزعجة',
    excerpt: 'تعرف على أسباب انتشار الصراصير الألمانية في المطابخ وأفضل الطرق الفنية للقضاء عليها بأمان تام.',
    content: `تعتبر صراصير المطابخ، وخاصة الصرصور الألماني الصغير، من أكثر الآفات المنزلية صعوبة في المكافحة إذا ما تم الاعتماد على الرش التقليدي العشوائي. تختبئ هذه الحشرات في أماكن دافئة ورطبة مثل محركات الثلاجات، خلف أفران الطهي، وتحت الأحواض.

### ما هو الحل الفني الصحيح؟
1. **الجل النقطي عالي الجاذبية:** يعد الجل الألماني والأمريكي المتخصص أنجح وسيلة لأنه يعمل كطعم شهي للحشرات، فتنقله لداخل المستعمرة وتتغذى عليه باقي الأطوار، مما يسبب انهيار العش بالكامل في أيام قليلة.
2. **سد الشقوق وفواصل السيراميك:** التأكد من سد أي فجوات حول أنابيب الصرف ومقابض الدواليب يمنع الحشرات من إيجاد مأوى آمن.
3. **عدم الرش العشوائي بالبخاخات التجارية:** البخاخات المنزلية ذات الرائحة تطرد الصراصير مؤقتاً لتتفرق داخل الغرف والأجهزة الكهربائية، بدلاً من القضاء عليها.`,
    date: '15 يناير 2026',
    author: 'المركز الفني المتخصص',
    category: 'إرشادات مكافحة',
    image: PEST_IMAGES.cockroachGerman,
    readTime: 'قراءة 4 دقائق',
    tags: ['صراصير المطابخ', 'جل الصراصير', 'نظافة المنزل'],
  },
  {
    id: '2',
    slug: 'bed-bugs-early-signs-summer',
    title: 'علامات وجود بق الفراش وكيفية التصرف السريع لحماية منزلك',
    excerpt: 'كيف تكتشف حشرة الفراش قبل انتشارها في الغرف وما هي الخطوات المتبعة لإبادتها دون التخلص من الأثاث.',
    content: `ينشط بق الفراش بشكل متزايد في فصل الصيف، وينتقل إلى المنازل بسهولة عبر الحقائب أو السفر أو المفروشات. نظراً لصغر حجمه وقدرته على التخفي، قد تمر أسابيع قبل أن يلاحظ أهل البيت وجوده.

### أهم العلامات التحذيرية:
- ظهور لدغات حمراء متتالية تسبب حكة شديدة بعد الاستيقاظ.
- بقع داكنة دقيقة على حواف المراتب أو أغطية الوسائد.
- قشور بيضاء صغيرة ناتجة عن انسلاخ الحشرات في ثنايا الأقمشة.

### نصيحة الفني المتخصص:
تجنب رش المبيدات التقليدية فوق المراتب بشكل عشوائي، لأنها قد تدفع الحشرات للهروب إلى خلف براويز الحائط ومقابس الكهرباء. اتصل بالمتخصصين فوراً لتطبيق مبيدات متخصصة ومنظمات نمو تقضي على الحشرة وبيوضها معاً.`,
    date: '20 يناير 2026',
    author: 'المركز الفني المتخصص',
    category: 'صحة ووقاية',
    image: PEST_IMAGES.bedBug,
    readTime: 'قراءة 5 دقائق',
    tags: ['بق الفراش', 'حماية المفروشات', 'مكافحة متخصصة'],
  },
  {
    id: '3',
    slug: 'termite-early-warning-signs-egypt',
    title: 'النمل الأبيض (الأرضة): كيف تكتشفه قبل أن يدمر الأبواب والباركيه؟',
    excerpt: 'دليلك للتعرف على علامات النمل الأبيض وأهمية التحصين الوقائي للأرضيات الخشبية وأساسات المباني.',
    content: `يُعرف النمل الأبيض بأنه الخطر الخفي، إذ يتغذى في صمت على الخشب والورق والكرتون من الداخل، تاركاً القشرة الخارجية تبدو سليمة حتى تنهار فجأة.

### علامات واضحة تستدعي التدخل الفوري:
1. **أنابيب طينية دقيقة:** ممرات ترابية يصنعها النمل الأبيض على الجدران الخرسانية أو وزرات الخشب لحماية نفسه من الضوء والجفاف.
2. **صوت مجوف عند النقر:** سماع صدى فارغ عند الطرق على حلوق الأبواب أو أطراف الباركيه.
3. **تساقط بودرة تشبه نشارة الخشب:** تجمع حبيبات دقيقة تحت الأثاث أو حول عتبات الغرف.

المعالجة السريعة بالحقن الكيميائي المتخصص تمنع انتشار الحشرة إلى سائر أنحاء المنزل وتحافظ على استثمارك العقاري.`,
    date: '28 يناير 2026',
    author: 'المركز الفني المتخصص',
    category: 'النمل الأبيض',
    image: PEST_IMAGES.termite,
    readTime: 'قراءة 6 دقائق',
    tags: ['النمل الأبيض', 'حماية الباركيه', 'الأرضة'],
  },
];

export const BLOG_POSTS_EN: BlogPost[] = [
  {
    id: '1',
    slug: 'kitchen-cockroaches-elimination-guide',
    title: 'Complete Guide to Eliminating Kitchen Cockroaches Without Odor',
    excerpt: 'Learn why German cockroaches spread in kitchens and the best professional methods to eradicate them safely without emptying cabinets.',
    content: `Kitchen cockroaches, especially the small German cockroach, are among the toughest household pests to eliminate when relying on random traditional sprays. These insects hide in warm, humid areas such as refrigerator motors, behind ovens, and beneath sinks.

### What is the Proper Technical Solution?
1. **High-Attraction Precision Gel Baiting:** Specialized German and American gel baits are the most effective method because they act as an attractive food source. Cockroaches carry the bait back into the nest where the rest of the colony feeds on it, collapsing the entire nest within days.
2. **Sealing Cracks and Tile Joints:** Closing gaps around drain pipes and cabinet hinges prevents insects from finding safe shelter.
3. **Avoiding Random Aerosol Sprays:** Commercial scented sprays only repel cockroaches temporarily, scattering them deeper into bedrooms and electrical appliances instead of eliminating the root colony.`,
    date: 'January 15, 2026',
    author: 'Specialized Technical Center',
    category: 'Pest Control Guides',
    image: PEST_IMAGES.cockroachGerman,
    readTime: '4 min read',
    tags: ['Kitchen Cockroaches', 'Gel Baiting', 'Home Hygiene'],
  },
  {
    id: '2',
    slug: 'bed-bugs-early-signs-summer',
    title: 'Early Signs of Bed Bugs & How to Act Fast to Protect Your Home',
    excerpt: 'How to detect bed bugs before they spread across bedrooms and the scientific steps to eradicate them without discarding your furniture.',
    content: `Bed bugs become increasingly active during warmer months and easily enter homes through luggage, travel, or upholstered furniture. Due to their tiny size and ability to hide in narrow seams, weeks can pass before residents notice their presence.

### Key Warning Signs:
- Rows of itchy red bites appearing on the skin immediately after waking up.
- Tiny dark spots along mattress piping or pillowcases.
- Pale shed skins left behind by nymphs inside fabric folds and wooden joints.

### Expert Technician Advice:
Avoid spraying over-the-counter aerosols randomly on mattresses, as this drives bed bugs behind wall frames and electrical outlets. Contact certified specialists immediately to apply targeted formulations and Insect Growth Regulators (IGRs) that eradicate both adult insects and eggs simultaneously.`,
    date: 'January 20, 2026',
    author: 'Specialized Technical Center',
    category: 'Health & Prevention',
    image: PEST_IMAGES.bedBug,
    readTime: '5 min read',
    tags: ['Bed Bugs', 'Mattress Protection', 'Professional Treatment'],
  },
  {
    id: '3',
    slug: 'termite-early-warning-signs-egypt',
    title: 'Subterranean Termites: How to Spot Them Before They Damage Parquet & Doors',
    excerpt: 'Your guide to recognizing early termite warning signs and the importance of preventive soil and floor injection for Egyptian homes.',
    content: `Subterranean termites are known as the silent destroyer because they feed on wood, paper, and cellulose from the inside out, leaving the outer surface looking intact until structural failure occurs.

### Clear Signs Requiring Immediate Intervention:
1. **Pencil-Thin Mud Tubes:** Earthen tunnels built by termites along concrete walls or wooden baseboards to protect themselves from light and dry air.
2. **Hollow Sound When Tapping Wood:** Hearing an empty echo when knocking on wooden door frames or parquet edges.
3. **Fine Wood-Like Powder:** Accumulations of tiny pellets beneath furniture or around room thresholds.

Prompt treatment with specialized pressurized chemical injection stops termites from spreading throughout the property and protects your real estate investment.`,
    date: 'January 28, 2026',
    author: 'Specialized Technical Center',
    category: 'Termite Control',
    image: PEST_IMAGES.termite,
    readTime: '6 min read',
    tags: ['Termites', 'Parquet Protection', 'Foundation Treatment'],
  },
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: '1',
    name: 'أحمد محمود',
    role: 'عميل سكني',
    location: 'التجمع الخامس',
    rating: 5,
    quote: 'تواصلت مع المركز بعد معاناة مع صراصير المطبخ. الفني حضر في الموعد تماماً، استخدم الجل بدون أي رائحة وبدون ما نفرغ الدواليب. النتيجة ممتازة والحمد لله لم نعد نرى أي صرصور.',
    image: 'https://demo.awaikenthemes.com/bugfree/wp-content/uploads/2026/01/team-5.jpg',
  },
  {
    id: '2',
    name: 'د. طارق سامي',
    role: 'مالك عيادة',
    location: 'مدينة نصر',
    rating: 5,
    quote: 'التزام واحترافية عالية من فريق المركز الفني المتخصص. تم فحص المكان بدقة واختيار المعاملة المناسبة دون أي إزعاج للعمل. أنصح بالتعامل معهم لأي شخص يبحث عن خدمة موثوقة.',
    image: 'https://demo.awaikenthemes.com/bugfree/wp-content/uploads/2026/01/team-7.jpg',
  },
  {
    id: '3',
    name: 'أم محمد',
    role: 'ربة منزل',
    location: 'الشيخ زايد',
    rating: 5,
    quote: 'كان عندنا مشكلة بق فراش بعد السفر، وقلقنا جداً على الأطفال. الفني طمأننا وعالج الغرف باحترافية وبمبيدات آمنة. والحمد لله المشكلة انتهت تماماً من أول متابعة.',
    image: 'https://demo.awaikenthemes.com/bugfree/wp-content/uploads/2026/01/team-5.jpg',
  },
  {
    id: '4',
    name: 'م. حسام علام',
    role: 'مدير مطعم',
    location: 'المعادي',
    rating: 5,
    quote: 'نتعامل مع المركز في المتابعة الدورية للمطبخ وصالة الطعام. دقة في المواعيد وتقارير واضحة واهتمام بأدق التفاصيل الوقائية.',
    image: 'https://demo.awaikenthemes.com/bugfree/wp-content/uploads/2026/01/team-7.jpg',
  },
];

export const TESTIMONIALS_DATA_EN: TestimonialItem[] = [
  {
    id: '1',
    name: 'Ahmed Mahmoud',
    role: 'Residential Client',
    location: 'Fifth Settlement, New Cairo',
    rating: 5,
    quote: 'I contacted the center after struggling with kitchen cockroaches. The technician arrived right on time and applied odorless gel without us having to empty any cabinets. The result is outstanding and we haven’t seen a single roach since.',
    image: 'https://demo.awaikenthemes.com/bugfree/wp-content/uploads/2026/01/team-5.jpg',
  },
  {
    id: '2',
    name: 'Dr. Tarek Samy',
    role: 'Clinic Owner',
    location: 'Nasr City, Cairo',
    rating: 5,
    quote: 'High commitment and professionalism from the Specialized Technical Center team. They inspected the premises thoroughly and applied the right treatment without disrupting our clinic work. Highly recommended.',
    image: 'https://demo.awaikenthemes.com/bugfree/wp-content/uploads/2026/01/team-7.jpg',
  },
  {
    id: '3',
    name: 'Om Mohamed',
    role: 'Homeowner',
    location: 'Sheikh Zayed, Giza',
    rating: 5,
    quote: 'We had a bed bug issue after traveling and were very worried about our kids. The technician reassured us and treated the bedrooms professionally with safe compounds. The problem was completely resolved from the first follow-up.',
    image: 'https://demo.awaikenthemes.com/bugfree/wp-content/uploads/2026/01/team-5.jpg',
  },
  {
    id: '4',
    name: 'Eng. Hossam Allam',
    role: 'Restaurant Manager',
    location: 'Maadi, Cairo',
    rating: 5,
    quote: 'We rely on the center for periodic pest control maintenance of our kitchen and dining hall. Punctual appointments, clear inspection reports, and great attention to preventive detail.',
    image: 'https://demo.awaikenthemes.com/bugfree/wp-content/uploads/2026/01/team-7.jpg',
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'apartment',
    name: 'معاينة ومكافحة الشقق السكنية',
    type: 'سكني',
    description: 'خطة مخصصة للشقق السكنية لحل مشاكل الصراصير، النمل، بق الفراش، أو الحشرات الزاحفة.',
    features: [
      'معاينة فنية شاملة للمطبخ والحمامات والغرف',
      'تطبيق مبيدات معتمدة وآمنة بدون روائح نفاذة',
      'استخدام الجل النقطي الألماني والأمريكي للمطابخ',
      'تحديد التكلفة العادلة بدقة حسب المساحة ونوع الحشرة',
      'إرشادات وقائية ومتابعة هاتفية مستمرة',
    ],
    idealFor: 'الشقق والوحدات السكنية',
  },
  {
    id: 'villas',
    name: 'مكافحة الفلل والحدائق',
    type: 'فلل وحدائق',
    popular: true,
    description: 'برنامج حماية شامل للفلل والمساحات المفتوحة يشمل الحزام الوقائي الخارجي ومعالجة شبكات الصرف.',
    features: [
      'فحص متكامل للمبنى والحديقة ومناور الصرف',
      'معاملة محيطية شاملة تمنع دخول القوارض والزواحف',
      'مكافحة البعوض والحشرات الطائرة والزاحفة',
      'أمان تام على المزروعات والحيوانات الأليفة',
      'مرونة عالية في تحديد مواعيد التنفيذ والمتابعة',
    ],
    idealFor: 'الفلل والقصور والمنازل المستقلة',
  },
  {
    id: 'commercial',
    name: 'عقود الشركات والمنشآت التجارية',
    type: 'تجاري وإداري',
    description: 'خطط دورية منتظمة للمطاعم، الكافيهات، المخازن، والشركات مع توفير تقارير المتابعة الدورية.',
    features: [
      'جدول زيارات دوري يناسب ساعات عمل المنشأة',
      'تركيب محطات طعوم ومصائد محكمة للقوارض',
      'معالجة متوافقة مع الاشتراطات الصحية وسلامة الغذاء',
      'تقرير فني معتمد يوثق حالة الموقع بعد كل زيارة',
      'أولوية قصوى في الاستجابة لأي استفسار',
    ],
    idealFor: 'المطاعم، المخازن، الشركات والمصانع',
  },
];

export const PRICING_PLANS_EN: PricingPlan[] = [
  {
    id: 'apartment',
    name: 'Residential Apartment Inspection & Treatment',
    type: 'Residential',
    description: 'Dedicated plan for residential apartments to resolve cockroaches, ants, bed bugs, or crawling insects.',
    features: [
      'Comprehensive technical inspection of kitchens, bathrooms, and bedrooms',
      'Application of licensed, safe, odorless formulations',
      'German & American precision gel baiting for kitchens',
      'Fair, transparent pricing based on area and pest species',
      'Preventive guidance and continuous phone follow-up',
    ],
    idealFor: 'Apartments & Residential Units',
  },
  {
    id: 'villas',
    name: 'Villas & Gardens Pest Protection',
    type: 'Villas & Gardens',
    popular: true,
    description: 'Comprehensive protection program for villas and open spaces including exterior perimeter barriers and drainage networks.',
    features: [
      'Full inspection of the building, garden, and drainage shafts',
      'Complete perimeter treatment preventing rodent and crawler entry',
      'Control of mosquitoes, flying insects, and crawling pests',
      '100% safe for garden plants, children, and pets',
      'High flexibility in scheduling treatment and follow-up visits',
    ],
    idealFor: 'Villas, Palaces & Standalone Homes',
  },
  {
    id: 'commercial',
    name: 'Corporate & Commercial Facility Contracts',
    type: 'Commercial & Corporate',
    description: 'Scheduled periodic plans for restaurants, cafes, warehouses, and offices with documented follow-up reports.',
    features: [
      'Periodic visit schedule tailored to facility operating hours',
      'Installation of locked rodent bait stations and traps',
      'Treatments compliant with health and food safety regulations',
      'Certified technical report documenting site status after every visit',
      'Top priority response for any inquiry or emergency callout',
    ],
    idealFor: 'Restaurants, Warehouses, Offices & Factories',
  },
];

export const FAQS_DATA: FaqItem[] = [
  {
    id: '1',
    question: 'هل المبيدات المستخدمة آمنة على الأطفال وكبار السن والحيوانات الأليفة؟',
    answer: 'نعم تماماً. نستخدم في المركز الفني المتخصص مبيدات ومركبات مرخصة ومعتمدة صحياً، وتتميز بأنها عديمة الرائحة وتُطبق بطرق دقيقة مثل الجل النقطي والحقن الموجه، مما يجعلها آمنة تماماً ولا تشكل أي خطورة داخل المنزل.',
    category: 'الأمان والسلامة',
    categoryKey: 'Safety',
  },
  {
    id: '2',
    question: 'هل يجب مغادرة المنزل أو تفريغ أواني المطبخ أثناء الرش؟',
    answer: 'في معظم الحالات (مثل مكافحة الصراصير والنمل بالجل) لا يتطلب الأمر مغادرة المنزل ولا تفريغ دواليب المطبخ أو الأواني. في حالات خاصة فقط مثل المعالجة المركزة لبق الفراش أو النمل الأبيض، يقدم الفني إرشادات بسيطة ومسبقة قبل البدء.',
    category: 'التحضير والتنفيذ',
    categoryKey: 'Preparation',
  },
  {
    id: '3',
    question: 'ما هي طريقة التواصل وطلب المعاينة في مصر؟',
    answer: 'يمكنك التواصل معنا مباشرة عبر الاتصال بالأرقام: 01000989063 أو 01014402627، أو مراسلتنا فوراً عبر الواتساب على 01000989063 لتحديد موعد المعاينة المناسب لموقعك.',
    category: 'التواصل والخدمة',
    categoryKey: 'Service',
  },
  {
    id: '4',
    question: 'هل تقدمون متابعة وضمان بعد إتمام عملية المكافحة؟',
    answer: 'نعم، نحرص في المركز الفني المتخصص على متابعة النتائج مع العميل والتأكد من القضاء التام على بؤر الحشرات، مع تقديم شهادة ضمان وتعليمات وقائية متخصصة لضمان عدم عودة الإصابة.',
    category: 'المتابعة والنتائج',
    categoryKey: 'Warranty',
  },
  {
    id: '5',
    question: 'ما هي المناطق والمحافظات التي تغطونها داخل مصر؟',
    answer: 'تغطي خدماتنا القاهرة الكبرى (القاهرة الجديدة، التجمع، مدينة نصر، المعادي، مصر الجديدة، وسط البلد)، والجيزة (الشيخ زايد، 6 أكتوبر، الهرم، الدقي)، مع إمكانية التنسيق لمختلف المحافظات المصرية.',
    category: 'مناطق التغطية',
    categoryKey: 'Service',
  },
  {
    id: '6',
    question: 'كيف يتم تحديد تكلفة خدمة المكافحة؟',
    answer: 'يتم تحديد التكلفة بكل شفافية بناءً على نوع الحشرة، شدة الإصابة، ومساحة المكان المراد معالجته (سواء كان شقة، فيلا، مطعم أو مخزن)، وتوفير أفضل حل اقتصادي فعال يناسب الحالة.',
    category: 'الأسعار والتكلفة',
    categoryKey: 'Emergency',
  },
];

export const FAQS_DATA_EN: FaqItem[] = [
  {
    id: '1',
    question: 'Are the pesticides used safe for children, seniors, and pets?',
    answer: 'Yes, completely. At the Specialized Technical Center, we use licensed, health-approved, odorless formulations applied via targeted methods such as precision gel baiting and crevice injection, making them completely safe inside the home.',
    category: 'Safety & Health',
    categoryKey: 'Safety',
  },
  {
    id: '2',
    question: 'Do we need to leave the house or empty kitchen cabinets during treatment?',
    answer: 'In most cases (such as cockroach and ant gel treatment), you do not need to leave the house or empty kitchen cabinets or cookware. Only in specialized cases like intensive bed bug or termite injection will our technician provide simple prior instructions.',
    category: 'Preparation & Execution',
    categoryKey: 'Preparation',
  },
  {
    id: '3',
    question: 'How can I contact you and book an inspection in Egypt?',
    answer: 'You can reach us directly by calling 01000989063 or 01014402627, or message us immediately on WhatsApp at 01000989063 to schedule a convenient inspection time for your location.',
    category: 'Service & Booking',
    categoryKey: 'Service',
  },
  {
    id: '4',
    question: 'Do you provide follow-up and warranty after completing the pest control service?',
    answer: 'Yes, we closely follow up on treatment results with our clients to ensure complete elimination of pest hotspots, providing an official electronic warranty certificate and preventive instructions to prevent re-infestation.',
    category: 'Warranty & Follow-Up',
    categoryKey: 'Warranty',
  },
  {
    id: '5',
    question: 'Which areas and governorates do you cover in Egypt?',
    answer: 'Our services cover all of Greater Cairo (New Cairo, Fifth Settlement, Nasr City, Maadi, Heliopolis, Downtown), Giza (Sheikh Zayed, 6th of October, Haram, Dokki, Mohandessin), as well as coordination across Egyptian governorates.',
    category: 'Coverage Areas',
    categoryKey: 'Service',
  },
  {
    id: '6',
    question: 'How is the pest control service cost determined?',
    answer: 'Cost is determined transparently based on the pest species, infestation severity, and property area (apartment, villa, restaurant, or warehouse), ensuring the most cost-effective and reliable solution for your case.',
    category: 'Pricing & Emergency',
    categoryKey: 'Emergency',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: '1',
    title: 'معالجة فنية بالجل النقطي في مطبخ سكني',
    category: 'سكني',
    categoryKey: 'سكني',
    image: COMPANY_IMAGES.precisionGelInjection,
  },
  {
    id: '2',
    title: 'تأمين وفحص مخزن ومستودع مواد تموينية',
    category: 'تجاري',
    categoryKey: 'تجاري',
    image: CLASSIC_IMAGES.commercialWarehouse,
  },
  {
    id: '3',
    title: 'حقن أساسات وباركيه لمعالجة النمل الأبيض',
    category: 'نمل أبيض',
    categoryKey: 'نمل أبيض',
    image: PEST_IMAGES.termite,
  },
  {
    id: '4',
    title: 'تأمين حديقة وسور خارجي لفيلا سكنية',
    category: 'صديق للبيئة',
    categoryKey: 'صديق للبيئة',
    image: COMPANY_IMAGES.outdoorSpraying,
  },
  {
    id: '5',
    title: 'فحص الشقوق وزوايا غرف النوم لبق الفراش',
    category: 'سكني',
    categoryKey: 'سكني',
    image: PEST_IMAGES.bedBug,
  },
  {
    id: '6',
    title: 'تثبيت محطات مكافحة القوارض الآمنة في منشأة تجارية',
    category: 'تجاري',
    categoryKey: 'تجاري',
    image: PEST_IMAGES.mouseRodent,
  },
  {
    id: '7',
    title: 'تطبيق معالجة ميدانية متقدمة',
    category: 'سكني',
    categoryKey: 'سكني',
    image: COMPANY_IMAGES.fieldWorkerBackpack,
  },
  {
    id: '8',
    title: 'فريق العمل أثناء الفحص الميداني',
    category: 'تجاري',
    categoryKey: 'تجاري',
    image: COMPANY_IMAGES.residentialInspection,
  },
  {
    id: '9',
    title: 'مكافحة الآفات بأحدث المعدات',
    category: 'نمل أبيض',
    categoryKey: 'نمل أبيض',
    image: COMPANY_IMAGES.kitchenTreatment,
  },
  {
    id: '10',
    title: 'معالجة وقائية دقيقة للزوايا',
    category: 'صديق للبيئة',
    categoryKey: 'صديق للبيئة',
    image: COMPANY_IMAGES.precisionGelInjection,
  },
  {
    id: '11',
    title: 'عمليات الرش الآمن بدون مغادرة المكان',
    category: 'سكني',
    categoryKey: 'سكني',
    image: COMPANY_IMAGES.outdoorSpraying,
  },
  {
    id: '12',
    title: 'نتائج المعالجة الميدانية الناجحة',
    category: 'تجاري',
    categoryKey: 'تجاري',
    image: COMPANY_IMAGES.fieldTeamAndCertificates,
  },
];

export const GALLERY_ITEMS_EN: GalleryItem[] = [
  {
    id: '1',
    title: 'Precision Gel Baiting Treatment in a Residential Kitchen',
    category: 'Residential',
    categoryKey: 'سكني',
    image: COMPANY_IMAGES.precisionGelInjection,
  },
  {
    id: '2',
    title: 'Securing & Inspecting a Commercial Food Storage Warehouse',
    category: 'Commercial',
    categoryKey: 'تجاري',
    image: CLASSIC_IMAGES.commercialWarehouse,
  },
  {
    id: '3',
    title: 'Foundation & Parquet Injection for Subterranean Termite Control',
    category: 'Termites',
    categoryKey: 'نمل أبيض',
    image: PEST_IMAGES.termite,
  },
  {
    id: '4',
    title: 'Garden & Exterior Perimeter Protection for a Residential Villa',
    category: 'Eco-Safe',
    categoryKey: 'صديق للبيئة',
    image: COMPANY_IMAGES.outdoorSpraying,
  },
  {
    id: '5',
    title: 'Bedroom Crevice & Mattress Inspection for Bed Bugs',
    category: 'Residential',
    categoryKey: 'سكني',
    image: PEST_IMAGES.bedBug,
  },
  {
    id: '6',
    title: 'Installing Tamper-Resistant Rodent Stations in a Commercial Facility',
    category: 'Commercial',
    categoryKey: 'تجاري',
    image: PEST_IMAGES.mouseRodent,
  },
  {
    id: '7',
    title: 'Advanced On-Site Field Treatment Application',
    category: 'Residential',
    categoryKey: 'سكني',
    image: COMPANY_IMAGES.fieldWorkerBackpack,
  },
  {
    id: '8',
    title: 'Technical Field Team During Site Inspection',
    category: 'Commercial',
    categoryKey: 'تجاري',
    image: COMPANY_IMAGES.residentialInspection,
  },
  {
    id: '9',
    title: 'Pest Control Operations Using Modern Equipment',
    category: 'Termites',
    categoryKey: 'نمل أبيض',
    image: COMPANY_IMAGES.kitchenTreatment,
  },
  {
    id: '10',
    title: 'Precision Preventive Corner & Crevice Treatment',
    category: 'Eco-Safe',
    categoryKey: 'صديق للبيئة',
    image: COMPANY_IMAGES.precisionGelInjection,
  },
  {
    id: '11',
    title: 'Safe Odorless Spraying Without Vacating the Premises',
    category: 'Residential',
    categoryKey: 'سكني',
    image: 'https://res.cloudinary.com/uo5au5jj/image/upload/v1791594640/WhatsApp_Image_2026-09-23_at_1.16.21_AM.jpg',
  },
  {
    id: '12',
    title: 'Verified Field Treatment Results & Documentation',
    category: 'Commercial',
    categoryKey: 'تجاري',
    image: 'https://res.cloudinary.com/uo5au5jj/image/upload/v1791594635/WhatsApp_Image_2026-09-23_at_1.19.22_AM.jpg',
  },
];

export function getSiteDataByLocale(locale: 'ar' | 'en') {
  const isEn = locale === 'en';
  const blogList = isEn ? BLOG_POSTS_EN : BLOG_POSTS;
  return {
    siteInfo: isEn ? SITE_INFO_EN : SITE_INFO,
    services: isEn ? SERVICES_DATA_EN : SERVICES_DATA,
    projects: isEn ? PROJECTS_DATA_EN : PROJECTS_DATA,
    team: isEn ? TEAM_MEMBERS_EN : TEAM_MEMBERS,
    blogs: blogList,
    blogPosts: blogList,
    testimonials: isEn ? TESTIMONIALS_DATA_EN : TESTIMONIALS_DATA,
    pricing: isEn ? PRICING_PLANS_EN : PRICING_PLANS,
    faqs: isEn ? FAQS_DATA_EN : FAQS_DATA,
    gallery: isEn ? GALLERY_ITEMS_EN : GALLERY_ITEMS,
  };
}
