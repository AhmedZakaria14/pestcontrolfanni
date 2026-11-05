'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  CalendarCheck,
  Search,
  PlusCircle,
  Trash2,
  Edit3,
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye,
  RefreshCw,
  LogOut,
  Lock,
  Phone,
  User,
  MapPin,
  FileText,
  Filter,
  Download,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import Logo from '@/components/Logo';
import { useLanguage } from '@/lib/i18n';
import {
  FirebaseBooking,
  FirebaseWarranty,
  fetchBookingsFromFirestore,
  updateBookingStatusInFirestore,
  deleteBookingFromFirestore,
  fetchWarrantiesFromFirestore,
  saveWarrantyToFirestore,
  deleteWarrantyFromFirestore,
  subscribeToBookings,
  subscribeToWarranties,
} from '@/lib/firebase';

export default function AdminDashboardPage() {
  const { locale, isRTL } = useLanguage();

  // Authentication State with lazy initializer
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('admin_session_auth') === 'true';
    }
    return false;
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Tab State
  const [activeTab, setActiveTab] = useState<'bookings' | 'warranties'>('bookings');

  // Bookings Data & Filter
  const [bookings, setBookings] = useState<FirebaseBooking[]>([]);
  const [bookingSearch, setBookingSearch] = useState('');
  const [bookingStatusFilter, setBookingStatusFilter] = useState<string>('all');
  const [loadingBookings, setLoadingBookings] = useState(false);

  // Warranties Data & Filter
  const [warranties, setWarranties] = useState<FirebaseWarranty[]>([]);
  const [warrantySearch, setWarrantySearch] = useState('');
  const [warrantyStatusFilter, setWarrantyStatusFilter] = useState<string>('all');
  const [loadingWarranties, setLoadingWarranties] = useState(false);

  // New Warranty Modal / Form State
  const [showWarrantyModal, setShowWarrantyModal] = useState(false);
  const [savingWarranty, setSavingWarranty] = useState(false);
  const [warrantyFormData, setWarrantyFormData] = useState({
    code: '',
    customerName: '',
    customerPhone: '',
    serviceType: 'مكافحة حشرات المنازل والفلل بالجل الألماني',
    propertyAddress: '',
    city: 'القاهرة',
    issueDate: new Date().toISOString().split('T')[0],
    durationYears: 3,
    status: 'active' as 'active' | 'expired' | 'pending',
    technicianName: 'مهندس العمليات والمكافحة الفنية',
    pesticideDetails: 'مركبات ألمانية وأمريكية معتمدة من وزارة الصحة المصرية بدون روائح',
    notes: 'شهادة ضمان إلكترونية موثقة صادرة من المركز الفني المتخصص لمكافحة الحشرات والقوارض',
  });

  // Selected Item Detail Modal
  const [selectedBooking, setSelectedBooking] = useState<FirebaseBooking | null>(null);
  const [selectedWarranty, setSelectedWarranty] = useState<FirebaseWarranty | null>(null);

  // Success Notification
  const [notification, setNotification] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const loadBookings = async () => {
    setLoadingBookings(true);
    try {
      const data = await fetchBookingsFromFirestore();
      setBookings(data || []);
    } catch (err) {
      console.error('Failed to load bookings:', err);
    } finally {
      setLoadingBookings(false);
    }
  };

  const loadWarranties = async () => {
    setLoadingWarranties(true);
    try {
      const data = await fetchWarrantiesFromFirestore();
      setWarranties(data || []);
    } catch (err) {
      console.error('Failed to load warranties:', err);
    } finally {
      setLoadingWarranties(false);
    }
  };

  const loadAllData = async () => {
    await Promise.all([loadBookings(), loadWarranties()]);
  };

  // Real-time Firestore subscriptions when authenticated
  useEffect(() => {
    if (!isAuthenticated) return;

    const unsubscribeBookings = subscribeToBookings(
      (bData) => {
        setBookings(bData);
        setLoadingBookings(false);
      },
      (err) => {
        console.error('Bookings subscription error:', err);
        setLoadingBookings(false);
      }
    );

    const unsubscribeWarranties = subscribeToWarranties(
      (wData) => {
        setWarranties(wData);
        setLoadingWarranties(false);
      },
      (err) => {
        console.error('Warranties subscription error:', err);
        setLoadingWarranties(false);
      }
    );

    return () => {
      unsubscribeBookings();
      unsubscribeWarranties();
    };
  }, [isAuthenticated]);

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default master passkey or environment key
    if (passwordInput === 'admin2026' || passwordInput === 'azeco44@gmail.com') {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_session_auth', 'true');
      setLoginError('');
      showToast(locale === 'en' ? 'Welcome to Admin Control Panel' : 'مرحباً بك في لوحة تحكم الإدارة');
    } else {
      setLoginError(locale === 'en' ? 'Invalid password. Try again.' : 'كلمة المرور غير صحيحة. يرجى المحاولة ثانية.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_session_auth');
    setPasswordInput('');
  };

  // Update Booking Status
  const handleStatusChange = async (bookingId: string, newStatus: FirebaseBooking['status']) => {
    try {
      await updateBookingStatusInFirestore(bookingId, newStatus);
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
      );
      if (selectedBooking && selectedBooking.id === bookingId) {
        setSelectedBooking({ ...selectedBooking, status: newStatus });
      }
      showToast(locale === 'en' ? 'Booking status updated' : 'تم تحديث حالة طلب الحجز بنجاح');
    } catch (err) {
      console.error('Error updating status:', err);
      showToast(locale === 'en' ? 'Failed to update' : 'حدث خطأ أثناء التحديث');
    }
  };

  // Delete Booking
  const handleDeleteBooking = async (bookingId: string) => {
    if (!confirm(locale === 'en' ? 'Delete this booking request?' : 'هل تريد حذف طلب الحجز هذا نهائياً؟')) return;
    try {
      await deleteBookingFromFirestore(bookingId);
      setBookings((prev) => prev.filter((b) => b.id !== bookingId));
      if (selectedBooking?.id === bookingId) setSelectedBooking(null);
      showToast(locale === 'en' ? 'Booking deleted' : 'تم حذف طلب الحجز بنجاح');
    } catch (err) {
      console.error('Error deleting booking:', err);
    }
  };

  // Generate Random Unique Warranty Code
  const generateNewWarrantyCode = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newCode = `STC-2026-${randomNum}`;
    setWarrantyFormData((prev) => ({ ...prev, code: newCode }));
  };

  // Create / Save Warranty
  const handleSaveWarranty = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!warrantyFormData.code || !warrantyFormData.customerName) {
      alert(locale === 'en' ? 'Code and Customer Name are required' : 'كود الضمان واسم العميل مطلوبان');
      return;
    }

    setSavingWarranty(true);
    try {
      const issueDateObj = new Date(warrantyFormData.issueDate);
      const expiryDateObj = new Date(issueDateObj);
      expiryDateObj.setFullYear(expiryDateObj.getFullYear() + Number(warrantyFormData.durationYears));
      const calculatedExpiry = expiryDateObj.toISOString().split('T')[0];

      const saved = await saveWarrantyToFirestore({
        code: warrantyFormData.code.trim().toUpperCase(),
        customerName: warrantyFormData.customerName.trim(),
        customerPhone: warrantyFormData.customerPhone.trim(),
        serviceType: warrantyFormData.serviceType.trim(),
        propertyAddress: warrantyFormData.propertyAddress.trim() || 'القاهرة الكبرى / الجيزة',
        city: warrantyFormData.city.trim() || 'جمهورية مصر العربية',
        issueDate: warrantyFormData.issueDate,
        expiryDate: calculatedExpiry,
        durationYears: Number(warrantyFormData.durationYears),
        status: warrantyFormData.status,
        technicianName: warrantyFormData.technicianName.trim(),
        pesticideDetails: warrantyFormData.pesticideDetails.trim(),
        notes: warrantyFormData.notes.trim(),
      });

      setWarranties((prev) => [saved, ...prev.filter((w) => w.code !== saved.code)]);
      setShowWarrantyModal(false);
      showToast(locale === 'en' ? 'Warranty certificate issued & saved to Firebase' : 'تم إصدار وحفظ شهادة الضمان بنجاح في Firebase');

      // Reset form
      setWarrantyFormData({
        code: '',
        customerName: '',
        customerPhone: '',
        serviceType: 'مكافحة حشرات المنازل والفلل بالجل الألماني',
        propertyAddress: '',
        city: 'القاهرة',
        issueDate: new Date().toISOString().split('T')[0],
        durationYears: 3,
        status: 'active',
        technicianName: 'مهندس العمليات والمكافحة الفنية',
        pesticideDetails: 'مركبات ألمانية وأمريكية معتمدة من وزارة الصحة المصرية بدون روائح',
        notes: 'شهادة ضمان إلكترونية موثقة صادرة من المركز الفني المتخصص لمكافحة الحشرات والقوارض',
      });
    } catch (err) {
      console.error('Error saving warranty:', err);
      alert(locale === 'en' ? 'Failed to save warranty' : 'حدث خطأ أثناء حفظ شهادة الضمان');
    } finally {
      setSavingWarranty(false);
    }
  };

  // Delete Warranty
  const handleDeleteWarranty = async (code: string) => {
    if (!confirm(locale === 'en' ? `Delete warranty code ${code}?` : `هل تريد حذف كود الضمان ${code} من قاعدة البيانات؟`)) return;
    try {
      await deleteWarrantyFromFirestore(code);
      setWarranties((prev) => prev.filter((w) => w.code !== code));
      if (selectedWarranty?.code === code) setSelectedWarranty(null);
      showToast(locale === 'en' ? 'Warranty code deleted' : 'تم حذف كود الضمان بنجاح');
    } catch (err) {
      console.error('Error deleting warranty:', err);
    }
  };

  // Convert Booking to Warranty prefill
  const handleConvertBookingToWarranty = (booking: FirebaseBooking) => {
    generateNewWarrantyCode();
    setWarrantyFormData((prev) => ({
      ...prev,
      customerName: booking.name,
      customerPhone: booking.phone,
      serviceType: booking.service,
      propertyAddress: booking.area || 'القاهرة الكبرى',
      notes: `تم إنشاء الضمان بناءً على طلب الحجز رقم: ${booking.id}. ملاحظات العميل: ${booking.notes || 'لا توجد'}`,
    }));
    setActiveTab('warranties');
    setShowWarrantyModal(true);
  };

  // Filtering Bookings
  const filteredBookings = bookings.filter((b) => {
    const term = bookingSearch.trim().toLowerCase();
    const matchesSearch =
      !term ||
      b.name.toLowerCase().includes(term) ||
      b.phone.toLowerCase().includes(term) ||
      b.service.toLowerCase().includes(term) ||
      (b.area && b.area.toLowerCase().includes(term)) ||
      (b.notes && b.notes.toLowerCase().includes(term));

    const matchesStatus =
      bookingStatusFilter === 'all' || b.status === bookingStatusFilter;

    return matchesSearch && matchesStatus;
  });

  // Filtering Warranties
  const filteredWarranties = warranties.filter((w) => {
    const term = warrantySearch.trim().toLowerCase();
    const matchesSearch =
      !term ||
      w.code.toLowerCase().includes(term) ||
      w.customerName.toLowerCase().includes(term) ||
      (w.customerPhone && w.customerPhone.toLowerCase().includes(term)) ||
      w.serviceType.toLowerCase().includes(term) ||
      w.propertyAddress.toLowerCase().includes(term) ||
      (w.city && w.city.toLowerCase().includes(term));

    const matchesStatus =
      warrantyStatusFilter === 'all' || w.status === warrantyStatusFilter;

    return matchesSearch && matchesStatus;
  });

  // Render Login Screen if unauthenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#022A1E] text-white flex flex-col justify-center items-center p-4" dir="rtl">
        <div className="w-full max-w-md bg-[#033F2D] p-8 rounded-3xl border border-[#C7F268]/20 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-[#C7F268]/15 border border-[#C7F268]/30 text-[#C7F268] flex items-center justify-center mx-auto shadow-inner">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black text-white">لوحة تحكم الإدارة المركزية</h1>
            <p className="text-xs text-white/70">
              المركز الفني المتخصص لمكافحة الحشرات والقوارض
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#C7F268] mb-1.5">
                كلمة المرور الإدارية / رمز الدخول
              </label>
              <input
                type="password"
                required
                autoFocus
                placeholder="أدخل كلمة مرور لوحة التحكم..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full bg-white/10 text-white placeholder-white/40 text-sm px-4 py-3 rounded-xl border border-white/20 focus:outline-none focus:border-[#C7F268] transition-colors"
                dir="ltr"
              />
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#C7F268] hover:bg-[#b5e050] text-[#033F2D] font-black py-3 px-6 rounded-xl text-sm transition-all shadow-lg hover:scale-[1.02] cursor-pointer"
            >
              تسجيل الدخول إلى النظام
            </button>
          </form>

          <div className="pt-4 border-t border-white/10 text-center">
            <Link href="/" className="text-xs text-white/60 hover:text-[#C7F268] transition-colors">
              ➔ العودة إلى واجهة الموقع الرئيسية
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F8F5] text-[#033F2D] flex flex-col" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[9999] px-6 py-3 rounded-2xl bg-[#033F2D] text-[#C7F268] text-sm font-black shadow-2xl border-2 border-[#C7F268] flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5" />
          <span>{notification}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#033F2D] text-white border-b border-white/10 shadow-lg px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="shrink-0" title="الرئيسية">
            <Logo variant="light" />
          </Link>
          <div className="hidden sm:block border-s border-white/20 ps-4">
            <span className="block text-xs font-bold text-[#C7F268]">لوحة التحكم الإدارية</span>
            <span className="text-[11px] text-white/70">متصلة مباشرة بقواعد بيانات Firebase</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadAllData}
            title="تحديث البيانات من السيرفر"
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold"
          >
            <RefreshCw className="w-4 h-4 text-[#C7F268]" />
            <span className="hidden sm:inline">تحديث</span>
          </button>

          <Link
            href="/warranty-verify"
            target="_blank"
            className="p-2 px-3 rounded-xl bg-[#C7F268]/20 hover:bg-[#C7F268]/30 text-[#C7F268] transition-colors text-xs font-bold flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">فحص الضمان بالموقع</span>
          </Link>

          <button
            onClick={handleLogout}
            className="p-2 px-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-200 transition-colors text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>خروج</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-500 font-bold block">إجمالي طلبات الحجز</span>
              <span className="text-2xl font-black text-[#033F2D] mt-1 block">{bookings.length}</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <CalendarCheck className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-500 font-bold block">طلبات جديدة للمتابعة</span>
              <span className="text-2xl font-black text-amber-600 mt-1 block">
                {bookings.filter((b) => b.status === 'new').length}
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-500 font-bold block">شهادات الضمان المسجلة</span>
              <span className="text-2xl font-black text-[#033F2D] mt-1 block">{warranties.length}</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#033F2D] text-[#C7F268] flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-500 font-bold block">شهادات ضمان سارية</span>
              <span className="text-2xl font-black text-[#059669] mt-1 block">
                {warranties.filter((w) => w.status === 'active').length}
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 border-b border-gray-200 pb-3">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'bookings'
                ? 'bg-[#033F2D] text-[#C7F268] shadow-md'
                : 'bg-white text-[#484C44] hover:bg-gray-100'
            }`}
          >
            <CalendarCheck className="w-4 h-4" />
            <span>طلبات الحجز والخدمات ({bookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('warranties')}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'warranties'
                ? 'bg-[#033F2D] text-[#C7F268] shadow-md'
                : 'bg-white text-[#484C44] hover:bg-gray-100'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>إدارة أكواد الضمان الإلكتروني ({warranties.length})</span>
          </button>
        </div>

        {/* TAB 1: BOOKING REQUESTS */}
        {activeTab === 'bookings' && (
          <div className="space-y-4">
            {/* Search and Filters */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="ابحث بالاسم، رقم الهاتف، نوع الخدمة، أو المنطقة..."
                  value={bookingSearch}
                  onChange={(e) => setBookingSearch(e.target.value)}
                  className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm font-medium focus:bg-white focus:outline-none focus:border-[#033F2D] transition-colors"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="w-4 h-4 text-gray-500 shrink-0" />
                <select
                  value={bookingStatusFilter}
                  onChange={(e) => setBookingStatusFilter(e.target.value)}
                  className="px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold text-[#033F2D] outline-none"
                >
                  <option value="all">كل الحالات ({bookings.length})</option>
                  <option value="new">جديد (New)</option>
                  <option value="contacted">تم التواصل</option>
                  <option value="scheduled">تم تحديد موعد</option>
                  <option value="completed">مكتمل ومُنفذ</option>
                  <option value="cancelled">ملغي</option>
                </select>
              </div>
            </div>

            {/* Bookings Table / List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {loadingBookings ? (
                <div className="p-12 text-center text-gray-400">
                  <RefreshCw className="w-8 h-8 animate-spin mx-auto text-[#033F2D] mb-2" />
                  <p className="text-sm font-bold">جاري تحميل طلبات الحجز من Firebase...</p>
                </div>
              ) : filteredBookings.length === 0 ? (
                <div className="p-12 text-center text-gray-500">
                  <CalendarCheck className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                  <p className="text-base font-bold">لا توجد طلبات حجز مطابقة للبحث</p>
                  <p className="text-xs text-gray-400 mt-1">
                    أي طلبات جديدة يتم إرسالها من نماذج الموقع تظهر هنا لحظياً في قاعدة البيانات.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-sm">
                    <thead className="bg-[#033F2D]/5 border-b border-gray-200 text-xs font-black text-[#033F2D]">
                      <tr>
                        <th className="p-3.5 px-4">العميل</th>
                        <th className="p-3.5">رقم الهاتف</th>
                        <th className="p-3.5">الخدمة المطلوبة</th>
                        <th className="p-3.5">المنطقة</th>
                        <th className="p-3.5">تاريخ الإرسال</th>
                        <th className="p-3.5">الحالة</th>
                        <th className="p-3.5 text-center">إجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredBookings.map((b) => (
                        <tr key={b.id} className="hover:bg-gray-50/80 transition-colors">
                          <td className="p-3.5 px-4 font-bold text-[#033F2D]">
                            <div className="flex items-center gap-2">
                              <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-black shrink-0">
                                {b.name.charAt(0) || 'ع'}
                              </span>
                              <span>{b.name}</span>
                            </div>
                          </td>
                          <td className="p-3.5 font-bold" dir="ltr">
                            <a
                              href={`tel:${b.phone}`}
                              className="text-[#033F2D] hover:text-[#059669] hover:underline"
                            >
                              {b.phone}
                            </a>
                          </td>
                          <td className="p-3.5 text-xs text-gray-700 max-w-[200px] truncate">{b.service}</td>
                          <td className="p-3.5 text-xs text-gray-500">{b.area || 'غير محدد'}</td>
                          <td className="p-3.5 text-xs text-gray-400" dir="ltr">
                            {b.createdAt ? new Date(b.createdAt).toLocaleDateString('ar-EG') : '—'}
                          </td>
                          <td className="p-3.5">
                            <select
                              value={b.status}
                              onChange={(e) =>
                                handleStatusChange(b.id, e.target.value as FirebaseBooking['status'])
                              }
                              className={`text-xs font-bold px-2.5 py-1 rounded-lg border outline-none cursor-pointer ${
                                b.status === 'new'
                                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                                  : b.status === 'contacted'
                                  ? 'bg-blue-100 text-blue-900 border-blue-300'
                                  : b.status === 'scheduled'
                                  ? 'bg-purple-100 text-purple-900 border-purple-300'
                                  : b.status === 'completed'
                                  ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                                  : 'bg-gray-100 text-gray-700 border-gray-300'
                              }`}
                            >
                              <option value="new">جديد</option>
                              <option value="contacted">تم التواصل</option>
                              <option value="scheduled">موعد محدد</option>
                              <option value="completed">مكتمل</option>
                              <option value="cancelled">ملغي</option>
                            </select>
                          </td>
                          <td className="p-3.5">
                            <div className="flex items-center justify-center gap-1.5">
                              {/* Open WhatsApp */}
                              <a
                                href={`https://wa.me/2${b.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                                  `مرحباً أستاذ ${b.name}، معك المركز الفني المتخصص لمكافحة الحشرات بخصوص طلبك لخدمة ${b.service}.`
                                )}`}
                                target="_blank"
                                rel="noreferrer"
                                title="مراسلة عبر واتساب"
                                className="p-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white transition-colors"
                              >
                                <Phone className="w-3.5 h-3.5" />
                              </a>

                              {/* View Details */}
                              <button
                                onClick={() => setSelectedBooking(b)}
                                title="عرض التفاصيل"
                                className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>

                              {/* Convert to Warranty */}
                              <button
                                onClick={() => handleConvertBookingToWarranty(b)}
                                title="إصدار شهادة ضمان لهذا العميل"
                                className="p-1.5 rounded-lg bg-[#033F2D] hover:bg-[#055c42] text-[#C7F268] transition-colors cursor-pointer"
                              >
                                <ShieldCheck className="w-3.5 h-3.5" />
                              </button>

                              {/* Delete */}
                              <button
                                onClick={() => handleDeleteBooking(b.id)}
                                title="حذف الطلب"
                                className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: ELECTRONIC WARRANTIES */}
        {activeTab === 'warranties' && (
          <div className="space-y-4">
            {/* Header Action Bar */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="ابحث برمز الكود (STC-2026-XXXX)، اسم العميل، رقم الهاتف، أو العنوان..."
                  value={warrantySearch}
                  onChange={(e) => setWarrantySearch(e.target.value)}
                  className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm font-medium focus:bg-white focus:outline-none focus:border-[#033F2D] transition-colors"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  value={warrantyStatusFilter}
                  onChange={(e) => setWarrantyStatusFilter(e.target.value)}
                  className="px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold text-[#033F2D] outline-none"
                >
                  <option value="all">كل حالات الضمان ({warranties.length})</option>
                  <option value="active">ساري (Active)</option>
                  <option value="expired">منتهي (Expired)</option>
                  <option value="pending">معلق (Pending)</option>
                </select>

                <button
                  onClick={() => {
                    generateNewWarrantyCode();
                    setShowWarrantyModal(true);
                  }}
                  className="bg-[#C7F268] hover:bg-[#b5e050] text-[#033F2D] px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-md cursor-pointer shrink-0 transition-transform hover:scale-105"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>إصدار شهادة ضمان جديدة</span>
                </button>
              </div>
            </div>

            {/* Warranties Grid */}
            {loadingWarranties ? (
              <div className="bg-white p-12 rounded-2xl border text-center text-gray-400">
                <RefreshCw className="w-8 h-8 animate-spin mx-auto text-[#033F2D] mb-2" />
                <p className="text-sm font-bold">جاري تحميل شهادات الضمان من قاعدة بيانات Firebase...</p>
              </div>
            ) : filteredWarranties.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl border border-gray-100 text-center text-gray-500">
                <ShieldCheck className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                <p className="text-base font-bold">لم يتم العثور على شهادات ضمان مطابقة</p>
                <p className="text-xs text-gray-400 mt-1">
                  اضغط على زر &quot;إصدار شهادة ضمان جديدة&quot; لإنشاء كود إلكتروني وتوثيقه للعميل.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredWarranties.map((w) => (
                  <div
                    key={w.code}
                    className="bg-white rounded-2xl p-5 border border-gray-200 hover:border-[#033F2D] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      {/* Code and Status Badge */}
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-black px-2.5 py-1 rounded-lg bg-[#033F2D] text-[#C7F268] tracking-wider">
                          {w.code}
                        </span>
                        <span
                          className={`text-[11px] font-black px-2 py-0.5 rounded-full ${
                            w.status === 'active'
                              ? 'bg-emerald-100 text-emerald-800'
                              : w.status === 'expired'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {w.status === 'active' ? '✓ ساري' : w.status === 'expired' ? 'منتهي' : 'معلق'}
                        </span>
                      </div>

                      {/* Customer Info */}
                      <div>
                        <h4 className="font-black text-base text-[#033F2D] flex items-center gap-1.5">
                          <User className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{w.customerName}</span>
                        </h4>
                        {w.customerPhone && (
                          <span className="text-xs text-gray-500 font-bold block mt-0.5" dir="ltr">
                            {w.customerPhone}
                          </span>
                        )}
                      </div>

                      {/* Service & Property */}
                      <div className="text-xs space-y-1 text-gray-600 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                        <p className="font-bold text-[#033F2D]">{w.serviceType}</p>
                        <p className="text-gray-500 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{w.propertyAddress}</span>
                        </p>
                      </div>

                      {/* Dates */}
                      <div className="flex items-center justify-between text-[11px] text-gray-400 border-t pt-2" dir="ltr">
                        <span>Issue: {w.issueDate}</span>
                        <span className="font-bold text-emerald-700">Expires: {w.expiryDate}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 mt-3 border-t border-gray-100 flex items-center justify-between">
                      <button
                        onClick={() => setSelectedWarranty(w)}
                        className="text-xs font-bold text-[#033F2D] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>عرض الشهادة</span>
                      </button>

                      <div className="flex items-center gap-1.5">
                        <Link
                          href={`/warranty-verify`}
                          target="_blank"
                          title="فحص على الموقع"
                          className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleDeleteWarranty(w.code)}
                          title="حذف الشهادة"
                          className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* CREATE NEW WARRANTY MODAL */}
      {showWarrantyModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto" dir="rtl">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden my-8">
            <div className="bg-[#033F2D] text-white p-5 px-6 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#C7F268] block">إصدار وتوثيق شهادة ضمان</span>
                <h3 className="text-lg font-black text-white">إدخال كود وبيانات العميل في Firebase</h3>
              </div>
              <button
                onClick={() => setShowWarrantyModal(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveWarranty} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Code Field with Auto Generate */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-[#033F2D]">كود الضمان الإلكتروني (فريد) *</label>
                    <button
                      type="button"
                      onClick={generateNewWarrantyCode}
                      className="text-[11px] text-emerald-700 font-bold hover:underline cursor-pointer"
                    >
                      توليد كود تلقائي
                    </button>
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="مثال: STC-2026-8841"
                    value={warrantyFormData.code}
                    onChange={(e) => setWarrantyFormData({ ...warrantyFormData, code: e.target.value.toUpperCase() })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-mono font-bold uppercase focus:border-[#033F2D] outline-none"
                    dir="ltr"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-xs font-bold text-[#033F2D] mb-1">حالة الضمان *</label>
                  <select
                    value={warrantyFormData.status}
                    onChange={(e) => setWarrantyFormData({ ...warrantyFormData, status: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-bold focus:border-[#033F2D] outline-none bg-white"
                  >
                    <option value="active">ساري ومعتمد (Active)</option>
                    <option value="pending">معلق / قيد المراجعة (Pending)</option>
                    <option value="expired">منتهي الصلاحية (Expired)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Customer Name */}
                <div>
                  <label className="block text-xs font-bold text-[#033F2D] mb-1">اسم العميل بالكامل *</label>
                  <input
                    type="text"
                    required
                    placeholder="أدخل اسم العميل..."
                    value={warrantyFormData.customerName}
                    onChange={(e) => setWarrantyFormData({ ...warrantyFormData, customerName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#033F2D] outline-none"
                  />
                </div>

                {/* Customer Phone */}
                <div>
                  <label className="block text-xs font-bold text-[#033F2D] mb-1">رقم الهاتف للتواصل</label>
                  <input
                    type="tel"
                    placeholder="010XXXXXXXX"
                    value={warrantyFormData.customerPhone}
                    onChange={(e) => setWarrantyFormData({ ...warrantyFormData, customerPhone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#033F2D] outline-none"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Service Type */}
              <div>
                <label className="block text-xs font-bold text-[#033F2D] mb-1">نوع الخدمة المنفذة *</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: مكافحة صراصير المطابخ بالجل الألماني الفائق"
                  value={warrantyFormData.serviceType}
                  onChange={(e) => setWarrantyFormData({ ...warrantyFormData, serviceType: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#033F2D] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Property Address */}
                <div>
                  <label className="block text-xs font-bold text-[#033F2D] mb-1">عنوان الموقع / الوحدة *</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: فيلا 18 - الحي الدبلوماسي - الشيخ زايد"
                    value={warrantyFormData.propertyAddress}
                    onChange={(e) => setWarrantyFormData({ ...warrantyFormData, propertyAddress: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#033F2D] outline-none"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-xs font-bold text-[#033F2D] mb-1">المدينة / المحافظة</label>
                  <input
                    type="text"
                    placeholder="القاهرة / الجيزة / الإسكندرية..."
                    value={warrantyFormData.city}
                    onChange={(e) => setWarrantyFormData({ ...warrantyFormData, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#033F2D] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Issue Date */}
                <div>
                  <label className="block text-xs font-bold text-[#033F2D] mb-1">تاريخ الإصدار</label>
                  <input
                    type="date"
                    required
                    value={warrantyFormData.issueDate}
                    onChange={(e) => setWarrantyFormData({ ...warrantyFormData, issueDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#033F2D] outline-none"
                  />
                </div>

                {/* Duration in Years */}
                <div>
                  <label className="block text-xs font-bold text-[#033F2D] mb-1">مدة الضمان (بالسنوات)</label>
                  <select
                    value={warrantyFormData.durationYears}
                    onChange={(e) => setWarrantyFormData({ ...warrantyFormData, durationYears: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-bold focus:border-[#033F2D] outline-none bg-white"
                  >
                    <option value={1}>سنة واحدة (1 Year)</option>
                    <option value={2}>سنتان (2 Years)</option>
                    <option value={3}>3 سنوات (3 Years)</option>
                    <option value={5}>5 سنوات (5 Years)</option>
                    <option value={10}>10 سنوات (10 Years)</option>
                  </select>
                </div>

                {/* Technician Name */}
                <div>
                  <label className="block text-xs font-bold text-[#033F2D] mb-1">الفني / المهندس المسؤول</label>
                  <input
                    type="text"
                    placeholder="اسم المهندس المشرف..."
                    value={warrantyFormData.technicianName}
                    onChange={(e) => setWarrantyFormData({ ...warrantyFormData, technicianName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#033F2D] outline-none"
                  />
                </div>
              </div>

              {/* Pesticide & Safety Details */}
              <div>
                <label className="block text-xs font-bold text-[#033F2D] mb-1">تفاصيل المبيدات والمواد المستخدمة</label>
                <input
                  type="text"
                  placeholder="مركبات معتمدة من وزارة الصحة المصرية بدون روائح..."
                  value={warrantyFormData.pesticideDetails}
                  onChange={(e) => setWarrantyFormData({ ...warrantyFormData, pesticideDetails: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#033F2D] outline-none"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold text-[#033F2D] mb-1">ملاحظات وشروط الضمان</label>
                <textarea
                  rows={2}
                  placeholder="تعليمات المتابعة والوقاية الدورية..."
                  value={warrantyFormData.notes}
                  onChange={(e) => setWarrantyFormData({ ...warrantyFormData, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#033F2D] outline-none resize-none"
                />
              </div>

              <div className="pt-4 border-t flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowWarrantyModal(false)}
                  className="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={savingWarranty}
                  className="px-6 py-2.5 rounded-xl bg-[#033F2D] hover:bg-[#055c42] text-[#C7F268] font-black text-sm shadow-md cursor-pointer flex items-center gap-2"
                >
                  {savingWarranty ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>جاري الحفظ في Firebase...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>حفظ وإصدار الضمان</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SELECTED BOOKING DETAIL MODAL */}
      {selectedBooking && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" dir="rtl">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="bg-[#033F2D] text-white p-5 flex items-center justify-between">
              <h3 className="text-base font-black">تفاصيل طلب حجز الخدمة</h3>
              <button
                onClick={() => setSelectedBooking(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4 text-sm">
              <div className="p-4 rounded-2xl bg-gray-50 border space-y-2">
                <p>
                  <strong className="text-gray-500">اسم العميل:</strong>{' '}
                  <span className="font-bold text-[#033F2D]">{selectedBooking.name}</span>
                </p>
                <p>
                  <strong className="text-gray-500">رقم الهاتف:</strong>{' '}
                  <a href={`tel:${selectedBooking.phone}`} className="font-bold text-emerald-700 underline" dir="ltr">
                    {selectedBooking.phone}
                  </a>
                </p>
                <p>
                  <strong className="text-gray-500">الخدمة المطلوبة:</strong>{' '}
                  <span className="font-bold">{selectedBooking.service}</span>
                </p>
                <p>
                  <strong className="text-gray-500">المنطقة / المحافظة:</strong>{' '}
                  <span>{selectedBooking.area || 'غير محدد'}</span>
                </p>
                <p>
                  <strong className="text-gray-500">مصدر الطلب:</strong>{' '}
                  <span className="text-xs bg-gray-200 px-2 py-0.5 rounded">{selectedBooking.source || 'Website'}</span>
                </p>
                <p>
                  <strong className="text-gray-500">تاريخ الطلب:</strong>{' '}
                  <span className="text-xs" dir="ltr">{selectedBooking.createdAt}</span>
                </p>
              </div>

              {selectedBooking.notes && (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                  <strong>ملاحظات العميل:</strong> {selectedBooking.notes}
                </div>
              )}

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={() => {
                    handleConvertBookingToWarranty(selectedBooking);
                    setSelectedBooking(null);
                  }}
                  className="w-full sm:w-auto bg-[#033F2D] text-[#C7F268] px-4 py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>تحويل إلى شهادة ضمان</span>
                </button>

                <a
                  href={`https://wa.me/2${selectedBooking.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto bg-[#25D366] text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-4 h-4" />
                  <span>فتح محادثة واتساب</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SELECTED WARRANTY DETAIL MODAL */}
      {selectedWarranty && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" dir="rtl">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border-2 border-emerald-500 overflow-hidden">
            <div className="bg-[#033F2D] text-white p-5 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-[#C7F268]">{selectedWarranty.code}</span>
                <h3 className="text-base font-black">شهادة ضمان إلكترونية موثقة</h3>
              </div>
              <button
                onClick={() => setSelectedWarranty(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4 text-sm">
              <div className="p-4 rounded-2xl bg-[#F6F8F5] border space-y-2">
                <p>
                  <strong className="text-gray-500">اسم العميل:</strong>{' '}
                  <span className="font-bold text-[#033F2D]">{selectedWarranty.customerName}</span>
                </p>
                {selectedWarranty.customerPhone && (
                  <p>
                    <strong className="text-gray-500">الهاتف:</strong>{' '}
                    <span className="font-bold text-gray-800" dir="ltr">{selectedWarranty.customerPhone}</span>
                  </p>
                )}
                <p>
                  <strong className="text-gray-500">الخدمة:</strong>{' '}
                  <span className="font-bold">{selectedWarranty.serviceType}</span>
                </p>
                <p>
                  <strong className="text-gray-500">العنوان:</strong>{' '}
                  <span>{selectedWarranty.propertyAddress}</span>
                </p>
                <p>
                  <strong className="text-gray-500">فترة الضمان:</strong>{' '}
                  <span className="font-bold text-emerald-800" dir="ltr">{selectedWarranty.issueDate} ➔ {selectedWarranty.expiryDate} ({selectedWarranty.durationYears || 3} سنوات)</span>
                </p>
                <p>
                  <strong className="text-gray-500">المبيدات المستخدمة:</strong>{' '}
                  <span className="text-xs text-gray-700">{selectedWarranty.pesticideDetails || 'مركبات ألمانية معتمدة بدون روائح'}</span>
                </p>
                <p>
                  <strong className="text-gray-500">المهندس المسؤول:</strong>{' '}
                  <span>{selectedWarranty.technicianName || 'المركز الفني المتخصص'}</span>
                </p>
              </div>

              {selectedWarranty.notes && (
                <div className="p-3 rounded-xl bg-gray-50 border text-xs text-gray-600">
                  <strong>ملاحظات:</strong> {selectedWarranty.notes}
                </div>
              )}

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-700">
                  ✓ مسجلة رسمياً في قاعدة بيانات Firestore
                </span>
                <Link
                  href={`/warranty-verify`}
                  target="_blank"
                  className="bg-[#033F2D] text-[#C7F268] px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>فحص بالصفحة العامة</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
