'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Phone,
  Clock,
  Menu,
  ChevronDown,
  ArrowLeft,
  ShieldCheck,
  MessageCircle,
  Award,
} from 'lucide-react';
import { SERVICES_DATA } from '@/lib/siteData';
import { company } from '@/lib/company';
import Logo from '@/components/Logo';
import OffcanvasDrawer from './OffcanvasDrawer';
import BookingModal from './BookingModal';

interface HeaderProps {
  transparent?: boolean;
}

export default function Header({ transparent = false }: HeaderProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className="w-full z-50 transition-all duration-300">
        {/* Top bar info */}
        <div className="bg-[#022A1E] text-white text-xs border-b border-white/10 hidden md:block">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-2.5 flex items-center justify-between">
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
                <span>واتساب: {company.whatsapp}</span>
              </a>
              <div className="flex items-center gap-1.5 text-white/70">
                <Clock className="w-3.5 h-3.5 text-[#C7F268]" />
                <span>{company.workingHours}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-white/80">
              <span className="text-[12px] text-[#C7F268] font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>المركز الفني المتخصص بمصر • مبيدات معتمدة بدون روائح</span>
              </span>
            </div>
          </div>
        </div>

        {/* Modern Sleek Oval Desktop Header & Responsive Mobile Header */}
        <div
          className={`${
            isScrolled
              ? 'fixed top-2 left-2 right-2 sm:top-4 sm:left-4 sm:right-4 z-50'
              : 'relative w-full pt-2 sm:pt-4 pb-2 z-50'
          } transition-all duration-500`}
        >
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="bg-[#033F2D]/95 backdrop-blur-xl text-white py-2 px-3 sm:py-3.5 sm:px-8 rounded-full shadow-2xl border border-white/20 flex items-center justify-between gap-1.5 sm:gap-4 overflow-hidden">
              {/* Logo */}
              <Link href="/" className="inline-flex items-center shrink-0" aria-label={company.name}>
                <Logo variant="light" />
              </Link>

              {/* Desktop Navigation Links (Oval Capsule Navigation) */}
              <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-[14px] font-bold text-white">
                <Link
                  href="/"
                  className={`transition-colors py-1.5 px-3 rounded-full ${
                    pathname === '/' ? 'bg-[#C7F268] text-[#033F2D]' : 'hover:text-[#C7F268]'
                  }`}
                >
                  الرئيسية
                </Link>

                <Link
                  href="/about-us"
                  className={`transition-colors py-1.5 px-3 rounded-full ${
                    pathname === '/about-us' ? 'bg-[#C7F268] text-[#033F2D]' : 'hover:text-[#C7F268]'
                  }`}
                >
                  عن المركز
                </Link>

                {/* Services dropdown */}
                <div className="relative group py-1.5">
                  <Link
                    href="/services"
                    className={`flex items-center gap-1.5 transition-colors px-3 py-1.5 rounded-full ${
                      pathname.startsWith('/services') ? 'bg-[#C7F268] text-[#033F2D]' : 'hover:text-[#C7F268]'
                    }`}
                  >
                    <span>الخدمات</span>
                    <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
                  </Link>
                  <div className="absolute top-full right-0 pt-2 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="bg-white text-[#033F2D] rounded-2xl shadow-2xl border border-gray-100 py-3 overflow-hidden text-right">
                      <Link
                        href="/services"
                        className="block px-5 py-2.5 text-sm font-bold hover:bg-[#C7F268]/20 transition-colors border-b border-gray-100 text-[#033F2D]"
                      >
                        عرض جميع الخدمات
                      </Link>
                      {SERVICES_DATA.map((srv) => (
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
                  className={`relative flex items-center gap-1.5 transition-colors py-1.5 px-3 rounded-full ${
                    pathname === '/pest-identifier' ? 'bg-[#C7F268] text-[#033F2D]' : 'hover:text-[#C7F268]'
                  }`}
                >
                  <span>تشخيص الحشرات</span>
                </Link>

                <Link
                  href="/warranty-verify"
                  className={`flex items-center gap-1.5 transition-colors py-1.5 px-3 rounded-full ${
                    pathname === '/warranty-verify' ? 'bg-[#C7F268] text-[#033F2D]' : 'hover:text-[#C7F268]'
                  }`}
                >
                  <Award className="w-3.5 h-3.5 text-[#C7F268] group-hover:text-[#033F2D]" />
                  <span>التحقق من الضمان</span>
                </Link>

                <Link
                  href="/projects"
                  className={`transition-colors py-1.5 px-3 rounded-full ${
                    pathname.startsWith('/projects') ? 'bg-[#C7F268] text-[#033F2D]' : 'hover:text-[#C7F268]'
                  }`}
                >
                  أعمال ميدانية
                </Link>

                <Link
                  href="/contact-us"
                  className={`transition-colors py-1.5 px-3 rounded-full ${
                    pathname === '/contact-us' ? 'bg-[#C7F268] text-[#033F2D]' : 'hover:text-[#C7F268]'
                  }`}
                >
                  تواصل معنا
                </Link>
              </nav>

              {/* Right actions */}
              <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
                <a
                  href={company.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hidden xl:inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white py-2 px-3.5 rounded-full text-xs font-bold transition-colors shadow-md"
                  title="تواصل معنا عبر واتساب"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>واتساب</span>
                </a>

                <button
                  onClick={() => setBookingOpen(true)}
                  className="btn-default py-1 px-2.5 sm:py-2 sm:px-5 text-[11px] sm:text-xs md:text-sm font-bold inline-flex items-center gap-1 rounded-full shadow-md cursor-pointer shrink-0 whitespace-nowrap"
                >
                  <span>حجز خدمة</span>
                  <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-0.5" />
                </button>

                {/* Hamburger Button for Offcanvas */}
                <button
                  onClick={() => setDrawerOpen(true)}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/15 hover:bg-[#C7F268] hover:text-[#033F2D] text-white flex items-center justify-center shrink-0 transition-colors cursor-pointer shadow-sm border border-white/10 p-0"
                  aria-label="فتح القائمة"
                >
                  <Menu className="w-5 h-5 stroke-[2.2] shrink-0" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Offcanvas Drawer */}
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

