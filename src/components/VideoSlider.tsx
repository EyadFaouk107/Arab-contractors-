import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Play, ExternalLink } from 'lucide-react';
import { fetchLatestVideos, YouTubeVideo } from '../services/youtubeService';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MOCK_VIDEOS: YouTubeVideo[] = [
  {
    id: 'dQw4w9WgXcQ',
    title: 'Arab Contractors - Major Projects 2024',
    thumbnail: 'https://picsum.photos/seed/arabcont1/1280/720',
    publishedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '3JZ_D3ELwOQ',
    title: 'New Administrative Capital - Iconic Tower Construction',
    thumbnail: 'https://picsum.photos/seed/arabcont2/1280/720',
    publishedAt: '2024-02-01T00:00:00Z',
  },
  {
    id: 'L_jWHffIx5E',
    title: 'Infrastructure Development in Africa',
    thumbnail: 'https://picsum.photos/seed/arabcont3/1280/720',
    publishedAt: '2024-03-01T00:00:00Z',
  },
];

export const VideoSlider: React.FC = () => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  useEffect(() => {
    const loadVideos = async () => {
      setLoading(true);
      try {
        const fetchedVideos = await fetchLatestVideos(7);
        if (fetchedVideos.length > 0) {
          setVideos(fetchedVideos);
        } else {
          // Fallback to mock if API key is missing or failed
          setVideos(MOCK_VIDEOS);
        }
      } catch (err) {
        console.error('Failed to load videos:', err);
        setVideos(MOCK_VIDEOS);
        setError('Using example data (API key missing or error)');
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, []);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  }, [videos.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  }, [videos.length]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[400px] bg-zinc-900 rounded-2xl">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="flex items-center justify-center h-[400px] bg-zinc-900 rounded-2xl text-white">
        No videos found.
      </div>
    );
  }

  const currentVideo = videos[currentIndex];

  return (
    <div className="relative w-full max-w-5xl mx-auto overflow-hidden group">
      {/* Error/Info Banner */}
      {error && (
        <div className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur-md text-zinc-300 px-3 py-1 rounded-full text-xs border border-white/10">
          {error}
        </div>
      )}

      {/* Main Slider Container */}
      <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/5">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Thumbnail Overlay */}
            <div className="relative w-full h-full">
              <img
                src={currentVideo.thumbnail}
                alt={currentVideo.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              {/* Video Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
                <motion.h3 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl md:text-3xl font-bold mb-2 line-clamp-2"
                >
                  {currentVideo.title}
                </motion.h3>
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-4"
                >
                  <a
                    href={`https://www.youtube.com/watch?v=${currentVideo.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-full font-semibold transition-all hover:scale-105 active:scale-95"
                  >
                    <Play className="w-5 h-5 fill-current" />
                    Watch Now
                  </a>
                  <span className="text-zinc-400 text-sm">
                    {new Date(currentVideo.publishedAt).toLocaleDateString()}
                  </span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm border border-white/10 transition-all opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
          aria-label="Previous video"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm border border-white/10 transition-all opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
          aria-label="Next video"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center gap-2 mt-6">
        {videos.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1);
              setCurrentIndex(idx);
            }}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              currentIndex === idx 
                ? "bg-emerald-500 w-8" 
                : "bg-zinc-700 hover:bg-zinc-500"
            )}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
