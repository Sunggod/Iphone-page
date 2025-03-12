import React, { lazy, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutProps } from '../types';
import { ClipLoader } from 'react-spinners';
const Navbar = lazy(  () => import('../components/Navbar'))

const Layout: React.FC<LayoutProps> = ({ children, logoPath }) => {
      const [loading, setLoading] = useState(true)
      useEffect(() =>{
        const timer = setTimeout(()=>{
          setLoading(false)
  
        }, 3000)
        return () => clearTimeout(timer);
  
      },[])
  return (
    <div className=' h-full w-full'>
      {loading ? (
        <div className="relative flex justify-center items-center h-screen w-screen  bg-black">
          <ClipLoader color="#33caff" loading={loading} size={50} />
        </div>  
      ):(
        <div className="bg-black text-white antialiased scroll-smooth">
      <Navbar logoPath={logoPath} />
      <main className='scroll-smooth'>
        {children}
      </main>
      </div>
      )}
    </div>
  );
};

export default Layout;
