import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Maximize, LayoutList } from 'lucide-react';
import { Slide } from '../types';

interface SlideDeckProps {
  slides: Slide[];
}

export default function SlideDeck({ slides }: SlideDeckProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showOverview, setShowOverview] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'Escape') setShowOverview(false);
      if (e.key === 'o') setShowOverview(!showOverview);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, showOverview]);

  const currentSlide = slides[currentSlideIndex];
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#050505] text-white selection:bg-orange-500/30 noise-bg">
      {/* Laser Pointer Effect */}
      <motion.div
        className="fixed w-4 h-4 rounded-full bg-primary/40 blur-xl pointer-events-none z-[100]"
        animate={{ x: mousePos.x - 8, y: mousePos.y - 8 }}
        transition={{ type: 'spring', damping: 20, stiffness: 200, mass: 0.5 }}
      />
      <motion.div
        className="fixed w-1.5 h-1.5 rounded-full bg-primary pointer-events-none z-[100] shadow-[0_0_10px_#FF5A1F]"
        animate={{ x: mousePos.x - 3, y: mousePos.y - 3 }}
        transition={{ type: 'spring', damping: 25, stiffness: 400, mass: 0.2 }}
      />

      {/* Navigation Controls */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-[#121212]/80 backdrop-blur-xl px-2 py-2 rounded-2xl border border-white/5 shadow-2xl">
        <button
          onClick={prevSlide}
          className="p-3 hover:bg-white/5 rounded-xl transition-all hover:text-primary active:scale-95"
          title="Previous (Left Arrow)"
        >
          <ChevronLeft size={20} />
        </button>
        
        <div className="flex gap-1 px-4">
          {slides.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 rounded-full transition-all duration-500 ${i === currentSlideIndex ? 'w-8 bg-primary' : 'w-2 bg-white/10'}`} 
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="p-3 hover:bg-white/5 rounded-xl transition-all hover:text-primary active:scale-95"
          title="Next (Right Arrow / Space)"
        >
          <ChevronRight size={20} />
        </button>
        
        <div className="w-px h-4 bg-white/10 mx-1" />
        
        <button
          onClick={() => setShowOverview(!showOverview)}
          className={`p-3 rounded-xl transition-all active:scale-95 ${showOverview ? 'bg-primary text-white' : 'hover:bg-white/5 hover:text-primary'}`}
          title="Overview (O)"
        >
          <LayoutList size={18} />
        </button>
      </div>

      {/* Overview Modal */}
      <AnimatePresence>
        {showOverview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-xl p-12 overflow-y-auto"
          >
            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => {
                    setCurrentSlideIndex(index);
                    setShowOverview(false);
                  }}
                  className={`
                    relative aspect-video rounded-xl border-2 overflow-hidden transition-all text-left group
                    ${currentSlideIndex === index ? 'border-orange-500 scale-105 z-10' : 'border-white/10 hover:border-white/30'}
                  `}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                  <div className="p-4 flex flex-col h-full justify-between">
                    <span className="text-xs font-mono opacity-40">Slide {index + 1}</span>
                    <h3 className="text-sm font-medium leading-tight group-hover:text-orange-400 transition-colors">
                      {slide.title}
                    </h3>
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowOverview(false)}
              className="fixed top-8 right-8 p-4 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            >
              <Maximize size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Slide Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.id}
          initial={{ opacity: 0, scale: 0.98, x: 10 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 1.02, x: -10 }}
          transition={{ 
            duration: 0.7, 
            ease: [0.16, 1, 0.3, 1] // easeOutExpo
          }}
          className="w-full h-full flex flex-col relative"
          style={{ backgroundColor: currentSlide.background || 'transparent' }}
        >
          {/* Decorative background element from theme */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="absolute -top-[200px] -right-[200px] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(255,90,31,0.15)_0%,rgba(13,13,13,0)_70%)] z-0 pointer-events-none" 
          />
          
          <div className="relative z-10 w-full h-full flex flex-col">
            {currentSlide.content}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress Bar */}
      <div className="fixed bottom-0 left-0 h-1 bg-white/5 w-full">
        <motion.div
          className="h-full bg-orange-500"
          initial={{ width: 0 }}
          animate={{ width: `${((currentSlideIndex + 1) / slides.length) * 100}%` }}
          transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
        />
      </div>
    </div>
  );
}
