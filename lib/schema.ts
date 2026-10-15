import { COMPANY_AR, COMPANY_EN, getCompanyByLocale } from './company';
import { COMPANY_IMAGES } from './media';
import {
  SERVICES_DATA,
  SERVICES_DATA_EN,
  PRICING_PLANS,
  PRICING_PLANS_EN,
  FAQS_DATA,
  FAQS_DATA_EN,
  ServiceItem,
} from './siteData';

export function getLocalBusinessObject(locale: 'ar' | 'en' = 'ar') {
  const isEn = locale === 'en';
  const currentCompany = getCompanyByLocale(locale);
  const altCompany = isEn ? COMPANY_AR : COMPANY_EN;

  return {
    '@type': 'LocalBusiness',
    '@id': '#localbusiness',
    name: currentCompany.name,
    alternateName: [
      currentCompany.shortName,
      altCompany.name,
      altCompany.shortName,
      'HARD Group Pest Control Egypt',
    ],
    description: `${COMPANY_AR.description} | ${COMPANY_EN.description}`,
    inLanguage: ['ar-EG', 'en'],
    image: COMPANY_IMAGES.logo,
    logo: COMPANY_IMAGES.logo,
    telephone: currentCompany.phonePrimary,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: currentCompany.phonePrimary,
        contactType: 'customer service',
        areaServed: 'EG',
        availableLanguage: ['ar', 'en'],
      },
      {
        '@type': 'ContactPoint',
        telephone: currentCompany.phoneSecondary,
        contactType: 'customer service',
        areaServed: 'EG',
        availableLanguage: ['ar', 'en'],
      },
      {
        '@type': 'ContactPoint',
        telephone: currentCompany.whatsapp,
        contactType: 'customer support',
        url: currentCompany.whatsappUrl,
        areaServed: 'EG',
        availableLanguage: ['ar', 'en'],
      },
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'EG',
      addressRegion: isEn ? 'Arab Republic of Egypt (Greater Cairo & Giza)' : COMPANY_AR.countryArabic,
    },
    areaServed: [
      {
        '@type': 'Country',
        name: isEn ? 'Egypt' : COMPANY_AR.countryArabic,
        alternateName: isEn ? COMPANY_AR.countryArabic : 'Egypt',
      },
      {
        '@type': 'AdministrativeArea',
        name: isEn ? 'Greater Cairo' : 'القاهرة الكبرى',
        alternateName: isEn ? 'القاهرة الكبرى' : 'Greater Cairo',
      },
      {
        '@type': 'AdministrativeArea',
        name: isEn ? 'Giza' : 'الجيزة',
        alternateName: isEn ? 'الجيزة' : 'Giza',
      },
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
    sameAs: [
      currentCompany.whatsappUrl,
      'https://www.facebook.com/share/r/1ESucCbJEJ/',
    ],
  };
}

export function getServiceObject(service: ServiceItem, locale: 'ar' | 'en' = 'ar') {
  const isEn = locale === 'en';
  const arMatch = SERVICES_DATA.find((s) => s.slug === service.slug);
  const enMatch = SERVICES_DATA_EN.find((s) => s.slug === service.slug);

  const primary = isEn ? enMatch || service : arMatch || service;
  const secondary = isEn ? arMatch : enMatch;

  return {
    '@type': 'Service',
    '@id': `#service-${service.slug}`,
    name: primary.title,
    alternateName: [
      primary.subtitle,
      ...(secondary ? [secondary.title, secondary.subtitle] : []),
    ],
    description: secondary
      ? `${primary.longDescription || primary.description} | ${secondary.longDescription || secondary.description}`
      : primary.longDescription || primary.description,
    inLanguage: ['ar-EG', 'en'],
    serviceType: primary.title,
    image: primary.image,
    provider: getLocalBusinessObject(locale),
    areaServed: [
      {
        '@type': 'Country',
        name: isEn ? 'Egypt' : COMPANY_AR.countryArabic,
      },
      {
        '@type': 'AdministrativeArea',
        name: isEn ? 'Greater Cairo' : 'القاهرة الكبرى',
      },
      {
        '@type': 'AdministrativeArea',
        name: isEn ? 'Giza' : 'الجيزة',
      },
    ],
    availableChannel: {
      '@type': 'ServiceChannel',
      servicePhone: {
        '@type': 'ContactPoint',
        telephone: COMPANY_AR.phonePrimary,
        contactType: 'customer service',
        availableLanguage: ['ar', 'en'],
      },
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: isEn ? `Service Inclusions: ${primary.title}` : `مشمولات ${primary.title}`,
      itemListElement: primary.features.map((feature, index) => ({
        '@type': 'Offer',
        position: index + 1,
        itemOffered: {
          '@type': 'Service',
          name: feature,
        },
      })),
    },
  };
}

