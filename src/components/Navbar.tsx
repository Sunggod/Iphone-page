import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';

const fadeInVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  }
};

interface NavbarProps {
  logoPath: string;
}

const Navbar: React.FC<NavbarProps> = ({ logoPath }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { scrollY } = useScroll();
  
  const bgOpacity = useTransform(scrollY, [0, 100], [0.8, 1]);
  const backdropBlur = useTransform(scrollY, [0, 100], [8, 12]);
  const height = useTransform(scrollY, [0, 100], ['64px', '54px']);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Links de navegação
  const navLinks = [
    { name: 'Início', href: '#' },
    { name: 'Recursos', href: '#' },
    { name: 'Especificações', href: '#' },
    { name: 'Comprar', href: '#' }
  ];
  
  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 px-6 flex justify-between items-center ${
        isScrolled ? 'py-2' : 'py-3'
      }`}
      initial="hidden"
      animate="visible"
      variants={fadeInVariants}
      style={{ 
        backgroundColor: `rgba(25, 25, 25, ${bgOpacity})`,
        backdropFilter: `blur(${backdropBlur}px)`,
        height
      }}
    >
      {/* Logo */}
      <motion.div
        className="flex items-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <img
          src={logoPath}
          alt="Apple Logo"
          className="w-5 h-5 opacity-90"
        />
      </motion.div>
      
      {/* Links de navegação - visíveis apenas em desktop */}
      <motion.div 
        className="hidden md:flex space-x-8 items-center"
        variants={{
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.2
            }
          }
        }}
      >
        {navLinks.map((link, i) => (
          <motion.a
            key={i}
            href={link.href}
            className="text-sm text-white opacity-80 hover:opacity-100 transition-opacity"
            variants={{
              hidden: { opacity: 0, y: -10 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {link.name}
          </motion.a>
        ))}
      </motion.div>
      
      <div className="flex items-center space-x-5">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Search className="w-4 h-4 opacity-80 text-white hover:opacity-100 transition-opacity cursor-pointer" />
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ShoppingBag className="w-4 h-4 opacity-80 text-white hover:opacity-100 transition-opacity cursor-pointer" />
        </motion.div>
        
        {/* Menu mobile */}
        <motion.div 
          className="md:hidden"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5 text-white cursor-pointer" />
          ) : (
            <Menu className="w-5 h-5 text-white cursor-pointer" />
          )}
        </motion.div>
      </div>
      
      {/* Menu mobile dropdown */}
      <AnimatedMobileMenu isOpen={isMobileMenuOpen} links={navLinks} />
    </motion.nav>
  );
};

interface AnimatedMobileMenuProps {
  isOpen: boolean;
  links: { name: string; href: string }[];
}

const AnimatedMobileMenu: React.FC<AnimatedMobileMenuProps> = ({ isOpen, links }) => {
  return (
    <motion.div
      className="absolute top-full left-0 w-full bg-black bg-opacity-90 backdrop-blur-md md:hidden overflow-hidden"
      initial={{ height: 0 }}
      animate={{ height: isOpen ? 'auto' : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <motion.div
        className="py-4 px-6 flex flex-col space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.2, delay: isOpen ? 0.2 : 0 }}
      >
        {links.map((link, i) => (
          <motion.a
            key={i}
            href={link.href}
            className="text-white py-2 border-b border-gray-800"
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            {link.name}
          </motion.a>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Navbar;