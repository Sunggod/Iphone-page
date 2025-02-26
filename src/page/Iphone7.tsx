import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import BannerSection from '../components/BannerSection';

export interface iPhoneLandingPageProps {
  imagePath: string;
  rightBanner?: string;
  leftBanner?: string;
  mainBanner?: string;
}
const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const iPhoneLandingPage: React.FC<iPhoneLandingPageProps> = ({
  imagePath,
  rightBanner = 'rightbanner.png',
  leftBanner = 'leftbanner.png',
  mainBanner = 'mainbanner.png'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const phoneRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  
  // Efeitos de animação aprimorados para o iPhone
  const phoneY = useTransform(scrollY, [0, 800], [0, 100]);
  const phoneRotate = useTransform(scrollY, [0, 800], [0, 8]);
  const phoneShadow = useTransform(
    scrollY,
    [0, 800],
    ['0px 20px 30px rgba(0, 0, 0, 0.5)', '0px 60px 80px rgba(0, 0, 0, 0.7)']
  );
  const phoneScale = useTransform(scrollY, [0, 400], [1, 0.9]);
  
  useEffect(() => {
    // Definir timeout para melhorar a performance
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen bg-black text-white antialiased">
      {/* Seção Hero com iPhone */}
      <div className="flex flex-col items-center justify-center flex-grow pt-24 relative overflow-hidden pb-96">
        <motion.div
          ref={phoneRef}
          className="w-full max-w-lg mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          style={{
            y: phoneY,
            rotate: phoneRotate,
            filter: phoneShadow,
            scale: phoneScale,
          }}
        >
          <div className="relative mx-auto w-full max-w-xs">
            {/* Reflexo/Sombra do iPhone */}
            <motion.div
              className="absolute inset-0 rounded-3xl transform rotate-12 scale-90 translate-y-4 blur-md opacity-20"
              animate={{
                scale: [0.9, 0.95, 0.9],
                opacity: [0.15, 0.25, 0.15],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            
            <motion.img
              src={imagePath}
              alt="iPhone 7"
              className="mx-auto w-full h-full relative z-10"
              whileHover={{ 
                scale: 1.03,
                transition: { duration: 0.3 }
              }}
            />
            
            <motion.div
              className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-500/10 to-purple-500/10 opacity-0"
              animate={{
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Seta de scroll */}
      <motion.div
        className="fixed bottom-8 w-full flex justify-center pb-4 z-50"
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        transition={{ delay: 1.2 }}
      >
        <motion.button
          className="text-white bg-gray-800/40 backdrop-blur-md p-2 rounded-full"
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

      {/* Seção de Banners com Parallax */}
      <BannerSection
        rightBanner={rightBanner}
        leftBanner={leftBanner}
        mainBanner={mainBanner}
      />
    </div>
  );
};

export default iPhoneLandingPage;