export function getLocalBusinessWithServicesSchema(locale: 'ar' | 'en' = 'ar') {
  const isEn = locale === 'en';
  const localBusiness = getLocalBusinessObject(locale);
  const activeServices = isEn ? SERVICES_DATA_EN : SERVICES_DATA;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        ...localBusiness,
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: isEn
            ? 'Specialized Pest & Rodent Control Services in Egypt'
            : 'خدمات مكافحة الحشرات والقوارض المتخصصة في مصر',
          itemListElement: activeServices.map((service) => getServiceObject(service, locale)),
        },
      },
      ...activeServices.map((service) => getServiceObject(service, locale)),
    ],
  };
}

export function getSingleServicePageSchema(service: ServiceItem, locale: 'ar' | 'en' = 'ar') {
  const isEn = locale === 'en';
  return {
    '@context': 'https://schema.org',
    '@graph': [
      getLocalBusinessObject(locale),
      getServiceObject(service, locale),
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: isEn ? 'Home' : 'الرئيسية',
            item: '/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: isEn ? 'Pest Control Services' : 'خدمات المكافحة',
            item: '/services',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: service.title,
            item: `/services/${service.slug}`,
          },
        ],
      },
    ],
  };
}

export function getPricingPageSchema(locale: 'ar' | 'en' = 'ar') {
  const isEn = locale === 'en';
  const plans = isEn ? PRICING_PLANS_EN : PRICING_PLANS;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      getLocalBusinessObject(locale),
      ...plans.map((plan) => ({
        '@type': 'Service',
        '@id': `#pricing-service-${plan.id}`,
        name: plan.name,
        serviceType: plan.type,
        description: plan.description,
        inLanguage: ['ar-EG', 'en'],
        provider: getLocalBusinessObject(locale),
        areaServed: {
          '@type': 'Country',
          name: isEn ? 'Egypt' : COMPANY_AR.countryArabic,
        },
        audience: {
          '@type': 'Audience',
          audienceType: plan.idealFor,
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: plan.name,
          itemListElement: plan.features.map((feature, idx) => ({
            '@type': 'Offer',
            position: idx + 1,
            itemOffered: {
              '@type': 'Service',
              name: feature,
            },
          })),
        },
      })),
    ],
  };
}

export function getPestIdentifierServiceSchema(locale: 'ar' | 'en' = 'ar') {
  const isEn = locale === 'en';
  return {
    '@context': 'https://schema.org',
    '@graph': [
      getLocalBusinessObject(locale),
      {
        '@type': 'Service',
        '@id': '#service-pest-identifier',
        name: isEn
          ? 'Smart Pest Identifier & Technical Inspection Tool'
          : 'أداة التشخيص والتعرف الذكي على الحشرات والمعاينة الفنية',
        alternateName: isEn
          ? 'أداة التشخيص والتعرف الذكي على الحشرات والمعاينة الفنية'
          : 'Smart Pest Identifier & Technical Inspection Tool',
        serviceType: isEn
          ? 'Pest Infestation Diagnosis & Technical Inspection'
          : 'فحص وتشخيص الإصابات الحشرية ومكافحة الآفات',
        description: isEn ? COMPANY_EN.description : COMPANY_AR.description,
        inLanguage: ['ar-EG', 'en'],
        provider: getLocalBusinessObject(locale),
        areaServed: {
          '@type': 'Country',
          name: isEn ? 'Egypt' : COMPANY_AR.countryArabic,
        },
      },
    ],
  };
}

export function getFaqPageSchema(locale: 'ar' | 'en' = 'ar') {
  const isEn = locale === 'en';
  const faqs = isEn ? FAQS_DATA_EN : FAQS_DATA;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      getLocalBusinessObject(locale),
      {
        '@type': 'FAQPage',
        '@id': '#faq-page',
        inLanguage: ['ar-EG', 'en'],
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };
}
