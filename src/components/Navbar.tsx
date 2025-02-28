import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import AnimatedMobileMenu from './AnimatedMobileMenu';
import { NavbarProps } from '../types';
import { fadeInVariants } from '../constants/animation';



const Navbar: React.FC<NavbarProps> = ({ logoPath = 'logo.png' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { scrollY } = useScroll();
  
  const bgOpacity = useTransform(scrollY, [0,50, 100], [0.5, 0.8,   1]);
  const backdropBlur = useTransform(scrollY, [0, 100], [8, 12]);
  const height = useTransform(scrollY, [0, 100], ['64px', '54px']);
  
  useEffect(() => {
    // Define a função handleScroll que será chamada sempre que o evento de scroll ocorrer.
    const handleScroll = () => {
      // A função define o estado 'isScrolled' como 'true' se a rolagem vertical da janela for maior que 20 pixels.
      setIsScrolled(window.scrollY > 20);
    };
  
    // Adiciona o event listener para o evento de 'scroll'. 
    // Toda vez que a página for rolada, a função handleScroll será chamada.
    window.addEventListener('scroll', handleScroll);
  
    // A função retornada aqui serve para limpar o efeito quando o componente for desmontado ou quando o efeito for reexecutado.
    // Nesse caso, remove o event listener de 'scroll', impedindo que o código tente acessar o evento após o componente ser desmontado.
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);  // O segundo parâmetro '[]' significa que o efeito é executado apenas uma vez, quando o componente for montado.
  
  
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
          src={logoPath ? 'logo.png' : undefined}
          alt="Apple Logo"
          className="w-8 h-8"   
        />
      </motion.div>
      
      {/* Links de navegação - visíveis apenas em desktop */}
      <motion.div 
            className="hidden md:flex space-x-8 items-center"
            // O `motion.div` define a animação para o contêiner dos links
            variants={{
              // Variantes definem os diferentes estados de animação
              hidden: { opacity: 0 },  // Quando escondido, a opacidade é 0 (invisível)
              visible: { 
                opacity: 1,  // Quando visível, a opacidade é 1 (totalmente visível)
                transition: {
                  // Controla o comportamento das animações dos filhos (links)
                  staggerChildren: 0.1,  // Atraso entre animações dos filhos (0.1s)
                  delayChildren: 0.2     // Atraso inicial (0.2s) para os filhos começarem a animar
                }
              }
            }}
          >
            {/* Itera sobre os links de navegação e aplica a animação em cada um */}
            {navLinks.map((link, i) => (
              <motion.a
                key={i}
                href={link.href}
                className="text-sm text-white opacity-80 hover:opacity-100 transition-opacity"
                // O `motion.a` define a animação de cada link de navegação
                variants={{
                  // Variantes específicas para o link
                  hidden: { opacity: 0, y: -10 },  // Inicialmente invisível e deslocado 10px para cima
                  visible: { opacity: 1, y: 0 }    // Quando visível, a opacidade vai para 1 e o link volta à posição original
                }}
                // Define animações de interação com o usuário
                whileHover={{ scale: 1.05, color: '#0da9d6'}}  // Quando o mouse passa sobre o link, o link aumenta 5% de tamanho
                whileTap={{ scale: 0.95 }}    // Quan do o link é clicado, o link diminui para 95% do seu tamanho
              >
                {link.name} {/* O nome do link será exibido aqui */}
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
      
      <AnimatedMobileMenu  isOpen={isMobileMenuOpen} links={navLinks} />
    </motion.nav>
  );
};

export default Navbar;