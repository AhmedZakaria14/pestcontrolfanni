'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Phone,
  Clock,
  Menu,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  MessageCircle,
  Award,
} from 'lucide-react';
import Logo from '@/components/Logo';
import OffcanvasDrawer from './OffcanvasDrawer';
import BookingModal from './BookingModal';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '@/lib/i18n';

export default function Header() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const { t, company, siteData, isRTL, locale } = useLanguage();

  return (
    <>
      <header className="w-full z-50 sticky top-0 bg-[#033F2D] text-white border-b border-white/10 shadow-lg">
        {/* Top Info Bar */}
        <div className="bg-[#022A1E] text-white text-xs border-b border-white/10 hidden md:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <a
                href={company.phonePrimaryRaw}
                className="flex items-center gap-1.5 hover:text-[#C7F268] transition-colors"
                dir="ltr"
              >
                <Phone className="w-3.5 h-3.5 text-[#C7F268]" />
                <span className="font-bold">{company.phonePrimary}</span>
              </a>
              <a
                href={company.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-[#C7F268] text-[#C7F268] font-bold transition-colors"
                dir="ltr"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span>
                  {locale === 'ar' ? 'واتساب:' : 'WhatsApp:'} {company.whatsapp}
                </span>
              </a>
              <div className="flex items-center gap-1.5 text-white/70">
                <Clock className="w-3.5 h-3.5 text-[#C7F268]" />
                <span>{company.workingHours}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-white/80">
              <span className="text-[12px] text-[#C7F268] font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{t.headerTopNotice}</span>
              </span>
              <div className="border-s border-white/20 ps-3">
                <LanguageSwitcher variant="header" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Classic Navbar Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center shrink-0" aria-label={company.name}>
            <Logo variant="light" />
          </Link>

          {/* Classic Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm font-bold text-white">
            <Link
              href="/"
              className={`transition-colors py-1 border-b-2 ${
                pathname === '/'
                  ? 'text-[#C7F268] border-[#C7F268]'
                  : 'border-transparent text-white/90 hover:text-[#C7F268]'
              }`}
            >
              {t.navHome}
            </Link>

            <Link
              href="/about-us"
              className={`transition-colors py-1 border-b-2 ${
                pathname === '/about-us'
                  ? 'text-[#C7F268] border-[#C7F268]'
                  : 'border-transparent text-white/90 hover:text-[#C7F268]'
              }`}
            >
              {t.navAbout}
            </Link>

            {/* Services dropdown */}
            <div className="relative group py-1">
              <Link
                href="/services"
                className={`flex items-center gap-1 transition-colors py-1 border-b-2 ${
                  pathname.startsWith('/services')
                    ? 'text-[#C7F268] border-[#C7F268]'
                    : 'border-transparent text-white/90 hover:text-[#C7F268]'
                }`}
              >
                <span>{t.navServices}</span>
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </Link>

              {/* Fast Hover Dropdown */}
              <div
                className={`absolute top-full pt-2 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50 ${
                  isRTL ? 'right-0' : 'left-0'
                }`}
              >
                <div
                  className={`bg-white text-[#033F2D] rounded-xl shadow-2xl border border-gray-100 py-2.5 overflow-hidden ${
                    isRTL ? 'text-right' : 'text-left'
                  }`}
                >
                  <Link
                    href="/services"
                    className="block px-5 py-2.5 text-sm font-bold hover:bg-[#C7F268]/20 transition-colors border-b border-gray-100 text-[#033F2D]"
                  >
                    {t.navAllServices}
                  </Link>
                  {siteData.services.map((srv) => (
                    <Link
                      key={srv.id}
                      href={`/services/${srv.slug}`}
                      className="block px-5 py-2 text-sm font-medium hover:bg-[#C7F268]/20 transition-colors text-gray-700 hover:text-[#033F2D]"
                    >
                      {srv.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/pest-identifier"
              className={`flex items-center gap-1.5 transition-colors py-1 border-b-2 ${
                pathname === '/pest-identifier'
                  ? 'text-[#C7F268] border-[#C7F268]'
                  : 'border-transparent text-white/90 hover:text-[#C7F268]'
              }`}
            >
              <span>{t.navPestIdentifier}</span>
              <span className="px-1.5 py-0.5 rounded-full bg-[#C7F268] text-[#033F2D] text-[10px] font-black leading-none">
                {t.navPestIdentifierBadge}
              </span>
            </Link>

            <Link
              href="/warranty-verify"
              className={`flex items-center gap-1.5 transition-colors py-1 border-b-2 ${
                pathname === '/warranty-verify'
                  ? 'text-[#C7F268] border-[#C7F268]'
                  : 'border-transparent text-white/90 hover:text-[#C7F268]'
              }`}
            >
              <Award className="w-4 h-4 text-[#C7F268]" />
              <span>{t.navWarranty}</span>
            </Link>

            <Link
              href="/projects"
              className={`transition-colors py-1 border-b-2 ${
                pathname.startsWith('/projects')
                  ? 'text-[#C7F268] border-[#C7F268]'
                  : 'border-transparent text-white/90 hover:text-[#C7F268]'
              }`}
            >
              {t.navProjects}
            </Link>

            <Link
              href="/contact-us"
              className={`transition-colors py-1 border-b-2 ${
                pathname === '/contact-us'
                  ? 'text-[#C7F268] border-[#C7F268]'
                  : 'border-transparent text-white/90 hover:text-[#C7F268]'
              }`}
            >
              {t.navContact}
            </Link>
          </nav>

          {/* Action Buttons & Switcher */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Mobile language switch badge in main navbar */}
            <div className="md:hidden">
              <LanguageSwitcher variant="compact" />
            </div>

            <a
              href={company.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden xl:inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white py-2 px-3.5 rounded-xl text-xs font-bold transition-colors shadow-md"
              title={t.headerWhatsappBtn}
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t.headerWhatsappBtn}</span>
            </a>

            <button
              onClick={() => setBookingOpen(true)}
              className="bg-[#C7F268] hover:bg-[#b5e050] text-[#033F2D] font-bold py-2.5 px-3.5 sm:px-5 text-xs sm:text-sm rounded-xl transition-all shadow-md inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <span>{t.headerBookBtn}</span>
              {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden w-10 h-10 rounded-xl bg-white/10 hover:bg-[#C7F268] hover:text-[#033F2D] text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10"
              aria-label={t.headerMenuAria}
            >
              <Menu className="w-6 h-6 stroke-[2.2]" />
            </button>
          </div>
        </div>
      </header>

      {/* Offcanvas Mobile Drawer */}
      <OffcanvasDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onOpenBooking={() => setBookingOpen(true)}
      />

      {/* Inspection Booking Modal */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </>
  );
}
