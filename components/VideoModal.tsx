'use client';

import { X } from 'lucide-react';
import { COMPANY_IMAGES } from '@/lib/media';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
  title?: string;
}

export default function VideoModal({
  isOpen,
  onClose,
  videoUrl = COMPANY_IMAGES.fieldCoverageVideo,
}: VideoModalProps) {
  if (!isOpen) return null;

  const isDirectVideo =
    videoUrl.includes('.mp4') ||
    videoUrl.includes('cloudinary.com') ||
    !videoUrl.includes('facebook.com');

  const isFacebook =
    videoUrl.includes('facebook.com') ||
    videoUrl.includes('fb.watch') ||
    videoUrl.includes('fb.gg');

  let iframeSrc = videoUrl;
  if (isFacebook) {
    iframeSrc = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
      videoUrl
    )}&show_text=false&autoplay=true`;
  } else if (
    videoUrl.includes('youtube.com/watch') ||
    videoUrl.includes('youtu.be/')
  ) {
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
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/92 backdrop-blur-lg p-2 sm:p-4 md:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Floating Close Button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 sm:top-5 sm:right-5 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all hover:scale-110 cursor-pointer shadow-lg border border-white/20"
        aria-label="إغلاق"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Clean Undescribed Video Player Window Container */}
      <div
        className="relative w-full max-w-4xl max-h-[85vh] bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/15 flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {isDirectVideo ? (
          <video
            src={videoUrl}
            controls
            autoPlay
            playsInline
            preload="auto"
            className="w-full h-full max-h-[85vh] object-contain rounded-2xl bg-black"
          >
            متصفحك لا يدعم تشغيل هذا الفيديو.
          </video>
        ) : (
          <div className="relative w-full aspect-video bg-black">
            <iframe
              className="absolute inset-0 w-full h-full border-0 rounded-2xl"
              src={iframeSrc}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        )}
      </div>
    </div>
  );
}
