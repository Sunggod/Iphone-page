import React from 'react';
import Navbar from '../components/Navbar'; 
import { motion } from 'framer-motion';
import { LayoutProps } from '../types';



const Layout: React.FC<LayoutProps> = ({ children, logoPath }) => {
  return (
    <>
      <Navbar logoPath={logoPath} />
      <motion.div
              className="  inset-0 rounded-3xl bg-gradient-to-tr from-blue-500/10 to-purple-500/10 opacity-0"
              animate={{
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
      <main>
        {children}
      </main>
      <motion.div/>
    </>
  );
};

export default Layout;
