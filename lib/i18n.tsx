'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { CompanyInfo, COMPANY_AR, COMPANY_EN, getCompanyByLocale } from './company';
import {
  getSiteDataByLocale,
  ServiceItem,
  ProjectItem,
  TeamMember,
  BlogPost,
  TestimonialItem,
  PricingPlan,
  FaqItem,
  GalleryItem,
} from './siteData';
import { getPestDataByLocale, PestInfo, QuizQuestion } from './pestData';

export type Locale = 'ar' | 'en';
export type Direction = 'rtl' | 'ltr';

export interface Translations {
  // Navigation & Header
  navHome: string;
  navAbout: string;
  navServices: string;
  navAllServices: string;
  navPestIdentifier: string;
  navPestIdentifierBadge: string;
  navWarranty: string;
  navWarrantyBadge: string;
  navProjects: string;
  navFaqs: string;
  navBlog: string;
  navContact: string;
  navPricing: string;
  navGallery: string;
  headerTopNotice: string;
  headerWhatsappBtn: string;
  headerBookBtn: string;
  headerMenuAria: string;
  langSwitchAria: string;
  langSwitchText: string;
  langSwitchAltCode: string;
  langCurrentCode: string;

  // Common CTAs & Labels
  whatsappNow: string;
  callDirect: string;
  phoneLabel: string;
  workingHoursLabel: string;
  coverageLabel: string;
  viewAll: string;
  readMore: string;
  breadcrumbHome: string;
  emergencyTitle: string;
  emergencyDesc: string;
  requestInspectionBtn: string;
  submitRequestBtn: string;
  directPhoneOrWhatsapp: string;

  // Booking Modal
  bookingBadge: string;
  bookingTitle: string;
  bookingSubtitlePrompt: string;
  bookingNameLabel: string;
  bookingNamePlaceholder: string;
  bookingPhoneLabel: string;
  bookingPhonePlaceholder: string;
  bookingServiceLabel: string;
  bookingAreaLabel: string;
  bookingAreaPlaceholder: string;
  bookingNotesLabel: string;
  bookingNotesPlaceholder: string;
  bookingSubmitBtn: string;
  bookingSuccessTitle: string;
  bookingSuccessDesc: (name: string, phone: string) => string;
  bookingOpenWhatsappBtn: string;
  bookingCloseBtn: string;

  // Hero Section
  heroTopBadge: string;
  heroHeadline: string;
  heroHighlightWords: string[];
  heroDesc: string;
  heroBullet1: string;
  heroBullet2: string;
  heroBullet3: string;
  heroBullet4: string;
  heroCtaOrder: string;
  heroCtaWhatsapp: string;
  heroCtaVideo: string;
  heroDirectLine: string;
  heroSecondaryLine: string;
  heroVerifiedBadgeTitle: string;
  heroVerifiedBadgeDesc: string;

  // About Section
  aboutSubtitle: string;
  aboutHeadline: string;
  aboutHighlightWords: string[];
  aboutDesc1: string;
  aboutDesc2: string;
  aboutPillar1Title: string;
  aboutPillar1Desc: string;
  aboutPillar2Title: string;
  aboutPillar2Desc: string;
  aboutCtaContact: string;
  aboutCtaWhatsapp: string;
  aboutIdentityBadgeTitle: string;
  aboutIdentityBadgeSub: string;
  aboutIdentityBadgeDesc: string;

  // Services Section
  servicesSubtitle: string;
  servicesHeadline: string;
  servicesHighlightWords: string[];
  servicesViewAllBtn: string;
  servicesDetailsBtn: string;
  servicesInclusionsTitle: (serviceName: string) => string;
  servicesBenefitsTitle: string;
  servicesProcessTitle: string;
  servicesAllCatalogTitle: string;
  servicesDirectConsultTitle: string;
  servicesDirectConsultDesc: string;
  servicesHoursCoverageTitle: string;

  // Inspection Bar Section
  inspectionBarBadge: string;
  inspectionBarTitle: string;
  inspectionBarDesc: string;
  inspectionBarName: string;
  inspectionBarPhone: string;
  inspectionBarArea: string;
  inspectionBarService: string;
  inspectionBarSubmit: string;
  inspectionBarSuccessTitle: string;
  inspectionBarSuccessDesc: (name: string) => string;

  // Features Section
  featuresSubtitle: string;
  featuresHeadline: string;
  featuresHighlightWords: string[];
  featuresDesc: string;
  feature1Title: string;
  feature1Desc: string;
  feature2Title: string;
  feature2Desc: string;
  feature3Title: string;
  feature3Desc: string;

  // Why Choose Us Section
  whySubtitle: string;
  whyHeadline: string;
  whyHighlightWords: string[];
  whyDesc: string;
  whyPillar1Title: string;
  whyPillar1Desc: string;
  whyPillar2Title: string;
  whyPillar2Desc: string;
  whyPillar3Title: string;
  whyPillar3Desc: string;
  whyFloatingBadge1Title: string;
  whyFloatingBadge1Sub: string;
  whyFloatingBadge2Title: string;
  whyFloatingBadge2Sub: string;

  // Difference Section
  diffSubtitle: string;
  diffHeadline: string;
  diffHighlightWords: string[];
  diffDesc: string;
  diffCard1Title: string;
  diffCard1Desc: string;
  diffCard2Title: string;
  diffCard2Desc: string;
  diffFloatingBadgeTitle: string;
  diffFloatingBadgeSub: string;

  // Pricing Section
  pricingSubtitle: string;
  pricingHeadline: string;
  pricingHighlightWords: string[];
  pricingDesc: string;
  pricingPopularBadge: string;
  pricingQuoteNotice: string;
  pricingQuoteSub: string;
  pricingInclusionsLabel: string;
  pricingRequestBtn: string;
  pricingWhatsappBtn: string;
  pricingComparisonTitle: string;
  pricingComparisonSub: string;

  // Testimonials Section
  testiSubtitle: string;
  testiHeadline: string;
  testiHighlightWords: string[];
  testiViewAllBtn: string;
  testiSubmitTitle: string;
  testiSubmitDesc: string;
  testiSubmitNamePlaceholder: string;
  testiSubmitCityPlaceholder: string;
  testiSubmitReviewPlaceholder: string;
  testiSubmitBtn: string;
  testiSubmitSuccess: string;

  // FAQs Section
  faqsSubtitle: string;
  faqsHeadline: string;
  faqsHighlightWords: string[];
  faqsViewAllBtn: string;
  faqsBoxQuestionPrompt: string;
  faqsBoxPromptDesc: string;
  faqsSearchPlaceholder: string;
  faqsNoResults: string;
  faqsStillQuestionsTitle: string;
  faqsStillQuestionsDesc: string;

  // Blog Section
  blogSubtitle: string;
  blogHeadline: string;
  blogHighlightWords: string[];
  blogViewAllBtn: string;
  blogReadFullBtn: string;
  blogReadArticle: string;
  blogByLabel: string;
  blogTagsLabel: string;
  blogCommentsTitle: string;
  blogCommentsSubtitle: string;
  blogCommentNamePlaceholder: string;
  blogCommentEmailPlaceholder: string;
  blogCommentTextPlaceholder: string;
  blogCommentSubmitBtn: string;
  blogCommentSuccess: string;
  blogRecentTitle: string;
  blogCategoriesTitle: string;

  // Warranty Verification Section
  warrantySectionBadge: string;
  warrantySectionTitle: string;
  warrantySectionDesc: string;
  warrantySearchPlaceholder: string;
  warrantyVerifyBtn: string;
  warrantyVerifying: string;
  warrantyDemoCodesLabel: string;
  warrantySeedBtn: string;
  warrantySeeding: string;
  warrantySeedSuccess: string;
  warrantyCertHeader: string;
  warrantyCertSub: string;
  warrantyCertCodeLabel: string;
  warrantyCertStatusLabel: string;
  warrantyCertActiveStatus: string;
  warrantyClientNameLabel: string;
  warrantyServiceTypeLabel: string;
  warrantyPropertyAddressLabel: string;
  warrantyValidityPeriodLabel: string;
  warrantyTechNotesLabel: string;
  warrantyTechnicianLabel: string;
  warrantyFirebaseVerifiedBadge: string;
  warrantyNotFoundTitle: string;
  warrantyNotFoundDesc: string;

