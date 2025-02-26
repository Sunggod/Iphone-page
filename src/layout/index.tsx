import React from 'react';
import Navbar from '../components/Navbar'; // ajuste o caminho conforme a estrutura do seu projeto

interface LayoutProps {
  children: React.ReactNode;
  logoPath: string;
}

const Layout: React.FC<LayoutProps> = ({ children, logoPath }) => {
  return (
    <>
      <Navbar logoPath={logoPath} />
      <main className="pt-20 bg-black">
        {children}
      </main>
    </>
  );
};

export default Layout;
