  import React, { useState, useEffect, useRef } from 'react';
  import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
  import { ChevronDown, Camera, Sparkles, Zap } from 'lucide-react';
  import { iPhoneLandingPageProps } from '../types';
  import { lazy } from 'react';
  const BannerSection = lazy(()=> import('../components/BannerSection'))


  /**
   * Componente principal da Landing Page do iPhone
   * Implementa efeitos de parallax, animações suaves e interações responsivas
   */
  const iPhoneLandingPage: React.FC<iPhoneLandingPageProps> = ({
    imagePath,                          // Imagem principal do iPhone
    imagePath2 = 'IphoneTras.png',      // Imagem secundária do iPhone (verso)
    imagePath3 = 'phone3.png',          // Imagem terciária do iPhone (lateral/recursos)
    rightBanner = 'rightbanner.png',    // Banner lateral direito
    leftBanner = 'leftbanner.png',      // Banner lateral esquerdo
    mainBanner = 'mainbanner.png'       // Banner principal
  }) => {
    // ===== ESTADOS =====
    const [isVisible, setIsVisible] = useState(false);     // Controla visibilidade inicial com efeito de fade-in
    const [activeImage, setActiveImage] = useState(0);     // Controla qual imagem do iPhone está sendo exibida (0, 1, 2)
    const [hoverFeature, setHoverFeature] = useState<string | null>(null);  // Rastreia qual recurso está sob hover
    const [isTransitioning, setIsTransitioning] = useState(false);  // Controla o estado de transição entre imagens
    
    // ===== REFERÊNCIAS =====
    const phoneRef = useRef<HTMLDivElement>(null);         // Referência para o elemento do iPhone
    const containerRef = useRef<HTMLDivElement>(null);     // Referência para o container principal (para o scroll)

    // ===== CONFIGURAÇÃO DO PARALLAX BASEADO EM SCROLL =====
    // Configura o progresso do scroll relativo ao container
    const { scrollYProgress } = useScroll({
      target: containerRef,                   // Elemento alvo para monitorar o scroll
      offset: ['start start', 'end end']      // Inicia no topo do container e termina no final do container
    });
    
    // Aplica amortecimento (spring physics) ao scroll para tornar o movimento mais natural e suave
    const smoothScrollYProgress = useSpring(scrollYProgress, { 
      stiffness: 80,     // Rigidez da mola reduzida para movimento mais suave
      damping: 25,       // Amortecimento ajustado para reduzir oscilação
      restDelta: 0.001   // Tolerância menor para movimento mais preciso
    });
    
    // ===== TRANSFORMAÇÕES BASEADAS NO SCROLL =====
    // Movimento vertical do iPhone durante o scroll
    const phoneY = useTransform(
      smoothScrollYProgress,  // Usa o progresso do scroll suavizado
      [0, 1],                // Input range: do início (0) ao fim (1) do scroll
      [0, 300]               // Output range: de 0px a 300px de deslocamento para baixo
    );

    // Rotação do iPhone baseada no progresso do scroll
    const phoneRotate = useTransform(
      smoothScrollYProgress,
      [0, 0.5, 1],           // Três pontos de controle: início, meio e fim do scroll
      [0, 15, 5]             // Rotação em graus: começa em 0°, vai a 15° no meio e termina em 5°
    );
    
    // Escala do iPhone durante o scroll
    const phoneScale = useTransform(
      smoothScrollYProgress,
      [0, 0.5, 1],           // Três pontos de controle
      [1, 1.2, 0.8]          // Escala: tamanho normal, aumenta 20% no meio, diminui 20% no fim
    );
    
    // Opacidade do iPhone perto do final do scroll
    const phoneOpacity = useTransform(
      smoothScrollYProgress,
      [0.8, 1],              // Últimos 20% do scroll
      [1, 0.3]               // Opacidade: de totalmente visível para 30% visível
    );
    
    // Sombra dinâmica do iPhone baseada no scroll
    const phoneShadow = useTransform(
      smoothScrollYProgress,
      [0, 0.5, 1],           // Três pontos de controle
      [
        '0px 20px 50px rgba(0, 0, 0, 0.4)',    // Sombra inicial (mais suave)
        '0px 40px 80px rgba(0, 0, 0, 0.6)',    // Sombra no meio do scroll (mais intensa)
        '0px 10px 30px rgba(0, 0, 0, 0.3)'     // Sombra final (mais leve)
      ]
    );
    
    // Opacidade do destaque radial no fundo
    const highlightOpacity = useTransform(
      smoothScrollYProgress,
      [0, 0.3, 0.6, 1],      // Quatro pontos de controle para maior precisão
      [0, 0.8, 0.2, 0]       // Opacidade: invisível no início, forte no primeiro terço, fraca e desaparece no fim
    );
    
    // Rotação no eixo X (inclinação frontal/traseira)
    const rotateX = useTransform(
      smoothScrollYProgress,
      [0, 0.5, 1],           // Três pontos de controle
      [0, 10, 5]             // Ângulos de rotação em graus
    );
    
    // Rotação no eixo Y (inclinação lateral)
    const rotateY = useTransform(
      smoothScrollYProgress,
      [0, 0.5, 1],           // Três pontos de controle
      [0, -15, -5]           // Ângulos negativos rotacionam para a esquerda
    );

    // ===== EFEITOS =====
    useEffect(() => {
      // Timer para atrasar a aparição inicial do iPhone com um efeito de entrada mais suave
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 500); // Aumentado para 500ms para dar tempo para a página carregar completamente
      
      // Limpeza do timer quando o componente é desmontado
      return () => {
        clearTimeout(timer);
      };
    }, []);

    // Efeito separado para gerenciar a transição de imagens
    useEffect(() => {
      // Configura o intervalo apenas se não estiver em transição
      if (!isTransitioning) {
        const imageInterval = setInterval(() => {
          // Marca o início da transição
          setIsTransitioning(true);
          
          // Timer curto para permitir que a animação de saída ocorra
          setTimeout(() => {
            setActiveImage((prev) => (prev + 1) % 3);  // Alterna entre as 3 imagens (0, 1, 2)
          }, 300); // Tempo suficiente para a animação de fade-out
          
          // Timer para marcar o fim da transição após a animação de entrada
          setTimeout(() => {
            setIsTransitioning(false);
          }, 1000); // Tempo total da transição (saída + entrada)
        }, 7000); // Aumentado para 7 segundos para dar mais tempo para visualizar cada imagem
        
        // Limpeza do intervalo quando o componente é desmontado ou quando isTransitioning muda
        return () => clearInterval(imageInterval);
      }
    }, [isTransitioning]);

    // Array com os caminhos das imagens para facilitar a alternância
    const images = [imagePath, imagePath2, imagePath3];

    // Variantes de animação para o iPhone principal
    const phoneVariants = {
      hidden: { opacity: 0, y: 50, scale: 0.9 },
      visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { 
          duration: 1.2, 
          ease: [0.25, 0.1, 0.25, 1], // Curva de easing personalizada para movimento mais natural
          staggerChildren: 0.1 
        }
      }
    };

    // Variantes de animação para as imagens do iPhone
    const imageVariants = {
      hidden: { opacity: 0, scale: 0.9, rotateY: -10 },
      visible: { 
        opacity: 1, 
        scale: 1, 
        rotateY: 0,
        transition: { 
          duration: 0.7, 
          ease: "easeOut" 
        }
      },
      exit: { 
        opacity: 0, 
        scale: 0.95, 
        rotateY: 10,
        transition: { 
          duration: 0.5, 
          ease: "easeIn" 
        }
      }
    };

    return (
    
      <div className="bg-black text-white antialiased scroll-smooth">

   
        <div 
          ref={containerRef}  // Referência para monitorar o scroll
          className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden py-20"
        >
          {/* Gradiente radial de fundo com opacidade animada */}
          <motion.div
            className="absolute w-full h-full"
            style={{ 
              background: 'radial-gradient(circle at center, #333 0%, #000 70%)',  // Gradiente radial do cinza para preto
              opacity: highlightOpacity  // Opacidade controlada pelo scroll
            }}
          />
          
          {/* Bolha de fundo azul com efeito de parallax */}
          <motion.div
            className="absolute w-64 h-64 rounded-full bg-blue-500 filter blur-3xl"
            style={{ 
              // Controla a opacidade da bolha durante o scroll
              opacity: useTransform(smoothScrollYProgress, [0, 0.3, 0.6], [0, 0.15, 0]),
              // Movimento horizontal da bolha durante o scroll (da esquerda para a direita)
              x: useTransform(smoothScrollYProgress, [0, 1], [-100, 200]),
              // Movimento vertical da bolha durante o scroll (de baixo para cima)
              y: useTransform(smoothScrollYProgress, [0, 1], [100, -200])
            }}
          />
          
          {/* Bolha de fundo roxa com efeito de parallax diferente */}
          <motion.div
            className="absolute w-40 h-40 rounded-full bg-purple-500 filter blur-3xl"
            style={{ 
              // Controla a opacidade da bolha durante o scroll
              opacity: useTransform(smoothScrollYProgress, [0, 0.3, 0.6], [0, 0.1, 0]),
              // Movimento horizontal (da direita para a esquerda)
              x: useTransform(smoothScrollYProgress, [0, 1], [200, -100]),
              // Movimento vertical mais suave
              y: useTransform(smoothScrollYProgress, [0, 1], [50, -100])
            }}
          />
          
          {/* Contêiner do iPhone com todos os efeitos de parallax */}
          <motion.div
            ref={phoneRef}
            className="w-full max-w-lg mx-auto relative z-10"
            // Animação inicial de entrada melhorada usando variantes
            variants={phoneVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            // Aplicação de todos os efeitos baseados no scroll
            style={{
              y: phoneY,                // Movimento vertical
              rotateZ: phoneRotate,     // Rotação no eixo Z (2D)
              rotateX,                  // Rotação no eixo X (inclinação frontal/traseira)
              rotateY,                  // Rotação no eixo Y (inclinação lateral)
              scale: phoneScale,        // Escala (zoom in/out)
              filter: phoneShadow,      // Sombra dinâmica
              opacity: phoneOpacity,    // Opacidade
              perspective: 1000         // Profundidade da perspectiva 3D (em pixels)
            }}
          >
            <div className="relative mx-auto w-full h-[500px] max-w-xs">
              {/* Sombra animada embaixo do iPhone */}
              <motion.div
                className="absolute inset-0 rounded-3xl transform rotate-12 scale-90 translate-y-4 blur-md"
                style={{ 
                  // Gradiente linear da sombra
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0) 100%)',
                  // Opacidade da sombra varia com o scroll
                  opacity: useTransform(smoothScrollYProgress, [0, 0.5, 1], [0.15, 0.25, 0.1])
                }}
                // Animação contínua de respiração (pulso suave)
                animate={{
                  scale: [0.9, 0.95, 0.9],  // Escala oscila entre 90% e 95%
                }}
                transition={{
                  duration: 8,              // Duração de 8 segundos por ciclo
                  repeat: Infinity,         // Repete infinitamente
                  ease: 'easeInOut',        // Suavização nas extremidades
                }}
              />
              
              {/* Reflexo/brilho na parte superior do iPhone */}
              <motion.div
                className="absolute inset-0 rounded-3xl z-20 pointer-events-none"
                style={{
                  // Gradiente linear do branco para transparente
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 20%)',
                  // Opacidade do brilho varia com o scroll (mais visível no início)
                  opacity: useTransform(smoothScrollYProgress, [0, 0.3, 0.6], [0, 0.6, 0])
                }}
              />
              
              {/* Sistema de troca de imagens com animação de transição melhorada */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}  // Chave muda com a imagem ativa, forçando recriação do elemento
                  variants={imageVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="w-full h-full relative z-10"
                >
                  <motion.img
                    src={images[activeImage]}  // Imagem atual do array
                    alt="iPhone"
                    className="mx-auto w-full h-full object-contain relative z-10"
                    // Efeito de hover com leve zoom e rotação 3D
                    whileHover={{
                      scale: 1.03,  // Aumenta 3% ao passar o mouse
                      rotateY: activeImage === 1 ? 5 : -5, // Rotação sutil dependendo da imagem
                      transition: { 
                        duration: 0.4,
                        ease: [0.25, 0.1, 0.25, 1] // Curva de easing personalizada
                      }
                    }}
                    // Pré-carregamento para evitar atrasos na transição
                    onLoad={() => {
                      // Pré-carregar a próxima imagem
                      const nextImageIndex = (activeImage + 1) % 3;
                      const img = new Image();
                      img.src = images[nextImageIndex];
                    }}
                  />
                </motion.div>
              </AnimatePresence>
              
              {/* Indicadores de recursos que aparecem apenas na terceira imagem */}
              {activeImage === 2 && (
                <>
                  {/* Indicador da câmera com tooltip */}
                  <motion.div
                    className="absolute top-1/4 right-0 z-30"
                    // Animação de entrada com deslize da direita (mais suave)
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: 0.3, // Reduzido para 0.3s para parecer mais responsivo
                      duration: 0.6,
                      ease: [0.25, 0.1, 0.25, 1] // Curva de easing personalizada
                    }}
                    // Eventos de hover para mostrar/esconder tooltip
                    onHoverStart={() => setHoverFeature('camera')}
                    onHoverEnd={() => setHoverFeature(null)}
                  >
                    {/* Badge com ícone e texto */}
                    <div className="bg-black bg-opacity-70 backdrop-blur-sm p-2 rounded-lg flex items-center space-x-2 animate-bounce">
                      <Camera size={16} className="text-blue-400" />
                      <span className="text-xs">Câmera dupla</span>
                    </div>
                    
                    {/* Tooltip detalhado que aparece no hover */}
                    {hoverFeature === 'camera' && (
                      <motion.div
                        className="absolute top-full left-0 mt-2 p-2 bg-black bg-opacity-80 backdrop-blur-md rounded-lg"
                        // Animação de entrada do tooltip
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }} 
                      >
                        <p className="text-xs max-w-[150px]">
                          Sistema de câmera dupla de 12MP para fotos ultra wide e portrait mode
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                  
                  {/* Indicador de performance com tooltip */}
                  <motion.div
                    className="absolute bottom-1/4 left-0 z-30"
                    // Animação de entrada com deslize da esquerda (mais suave)
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: 0.5, // Reduzido para 0.5s para parecer mais responsivo
                      duration: 0.6,
                      ease: [0.25, 0.1, 0.25, 1] // Curva de easing personalizada
                    }}
                    // Eventos de hover para mostrar/esconder tooltip
                    onHoverStart={() => setHoverFeature('performance')}
                    onHoverEnd={() => setHoverFeature(null)}
                  >
                    {/* Badge com ícone e texto */}
                    <div className="bg-black bg-opacity-70 backdrop-blur-sm p-2 rounded-lg flex items-center space-x-2 animate-bounce">
                      <Zap size={16} className="text-yellow-400" />
                      <span className="text-xs">Performance</span>
                    </div>
                    
                    {/* Tooltip detalhado que aparece no hover */}
                    {hoverFeature === 'performance' && (
                      <motion.div
                        className="absolute top-full left-0 mt-2 p-2 bg-black bg-opacity-80 backdrop-blur-md rounded-lg"
                        // Animação de entrada do tooltip
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }} // Acelerado para parecer mais responsivo
                      >
                        <p className="text-xs max-w-[150px]">
                          Chip A13 Bionic com Neural Engine para performance excepcional
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>
          
          {/* Seção de texto/título com efeitos de parallax */}
          <motion.div
            className="mt-12 text-center"
            style={{ 
              // Opacidade diminui com o scroll
              opacity: useTransform(smoothScrollYProgress, [0, 0.2, 0.8, 1], [1, 0.8, 0.8, 0]),
              // Movimento para baixo durante o scroll
              y: useTransform(smoothScrollYProgress, [0, 1], [0, 100]) 
            }}
          >
            {/* Título com animação de entrada */}
            <motion.h1 
              className="text-4xl font-bold mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.7, // Ajustado para aparecer após o iPhone começar a aparecer
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1] // Curva de easing personalizada
              }}
            >
              iPhone
              {/* Número do iPhone com efeito de cor pulsante */}
              <motion.span 
                className="inline-flex items-center ml-2"
                animate={{ 
                  color: ['#fff', '#33caff', '#fff'],  // Ciclo de cores: branco -> azul -> branco
                }}
                transition={{
                  duration: 2,          // Duração de 5s por ciclo
                  repeat: Infinity,     // Repete infinitamente
                  ease: 'easeInOut',    // Suavização nas extremidades
                }}
              >
                7
                <Sparkles size={16} className="ml-1" />  
              </motion.span>
            </motion.h1>
            
            {/* Subtítulo com animação de entrada */}
            <motion.p 
              className="text-gray-400 max-w-md mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ 
                delay: 0.9, // Ajustado para aparecer após o título
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1] // Curva de easing personalizada
              }}
            >
              Design refinado. Câmera revolucionária. Tela deslumbrante.
            </motion.p>
          </motion.div>
        </div>
        
        {/* Botão de scroll para baixo */}
        <motion.div
          className="fixed bottom-8 w-full flex justify-center pb-4 z-50"
          // Animação de entrada
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
          }}
          transition={{ 
            delay: 1.5, // Aumentado para 1.5s para aparecer após todos os outros elementos
            duration: 0.6 
          }}
          // Desaparece conforme o usuário rola para baixo
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0])  // Desaparece nos primeiros 20% do scroll
          }}
        >
          <motion.button
            className="text-white p-2 rounded-full"
            // Efeitos interativos
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(75, 85, 99, 0.5)' }}  // Aumenta e muda de cor no hover
            whileTap={{ scale: 0.9 }}  // Diminui ao ser clicado
            // Animação contínua de pulsação vertical
            animate={{
              y: [0, 5, 0],  // Move para baixo e volta à posição original
            }}
            transition={{
              duration: 2,        // 2 segundos por ciclo
              repeat: Infinity,   // Repete infinitamente
              ease: 'easeInOut',  // Suavização nas extremidades
            }}
          >
            <ChevronDown size={24} />  
          </motion.button>
        </motion.div>
        
        {/* Seção de banners (componente externo) */}
        <BannerSection
          rightBanner={rightBanner}
          leftBanner={leftBanner}
          mainBanner={mainBanner}
        />
      </div>
    
    );

  };

  export default iPhoneLandingPage;