  // Pest Identifier Tool
  pestQuizTab: string;
  pestEncyclopediaTab: string;
  pestPhotoTab: string;
  pestQuestionLabel: (curr: number, total: number) => string;
  pestCompletedLabel: (pct: number) => string;
  pestInteractiveBadge: string;
  pestPrevBtn: string;
  pestResetBtn: string;
  pestReportBadge: string;
  pestReportHeadline: string;
  pestRetestBtn: string;
  pestMatchScore: (score: number) => string;
  pestRiskLabel: (level: string) => string;
  pestWhyMatched: string;
  pestBookFreeExam: string;
  pestViewServiceDetails: string;
  pestDiyTitle: string;
  pestMistakesTitle: string;
  pestOtherPossibilities: string;
  pestRequestExamForPest: string;
  pestEncyclopediaTitle: string;
  pestEncyclopediaSubtitle: string;
  pestEncyclopediaSearchPlaceholder: string;
  pestPhotoHeadline: string;
  pestPhotoDesc: string;
  pestPhotoInputPrompt: string;
  pestPhotoFormatNotice: string;
  pestPhotoSelectedSuccess: string;
  pestPhotoNameLabel: string;
  pestPhotoNamePlaceholder: string;
  pestPhotoPhoneLabel: string;
  pestPhotoPhonePlaceholder: string;
  pestPhotoSubmitBtn: string;
  pestPhotoSuccessTitle: string;
  pestPhotoSuccessDesc: (name: string, phone: string) => string;
  pestPhotoSendAnotherBtn: string;

  // Footer
  footerAboutDesc: string;
  footerQuickLinks: string;
  footerServices: string;
  footerCoverageTitle: string;
  footerCopyright: string;
  footerSafeBadge: string;
  footerWhatsappCardTitle: string;

  // Warranty Extra
  warrantyDesc: string;
  warrantyInputPlaceholder: string;
  warrantyCertTitle: string;
  warrantyStatusLabel: string;
  warrantyActiveStatus: string;
  warrantyCustomerLabel: string;
  warrantyServiceLabel: string;
  warrantyAddressLabel: string;
  warrantyPeriodLabel: string;
  warrantyNotesLabel: string;

  // About Extra
  aboutParagraph1: string;
  aboutParagraph2: string;
  aboutCard1Title: string;
  aboutCard1Desc: string;
  aboutCard2Title: string;
  aboutCard2Desc: string;

  // Blog Extra
  blogViewAll: string;

  // FAQs Extra
  faqsBoxPrompt: string;
  faqsBoxDesc: string;
  faqsViewAll: string;

  // Gallery Extra
  gallerySubtitle: string;
  galleryHeadline: string;
  galleryHighlightWords: string[];
  galleryDesc: string;
  galleryFullVideos: string;
  galleryViewAll: string;
  galleryWatchLiveVideo: string;

  // How It Works Extra
  howSubtitle: string;
  howHeadline: string;
  howHighlightWords: string[];

  // Inspection Bar Extra
  inspBarBadge: string;
  inspBarTitle: string;
  inspBarDesc: string;
  inspBarSuccess: string;
  inspBarNameLabel: string;
  inspBarNamePlaceholder: string;
  inspBarPhoneLabel: string;
  inspBarPhonePlaceholder: string;
  inspBarAreaLabel: string;
  inspBarAreaPlaceholder: string;
  inspBarServiceLabel: string;
  inspBarSubmitBtn: string;

  // Pest Identifier Teaser Extra
  pestTeaserBadge: string;
  pestTeaserDesc: string;
  pestTeaserBtn: string;

  // Pricing Extra
  pricingIncludes: string;

  // Services Extra
  servicesViewAll: string;
  serviceDetailsBtn: string;

  // Testimonials Extra
  testimonialsSubtitle: string;
  testimonialsHeadline: string;
  testimonialsHighlightWords: string[];
  testimonialsViewAll: string;

  // Footer Extra Links & Inquiries
  footerColInquiry: string;
  footerColQuickLinks: string;
  footerColServices: string;
  footerCoverageCardTitle: string;
  footerInquiryDesc: string;
  footerInquiryPlaceholder: string;
  footerInquirySubmit: string;
  footerInquirySuccess: string;
  footerPhoneCardTitle: string;
  footerPrivacy: string;
  footerQuickWhatsapp: string;
  footerTerms: string;

  // Pest Identifier Tool Extra
  pestTabQuiz: string;
  pestTabPhoto: string;
  pestTabEncyclopedia: string;
  pestPrevQuestionBtn: string;
  pestRetakeQuizBtn: string;
  pestResultTitle: string;
  pestResultReportBadge: string;
  pestMatchReasons: string;
  pestAdviceTitle: string;
  pestBookInspectionForThis: string;

  // Warranty Extra Aliases
  warrantyBadge: string;
  warrantyHeadline: string;
}

