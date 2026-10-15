'use client';

import { X, ExternalLink, Play } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
  title?: string;
}

export default function VideoModal({
  isOpen,
  onClose,
  videoUrl = 'https://www.facebook.com/share/r/1ESucCbJEJ/',
  title = 'فيديو التغطية الميدانية المباشرة - المركز الفني المتخصص لمكافحة الحشرات',
}: VideoModalProps) {
  if (!isOpen) return null;

  const isFacebook = videoUrl.includes('facebook.com') || videoUrl.includes('fb.watch') || videoUrl.includes('fb.gg');
  
  let iframeSrc = videoUrl;
  if (isFacebook) {
    iframeSrc = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(videoUrl)}&show_text=false&autoplay=true`;
  } else if (videoUrl.includes('youtube.com/watch') || videoUrl.includes('youtu.be/')) {
    if (videoUrl.includes('watch?v=')) {
      const videoId = videoUrl.split('watch?v=')[1]?.split('&')[0];
      iframeSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    } else if (videoUrl.includes('youtu.be/')) {
      const videoId = videoUrl.split('youtu.be/')[1]?.split('?')[0];
      iframeSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    }
  }

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200 text-right"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 bg-[#033F2D] text-white">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#C7F268] text-[#033F2D] flex items-center justify-center shrink-0">
              <Play className="w-4 h-4 fill-current mr-0.5" />
            </span>
            <h4 className="font-bold text-base sm:text-lg text-white leading-tight">{title}</h4>
          </div>
          
          <div className="flex items-center gap-2">
            <a
              href={videoUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors"
            >
              <span>فتح على فيسبوك</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="إغلاق"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="relative pt-[56.25%] bg-black">
          <iframe
            className="absolute inset-0 w-full h-full border-0"
            src={iframeSrc}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        <div className="p-4 bg-[#022A1E] border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-white/80">
          <span className="font-bold text-[#C7F268]">
            {isFacebook ? 'فيديو ريلز موثق من عملياتنا الميدانية عبر فيسبوك' : 'فيديو توضيحي لخدمات المكافحة'}
          </span>
          <a
            href={videoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-white hover:text-[#C7F268] font-bold underline transition-colors"
          >
            <span>مشاهدة الفيديو الأصلي على فيسبوك</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
