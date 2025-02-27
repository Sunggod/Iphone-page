import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface BannerSectionProps {
  rightBanner: string;
  leftBanner: string;
  mainBanner: string;
}

const BannerSection: React.FC<BannerSectionProps> = ({
  rightBanner,
  leftBanner,
  mainBanner
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Transformações de scroll para os banners
  const mainBannerY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const leftBannerX = useTransform(scrollYProgress, [0, 1], [-50, 0]);
  const rightBannerX = useTransform(scrollYProgress, [0, 1], [50, 0]);
  
  // Opacidade para fade-in
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  
  // Rotação sutil
  const leftRotate = useTransform(scrollYProgress, [0, 1], [5, -5]);
  const rightRotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);
  
  // Escala para efeito de zoom
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.05, 1]);
  
  return (
    <div 
      ref={sectionRef}
      className="min-h-screen relative bg-gradient-to-b from-black to-gray-900 overflow-hidden flex flex-col items-center justify-center py-20"
    >
      {/* Texto de introdução com parallax */}
      <motion.div 
        className="text-center mb-16 px-4"
        style={{ 
          opacity,
          y: useTransform(scrollYProgress, [0, 0.3], [50, 0])
        }}
      >
        <h2 className="text-3xl font-bold mb-4">Experiência incomparável</h2>
        <p className="text-gray-400 max-w-lg mx-auto">
          Descubra recursos inovadores projetados para transformar a maneira como você
          captura momentos, se comunica e interage com o mundo.
        </p>
      </motion.div>
      
      {/* Container dos banners com efeito parallax */}
      <div className="relative w-full max-w-6xl mx-auto px-4">
        {/* Banner principal */}
        <motion.div
          className="relative z-20 mb-12"
          style={{
            y: mainBannerY,
            scale,
            opacity
          }}
        >
          <img 
            src={mainBanner} 
            alt="Main feature" 
            className="w-full rounded-xl shadow-2xl"
          />
          
          {/* Overlay com informações */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 rounded-b-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-2">Câmera revolucionária</h3>
            <p className="text-sm text-gray-300">
              Capture momentos perfeitos com nosso sistema de câmera dupla avançado.
            </p>
          </motion.div>
        </motion.div>
        
        {/* Banners laterais */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Banner esquerdo */}
          <motion.div
            className="flex-1 relative"
            style={{
              x: leftBannerX,
              rotateZ: leftRotate,
              opacity
            }}
          >
            <img 
              src={leftBanner} 
              alt="Left feature" 
              className="w-full rounded-xl shadow-xl"
            />
            
            {/* Overlay com informações */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 rounded-b-xl"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-bold mb-1">Design elegante</h3>
              <p className="text-xs text-gray-300">
                Acabamento premium em um design fino e leve.
              </p>
            </motion.div>
          </motion.div>
          
          {/* Banner direito */}
          <motion.div
            className="flex-1 relative"
            style={{
              x: rightBannerX,
              rotateZ: rightRotate,
              opacity
            }}
          >
            <img 
              src={rightBanner} 
              alt="Right feature" 
              className="w-full rounded-xl shadow-xl"
            />
            
            {/* Overlay com informações */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 rounded-b-xl"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-bold mb-1">Performance incomparável</h3>
              <p className="text-xs text-gray-300">
                Chip A13 Bionic para velocidade e eficiência.
              </p>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Botão de ação */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium tracking-wider"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            Conheça mais
          </motion.button>
        </motion.div>
      </div>
      
      {/* Partículas/reflexos de luz */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-white opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              scale: Math.random() * 2 + 1,
              filter: "blur(1px)"
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerSection;