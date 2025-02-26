import React from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingBag } from 'lucide-react';

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1.5, ease: "easeOut" } 
  }
};

interface NavbarProps {
  logoPath: string;
}

const Navbar: React.FC<NavbarProps> = ({ logoPath }) => {
  return (
    <motion.nav 
      className="flex justify-between items-center px-6 py-3 bg-[#333333] bg-opacity-80 backdrop-blur-md fixed top-0 w-full z-10"
      initial="hidden"
      animate="visible"
      variants={fadeInVariants}
    >
      <div className="w-8">
        <img 
          src={logoPath} 
          alt="Apple Logo" 
          className="w-5 h-5 opacity-90" 
        />
      </div>
      <div className="flex space-x-5">
        <Search className="w-4 h-4 opacity-80 text-white hover:opacity-100 transition-opacity" />
        <ShoppingBag className="w-4 h-4 opacity-80 text-white hover:opacity-100 transition-opacity" />
      </div>
    </motion.nav>
  );
};

export default Navbar;