const DICTIONARY_AR: Translations = {
  navHome: 'الرئيسية',
  navAbout: 'عن المركز',
  navServices: 'الخدمات',
  navAllServices: 'جميع خدمات المكافحة',
  navPestIdentifier: 'تشخيص الحشرات',
  navPestIdentifierBadge: 'ذكي',
  navWarranty: 'التحقق من الضمان',
  navWarrantyBadge: 'معتمد',
  navProjects: 'أعمال ميدانية',
  navFaqs: 'الأسئلة الشائعة',
  navBlog: 'إرشادات تهمك',
  navContact: 'تواصل معنا',
  navPricing: 'خطط الأسعار',
  navGallery: 'معرض الصور',
  headerTopNotice: 'المركز الفني المتخصص بمصر • مبيدات معتمدة بدون روائح',
  headerWhatsappBtn: 'واتساب',
  headerBookBtn: 'حجز خدمة',
  headerMenuAria: 'فتح القائمة الرئيسية',
  langSwitchAria: 'تبديل لغة الموقع إلى الإنجليزية',
  langSwitchText: 'English',
  langSwitchAltCode: 'EN',
  langCurrentCode: 'AR',

  whatsappNow: 'تواصل عبر واتساب الآن',
  callDirect: 'اتصال مباشر',
  phoneLabel: 'الهاتف',
  workingHoursLabel: 'ساعات العمل',
  coverageLabel: 'نطاق الخدمة',
  viewAll: 'عرض الكل',
  readMore: 'قراءة المزيد',
  breadcrumbHome: 'الرئيسية',
  emergencyTitle: 'هل تواجه مشكلة حشرات مفاجئة في منزلك أو منشأتك؟',
  emergencyDesc: 'تواصل معنا الآن لتحديد خطة المعاينة والمكافحة الفورية المناسبة لنوع الإصابة.',
  requestInspectionBtn: 'طلب معاينة فورية',
  submitRequestBtn: 'إرسال وتأكيد الطلب',
  directPhoneOrWhatsapp: 'تواصل فوري مباشر عبر الهاتف أو الواتساب',

  bookingBadge: 'طلب معاينة وخدمة مكافحة',
  bookingTitle: 'المركز الفني المتخصص لمكافحة الحشرات',
  bookingSubtitlePrompt: 'للتواصل المباشر والسريع: اتصل بنا هاتفياً أو عبر الواتساب',
  bookingNameLabel: 'الاسم بالكامل *',
  bookingNamePlaceholder: 'مثال: محمد علي',
  bookingPhoneLabel: 'رقم الهاتف (مصر) *',
  bookingPhonePlaceholder: '010XXXXXXXX',
  bookingServiceLabel: 'نوع الخدمة المطلوبة *',
  bookingAreaLabel: 'المنطقة أو المحافظة',
  bookingAreaPlaceholder: 'مثال: التجمع، مدينة نصر، الشيخ زايد...',
  bookingNotesLabel: 'ملاحظات أو نوع الحشرة الملاحظة (اختياري)',
  bookingNotesPlaceholder: 'صِف المشكلة (مثال: صراصير في المطبخ، بق فراش، نمل أبيض...)',
  bookingSubmitBtn: 'إرسال وتأكيد الطلب',
  bookingSuccessTitle: 'تم تسجيل طلبك وجارٍ تحويلك للواتساب!',
  bookingSuccessDesc: (name, phone) =>
    `شكراً لك يا ${name}. تم تجهيز تفاصيل طلبك لمتابعتها مع الفني المختص مباشرة عبر الواتساب أو الاتصال على ${phone}.`,
  bookingOpenWhatsappBtn: 'فتح محادثة الواتساب',
  bookingCloseBtn: 'إغلاق',

  heroTopBadge: 'مكافحة فنية متخصصة في مصر • مبيدات مصرح بها وآمنة',
  heroHeadline: 'المركز الفني المتخصص لمكافحة الحشرات والقوارض',
  heroHighlightWords: ['المتخصص', 'والقوارض'],
  heroDesc:
    'حلول متخصصة لمكافحة الحشرات والقوارض في المنازل والفلل والمنشآت داخل جمهورية مصر العربية، مع الاهتمام بفحص المشكلة واختيار طريقة المكافحة الآمنة والفعالة لكل حالة.',
  heroBullet1: 'معاملة بدون مغادرة المكان وبدون روائح مزعجة',
  heroBullet2: 'استخدام الجل الألماني والأمريكي للمطابخ',
  heroBullet3: 'معالجة النمل الأبيض وبق الفراش والقوارض',
  heroBullet4: 'خدمة تغطي القاهرة والجيزة وكافة المحافظات',
  heroCtaOrder: 'اطلب خدمة مكافحة الآن',
  heroCtaWhatsapp: 'تواصل معنا واتساب',
  heroCtaVideo: 'فيديو التغطية الميدانية',
  heroDirectLine: 'الخط المباشر:',
  heroSecondaryLine: 'خط ثانٍ:',
  heroVerifiedBadgeTitle: 'معاينة وفحص دقيق',
  heroVerifiedBadgeDesc: 'مبيدات معتمدة وبدون رائحة',

  aboutSubtitle: 'عن المركز الفني المتخصص',
  aboutHeadline: 'فحص دقيق وخطة مكافحة متخصصة لكل حالة',
  aboutHighlightWords: ['متخصصة', 'دقيق'],
  aboutDesc1:
    'يقدم المركز الفني المتخصص خدمات احترافية لمكافحة وإبادة الحشرات والقوارض في المنازل والفلل والمطاعم والشركات والمصانع داخل جمهورية مصر العربية. نعتمد على الفحص الفني الميداني أولاً لتحديد مصدر الإصابة ونوع الحشرة بدقة، ثم اختيار المركبات الفنية الأكثر فاعلية وأماناً.',
  aboutDesc2:
    'نولي أولوية قصوى لسلامة المقيمين، لذلك نستخدم تركيبات الجل الألمانية والأمريكية عديمة الرائحة للمطابخ، والمبيدات المعتمدة رسمياً التي لا تتطلب مغادرة المكان أو إخلاء الأواني.',
  aboutPillar1Title: 'معاينة وفحص متخصص',
  aboutPillar1Desc: 'تحديد نوع الإصابة بدقة ووضع المعاملة الأنسب لكل عقار.',
  aboutPillar2Title: 'مبيدات آمنة ومرخصة',
  aboutPillar2Desc: 'أمان كامل للأطفال والحيوانات الأليفة وبدون روائح نفاذة.',
  aboutCtaContact: 'تواصل معنا الآن',
  aboutCtaWhatsapp: 'واتساب مباشر',
  aboutIdentityBadgeTitle: 'المركز الفني المتخصص',
  aboutIdentityBadgeSub: 'حلول موثوقة لمكافحة الآفات',
  aboutIdentityBadgeDesc: 'مبيدات مرخصة ومطابقة للمواصفات',

  servicesSubtitle: 'خدماتنا المعتمدة',
  servicesHeadline: 'حلول إبادة ومكافحة موثوقة للمنازل والمنشآت التجارية',
  servicesHighlightWords: ['للمنازل', 'والمنشآت'],
  servicesViewAllBtn: 'عرض جميع الخدمات',
  servicesDetailsBtn: 'تفاصيل الخدمة',
  servicesInclusionsTitle: (serviceName) => `ما تشمله خدمة ${serviceName}`,
  servicesBenefitsTitle: 'أهم المزايا والفوائد لعقارك',
  servicesProcessTitle: 'مراحل خطة المعالجة (4 خطوات علمية)',
  servicesAllCatalogTitle: 'كافة خدمات مكافحة الآفات',
  servicesDirectConsultTitle: 'طلب خدمة ومعاينة فورية',
  servicesDirectConsultDesc: 'تواصل مباشرة مع المهندس الفني المختص بهذه الخدمة.',
  servicesHoursCoverageTitle: 'أوقات العمل والتغطية',

  inspectionBarBadge: 'طلب معاينة وتحديد الخطة المناسبة',
  inspectionBarTitle: 'تواصل مباشرة مع فنيي المكافحة',
  inspectionBarDesc: 'خدمة تغطي القاهرة الكبرى والجيزة ومحافظات مصر مع استجابة سريعة.',
  inspectionBarName: 'الاسم الكريم *',
  inspectionBarPhone: 'رقم الهاتف *',
  inspectionBarArea: 'المنطقة / المحافظة',
  inspectionBarService: 'نوع الخدمة *',
  inspectionBarSubmit: 'إرسال طلب المعاينة',
  inspectionBarSuccessTitle: 'تم استلام طلبك وجارٍ فتح محادثة الواتساب!',
  inspectionBarSuccessDesc: (name) =>
    `شكراً لك يا ${name}. سيقوم الفني المختص بمتابعة التفاصيل معك فوراً.`,

  featuresSubtitle: 'مزايا خدماتنا الذكية',
  featuresHeadline: 'مزايا ذكية لإدارة متطورة وآمنة لمكافحة الآفات',
  featuresHighlightWords: ['متطورة', 'وآمنة'],
  featuresDesc:
    'من الفحص الشامل للعقار وتحديد فصائل الآفات بدقة متناهية إلى أساليب المعالجة الموجهة واستراتيجيات الوقاية المستدامة، نركز على تحقيق نتائج ملموسة تحمي منشأتك بأعلى درجات الأمان والسلامة.',
  feature1Title: 'حلول بيئية آمنة 100%',
  feature1Desc: 'مركبات نباتية وبيولوجية مرخصة وآمنة للأطفال والحيوانات الأليفة.',
  feature2Title: 'فنيون معتمدون وذوو مهارة عالية',
  feature2Desc: 'أخصائيون مرخصون ومدربون على أحدث المعايير العلمية الدقيقة.',
  feature3Title: 'معالجة بؤرية موجهة بدقة',
  feature3Desc: 'حقن ميكرو دقيق موجه مباشرة لمناطق وأوكار التعشيش الخفية.',

  whySubtitle: 'لماذا تختار المركز الفني المتخصص',
  whyHeadline: 'مكافحة فنية احترافية بأساليب متطورة يمكنك الاعتماد عليها',
  whyHighlightWords: ['احترافية', 'متطورة'],
  whyDesc:
    'يتبع فنيونا إجراءات فحص ومعالجة متأنية تضمن التعامل مع أسباب انتشار الحشرات وتحديد طرق المعالجة المخصصة لكل حالة، مع الاهتمام بسلامة الأسرة وتقديم إرشادات وقائية مستمرة.',
  whyPillar1Title: 'مبيدات آمنة ومصرحة',
  whyPillar1Desc: 'تركيبات بدون روائح نفاذة وبدون حاجة لإخلاء المنزل أو تفريغ الأواني في المطبخ.',
  whyPillar2Title: 'فحص وتشخيص دقيق',
  whyPillar2Desc: 'تحديد نوع الحشرة بدقة ومسارات حركتها واستهداف بؤر التكاثر بدلاً من الرش العشوائي.',
  whyPillar3Title: 'متابعة وإرشادات وقائية',
  whyPillar3Desc: 'نقدم نصائح عملية لمنع تسلل الحشرات مستقبلاً والتواصل لمتابعة استقرار النتيجة.',
  whyFloatingBadge1Title: 'مبيدات بدون روائح',
  whyFloatingBadge1Sub: 'آمنة للأطفال والحيوانات الأليفة',
  whyFloatingBadge2Title: 'معاينة فنية متخصصة',
  whyFloatingBadge2Sub: 'تحديد دقيق لنوع الآفة',

  diffSubtitle: 'المكافحة المتخصصة',
  diffHeadline: 'لماذا تُحدث المعالجة الفنية المتخصصة الفارق الحقيقي؟',
  diffHighlightWords: ['الفنية', 'المتخصصة'],
  diffDesc:
    'الرش العشوائي بالبخاخات التقليدية قد يؤدي فقط إلى هروب الحشرات إلى أماكن أخرى داخل المنزل. خدماتنا صُممت لاستهداف منبع المشكلة وأماكن وضع البيض بمركبات مخصصة تقضي على الإصابة وتمنع تكرارها.',
  diffCard1Title: 'سرعة الاستجابة والمتابعة',
  diffCard1Desc: 'تنسيق سريع لموعد المعاينة والتنفيذ في الوقت المناسب لك دون تعطيل روتينك اليومي.',
  diffCard2Title: 'معالجة دقيقة بدون روائح',
  diffCard2Desc: 'استخدام الجل النقطي الألماني والأمريكي والتركيبات المعتمدة الآمنة تماماً للمطابخ والغرف.',
  diffFloatingBadgeTitle: 'المركز الفني المتخصص',
  diffFloatingBadgeSub: 'مكافحة معتمدة بمصر',

  pricingSubtitle: 'خطط المعاينة والتسعير',
  pricingHeadline: 'تسعير عادل وشفاف يحدد حسب نوع المشكلة ومساحة المكان',
  pricingHighlightWords: ['عادل', 'وشفاف'],
  pricingDesc:
    'نقدم في المركز الفني المتخصص تسعيراً شفافاً يعتمد على المعاينة الميدانية الدقيقة لتحديد التكلفة الأنسب بدون أي مبالغة وبأعلى فاعلية.',
  pricingPopularBadge: 'الأكثر طلباً',
  pricingQuoteNotice: 'معاينة وتحديد أفضل تكلفة',
  pricingQuoteSub: 'حسب المساحة ونوع الحشرة المعالجة',
  pricingInclusionsLabel: 'تشمل الخدمة:',
  pricingRequestBtn: 'طلب معاينة لهذه الخدمة',
  pricingWhatsappBtn: 'استفسر عبر واتساب',
  pricingComparisonTitle: 'مقارنة تفصيلية لمزايا كل باقة',
  pricingComparisonSub: 'جدول شفاف يوضح كافة المزايا المشمولة في كل خطة من خططنا.',

  testiSubtitle: 'آراء وتجارب العملاء',
  testiHeadline: 'تجارب حقيقية لعملاء وثقوا في خدمات المركز',
  testiHighlightWords: ['تجارب', 'حقيقية'],
  testiViewAllBtn: 'عرض كافة الآراء',
  testiSubmitTitle: 'شاركنا تجربتك ورأيك',
  testiSubmitDesc:
    'هل استفدت من خدمات المركز الفني المتخصص؟ شاركنا انطباعك لمساعدة الآخرين في الحفاظ على بيئة آمنة ونظيفة.',
  testiSubmitNamePlaceholder: 'اسمك الكامل',
  testiSubmitCityPlaceholder: 'المدينة أو الحي',
  testiSubmitReviewPlaceholder: 'اكتب تفاصيل تجربتك مع الفريق وسرعة الاستجابة والنتيجة...',
  testiSubmitBtn: 'إرسال التقييم',
  testiSubmitSuccess: 'شكراً لك! تم استلام تقييمك وسينشر بعد التحقق.',

  faqsSubtitle: 'الأسئلة الشائعة وإجاباتها',
  faqsHeadline: 'إجابات واضحة وموثوقة حول خدمات المكافحة والسلامة',
  faqsHighlightWords: ['واضحة', 'وموثوقة'],
  faqsViewAllBtn: 'عرض كافة الأسئلة',
  faqsBoxQuestionPrompt: 'هل لديك استفسار محدد؟',
  faqsBoxPromptDesc: 'تواصل مباشرة مع المهندس الفني للحصول على إجابة وافية لحالتك.',
  faqsSearchPlaceholder: 'ابحث في الأسئلة (مثال: أمان الأطفال، الضمان، النمل الأبيض، الرائحة)...',
  faqsNoResults: 'لم يتم العثور على أي أسئلة مطابقة لبحثك.',
  faqsStillQuestionsTitle: 'لديك استفسار خاص بنوع حشرة أو إصابة معينة؟',
  faqsStillQuestionsDesc: 'اتصل بفريق خدمة العملاء أو احجز موعد معاينة ميدانية لعقارك اليوم.',

  blogSubtitle: 'أحدث مقالات المدونة',
  blogHeadline: 'ابقَ على اطلاع دائم مع مدونتنا ونصائحنا الوقائية',
  blogHighlightWords: ['مدونتنا', 'ونصائحنا'],
  blogViewAllBtn: 'عرض كل المقالات',
  blogReadFullBtn: 'اقرأ المقال بالكامل',
  blogReadArticle: 'اقرأ المقال',
  blogByLabel: 'بواسطة',
  blogTagsLabel: 'الوسوم:',
  blogCommentsTitle: 'اترك تعليقاً أو استفساراً',
  blogCommentsSubtitle: 'لن يتم نشر بريدك الإلكتروني للعامة. الحقول الإلزامية محددة بـ *',
  blogCommentNamePlaceholder: 'الاسم الكريم *',
  blogCommentEmailPlaceholder: 'البريد الإلكتروني *',
  blogCommentTextPlaceholder: 'اكتب تعليقك أو سؤالك هنا... *',
  blogCommentSubmitBtn: 'إرسال التعليق',
  blogCommentSuccess: 'شكراً لك! تم استلام تعليقك وبانتظار المراجعة.',
  blogRecentTitle: 'أحدث المقالات',
  blogCategoriesTitle: 'أقسام الخدمات',

  warrantySectionBadge: 'التحقق من الضمان الإلكتروني المعتمد',
  warrantySectionTitle: 'الاستعلام عن شهادة الضمان الرسمية',
  warrantySectionDesc:
    'أدخل كود الضمان المكون من الحروف والأرقام المسلم لك بعد إتمام الخدمة للتحقق الفوري من سريان الضمان وبيانات الخدمة المرتبطة بقاعدة بياناتنا الآمنة.',
  warrantySearchPlaceholder: 'أدخل كود الضمان (مثال: HARD-2026-9921)',
  warrantyVerifyBtn: 'التحقق من الضمان',
  warrantyVerifying: 'جاري التحقق...',
  warrantyDemoCodesLabel: 'أكواد تجريبية للاختبار السريع:',
  warrantySeedBtn: 'تهيئة بيانات الضمان التجريبية في Firebase',
  warrantySeeding: 'جاري تهيئة قاعدة البيانات...',
  warrantySeedSuccess: '✓ تم تهيئة البيانات التجريبية بنجاح! جرب كود: HARD-2026-9921',
  warrantyCertHeader: 'المركز الفني المتخصص لمكافحة الحشرات',
  warrantyCertSub: 'شهادة ضمان إلكترونية معتمدة',
  warrantyCertCodeLabel: 'كود الشهادة:',
  warrantyCertStatusLabel: 'حالة الضمان',
  warrantyCertActiveStatus: 'ساري ومعتمد',
  warrantyClientNameLabel: 'اسم العميل الكريم',
  warrantyServiceTypeLabel: 'نوع الخدمة المقدمة',
  warrantyPropertyAddressLabel: 'عنوان الموقع العقاري',
  warrantyValidityPeriodLabel: 'فترة سريان الضمان',
  warrantyTechNotesLabel: 'ملاحظات المعالجة الفنية والتعليمات الوقائية:',
  warrantyTechnicianLabel: 'المشرف الفني المعاينة:',
  warrantyFirebaseVerifiedBadge: '✓ موثق رسمياً في قاعدة بيانات Firebase',
  warrantyNotFoundTitle: 'لم يتم العثور على شهادة بهذا الكود',
  warrantyNotFoundDesc: 'تأكد من صحة كود الضمان المدخل أو اضغط على زر تهيئة بيانات الضمان التجريبية أعلاه للاختبار الفوري.',

  pestQuizTab: 'اختبار التشخيص السريع (4 أسئلة)',
  pestEncyclopediaTab: 'موسوعة الحشرات والآفات',
  pestPhotoTab: 'إرسال صورة لخبير المركز الفني',
  pestQuestionLabel: (curr, total) => `السؤال ${curr} من ${total}`,
  pestCompletedLabel: (pct) => `${pct}% مكتمل`,
  pestInteractiveBadge: 'تشخيص تفاعلي فوري',
  pestPrevBtn: 'السؤال السابق',
  pestResetBtn: 'إعادة البدء من جديد',
  pestReportBadge: 'تقرير التشخيص الفوري للآفة',
  pestReportHeadline: 'النتيجة المرجحة الأقرب لحالتك',
  pestRetestBtn: 'إعادة الاختبار',
  pestMatchScore: (score) => `تطابق بنسبة ${score}%`,
  pestRiskLabel: (level) => `مستوى الخطورة: ${level}`,
  pestWhyMatched: 'لماذا تم ترشيح هذه النتيجة بناءً على إجاباتك؟',
  pestBookFreeExam: 'احجز فحصاً مجانياً لهذه الآفة',
  pestViewServiceDetails: 'تفاصيل الخدمة المقترحة',
  pestDiyTitle: 'إجراءات وقائية فورية يمكنك اتخاذها الآن:',
  pestMistakesTitle: 'أخطاء شائعة يجب تجنبها تماماً:',
  pestOtherPossibilities: 'احتمالات أخرى متقاربة قد ترغب في مراجعتها:',
  pestRequestExamForPest: 'طلب فحص لهذه الحشرة',
  pestEncyclopediaTitle: 'دليل وموسوعة الآفات المنزلية والتجارية',
  pestEncyclopediaSubtitle: 'تصفح كافة الفصائل الشائعة، دورات حياتها، وأفضل الطرق لمكافحتها',
  pestEncyclopediaSearchPlaceholder: 'ابحث بالاسم أو الأعراض...',
  pestPhotoHeadline: 'أرسل صورة الحشرة أو آثارها لأخصائي المركز الفني',
  pestPhotoDesc: 'إذا لم تكن متأكداً من نوع الآفة، التقط صورة واضحة من هاتفك وسيقوم فنيو المكافحة المتخصصون لدينا بالرد عليك فوراً مجاناً.',
  pestPhotoInputPrompt: 'انقر هنا لاختيار صورة من هاتفك أو جهازك',
  pestPhotoFormatNotice: 'يدعم صور JPG, PNG أو اللقطات المباشرة بالكاميرا',
  pestPhotoSelectedSuccess: 'تم اختيار الصورة بنجاح! انقر لتغييرها.',
  pestPhotoNameLabel: 'الاسم الكريم:',
  pestPhotoNamePlaceholder: 'مثال: محمد علي',
  pestPhotoPhoneLabel: 'رقم الهاتف:',
  pestPhotoPhonePlaceholder: '010XXXXXXXX',
  pestPhotoSubmitBtn: 'إرسال الصورة للتشخيص المجاني المباشر',
  pestPhotoSuccessTitle: 'تم استلام صورتك بنجاح!',
  pestPhotoSuccessDesc: (name, phone) =>
    `شكراً لك يا ${name || 'عميلنا العزيز'}. يقوم أخصائي الفحص الميداني لدينا بفحص الصورة الآن وسيتواصل معك على الرقم (${phone}) خلال 15 دقيقة لإعطائك التشخيص الدقيق مجاناً.`,
  pestPhotoSendAnotherBtn: 'إرسال صورة أخرى',

  footerAboutDesc:
    'المركز الفني المتخصص لمكافحة الحشرات والقوارض في مصر. حلول متخصصة ومبيدات آمنة بدون روائح للمنازل والفلل والمنشآت.',
  footerQuickLinks: 'روابط سريعة',
  footerServices: 'خدماتنا المتخصصة',
  footerCoverageTitle: 'تغطية الجمهورية',
  footerCopyright: 'جميع الحقوق محفوظة للمركز الفني المتخصص لمكافحة الحشرات والقوارض بمصر',
  footerSafeBadge: 'مبيدات مطابقة لمعايير الصحة والسلامة',
  footerWhatsappCardTitle: 'محادثة واتساب فورية',

  // Warranty Extra
  warrantyDesc: 'أدخل كود الضمان المكون من الحروف والأرقام المسلم لك بعد إتمام الخدمة للتحقق الفوري من سريان الضمان.',
  warrantyInputPlaceholder: 'أدخل كود الضمان هنا (مثال: EGY-2026-8841)',
  warrantyCertTitle: 'شهادة ضمان معتمدة - المركز الفني المتخصص',
  warrantyStatusLabel: 'حالة الضمان',
  warrantyActiveStatus: 'ساري ومعتمد رسمياً',
  warrantyCustomerLabel: 'اسم العميل / المنشأة',
  warrantyServiceLabel: 'نوع الخدمة المنفذة',
  warrantyAddressLabel: 'الموقع / العنوان',
  warrantyPeriodLabel: 'مدة وسريان الضمان',
  warrantyNotesLabel: 'ملاحظات وتوجيهات الفريق الفني',

  // About Extra
  aboutParagraph1: 'المركز الفني المتخصص لمكافحة الحشرات والقوارض هو الصرح الهندسي الرائد في مصر لتقديم حلول مكافحة احترافية مبنية على معايير بيئية وصحية صارمة.',
  aboutParagraph2: 'نلتزم بتطبيق أحدث بروتوكولات المكافحة المتكاملة (IPM) باستخدام مركبات عضوية غير سامة للأطفال والحيوانات الأليفة، مع متابعة دورية وشهادات ضمان موثقة.',
  aboutCard1Title: 'فحص هندسي دقيق وشامل',
  aboutCard1Desc: 'تحديد دقيق لبؤر الإصابة ومصادر الدخول بأجهزة كشف حرارية واستشعار حديثة.',
  aboutCard2Title: 'مبيدات آمنة مصرح بها رسمياً',
  aboutCard2Desc: 'تركيبات بدون رائحة تتيح إجراء المعالجة دون الحاجة لمغادرة المنزل أو إخلاء الأواني.',

  // Blog Extra
  blogViewAll: 'عرض كل المقالات',

  // FAQs Extra
  faqsBoxPrompt: 'لديك استفسار خاص بحالتك؟',
  faqsBoxDesc: 'فريقنا متاح على مدار الساعة للإجابة عن أسئلتك وتقديم استشارة فورية.',
  faqsViewAll: 'عرض كل الأسئلة الشائعة',

  // Gallery Extra
  gallerySubtitle: 'معرض العمليات الميدانية',
  galleryHeadline: 'توثيق حي لأعمالنا الميدانية وفيديوهات حقيقية من موقع العمل',
  galleryHighlightWords: ['توثيق', 'حي', 'وفيديوهات'],
  galleryDesc: 'شاهد نتائج فرقنا الميدانية في حماية الفلل والمنازل والشركات والمصانع على مستوى محافظات مصر.',
  galleryFullVideos: 'فيديوهات توثيقية حية',
  galleryViewAll: 'مشاهدة المعرض الكامل',
  galleryWatchLiveVideo: 'مشاهدة الفيديو الميداني',

  // How It Works Extra
  howSubtitle: 'آلية العمل الميداني',
  howHeadline: 'خطوات منهجية مدروسة تضمن القضاء النهائي والوقاية المستمرة',
  howHighlightWords: ['خطوات', 'منهجية', 'تضمن'],

  // Inspection Bar Extra
  inspBarBadge: 'طلب معاينة ميدانية فورية',
  inspBarTitle: 'احجز معاينة عقارك الآن',
  inspBarDesc: 'فحص أولي مجاني وتحديد نوع الحشرة وخطة المعالجة في غضون 24 ساعة.',
  inspBarSuccess: 'تم استلام طلب المعاينة بنجاح! سيتم التواصل معك خلال دقائق.',
  inspBarNameLabel: 'الاسم الكريم',
  inspBarNamePlaceholder: 'أدخل اسمك بالكامل',
  inspBarPhoneLabel: 'رقم الهاتف',
  inspBarPhonePlaceholder: '01xxxxxxxxx',
  inspBarAreaLabel: 'المنطقة أو المحافظة',
  inspBarAreaPlaceholder: 'مثال: التجمع الخامس، الشيخ زايد، المعادي...',
  inspBarServiceLabel: 'نوع الخدمة المطلوبة',
  inspBarSubmitBtn: 'تأكيد طلب المعاينة المجانية',

  // Pest Identifier Teaser Extra
  pestTeaserBadge: 'أداة التشخيص التفاعلية',
  pestTeaserDesc: 'تعرف على نوع الآفة أو الحشرة بدقة خلال دقيقة واحدة عبر الإجابة على 4 أسئلة سريعة أو رفع صورة الإصابة.',
  pestTeaserBtn: 'بدء التشخيص الذكي الآن',

  // Pricing Extra
  pricingIncludes: 'تتضمن الباقة',

  // Services Extra
  servicesViewAll: 'عرض كل الخدمات',
  serviceDetailsBtn: 'تفاصيل الخدمة وحجز موعد',

  // Testimonials Extra
  testimonialsSubtitle: 'آراء عملائنا الكرام',
  testimonialsHeadline: 'ثقة متبادلة وتجارب نجاح موثقة من عملائنا في مختلف المحافظات',
  testimonialsHighlightWords: ['ثقة', 'متبادلة', 'وتجارب'],
  testimonialsViewAll: 'عرض كل التقييمات',

  // Footer Extra Links & Inquiries
  footerColInquiry: 'طلب اتصال أو استفسار فوري',
  footerColQuickLinks: 'روابط هامة وسريعة',
  footerColServices: 'أبرز خدمات المكافحة',
  footerCoverageCardTitle: 'نطاق وساعات العمل الميداني',
  footerInquiryDesc: 'أدخل رقم هاتفك وسيقوم مهندس المكافحة بالاتصال بك فوراً للإجابة عن استفساراتك.',
  footerInquiryPlaceholder: 'أدخل رقم هاتفك (01xxxxxxxxx)...',
  footerInquirySubmit: 'طلب اتصال',
  footerInquirySuccess: 'شكراً لك! تم استلام رقمك وسيتصل بك الفني خلال دقائق.',
  footerPhoneCardTitle: 'الخط الفني الساخن والمباشر',
  footerPrivacy: 'سياسة الخصوصية وأمان البيانات',
  footerQuickWhatsapp: 'محادثة سريعة عبر واتساب مع المشرف الفني',
  footerTerms: 'الشروط والأحكام والضمان المعتمد',

  // Pest Identifier Tool Extra
  pestTabQuiz: 'اختبار التشخيص الذكي (4 أسئلة)',
  pestTabPhoto: 'تشخيص فوري عبر تصوير الآفة',
  pestTabEncyclopedia: 'موسوعة الحشرات والآفات',
  pestPrevQuestionBtn: 'السؤال السابق',
  pestRetakeQuizBtn: 'إعادة الاختبار من البداية',
  pestResultTitle: 'نتيجة التشخيص الميداني المقترحة',
  pestResultReportBadge: 'تقرير التحليل الذكي للأعراض',
  pestMatchReasons: 'أسباب ومؤشرات التطابق:',
  pestAdviceTitle: 'توجيهات ونصائح مهندس المكافحة:',
  pestBookInspectionForThis: 'طلب مكافحة ومعاينة مخصصة لهذه الآفة',

  // Warranty Extra Aliases
  warrantyBadge: 'التحقق من الضمان الإلكتروني المعتمد',
  warrantyHeadline: 'الاستعلام عن شهادة الضمان الرسمية',
};

