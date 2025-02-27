import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ChevronDown, Camera, Sparkles, Zap } from 'lucide-react';
import BannerSection from '../components/BannerSection';
import Navbar from '../components/Navbar';
import { iPhoneLandingPageProps } from '../types';

const iPhoneLandingPage: React.FC<iPhoneLandingPageProps> = ({
  imagePath,
  imagePath2 = 'IphoneTras.png',
  imagePath3 = 'cameraplus.png',
  rightBanner = 'rightbanner.png',
  leftBanner = 'leftbanner.png',
  mainBanner = 'mainbanner.png'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const phoneRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress, scrollY } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });
  
  // Efeito de parallax suavizado com useSpring
  const smoothScrollYProgress = useSpring(scrollYProgress, { 
    stiffness: 100, 
    damping: 30, 
    restDelta: 0.001 
  });
  
  // Transformações aprimoradas para parallax
  const phoneY = useTransform(smoothScrollYProgress, [0, 1], [0, 300]);
  const phoneRotate = useTransform(smoothScrollYProgress, [0, 0.5, 1], [0, 15, 5]);
  const phoneScale = useTransform(smoothScrollYProgress, [0, 0.5, 1], [1, 1.2, 0.8]);
  const phoneOpacity = useTransform(smoothScrollYProgress, [0.8, 1], [1, 0.3]);
  
  // Efeito de sombra dinâmica
  const phoneShadow = useTransform(
    smoothScrollYProgress,
    [0, 0.5, 1],
    [
      '0px 20px 50px rgba(0, 0, 0, 0.4)',
      '0px 40px 80px rgba(0, 0, 0, 0.6)',
      '0px 10px 30px rgba(0, 0, 0, 0.3)'
    ]
  );
  
  // Efeito de luz/brilho
  const highlightOpacity = useTransform(
    smoothScrollYProgress,
    [0, 0.3, 0.6, 1],
    [0, 0.8, 0.2, 0]
  );
  
  // Rotação 3D
  const rotateX = useTransform(smoothScrollYProgress, [0, 0.5, 1], [0, 10, 5]);
  const rotateY = useTransform(smoothScrollYProgress, [0, 0.5, 1], [0, -15, -5]);

  // Alternância automática de imagens
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    const imageInterval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % 3);
    }, 3000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(imageInterval);
    };
  }, []);

  // Array de imagens
  const images = [imagePath, imagePath2, imagePath3];
  
  // Efeito hover para destacar recursos da câmera
  const [hoverFeature, setHoverFeature] = useState<string | null>(null);

  return (
    <div className="bg-black text-white antialiased">
      <Navbar logoPath="/apple-logo.svg" />
      
      <div 
        ref={containerRef}
        className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden py-20"
      >
        {/* Efeito de luz de fundo */}
        <motion.div
          className="absolute w-full h-full"
          style={{ 
            background: 'radial-gradient(circle at center, #333 0%, #000 70%)',
            opacity: highlightOpacity 
          }}
        />
        
        {/* Círculos de luz dinâmicos */}
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-blue-500 filter blur-3xl"
          style={{ 
            opacity: useTransform(smoothScrollYProgress, [0, 0.3, 0.6], [0, 0.15, 0]),
            x: useTransform(smoothScrollYProgress, [0, 1], [-100, 200]),
            y: useTransform(smoothScrollYProgress, [0, 1], [100, -200])
          }}
        />
        
        <motion.div
          className="absolute w-40 h-40 rounded-full bg-purple-500 filter blur-3xl"
          style={{ 
            opacity: useTransform(smoothScrollYProgress, [0, 0.3, 0.6], [0, 0.1, 0]),
            x: useTransform(smoothScrollYProgress, [0, 1], [200, -100]),
            y: useTransform(smoothScrollYProgress, [0, 1], [50, -100])
          }}
        />
        
        {/* Container do iPhone */}
        <motion.div
          ref={phoneRef}
          className="w-full max-w-lg mx-auto relative z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          style={{
            y: phoneY,
            rotateZ: phoneRotate,
            rotateX,
            rotateY,
            scale: phoneScale,
            filter: phoneShadow,
            opacity: phoneOpacity,
            perspective: 1000
          }}
        >
          <div className="relative mx-auto w-full h-[500px] max-w-xs">
            {/* Sombra/reflexo do iPhone */}
            <motion.div
              className="absolute inset-0 rounded-3xl transform rotate-12 scale-90 translate-y-4 blur-md"
              style={{ 
                background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0) 100%)',
                opacity: useTransform(smoothScrollYProgress, [0, 0.5, 1], [0.15, 0.25, 0.1])
              }}
              animate={{
                scale: [0.9, 0.95, 0.9],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            
            {/* Brilho na tela */}
            <motion.div
              className="absolute inset-0 rounded-3xl z-20 pointer-events-none"
              style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 20%)',
                opacity: useTransform(smoothScrollYProgress, [0, 0.3, 0.6], [0, 0.6, 0])
              }}
            />
            
            {/* Imagens do iPhone com transição */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full relative z-10"
              >
                <motion.img
                  src={images[activeImage]}
                  alt="iPhone"
                  className="mx-auto w-full h-full object-contain relative z-10"
                  whileHover={{
                    scale: 1.03,
                    transition: { duration: 0.3 }
                  }}
                />
              </motion.div>
            </AnimatePresence>
            
            {/* Destaques de recursos */}
            {activeImage === 2 && (
              <>
                <motion.div
                  className="absolute top-1/4 right-0 z-30"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  onHoverStart={() => setHoverFeature('camera')}
                  onHoverEnd={() => setHoverFeature(null)}
                >
                  <div className="bg-black bg-opacity-70 backdrop-blur-sm p-2 rounded-lg flex items-center space-x-2">
                    <Camera size={16} className="text-blue-400" />
                    <span className="text-xs">Câmera dupla</span>
                  </div>
                  
                  {hoverFeature === 'camera' && (
                    <motion.div
                      className="absolute top-full left-0 mt-2 p-2 bg-black bg-opacity-80 backdrop-blur-md rounded-lg"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <p className="text-xs max-w-[150px]">
                        Sistema de câmera dupla de 12MP para fotos ultra wide e portrait mode
                      </p>
                    </motion.div>
                  )}
                </motion.div>
                
                <motion.div
                  className="absolute bottom-1/4 left-0 z-30"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  onHoverStart={() => setHoverFeature('performance')}
                  onHoverEnd={() => setHoverFeature(null)}
                >
                  <div className="bg-black bg-opacity-70 backdrop-blur-sm p-2 rounded-lg flex items-center space-x-2">
                    <Zap size={16} className="text-yellow-400" />
                    <span className="text-xs">Performance</span>
                  </div>
                  
                  {hoverFeature === 'performance' && (
                    <motion.div
                      className="absolute top-full left-0 mt-2 p-2 bg-black bg-opacity-80 backdrop-blur-md rounded-lg"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <p className="text-xs max-w-[150px]">
                        Chip A13 Bionic com Neural Engine para performance excepcional
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              </>
            )}
          </div>
        </motion.div>
        
        {/* Título com efeito */}
        <motion.div
          className="mt-12 text-center"
          style={{ 
            opacity: useTransform(smoothScrollYProgress, [0, 0.2, 0.8, 1], [1, 0.8, 0.8, 0]),
            y: useTransform(smoothScrollYProgress, [0, 1], [0, 100]) 
          }}
        >
          <motion.h1 
            className="text-4xl font-bold mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            iPhone
            <motion.span 
              className="inline-flex items-center ml-2"
              animate={{ 
                color: ['#fff', '#3b82f6', '#fff'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              7
              <Sparkles size={16} className="ml-1" />
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="text-gray-400 max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Design refinado. Câmera revolucionária. Tela deslumbrante.
          </motion.p>
        </motion.div>
      </div>
      
      {/* Indicador de scroll */}
      <motion.div
        className="fixed bottom-8 w-full flex justify-center pb-4 z-50"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        }}
        transition={{ delay: 1.2 }}
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0])
        }}
      >
        <motion.button
          className="text-white p-2 rounded-full"
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(75, 85, 99, 0.5)' }}
          whileTap={{ scale: 0.9 }}
          animate={{
            y: [0, 5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <ChevronDown size={24} />
        </motion.button>
      </motion.div>
      
      {/* Segunda seção com banners */}
      <BannerSection
        rightBanner={rightBanner}
        leftBanner={leftBanner}
        mainBanner={mainBanner}
      />
    </div>
  );
};

export default iPhoneLandingPage;