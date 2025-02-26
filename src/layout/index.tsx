import React from 'react';
import Navbar from '../components/Navbar'; 

interface LayoutProps {
  children: React.ReactNode;
  logoPath: string;
}

const Layout: React.FC<LayoutProps> = ({ children, logoPath }) => {
  return (
    <>
      <Navbar logoPath={logoPath} />
      <main >
        {children}
      </main>
    </>
  );
};

export default Layout;
