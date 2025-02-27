import React from 'react';
import Navbar from '../components/Navbar'; 
import { motion } from 'framer-motion';
import { LayoutProps } from '../types';



const Layout: React.FC<LayoutProps> = ({ children, logoPath }) => {
  return (
    <>
      <Navbar logoPath={logoPath} />
     
      <main className='scroll-smooth'>
        {children}
      </main>
    </>
  );
};

export default Layout;
