import { motion, useScroll, useTransform } from "framer-motion";
import { fadeInVariants } from "../constants/animation";

const BannerSection: React.FC<{
  leftBanner: string;
  rightBanner: string;
  mainBanner: string;
}> = ({ leftBanner, rightBanner, mainBanner }) => {
  const { scrollY } = useScroll();
  
  const leftBannerX = useTransform(scrollY, [0, 800], [0, -80]);
  const rightBannerX = useTransform(scrollY, [0, 800], [0, 80]);
  const mainBannerY = useTransform(scrollY, [0, 800], [0, 50]);
  const mainScale = useTransform(scrollY, [0, 800], [1, 1.08]);
  const mainOpacity = useTransform(scrollY, [0, 200, 600], [0.6, 1, 0.8]);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInVariants}
      transition={{ delay: 0.8 }}
      className="flex flex-col w-full relative overflow-hidden"
    >
      <div className="flex justify-between w-full h-auto">
        <motion.div 
          className="w-1/2"
          style={{ x: leftBannerX }}
        >
          <img
            src={leftBanner}
            alt="Banner esquerdo"
            className="w-full h-auto object-cover"
          />
        </motion.div>
        <motion.div 
          className="w-1/2"
          style={{ x: rightBannerX }}
        >
          <img
            src={rightBanner}
            alt="Banner direito"
            className="w-full h-auto object-cover"
          />
        </motion.div>
      </div>
      
      <motion.div
        className="w-full mt-8"
        style={{
          y: mainBannerY,
          scale: mainScale,
          opacity: mainOpacity
        }}
      >
        <img 
          src={mainBanner} 
          alt="Banner principal" 
          className="w-full h-auto object-cover"
        />
      </motion.div>
    </motion.div>
  );
};
export default BannerSection