const DICTIONARY_EN: Translations = {
  navHome: 'Home',
  navAbout: 'About Us',
  navServices: 'Services',
  navAllServices: 'All Pest Control Services',
  navPestIdentifier: 'Pest Identifier',
  navPestIdentifierBadge: 'Smart',
  navWarranty: 'Warranty Verification',
  navWarrantyBadge: 'Official',
  navProjects: 'Field Projects',
  navFaqs: 'FAQs',
  navBlog: 'Pest Guides',
  navContact: 'Contact Us',
  navPricing: 'Pricing Plans',
  navGallery: 'Photo Gallery',
  headerTopNotice: 'Specialized Technical Center in Egypt • Certified Odorless Safe Formulations',
  headerWhatsappBtn: 'WhatsApp',
  headerBookBtn: 'Book Service',
  headerMenuAria: 'Open Main Menu',
  langSwitchAria: 'Switch site language to Arabic',
  langSwitchText: 'العربية',
  langSwitchAltCode: 'AR',
  langCurrentCode: 'EN',

  whatsappNow: 'Chat on WhatsApp Now',
  callDirect: 'Call Directly',
  phoneLabel: 'Phone',
  workingHoursLabel: 'Working Hours',
  coverageLabel: 'Service Coverage',
  viewAll: 'View All',
  readMore: 'Read More',
  breadcrumbHome: 'Home',
  emergencyTitle: 'Facing an urgent pest issue in your home or facility?',
  emergencyDesc: 'Contact us immediately to arrange a prompt on-site inspection and customized technical treatment.',
  requestInspectionBtn: 'Request Prompt Inspection',
  submitRequestBtn: 'Send & Confirm Request',
  directPhoneOrWhatsapp: 'Direct phone and WhatsApp technical support',

  bookingBadge: 'Request Inspection & Treatment',
  bookingTitle: 'Specialized Technical Center for Pest Control',
  bookingSubtitlePrompt: 'For immediate consultation: call our direct line or WhatsApp',
  bookingNameLabel: 'Full Name *',
  bookingNamePlaceholder: 'e.g. John Doe',
  bookingPhoneLabel: 'Phone Number (Egypt) *',
  bookingPhonePlaceholder: '010XXXXXXXX',
  bookingServiceLabel: 'Required Service *',
  bookingAreaLabel: 'Area or Governorate',
  bookingAreaPlaceholder: 'e.g. New Cairo, Sheikh Zayed, Maadi...',
  bookingNotesLabel: 'Notes or Observed Pest (Optional)',
  bookingNotesPlaceholder: 'Describe the issue (e.g. kitchen cockroaches, bed bugs, termites...)',
  bookingSubmitBtn: 'Confirm & Send Request',
  bookingSuccessTitle: 'Request Received! Redirecting to WhatsApp...',
  bookingSuccessDesc: (name, phone) =>
    `Thank you, ${name}. Your request details have been prepared for direct follow-up with our technician via WhatsApp or phone call at ${phone}.`,
  bookingOpenWhatsappBtn: 'Open WhatsApp Chat',
  bookingCloseBtn: 'Close',

  heroTopBadge: 'Specialized Pest Control in Egypt • Certified Odorless & Safe Formulations',
  heroHeadline: 'Specialized Technical Center for Pest & Rodent Control',
  heroHighlightWords: ['Specialized', 'Rodent'],
  heroDesc:
    'Dedicated pest and rodent control solutions for homes, villas, and commercial facilities across Egypt, with rigorous inspection and safe, odorless treatment tailored to every infestation.',
  heroBullet1: 'Safe treatment without leaving your home or odorless residue',
  heroBullet2: 'German & American precision gel baiting for kitchens',
  heroBullet3: 'Comprehensive eradication of termites, bed bugs & rodents',
  heroBullet4: 'Full coverage across Greater Cairo, Giza & all governorates',
  heroCtaOrder: 'Request Treatment Now',
  heroCtaWhatsapp: 'Message on WhatsApp',
  heroCtaVideo: 'Watch Field Video',
  heroDirectLine: 'Direct Hotline:',
  heroSecondaryLine: 'Secondary Line:',
  heroVerifiedBadgeTitle: 'Precision Technical Inspection',
  heroVerifiedBadgeDesc: 'Certified Odorless Formulations',

  aboutSubtitle: 'About The Technical Center',
  aboutHeadline: 'Precise Inspection & Specialized Treatment for Every Case',
  aboutHighlightWords: ['Specialized', 'Precise'],
  aboutDesc1:
    'The Specialized Technical Center delivers professional pest and rodent eradication services for apartments, villas, restaurants, warehouses, and factories across the Arab Republic of Egypt. We begin with thorough technical field diagnostics to accurately identify pest species and entry points before applying the safest, most potent compounds.',
  aboutDesc2:
    'Resident and family safety is our highest priority. We use German and American odorless gel formulations for kitchens and officially registered compounds that require neither vacating the premises nor emptying cookware.',
  aboutPillar1Title: 'Expert On-Site Diagnostics',
  aboutPillar1Desc: 'Accurate species identification and customized treatment mapping for every property.',
  aboutPillar2Title: 'Safe & Certified Compounds',
  aboutPillar2Desc: 'Complete safety around children, seniors, and pets with zero harsh chemical odors.',
  aboutCtaContact: 'Contact Us Now',
  aboutCtaWhatsapp: 'Direct WhatsApp',
  aboutIdentityBadgeTitle: 'Specialized Technical Center',
  aboutIdentityBadgeSub: 'Reliable Pest Control Solutions',
  aboutIdentityBadgeDesc: 'Health-Approved & Safe Compounds',

  servicesSubtitle: 'Our Certified Services',
  servicesHeadline: 'Reliable Pest & Rodent Eradication for Homes & Businesses',
  servicesHighlightWords: ['Homes', 'Businesses'],
  servicesViewAllBtn: 'View All Services',
  servicesDetailsBtn: 'Service Details',
  servicesInclusionsTitle: (serviceName) => `What’s Included in ${serviceName}`,
  servicesBenefitsTitle: 'Key Benefits for Your Property',
  servicesProcessTitle: '4-Step Scientific Treatment Protocol',
  servicesAllCatalogTitle: 'All Pest Control Services',
  servicesDirectConsultTitle: 'Request Immediate Inspection',
  servicesDirectConsultDesc: 'Speak directly with our specialized pest control engineer for this service.',
  servicesHoursCoverageTitle: 'Hours & Geographic Coverage',

  inspectionBarBadge: 'Request Inspection & Custom Plan',
  inspectionBarTitle: 'Connect Directly With Our Pest Specialists',
  inspectionBarDesc: 'Rapid technical response across Greater Cairo, Giza, and Egyptian governorates.',
  inspectionBarName: 'Full Name *',
  inspectionBarPhone: 'Phone Number *',
  inspectionBarArea: 'Area / Governorate',
  inspectionBarService: 'Service Type *',
  inspectionBarSubmit: 'Submit Inspection Request',
  inspectionBarSuccessTitle: 'Request received! Opening WhatsApp chat...',
  inspectionBarSuccessDesc: (name) =>
    `Thank you, ${name}. Our specialist will follow up with your request details immediately.`,

  featuresSubtitle: 'Smart Service Features',
  featuresHeadline: 'Intelligent Features for Advanced & Safe Pest Management',
  featuresHighlightWords: ['Advanced', 'Safe'],
  featuresDesc:
    'From comprehensive property diagnostics and pinpoint species identification to targeted application and sustainable exclusion, we achieve lasting results while ensuring maximum health and safety.',
  feature1Title: '100% Eco-Safe Formulations',
  feature1Desc: 'Licensed botanical and biological compounds safe for children and household pets.',
  feature2Title: 'Certified Skilled Technicians',
  feature2Desc: 'Licensed specialists trained according to rigorous scientific standards.',
  feature3Title: 'Targeted Focal Micro-Injection',
  feature3Desc: 'Precision injection reaching concealed nesting voids and breeding pockets.',

  whySubtitle: 'Why Choose The Technical Center',
  whyHeadline: 'Professional Technical Pest Control You Can Depend On',
  whyHighlightWords: ['Professional', 'Depend'],
  whyDesc:
    'Our technicians adhere to systematic inspection protocols to eliminate the root causes of pest spread, providing family-safe treatments and continuous preventive guidance.',
  whyPillar1Title: 'Safe & Odorless Formulations',
  whyPillar1Desc: 'Odor-free compounds requiring no home evacuation or cabinet clearance.',
  whyPillar2Title: 'Accurate Diagnosis & Mapping',
  whyPillar2Desc: 'Pinpointing movement tracks and harborage sites rather than random spraying.',
  whyPillar3Title: 'Preventive Follow-Up & Support',
  whyPillar3Desc: 'Practical tips to prevent re-infestation and proactive follow-up calls.',
  whyFloatingBadge1Title: 'Odorless Formulations',
  whyFloatingBadge1Sub: 'Safe for Children & Pets',
  whyFloatingBadge2Title: 'Specialized Inspection',
  whyFloatingBadge2Sub: 'Accurate Species Identification',

  diffSubtitle: 'Specialized Treatment',
  diffHeadline: 'Why Specialized Technical Treatment Makes The Real Difference',
  diffHighlightWords: ['Specialized', 'Real'],
  diffDesc:
    'Random spraying with commercial aerosols simply causes pests to scatter deeper into adjoining rooms. Our targeted treatments neutralize breeding centers and eggs to stop cycles permanently.',
  diffCard1Title: 'Rapid Response & Scheduling',
  diffCard1Desc: 'Prompt inspection and execution scheduled at your convenience without disrupting daily routines.',
  diffCard2Title: 'Precision Odorless Application',
  diffCard2Desc: 'Using German & American gel baiting and certified food-safe compounds in kitchens and bedrooms.',
  diffFloatingBadgeTitle: 'Specialized Technical Center',
  diffFloatingBadgeSub: 'Certified Pest Control Egypt',

  pricingSubtitle: 'Inspection & Pricing Plans',
  pricingHeadline: 'Fair & Transparent Pricing Based on Property Area & Infestation',
  pricingHighlightWords: ['Fair', 'Transparent'],
  pricingDesc:
    'At the Specialized Technical Center, pricing is determined transparently following accurate on-site inspection to provide the most cost-effective and permanent solution.',
  pricingPopularBadge: 'Most Popular',
  pricingQuoteNotice: 'Inspection & Tailored Pricing',
  pricingQuoteSub: 'Based on area and treated pest species',
  pricingInclusionsLabel: 'Service Inclusions:',
  pricingRequestBtn: 'Request Inspection for This Plan',
  pricingWhatsappBtn: 'Inquire via WhatsApp',
  pricingComparisonTitle: 'Detailed Plan Comparison',
  pricingComparisonSub: 'A clear matrix showing all inclusions across our service tiers.',

  testiSubtitle: 'Client Reviews & Feedback',
  testiHeadline: 'Real Experiences From Clients Who Trust Our Services',
  testiHighlightWords: ['Real', 'Trust'],
  testiViewAllBtn: 'View All Reviews',
  testiSubmitTitle: 'Share Your Experience & Review',
  testiSubmitDesc:
    'Did you benefit from our services? Share your feedback to help others maintain a clean, pest-free environment.',
  testiSubmitNamePlaceholder: 'Your Full Name',
  testiSubmitCityPlaceholder: 'City or District',
  testiSubmitReviewPlaceholder: 'Describe your experience with our team, response speed, and results...',
  testiSubmitBtn: 'Submit Review',
  testiSubmitSuccess: 'Thank you! Your feedback has been received and will be published upon verification.',

  faqsSubtitle: 'Frequently Asked Questions',
  faqsHeadline: 'Clear & Reliable Answers Regarding Pest Control & Safety',
  faqsHighlightWords: ['Clear', 'Reliable'],
  faqsViewAllBtn: 'View All Questions',
  faqsBoxQuestionPrompt: 'Have a specific question?',
  faqsBoxPromptDesc: 'Connect directly with our technical engineer for a comprehensive assessment.',
  faqsSearchPlaceholder: 'Search questions (e.g. child safety, warranty, termites, odor)...',
  faqsNoResults: 'No questions matched your search query.',
  faqsStillQuestionsTitle: 'Have an inquiry regarding a specific insect or infestation?',
  faqsStillQuestionsDesc: 'Call our customer care team or schedule an on-site inspection today.',

  blogSubtitle: 'Latest Pest Control Articles',
  blogHeadline: 'Stay Informed With Our Prevention Guides & Expert Advice',
  blogHighlightWords: ['Prevention', 'Expert'],
  blogViewAllBtn: 'View All Articles',
  blogReadFullBtn: 'Read Full Article',
  blogReadArticle: 'Read Article',
  blogByLabel: 'By',
  blogTagsLabel: 'Tags:',
  blogCommentsTitle: 'Leave a Comment or Inquiry',
  blogCommentsSubtitle: 'Your email address will not be published. Required fields are marked with *',
  blogCommentNamePlaceholder: 'Your Full Name *',
  blogCommentEmailPlaceholder: 'Email Address *',
  blogCommentTextPlaceholder: 'Write your question or comment here... *',
  blogCommentSubmitBtn: 'Submit Comment',
  blogCommentSuccess: 'Thank you! Your comment has been received and is pending review.',
  blogRecentTitle: 'Recent Articles',
  blogCategoriesTitle: 'Service Categories',

  warrantySectionBadge: 'Certified Electronic Warranty Verification',
  warrantySectionTitle: 'Official Warranty Certificate Lookup',
  warrantySectionDesc:
    'Enter your alphanumeric warranty code issued upon service completion to verify active warranty coverage and service history logged in our secure database.',
  warrantySearchPlaceholder: 'Enter Warranty Code (e.g. HARD-2026-9921)',
  warrantyVerifyBtn: 'Verify Warranty',
  warrantyVerifying: 'Verifying...',
  warrantyDemoCodesLabel: 'Demo Codes for Quick Testing:',
  warrantySeedBtn: 'Initialize Demo Warranty Data in Firebase',
  warrantySeeding: 'Seeding Database...',
  warrantySeedSuccess: '✓ Demo data seeded successfully! Try code: HARD-2026-9921',
  warrantyCertHeader: 'Specialized Technical Center for Pest Control',
  warrantyCertSub: 'Certified Electronic Warranty Certificate',
  warrantyCertCodeLabel: 'Certificate Code:',
  warrantyCertStatusLabel: 'Warranty Status',
  warrantyCertActiveStatus: 'Active & Certified',
  warrantyClientNameLabel: 'Client Name',
  warrantyServiceTypeLabel: 'Delivered Service Type',
  warrantyPropertyAddressLabel: 'Property Location',
  warrantyValidityPeriodLabel: 'Warranty Validity Period',
  warrantyTechNotesLabel: 'Technical Treatment Notes & Preventive Instructions:',
  warrantyTechnicianLabel: 'Field Inspection Supervisor:',
  warrantyFirebaseVerifiedBadge: '✓ Officially Documented in Firebase Cloud Firestore',
  warrantyNotFoundTitle: 'No Certificate Found for This Code',
  warrantyNotFoundDesc: 'Please verify the entered warranty code or click Initialize Demo Data above for instant testing.',

  pestQuizTab: 'Quick Diagnostic Quiz (4 Questions)',
  pestEncyclopediaTab: 'Pest Encyclopedia',
  pestPhotoTab: 'Send Photo to Pest Specialist',
  pestQuestionLabel: (curr, total) => `Question ${curr} of ${total}`,
  pestCompletedLabel: (pct) => `${pct}% Completed`,
  pestInteractiveBadge: 'Instant Interactive Diagnosis',
  pestPrevBtn: 'Previous Question',
  pestResetBtn: 'Start Over',
  pestReportBadge: 'Instant Diagnostic Pest Report',
  pestReportHeadline: 'Most Likely Pest Species Match',
  pestRetestBtn: 'Retake Quiz',
  pestMatchScore: (score) => `${score}% Match Confidence`,
  pestRiskLabel: (level) => `Risk Level: ${level}`,
  pestWhyMatched: 'Why this species was identified based on your answers:',
  pestBookFreeExam: 'Book Free On-Site Inspection for This Pest',
  pestViewServiceDetails: 'View Recommended Treatment Details',
  pestDiyTitle: 'Immediate Preventive Actions You Can Take Now:',
  pestMistakesTitle: 'Critical Mistakes to Avoid:',
  pestOtherPossibilities: 'Other Closely Related Possibilities to Review:',
  pestRequestExamForPest: 'Request Inspection for This Pest',
  pestEncyclopediaTitle: 'Household & Commercial Pest Encyclopedia',
  pestEncyclopediaSubtitle: 'Browse common species, life cycles, and scientific eradication methods',
  pestEncyclopediaSearchPlaceholder: 'Search by pest name or signs...',
  pestPhotoHeadline: 'Send a Photo to Our Technical Pest Specialist',
  pestPhotoDesc: 'Unsure about the pest species? Take a clear photo with your phone and our field entomologist will analyze it and reply promptly for free.',
  pestPhotoInputPrompt: 'Click here to select a photo from your phone or device',
  pestPhotoFormatNotice: 'Supports JPG, PNG, or direct camera captures',
  pestPhotoSelectedSuccess: 'Photo selected successfully! Click to change.',
  pestPhotoNameLabel: 'Full Name:',
  pestPhotoNamePlaceholder: 'e.g. John Doe',
  pestPhotoPhoneLabel: 'Phone Number:',
  pestPhotoPhonePlaceholder: '010XXXXXXXX',
  pestPhotoSubmitBtn: 'Send Photo for Free Immediate Diagnosis',
  pestPhotoSuccessTitle: 'Photo Received Successfully!',
  pestPhotoSuccessDesc: (name, phone) =>
    `Thank you, ${name || 'valued client'}. Our field inspection specialist is reviewing your photo and will contact you at (${phone}) within 15 minutes with a free, accurate diagnosis.`,
  pestPhotoSendAnotherBtn: 'Send Another Photo',

  footerAboutDesc:
    'Specialized Technical Center for Pest & Rodent Control in Egypt. Certified, odorless, and family-safe pest eradication solutions for homes, villas, and businesses.',
  footerQuickLinks: 'Quick Links',
  footerServices: 'Our Services',
  footerCoverageTitle: 'Egypt Coverage',
  footerCopyright: 'All rights reserved to Specialized Technical Center for Pest & Rodent Control in Egypt',
  footerSafeBadge: 'Compliant with Health & Environmental Safety Standards',
  footerWhatsappCardTitle: 'Instant WhatsApp Chat',

  // Warranty Extra
  warrantyDesc: 'Enter your alphanumeric warranty code provided after service completion to verify active coverage.',
  warrantyInputPlaceholder: 'Enter warranty code here (e.g. EGY-2026-8841)',
  warrantyCertTitle: 'Certified Official Warranty - Specialized Technical Center',
  warrantyStatusLabel: 'Warranty Status',
  warrantyActiveStatus: 'Active & Officially Certified',
  warrantyCustomerLabel: 'Client / Facility Name',
  warrantyServiceLabel: 'Executed Service Type',
  warrantyAddressLabel: 'Location / Address',
  warrantyPeriodLabel: 'Coverage Period & Validity',
  warrantyNotesLabel: 'Technical Team Field Notes & Guidelines',

  // About Extra
  aboutParagraph1: 'Specialized Technical Center for Pest & Rodent Control is Egypt’s premier engineering firm dedicated to professional, eco-safe pest eradication.',
  aboutParagraph2: 'We strictly adhere to modern Integrated Pest Management (IPM) protocols using certified non-toxic organic compounds safe for children and pets, backed by documented warranty certificates.',
  aboutCard1Title: 'Precision Engineering Inspection',
  aboutCard1Desc: 'Accurate detection of pest nesting points and entry vectors using advanced thermal and sensor equipment.',
  aboutCard2Title: 'Officially Certified Safe Formulations',
  aboutCard2Desc: 'Odorless treatments that allow safe application without leaving home or emptying kitchenware.',

  // Blog Extra
  blogViewAll: 'View All Articles',

  // FAQs Extra
  faqsBoxPrompt: 'Have a specific question about your property?',
  faqsBoxDesc: 'Our technical team is available around the clock to answer your inquiries and provide immediate guidance.',
  faqsViewAll: 'View All Frequently Asked Questions',

  // Gallery Extra
  gallerySubtitle: 'Field Operations Gallery',
  galleryHeadline: 'Live Documentation & Real On-Site Field Videos Across Egypt',
  galleryHighlightWords: ['Live', 'Documentation', 'Field', 'Videos'],
  galleryDesc: 'Witness the proven results of our field technicians protecting homes, villas, factories, and corporate offices.',
  galleryFullVideos: 'Live Field Documentation Videos',
  galleryViewAll: 'View Full Gallery',
  galleryWatchLiveVideo: 'Watch Live Field Video',

  // How It Works Extra
  howSubtitle: 'Our Systematic Methodology',
  howHeadline: 'Structured Scientific Steps Ensuring Total Eradication & Long-Term Prevention',
  howHighlightWords: ['Scientific', 'Total', 'Eradication'],

  // Inspection Bar Extra
  inspBarBadge: 'Fast Field Inspection Request',
  inspBarTitle: 'Book Your Property Inspection Today',
  inspBarDesc: 'Complimentary initial assessment, pest identification, and treatment roadmap within 24 hours.',
  inspBarSuccess: 'Inspection request received! Our specialist will call you in minutes.',
  inspBarNameLabel: 'Full Name',
  inspBarNamePlaceholder: 'Enter your full name',
  inspBarPhoneLabel: 'Phone Number',
  inspBarPhonePlaceholder: '+20 1xxxxxxxxx',
  inspBarAreaLabel: 'Area / Governorate',
  inspBarAreaPlaceholder: 'e.g. New Cairo, Sheikh Zayed, Maadi...',
  inspBarServiceLabel: 'Required Service',
  inspBarSubmitBtn: 'Confirm Free Inspection Request',

  // Pest Identifier Teaser Extra
  pestTeaserBadge: 'Interactive Diagnostic Tool',
  pestTeaserDesc: 'Identify the exact insect or pest in under 60 seconds by answering 4 simple questions or uploading a photo.',
  pestTeaserBtn: 'Start Smart Diagnosis Now',

  // Pricing Extra
  pricingIncludes: 'Package Includes',

  // Services Extra
  servicesViewAll: 'View All Services',
  serviceDetailsBtn: 'Service Details & Booking',

  // Testimonials Extra
  testimonialsSubtitle: 'Client Reviews & Endorsements',
  testimonialsHeadline: 'Trusted by Thousands of Families and Businesses Across Egypt',
  testimonialsHighlightWords: ['Trusted', 'Thousands', 'Businesses'],
  testimonialsViewAll: 'View All Testimonials',

  // Footer Extra Links & Inquiries
  footerColInquiry: 'Instant Callback Request',
  footerColQuickLinks: 'Quick Links',
  footerColServices: 'Featured Pest Services',
  footerCoverageCardTitle: 'Field Coverage & Working Hours',
  footerInquiryDesc: 'Enter your phone number and our pest control engineer will call you right away.',
  footerInquiryPlaceholder: 'Enter phone number (+20 1xxxxxxxxx)...',
  footerInquirySubmit: 'Request Call',
  footerInquirySuccess: 'Thank you! Your number has been received and a specialist will contact you shortly.',
  footerPhoneCardTitle: 'Direct Technical Hotline',
  footerPrivacy: 'Privacy Policy & Data Security',
  footerQuickWhatsapp: 'Quick WhatsApp chat with technical supervisor',
  footerTerms: 'Terms of Service & Certified Warranty',

  // Pest Identifier Tool Extra
  pestTabQuiz: 'Smart Diagnostic Quiz (4 Questions)',
  pestTabPhoto: 'Instant Diagnosis via Photo',
  pestTabEncyclopedia: 'Pest & Insect Encyclopedia',
  pestPrevQuestionBtn: 'Previous Question',
  pestRetakeQuizBtn: 'Retake Diagnostic Quiz',
  pestResultTitle: 'Estimated Field Diagnostic Result',
  pestResultReportBadge: 'Symptom Analysis Report',
  pestMatchReasons: 'Match indicators & detected clues:',
  pestAdviceTitle: 'Pest Control Engineer Recommendations:',
  pestBookInspectionForThis: 'Book Dedicated Inspection & Treatment for This Pest',

  // Warranty Extra Aliases
  warrantyBadge: 'Certified Electronic Warranty Verification',
  warrantyHeadline: 'Official Warranty Certificate Lookup',
};

