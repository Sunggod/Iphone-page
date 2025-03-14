import React, { lazy, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutProps } from '../types';
import { ClipLoader } from 'react-spinners';
import Footer from '../components/Footer';
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
    <div className=' h-full w-full overflow-hidden '>
      {loading ? (
        <div className="relative flex justify-center items-center h-screen w-screen  bg-black">
          <ClipLoader color="#33caff" loading={loading} size={50} />
        </div>  
        
      ):(
        <div className="bg-black text-white antialiased ">
      <Navbar logoPath={logoPath} />
      
      <main className='relative '>
        {children}
      </main>
      <Footer/>
      </div>
      
      )}
      
    </div>
  );
};

export default Layout;
