'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import {
  UtensilsCrossed,
  Bed,
  Trees,
  Droplets,
  Flower2,
  Boxes,
  Dot,
  Minus,
  Maximize2,
  Maximize,
  Palette,
  Zap,
  Moon,
  GitCommit,
  Layers,
  Wind,
  Flame,
  Sparkles,
  AlertTriangle,
  AlertCircle,
  Scissors,
  Eye,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Phone,
  Calendar,
  ShieldCheck,
  Search,
  UploadCloud,
  FileCheck,
  Bug,
} from 'lucide-react';
import {
  QuizAnswers,
  diagnosePest,
  MatchResult,
  PestInfo,
} from '@/lib/pestData';
import BookingModal from './BookingModal';
import { useLanguage } from '@/lib/i18n';

const iconMap: Record<string, any> = {
  UtensilsCrossed,
  Bed,
  Trees,
  Droplets,
  Flower2,
  Boxes,
  Dot,
  Minus,
  Maximize2,
  Maximize,
  Palette,
  Zap,
  Moon,
  GitCommit,
  Layers,
  Wind,
  Flame,
  Sparkles,
  AlertTriangle,
  AlertCircle,
  Scissors,
  Eye,
};

export default function PestIdentifierTool() {
  const { t, company, pestData, isRTL, locale } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [results, setResults] = useState<MatchResult[] | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedPestForBooking, setSelectedPestForBooking] = useState<PestInfo | null>(null);
  const [activeTab, setActiveTab] = useState<'wizard' | 'encyclopedia' | 'photoUpload'>('wizard');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadSubmitted, setUploadSubmitted] = useState(false);
  const [userPhone, setUserPhone] = useState('');
  const [userName, setUserName] = useState('');

  const questions = pestData.questions;
  const pestDatabase = pestData.database;

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentStep];

  const handleSelectOption = (questionId: string, value: string) => {
    const updatedAnswers = { ...answers, [questionId]: value };
    setAnswers(updatedAnswers);

    if (currentStep < totalQuestions - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate results with localized reasons
      const calculated = diagnosePest(updatedAnswers, locale);
      setResults(calculated);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
    setResults(null);
  };

  const handleOpenBookingForPest = (pest: PestInfo) => {
    setSelectedPestForBooking(pest);
    setBookingOpen(true);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUploadSubmitted(true);
    // Open WhatsApp with direct pre-filled prompt
    const msg =
      locale === 'en'
        ? `Hello, I am ${userName} (Phone: ${userPhone}). I have attached a pest photo for immediate identification.`
        : `مرحباً، أنا ${userName} (رقم الهاتف: ${userPhone}). أرسل لكم صورة حشرة لفحصها وتشخيصها مجاناً.`;
    setTimeout(() => {
      window.open(`${company.whatsappUrl}?text=${encodeURIComponent(msg)}`, '_blank');
    }, 1000);
  };

  // Filtered encyclopedia pests
  const filteredEncyclopedia = pestDatabase.filter((pest) => {
    const matchesCat =
      selectedCategory === 'all' ||
      pest.categoryKey === selectedCategory ||
      pest.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      pest.nameAr.includes(searchQuery) ||
      pest.nameEn.toLowerCase().includes(q) ||
      pest.scientificName.toLowerCase().includes(q) ||
      pest.shortDesc.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const topMatch = results ? results[0] : null;
  const otherMatches = results ? results.slice(1, 4) : [];

  const encyclopediaCategories =
    locale === 'en'
      ? [
          { id: 'all', label: 'All Pests' },
          { id: 'زواحف', label: 'Crawling Pests' },
          { id: 'طائرات', label: 'Flying Pests' },
          { id: 'قوارض', label: 'Rodents & Mice' },
          { id: 'هياكل وخشب', label: 'Termites & Wood' },
          { id: 'أثاث وفراش', label: 'Bed Bugs & Furniture' },
        ]
      : [
          { id: 'all', label: 'كافة الآفات' },
          { id: 'زواحف', label: 'الحشرات الزاحفة' },
          { id: 'طائرات', label: 'الحشرات الطائرة' },
          { id: 'قوارض', label: 'القوارض والفئران' },
          { id: 'هياكل وخشب', label: 'النمل الأبيض وآفات الخشب' },
          { id: 'أثاث وفراش', label: 'بق الفراش والمفروشات' },
        ];

  return (
    <div className={`w-full ${isRTL ? 'text-right' : 'text-left'}`}>
      {/* Tab switchers */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
        <button
          onClick={() => setActiveTab('wizard')}
          className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer ${
            activeTab === 'wizard'
              ? 'bg-[#033F2D] text-[#C7F268] shadow-lg scale-105'
              : 'bg-white text-[#033F2D] border border-gray-200 hover:bg-gray-50'
          }`}
        >
          <Bug className="w-4 h-4" />
          <span>{t.pestTabQuiz}</span>
        </button>

        <button
          onClick={() => setActiveTab('encyclopedia')}
          className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer ${
            activeTab === 'encyclopedia'
              ? 'bg-[#033F2D] text-[#C7F268] shadow-lg scale-105'
              : 'bg-white text-[#033F2D] border border-gray-200 hover:bg-gray-50'
          }`}
        >
          <Search className="w-4 h-4" />
          <span>{t.pestTabEncyclopedia}</span>
        </button>

        <button
          onClick={() => setActiveTab('photoUpload')}
          className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer ${
            activeTab === 'photoUpload'
              ? 'bg-[#033F2D] text-[#C7F268] shadow-lg scale-105'
              : 'bg-white text-[#033F2D] border border-gray-200 hover:bg-gray-50'
          }`}
        >
          <UploadCloud className="w-4 h-4" />
          <span>{t.pestTabPhoto}</span>
        </button>
      </div>

      {/* TAB 1: INTERACTIVE WIZARD */}
      {activeTab === 'wizard' && (
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-72 h-72 bg-[#C7F268]/20 rounded-full blur-3xl pointer-events-none" />

          {!results ? (
            /* STEP QUESTIONS VIEW */
            <div>
              {/* Header with Progress */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3 text-xs font-bold text-gray-500">
                  <span className="flex items-center gap-1 text-[#033F2D]">
                    <span className="w-2 h-2 rounded-full bg-[#C7F268]" />
                    <span>
                      {locale === 'en'
                        ? `Question ${currentStep + 1} of ${totalQuestions}`
                        : `السؤال ${currentStep + 1} من ${totalQuestions}`}
                    </span>
                  </span>
                  <span>
                    {Math.round(((currentStep + 1) / totalQuestions) * 100)}%{' '}
                    {locale === 'en' ? 'Complete' : 'مكتمل'}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                  <motion.div
                    className="bg-[#033F2D] h-full rounded-full transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / totalQuestions) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Title & Prompt */}
              <div className={`mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
                <span className="inline-block px-3 py-1 bg-[#C7F268]/30 text-[#033F2D] text-xs font-extrabold rounded-full mb-2">
                  {locale === 'en' ? 'Interactive Instant Diagnosis' : 'تشخيص تفاعلي فوري'}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#033F2D] mb-2 leading-tight">
                  {currentQuestion?.title}
                </h3>
                <p className="text-gray-600 text-sm">{currentQuestion?.subtitle}</p>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {currentQuestion?.options.map((option) => {
                  const IconComp = iconMap[option.icon] || Bug;
                  const isSelected = answers[currentQuestion.id as keyof QuizAnswers] === option.value;

                  return (
                    <motion.button
                      key={option.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelectOption(currentQuestion.id, option.value)}
                      className={`flex items-start gap-4 p-5 rounded-2xl ${
                        isRTL ? 'text-right' : 'text-left'
                      } transition-all duration-200 cursor-pointer border ${
                        isSelected
                          ? 'bg-[#033F2D] text-white border-[#033F2D] shadow-lg ring-2 ring-[#C7F268]'
                          : 'bg-[#F4F6F4]/50 hover:bg-[#F4F6F4] text-[#033F2D] border-gray-200 hover:border-[#033F2D]/30'
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-[#C7F268] text-[#033F2D]'
                            : 'bg-white text-[#033F2D] shadow-sm border border-gray-100'
                        }`}
                      >
                        <IconComp className="w-6 h-6 stroke-[2]" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`font-bold text-base leading-snug ${
                              isSelected ? 'text-white' : 'text-[#033F2D]'
                            }`}
                          >
                            {option.label}
                          </span>
                          {option.badge && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#C7F268] text-[#033F2D] font-black shrink-0">
                              {option.badge}
                            </span>
                          )}
                        </div>
                        <p
                          className={`text-xs mt-1 leading-relaxed ${
                            isSelected ? 'text-white/80' : 'text-gray-500'
                          }`}
                        >
                          {option.desc}
                        </p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Navigation Back / Reset Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t.pestResetBtn}</span>
                </button>

                {currentStep > 0 && (
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#033F2D] text-xs font-bold transition-colors cursor-pointer"
                  >
                    {isRTL ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
                    <span>{t.pestPrevQuestionBtn}</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* RESULTS VIEW */
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-10"
              >
                {/* Result Top Alert */}
                <div className="bg-[#033F2D] text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 left-0 w-64 h-64 bg-[#C7F268]/15 rounded-full blur-3xl pointer-events-none" />

                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#C7F268] text-[#033F2D] flex items-center justify-center font-black text-xl">
                        <FileCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs uppercase tracking-wider text-[#C7F268] font-bold">
                          {t.pestResultReportBadge}
                        </span>
                        <h4 className="text-xl sm:text-2xl font-black text-white">
                          {t.pestResultTitle}
                        </h4>
                      </div>
                    </div>

                    <button
                      onClick={handleReset}
                      className="flex items-center gap-1.5 text-xs font-bold text-white/80 hover:text-[#C7F268] bg-white/10 hover:bg-white/20 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{t.pestRetakeQuizBtn}</span>
                    </button>
                  </div>

                  {/* Primary Pest Result Card */}
                  {topMatch && (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                      <div className="md:col-span-4 relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg border border-white/20">
                        <Image
                          src={topMatch.pest.image}
                          alt={locale === 'en' ? topMatch.pest.nameEn : topMatch.pest.nameAr}
                          fill
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div
                          className={`absolute top-2.5 ${
                            isRTL ? 'right-2.5' : 'left-2.5'
                          } px-2.5 py-0.5 rounded-full bg-[#C7F268] text-[#033F2D] text-xs font-black shadow-md`}
                        >
                          {locale === 'en' ? `${topMatch.score}% Match` : `تطابق ${topMatch.score}%`}
                        </div>
                      </div>

                      <div className="md:col-span-8 space-y-4">
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="text-xs font-bold text-[#C7F268] uppercase">
                              {topMatch.pest.category}
                            </span>
                            <span className="text-white/40">•</span>
                            <span className="text-xs text-white/70 italic">
                              {topMatch.pest.scientificName}
                            </span>
                          </div>
                          <h3 className="text-2xl font-black text-white">
                            {locale === 'en' ? topMatch.pest.nameEn : topMatch.pest.nameAr}
                          </h3>
                        </div>

                        <p className="text-white/80 text-sm leading-relaxed">
                          {topMatch.pest.shortDesc}
                        </p>

                        {/* Match Reasons */}
                        <div className="bg-black/20 p-3.5 rounded-xl border border-white/10 space-y-1.5">
                          <span className="text-xs font-bold text-[#C7F268] block">
                            {t.pestMatchReasons}:
                          </span>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-white/90">
                            {topMatch.reasons.map((r, idx) => (
                              <li key={idx} className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#C7F268]" />
                                <span>{r}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-wrap items-center gap-3 pt-2">
                          <button
                            onClick={() => handleOpenBookingForPest(topMatch.pest)}
                            className="bg-[#C7F268] hover:bg-[#b5e050] text-[#033F2D] py-3 px-6 rounded-xl text-sm font-bold flex-1 sm:flex-initial text-center justify-center cursor-pointer transition-transform hover:scale-[1.02] shadow-md inline-flex items-center gap-2"
                          >
                            <Calendar className="w-4 h-4" />
                            <span>{t.pestBookInspectionForThis}</span>
                          </button>

                          <a
                            href={company.phonePrimaryRaw}
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-colors cursor-pointer"
                            dir="ltr"
                          >
                            <Phone className="w-4 h-4" />
                            <span>{company.phonePrimary}</span>
                          </a>

                          <a
                            href={company.whatsappUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm transition-colors cursor-pointer"
                          >
                            <span>{t.whatsappNow}</span>
                          </a>

                          <Link
                            href={`/services/${topMatch.pest.recommendedServiceSlug}`}
                            className="text-xs font-bold text-[#C7F268] hover:underline px-3 py-2"
                          >
                            {locale === 'en' ? 'View Recommended Service' : 'تفاصيل الخدمة المقترحة'}
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Practical Advice Grid */}
                {topMatch && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* First Aid / DIY steps */}
                    <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-6 space-y-4">
                      <div className="flex items-center gap-2.5 text-emerald-800">
                        <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                        <h4 className="text-base font-black">
                          {t.pestAdviceTitle}
                        </h4>
                      </div>
                      <ul className="space-y-2.5 text-xs sm:text-sm text-emerald-950">
                        {topMatch.pest.diyAdvice.map((advice, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{advice}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Common Mistakes to Avoid */}
                    <div className="bg-red-50/70 border border-red-200 rounded-2xl p-6 space-y-4">
                      <div className="flex items-center gap-2.5 text-red-800">
                        <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center">
                          <AlertTriangle className="w-5 h-5" />
                        </div>
                        <h4 className="text-base font-black">
                          {t.pestMistakesTitle}
                        </h4>
                      </div>
                      <ul className="space-y-2.5 text-xs sm:text-sm text-red-950">
                        {topMatch.pest.mistakesToAvoid.map((mistake, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500 shrink-0 mt-1.5" />
                            <span>{mistake}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Other possibilities */}
                {otherMatches.length > 0 && (
                  <div className="pt-6 border-t border-gray-100">
                    <h4 className="text-lg font-black text-[#033F2D] mb-4">
                      {locale === 'en'
                        ? 'Other potential matching pests:'
                        : 'احتمالات أخرى متقاربة قد ترغب في مراجعتها:'}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {otherMatches.map((item) => (
                        <div
                          key={item.pest.id}
                          className="bg-[#F4F6F4]/60 rounded-2xl p-4 border border-gray-200 flex flex-col justify-between"
                        >
                          <div>
                            <div className="relative h-32 w-full rounded-xl overflow-hidden mb-3">
                              <Image
                                src={item.pest.image}
                                alt={locale === 'en' ? item.pest.nameEn : item.pest.nameAr}
                                fill
                                className="object-cover"
                                referrerPolicy="no-referrer"
                              />
                              <span
                                className={`absolute top-2 ${
                                  isRTL ? 'right-2' : 'left-2'
                                } px-2 py-0.5 bg-[#033F2D]/80 text-[#C7F268] text-[10px] font-bold rounded-md`}
                              >
                                {locale === 'en' ? `${item.score}% Match` : `تطابق ${item.score}%`}
                              </span>
                            </div>
                            <h5 className="font-bold text-[#033F2D] text-sm mb-1">
                              {locale === 'en' ? item.pest.nameEn : item.pest.nameAr}
                            </h5>
                            <p className="text-xs text-gray-500 line-clamp-2 mb-3">
                              {item.pest.shortDesc}
                            </p>
                          </div>

                          <button
                            onClick={() => handleOpenBookingForPest(item.pest)}
                            className="w-full py-2 px-3 rounded-lg bg-white border border-gray-200 hover:bg-[#C7F268]/30 hover:border-[#C7F268] text-[#033F2D] text-xs font-bold transition-colors cursor-pointer text-center"
                          >
                            {locale === 'en' ? 'Book Inspection' : 'طلب فحص لهذه الحشرة'}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      )}

      {/* TAB 2: FULL PEST ENCYCLOPEDIA & CATALOG */}
      {activeTab === 'encyclopedia' && (
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-2xl font-extrabold text-[#033F2D]">
                {locale === 'en'
                  ? 'Residential & Commercial Pest Encyclopedia'
                  : 'دليل وموسوعة الآفات المنزلية والتجارية'}
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                {locale === 'en'
                  ? 'Browse common species, their behaviors, and safe eradication procedures'
                  : 'تصفح كافة الفصائل الشائعة، دورات حياتها، وأفضل الطرق لمكافحتها'}
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search
                className={`w-4 h-4 text-gray-400 absolute ${
                  isRTL ? 'right-3.5' : 'left-3.5'
                } top-3.5`}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  locale === 'en'
                    ? 'Search by name or symptom...'
                    : 'ابحث بالاسم أو الأعراض...'
                }
                className={`w-full bg-[#F4F6F4] text-sm ${
                  isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4 text-left'
                } py-2.5 rounded-full border border-gray-200 focus:outline-none focus:border-[#033F2D]`}
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {encyclopediaCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#033F2D] text-[#C7F268]'
                    : 'bg-[#F4F6F4] text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Pest Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEncyclopedia.map((pest) => (
              <div
                key={pest.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 w-full">
                    <Image
                      src={pest.image}
                      alt={locale === 'en' ? pest.nameEn : pest.nameAr}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div
                      className={`absolute top-3 ${
                        isRTL ? 'right-3' : 'left-3'
                      } px-2.5 py-1 rounded-md bg-[#033F2D]/80 text-[#C7F268] text-xs font-black backdrop-blur-sm`}
                    >
                      {pest.category}
                    </div>
                    <div
                      className={`absolute bottom-3 ${
                        isRTL ? 'right-3' : 'left-3'
                      }`}
                    >
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-bold ${pest.riskColor} border`}
                      >
                        {pest.riskLevel}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div>
                      <h4 className="text-lg font-bold text-[#033F2D]">
                        {locale === 'en' ? pest.nameEn : pest.nameAr}
                      </h4>
                      <p className="text-xs text-gray-500 italic">{pest.scientificName}</p>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">{pest.shortDesc}</p>

                    <div className="space-y-1.5 text-xs text-gray-700">
                      <span className="font-bold text-[#033F2D] block">
                        {locale === 'en' ? 'Identifying Traits:' : 'العلامات الدالة:'}
                      </span>
                      {pest.matchedTraits.map((trait, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-[11px]">
                          <span className="w-1 h-1 rounded-full bg-[#033F2D]" />
                          <span>{trait}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => handleOpenBookingForPest(pest)}
                    className="w-full bg-[#033F2D] hover:bg-[#022A1E] text-white py-2.5 px-4 rounded-xl text-xs font-bold text-center justify-center cursor-pointer transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>{t.pestBookInspectionForThis}</span>
                    {isRTL ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PHOTO UPLOAD FOR EXPERT VERIFICATION */}
      {activeTab === 'photoUpload' && (
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-10 max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[#033F2D] text-[#C7F268] flex items-center justify-center mx-auto mb-4">
              <UploadCloud className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-extrabold text-[#033F2D]">
              {locale === 'en'
                ? 'Send Pest Photo to Field Technical Specialist'
                : 'أرسل صورة الحشرة أو آثارها لأخصائي المركز الفني'}
            </h3>
            <p className="text-gray-600 text-sm mt-2 max-w-md mx-auto leading-relaxed">
              {locale === 'en'
                ? 'If you are unsure of the pest type, snap a clear photo and our certified specialists will diagnose it via WhatsApp immediately for free.'
                : 'إذا لم تكن متأكداً من نوع الآفة، التقط صورة واضحة من هاتفك وسيقوم فنيو المكافحة المتخصصون لدينا بالرد عليك فوراً مجاناً.'}
            </p>
          </div>

          {!uploadSubmitted ? (
            <form onSubmit={handleUploadSubmit} className="space-y-5">
              {/* Image drop area */}
              <div className="border-2 border-dashed border-gray-300 hover:border-[#033F2D] rounded-2xl p-6 text-center transition-colors relative cursor-pointer bg-[#F4F6F4]/50">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  required={!uploadedImage}
                />
                {uploadedImage ? (
                  <div className="space-y-3">
                    <div className="relative h-48 w-full max-w-xs mx-auto rounded-xl overflow-hidden shadow-md">
                      <Image
                        src={uploadedImage}
                        alt="Uploaded pest photo"
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="text-xs text-emerald-700 font-bold block">
                      {locale === 'en'
                        ? 'Photo selected successfully! Click to change.'
                        : 'تم اختيار الصورة بنجاح! انقر لتغييرها.'}
                    </span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <UploadCloud className="w-10 h-10 text-gray-400 mx-auto" />
                    <p className="text-sm font-bold text-[#033F2D]">
                      {locale === 'en'
                        ? 'Click here to choose a photo from your device'
                        : 'انقر هنا لاختيار صورة من هاتفك أو جهازك'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {locale === 'en'
                        ? 'Supports JPG, PNG or live camera captures'
                        : 'يدعم صور JPG, PNG أو اللقطات المباشرة بالكاميرا'}
                    </p>
                  </div>
                )}
              </div>

              {/* Name and Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#033F2D] mb-1.5">
                    {locale === 'en' ? 'Your Name:' : 'الاسم الكريم:'}
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder={locale === 'en' ? 'John Doe' : 'مثال: محمد علي'}
                    required
                    className={`w-full bg-[#F4F6F4] text-sm px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#033F2D] ${
                      isRTL ? 'text-right' : 'text-left'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#033F2D] mb-1.5">
                    {locale === 'en' ? 'Phone Number:' : 'رقم الهاتف:'}
                  </label>
                  <input
                    type="tel"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    placeholder="010XXXXXXXX"
                    required
                    dir="ltr"
                    className="w-full bg-[#F4F6F4] text-sm px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#033F2D] text-left"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#C7F268] hover:bg-[#b5e050] text-[#033F2D] py-4 rounded-xl text-base font-bold text-center justify-center cursor-pointer shadow-lg inline-flex items-center gap-2 transition-all hover:scale-[1.01]"
              >
                <span>
                  {locale === 'en'
                    ? 'Submit Photo for Direct Free WhatsApp Diagnosis'
                    : 'إرسال الصورة للتشخيص المجاني المباشر'}
                </span>
                {isRTL ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
              </button>
            </form>
          ) : (
            <div className="text-center py-8 space-y-4 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-black text-[#033F2D]">
                {locale === 'en'
                  ? 'Photo Received & Connecting to WhatsApp!'
                  : 'تم استلام صورتك وجارٍ ربطك بالواتساب!'}
              </h4>
              <p className="text-sm text-gray-600 max-w-sm mx-auto leading-relaxed">
                {locale === 'en'
                  ? `Thank you, ${userName || 'valued customer'}. Our technician is analyzing your submission and will provide your free diagnosis on (${userPhone}).`
                  : `شكراً لك يا ${userName || 'عميلنا العزيز'}. يقوم أخصائي الفحص الميداني لدينا بفحص الصورة الآن وسيتواصل معك على الرقم (${userPhone}) لإعطائك التشخيص الدقيق مجاناً.`}
              </p>
              <button
                onClick={() => {
                  setUploadSubmitted(false);
                  setUploadedImage(null);
                }}
                className="px-6 py-2.5 rounded-full bg-gray-100 text-[#033F2D] text-xs font-bold hover:bg-gray-200 transition-colors cursor-pointer"
              >
                {locale === 'en' ? 'Send another photo' : 'إرسال صورة أخرى'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Booking Modal Popup */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialService={selectedPestForBooking?.recommendedServiceName}
      />
    </div>
  );
}
