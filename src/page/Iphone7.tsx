import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Search, ShoppingBag } from 'lucide-react';

interface iPhoneLandingPageProps {
  imagePath:string 
}

const iPhone7LandingPage: React.FC<iPhoneLandingPageProps> = ({ 
  imagePath = '/images/iphone7.png',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const phoneRef = useRef<HTMLDivElement>(null);
  
  // Setup para animação de scroll com Framer Motion
  const { scrollY } = useScroll();
  const phoneY = useTransform(scrollY, [0, 500], [0, 75]);
  const phoneRotate = useTransform(scrollY, [0, 500], [0, 5]);
  const phoneShadow = useTransform(
    scrollY,
    [0, 500],
    ['0px 20px 30px rgba(0, 0, 0, 0.5)', '0px 40px 60px rgba(0, 0, 0, 0.5)']
  );
  
  // Trigger animation on component mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Animation variants for reusable animations
  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 1.5, 
        ease: "easeOut" 
      } 
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
     
      
      {/* Main Hero Section */}
      <div className="flex flex-col items-center justify-center flex-grow pt-24 pb-16 relative overflow-hidden">
        {/* iPhone image with parallax effect */}
        <motion.div 
          ref={phoneRef}
          className="w-full max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 1.2 }}
          style={{ 
            y: phoneY,
            rotate: phoneRotate,
            filter: phoneShadow
          }}
        >
          <div className="relative mx-auto w-full max-w-xs">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black rounded-3xl transform rotate-12 scale-90 translate-y-4 blur-md opacity-20"
              animate={{ 
                scale: [0.9, 0.95, 0.9],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <img 
              src={imagePath} 
              alt="iPhone 7 em Preto Brilhante" 
              className="mx-auto w-full max-w-xs relative z-10"
            />
          </div>
        </motion.div>
        
        {/* Button section */}
        <motion.div 
          className="mt-12 w-full flex justify-center"
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          transition={{ delay: 0.5 }}
        >
          <motion.button 
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-8 rounded-md text-sm font-medium transition-colors shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Comprar agora
          </motion.button>
        </motion.div>
      </div>
      
      {/* Bottom Navigation Dots/Controls */}
      <motion.div 
        className="fixed bottom-5 w-full flex justify-center pb-4"
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        transition={{ delay: 0.8 }}
      >
        <div className="flex items-center space-x-6 bg-black bg-opacity-40 backdrop-blur-sm px-4 py-2 rounded-full">
          <motion.button 
            className="bg-blue-500 text-white rounded-full p-1.5 shadow-lg hover:bg-blue-600 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </motion.button>
          
          <div className="flex space-x-2">
            <div className="h-1.5 w-1.5 rounded-full bg-gray-500 opacity-60"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-gray-500 opacity-60"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-gray-500 opacity-60"></div>
          </div>
          
          <div className="flex space-x-3">
            <motion.button 
              className="text-white rounded p-1 opacity-70 hover:opacity-100 transition-opacity"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.button>
            
            <motion.button 
              className="text-white rounded p-1 opacity-70 hover:opacity-100 transition-opacity"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            </motion.button>
            
            <motion.button 
              className="text-white rounded p-1 opacity-70 hover:opacity-100 transition-opacity"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default iPhone7LandingPage;