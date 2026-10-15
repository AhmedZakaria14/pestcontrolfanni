'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home2/HeroSection';
import InspectionBarSection from '@/components/home2/InspectionBarSection';
import AboutSection from '@/components/home2/AboutSection';
import ServicesSection from '@/components/home2/ServicesSection';
import WhyChooseUs from '@/components/home2/WhyChooseUs';
import DifferenceSection from '@/components/home2/DifferenceSection';
import FeaturesSection from '@/components/home2/FeaturesSection';
import HowItWorks from '@/components/home2/HowItWorks';
import PricingSection from '@/components/home2/PricingSection';
import GallerySection from '@/components/home2/GallerySection';
import WarrantyVerificationSection from '@/components/WarrantyVerificationSection';
import TestimonialsSection from '@/components/home2/TestimonialsSection';
import FaqSection from '@/components/home2/FaqSection';
import BlogSection from '@/components/home2/BlogSection';
import PestIdentifierTeaser from '@/components/home2/PestIdentifierTeaser';
import BookingModal from '@/components/BookingModal';
import VideoModal from '@/components/VideoModal';
import JsonLd from '@/components/JsonLd';
import { getLocalBusinessWithServicesSchema } from '@/lib/schema';
import { useLanguage } from '@/lib/i18n';

export default function HomePage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const { dir, locale, t } = useLanguage();
  const homeSchema = getLocalBusinessWithServicesSchema(locale);

  return (
    <div className="min-h-screen flex flex-col bg-white" dir={dir}>
      <JsonLd id="schema-home-services" data={homeSchema} />
      {/* Header */}
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onOpenBooking={() => setBookingOpen(true)}
          onOpenVideo={() => setVideoOpen(true)}
        />

        {/* Schedule an Inspection Bar */}
        <InspectionBarSection />

        {/* About Company */}
        <AboutSection />

        {/* Services */}
        <ServicesSection />

        {/* Pest Identifier Interactive Diagnostic Teaser */}
        <PestIdentifierTeaser />

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* Difference Section */}
        <DifferenceSection />

        {/* Features */}
        <FeaturesSection />

        {/* How It Works */}
        <HowItWorks />

        {/* Pricing & Inspection Plans */}
        <PricingSection onOpenBooking={() => setBookingOpen(true)} />

        {/* Gallery Section */}
        <GallerySection onOpenVideo={() => setVideoOpen(true)} />

        {/* Warranty Verification Section */}
        <WarrantyVerificationSection />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* FAQs */}
        <FaqSection />

        {/* Blog */}
        <BlogSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />

      <VideoModal
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
        title={
          locale === 'en'
            ? 'Live Field Video - Technical Specialized Pest Control Center'
            : 'تغطية ميدانية مباشرة - المركز الفني المتخصص لمكافحة الحشرات'
        }
        videoUrl="https://www.facebook.com/share/r/1ESucCbJEJ/"
      />
    </div>
  );
}