interface LanguageContextType {
  locale: Locale;
  dir: Direction;
  isRTL: boolean;
  setLocale: (loc: Locale) => void;
  toggleLocale: () => void;
  t: Translations;
  company: CompanyInfo;
  siteData: ReturnType<typeof getSiteDataByLocale>;
  pestData: ReturnType<typeof getPestDataByLocale>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'hard_group_lang';

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'ar';
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    if (urlLang === 'en' || urlLang === 'ar') {
      try {
        localStorage.setItem(STORAGE_KEY, urlLang);
      } catch {
        // ignore
      }
      return urlLang;
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'ar') {
      return stored;
    }
  } catch {
    // ignore
  }
  return 'ar';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  const dir: Direction = locale === 'en' ? 'ltr' : 'rtl';
  const isRTL = dir === 'rtl';

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
      document.documentElement.dir = dir;
      document.body.dir = dir;
      if (isRTL) {
        document.body.classList.remove('dir-ltr');
        document.body.classList.add('dir-rtl');
      } else {
        document.body.classList.remove('dir-rtl');
        document.body.classList.add('dir-ltr');
      }
    }
  }, [locale, dir, isRTL]);

  const setLocale = React.useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem(STORAGE_KEY, newLocale);
    } catch {
      // ignore
    }
  }, []);

  const toggleLocale = React.useCallback(() => {
    setLocaleState((prev) => {
      const next = prev === 'ar' ? 'en' : 'ar';
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const t = useMemo(() => (locale === 'en' ? DICTIONARY_EN : DICTIONARY_AR), [locale]);
  const localizedCompany = useMemo(() => getCompanyByLocale(locale), [locale]);
  const siteData = useMemo(() => getSiteDataByLocale(locale), [locale]);
  const pestData = useMemo(() => getPestDataByLocale(locale), [locale]);

  const value = useMemo(
    () => ({
      locale,
      dir,
      isRTL,
      setLocale,
      toggleLocale,
      t,
      company: localizedCompany,
      siteData,
      pestData,
    }),
    [locale, dir, isRTL, setLocale, toggleLocale, t, localizedCompany, siteData, pestData]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
