import React, { useRef, useState } from 'react';

export default function VideoSection() {
  const videoRef = useRef(null);
  const [hasError, setHasError] = useState(false);

  const MAX_LOOP_SECONDS = 10;
  const PLAYBACK_SPEED = 0.75;

  const applySpeed = () => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = PLAYBACK_SPEED;
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.currentTime >= MAX_LOOP_SECONDS) {
      video.currentTime = 0;
      video.playbackRate = PLAYBACK_SPEED;
      video.play().catch(() => {});
    }
  };

  return (
    <section
      id="activities"
      className="relative w-full py-10 px-4 sm:px-8 lg:px-14 bg-navy select-none pointer-events-none"
    >
      <div className="max-w-6xl mx-auto">
        <div className="relative w-full aspect-video max-h-[82vh] rounded-3xl overflow-hidden bg-black shadow-2xl border border-white/10 flex items-center justify-center">
          <video
            ref={videoRef}
            src="/videos/presentation.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onLoadedMetadata={applySpeed}
            onPlay={applySpeed}
            onTimeUpdate={handleTimeUpdate}
            onError={() => setHasError(true)}
            onEnded={() => {
              if (videoRef.current) {
                videoRef.current.currentTime = 0;
                videoRef.current.playbackRate = PLAYBACK_SPEED;
                videoRef.current.play().catch(() => {});
              }
            }}
            className="w-full h-full object-contain"
          />

          {hasError && (
            <div className="absolute inset-0 bg-navy flex flex-col items-center justify-center p-6 text-center text-white">
              <p className="font-montserrat font-bold text-base text-energeticOrange">
                Vidéo introuvable : /videos/presentation.mp4
              </p>
              <p className="text-xs text-slate-300 mt-1">
                Vérifie le fichier dans public/videos/presentation.mp4
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}