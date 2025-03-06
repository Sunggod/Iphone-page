import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { BannerSectionProps } from '../types';


/** 
 * 
 * O componente é dividido em duas seções principais:
 * 1. Seção principal com banners de produto
 * 2. Seção de áudio com ondas sonoras e telefone (opcional, exibida apenas se soundWaveImage e phoneAudioImage forem fornecidos)
 * 
 * Cada seção implementa efeitos de parallax independentes usando hooks do Framer Motion:
 * - useScroll: Rastreia o progresso de rolagem
 * - useSpring: Adiciona física de mola para movimentos naturais
 * - useTransform: Mapeia valores de progresso para propriedades de animação
 */
const BannerSection: React.FC<BannerSectionProps> = ({
  rightBanner,
  leftBanner,
  mainBanner,
  soundWaveImage = 'soundWaveImage.png',
  phoneAudioImage = 'phoneAudioImage.png'
}) => {
  // --------- Referências para elementos DOM ---------
  /**
   * Refs para rastrear elementos específicos na página para efeitos de parallax
   * Cada ref é associada a uma seção diferente para controlar animações específicas
   */
  const sectionRef = useRef<HTMLDivElement>(null);    // Ref para a seção principal com banners
  const audioSectionRef = useRef<HTMLDivElement>(null); // Ref para a seção de áudio
  const headerRef = useRef<HTMLDivElement>(null);    // Ref para o cabeçalho da seção principal
  
  /**
   * Estado para controlar a reprodução de áudio
   * Este estado é alternado pelo botão play/pause na seção de áudio
   * Controla as animações de onda sonora e equalização visual
   */
  const [isPlaying, setIsPlaying] = useState(false);
  
  // --------- Configuração de tracking de rolagem ---------
  /**
   * useScroll: Hook do Framer Motion que rastreia o progresso de rolagem de um elemento
   * @param {object} options - Opções de configuração
   * @param {RefObject} options.target - Elemento a ser rastreado
   * @param {Array<string>} options.offset - Define o intervalo de quando a animação inicia e termina
   *   ["start end", "end start"] significa:
   *   - início da animação quando o topo do elemento entra na viewport 
   *   - término quando o fim do elemento sai da viewport
   * @returns {object} Objeto contendo scrollYProgress (MotionValue entre 0-1)
   */
  const { scrollYProgress: mainScrollProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const { scrollYProgress: audioScrollProgress } = useScroll({
    target: audioSectionRef,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: headerScrollProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"]
  });
  
  // --------- Aplicação de física de mola para movimentos naturais ---------
  /**
   * useSpring: Adiciona física de mola às animações para movimentos mais naturais
   * @param {MotionValue} motionValue - Valor de movimento a ser suavizado (normalmente progresso de rolagem)
   * @param {object} options - Opções de configuração da mola
   * @param {number} options.stiffness - Controla a rigidez da mola (valores maiores = movimento mais rápido)
   * @param {number} options.damping - Controla a resistência (valores maiores = menos oscilação)
   * @param {number} options.restDelta - Limiar para considerar a mola em repouso
   * @returns {MotionValue} Valor de movimento suavizado com física de mola
   */
  const smoothProgress = useSpring(mainScrollProgress, { 
    stiffness: 100,  // Rigidez média para movimento natural
    damping: 30,     // Amortecimento para evitar oscilações excessivas
    restDelta: 0.001 // Precisão alta para movimentos pequenos
  });
  
  const smoothAudioProgress = useSpring(audioScrollProgress, { 
    stiffness: 80,   // Rigidez rigidez menor para a seção de áudio (mais suave)
    damping: 25,     // Amortecimento para movimento fluido
    restDelta: 0.001
  });

  // --------- Transformações para animações baseadas na rolagem ---------
  /**
   * useTransform: Mapeia valores de entrada (0-1) para valores de saída personalizados
   * @param {MotionValue} motionValue - MotionValue a ser transformado (normalmente progresso de rolagem)
   * @param {Array<number>} inputRange - Array de valores de entrada [0, 0.5, 1]
   * @param {Array<number|string>} outputRange - Array de valores de saída correspondentes
   * @returns {MotionValue} Valor transformado que pode ser usado em estilos de animação
   */
  
  // --------- Transformações principais da seção de banner ---------
  
  /**
   * Transformação vertical do banner principal baseada na rolagem (efeito parallax)
   * Quando a rolagem progride de 0 a 1, o banner move-se de +100px para -100px (movimento oposto à rolagem)
   */
  const mainBannerY = useTransform(smoothProgress, [0, 1], [100, -100]);
  
  /**
   * Transformações horizontais para banners laterais (entram da esquerda e direita)
   * Os banners laterais começam fora da tela (-100px e +100px) e deslizam para posição 0
   * quando o progresso da rolagem atinge 0.6 (60% da rolagem da seção)
   */
  const leftBannerX = useTransform(smoothProgress, [0, 0.6], [-100, 0]);
  const rightBannerX = useTransform(smoothProgress, [0, 0.6], [100, 0]);
  
  /**
   * Opacidade gradual para fazer os elementos aparecerem suavemente
   * Os elementos ficam totalmente visíveis (opacidade 1) quando a rolagem atinge 30%
   */
  const opacity = useTransform(smoothProgress, [0, 0.3], [0, 1]);
  
  /**
   * Rotações sutis para banners laterais para efeito 3D
   * Os banners começam com uma rotação (8 e -8 graus), normalizam (0 graus) no meio da rolagem,
   * e depois rotacionam levemente na direção oposta (-4 e 4 graus) no final
   */
  const leftRotate = useTransform(smoothProgress, [0, 0.5, 1], [8, 0, -4]);
  const rightRotate = useTransform(smoothProgress, [0, 0.5, 1], [-8, 0, 4]);
  
  /**
   * Efeito de zoom para o banner principal
   * O banner começa um pouco menor (0.9), amplia um pouco além do tamanho normal (1.05)
   * e depois retorna ao tamanho normal (1)
   */
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.9, 1.05, 1]);
  
  /**
   * Efeito de profundidade para texto superior
   * O cabeçalho move-se para baixo e diminui levemente conforme a página é rolada
   */
  const headerY = useTransform(headerScrollProgress, [0, 1], [0, 150]);
  const headerScale = useTransform(headerScrollProgress, [0, 1], [1, 0.9]);
  
  // --------- Transformações da seção de áudio ---------
  
  /**
   * Movimento vertical para telefone com áudio
   * O telefone começa abaixo (100px), sobe além da posição normal (-20px)
   * e depois sobe um pouco mais (-40px)
   */
  const phoneY = useTransform(smoothAudioProgress, [0, 0.5, 1], [100, -20, -40]);
  
  /**
   * Opacidade e escala para ondas sonoras
   * As ondas aparecem gradualmente e aumentam de tamanho, depois diminuem um pouco
   */
  const waveOpacity = useTransform(smoothAudioProgress, [0.1, 0.4, 0.8], [0, 1, 0.8]);
  const waveScale = useTransform(smoothAudioProgress, [0.1, 0.5, 0.9], [0.8, 1.1, 1]);
  
  /**
   * Efeito de fade para toda a seção de áudio
   * A seção de áudio fica completamente visível em 20% da rolagem
   */
  const audioOpacity = useTransform(smoothAudioProgress, [0, 0.2], [0, 1]);
  
  /**
   * Rotação 3D para efeito de profundidade na seção de áudio
   * O telefone inclina-se em duas direções conforme a rolagem progride
   */
  const phoneRotateX = useTransform(smoothAudioProgress, [0, 0.5, 1], [10, 0, -5]);
  const phoneRotateY = useTransform(smoothAudioProgress, [0, 0.5, 1], [-5, 0, 3]);
  
  /**
   * Opacidade para partículas na seção principal
   * As partículas ficam mais visíveis no meio da rolagem e desvanecem no início e fim
   */
  const particlesOpacity = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0, 0.6, 0.8, 0.4]);
  
  /**
   * Toggle play status - controla estado de reprodução de áudio
   * Alterna o estado isPlaying que ativa as animações de ondas sonoras
   */
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  /**
   * Criação de múltiplas partículas com propriedades aleatórias para a seção principal
   * Usado para adicionar elementos visuais dinâmicos no fundo
   * 
   * @param {number} count - Número de partículas a serem criadas
   * @param {string} color - Cor das partículas (classe Tailwind)
   * @param {MotionValue} motionValue - Valor de movimento para efeito parallax
   * @returns {Array<JSX.Element>} Array de elementos de partículas animadas
   */
  const createParticles = (count: number, color: string, motionValue: MotionValue<number>) => {
    return [...Array(count)].map((_, i) => {
      // Valores aleatórios para posição, tamanho e atraso nas animações
      const left = `${Math.random() * 100}%`;
      const top = `${Math.random() * 100}%`;
      const scale = Math.random() * 2 + 1;
      const delay = Math.random() * 5;
      const duration = Math.random() * 5 + 5;
      
      // Transformação de parallax baseada na posição vertical
      const particleY = useTransform(
        motionValue, 
        [0, 1], 
        [Math.random() * 100 - 50, Math.random() * 100 + 50]
      );
      
      return (
        <motion.div
          key={i}
          className={`absolute w-2 h-2 rounded-full bg-${color} opacity-20`}
          style={{
            left,
            top,
            scale,
            filter: "blur(1px)",
            y: particleY,
            opacity: i % 3 === 0 ? particlesOpacity : undefined // Aplica efeito de parallax apenas a algumas partículas
          }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration,
            repeat: Infinity,
            delay,
          }}
        />
      );
    });
  };
  return (
    <>
      {/* Seção principal com banners de produto */}
      <div 
        ref={sectionRef}
        className="min-h-screen relative bg-gradient-to-b from-black to-gray-900 overflow-hidden flex flex-col items-center justify-center py-20"
      >
        {/* Cabeçalho com efeito de profundidade */}
        <motion.div 
          ref={headerRef}
          className="text-center mb-16 px-4"
          style={{ 
            opacity, // Fade in conforme rolagem
            y: headerY, // Move para baixo conforme rolagem
            scale: headerScale // Diminui levemente conforme rolagem
          }}
        >
          <h2 className="text-3xl font-bold mb-4">Experiência incomparável</h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            Descubra recursos inovadores projetados para transformar a maneira como você
            captura momentos, se comunica e interage com o mundo.
          </p>
        </motion.div>
        
        <div className="relative w-full max-w-6xl mx-auto px-4">
          {/* Banner principal com efeito parallax vertical e zoom */}
          <motion.div
            className="relative z-20 mb-12"
            style={{
              y: mainBannerY, // Movimento vertical oposto à rolagem
              scale, // Efeito de zoom
              opacity // Fade in
            }}
          >
            <img 
              src={mainBanner} 
              alt="Main feature" 
              className="w-full rounded-xl shadow-2xl"
            />
            
            {/* Overlay de texto com animação de entrada */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 rounded-b-xl"
              initial={{ opacity: 0, y: 20 }} // Estado inicial (invisível e abaixo)
              whileInView={{ opacity: 1, y: 0 }} // Estado quando visível
              transition={{ delay: 0.3, duration: 0.8 }} // Timing da animação
              viewport={{ once: true }} // Executa apenas uma vez quando entra na viewport
            >
              <h3 className="text-xl font-bold mb-2">Câmera revolucionária</h3>
              <p className="text-sm text-gray-300">
                Capture momentos perfeitos com nosso sistema de câmera dupla avançado.
              </p>
            </motion.div>
          </motion.div>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Banner esquerdo com movimento horizontal, rotação 3D e opacidade */}
            <motion.div
              className="flex-1 relative overflow-hidden rounded-xl"
              style={{
                x: leftBannerX, // Movimento da esquerda para o centro
                rotateZ: leftRotate, // Rotação sutil
                opacity, // Fade in
                perspective: 1000 // Adiciona perspectiva para efeito 3D
              }}
            >
              {/* Sombra dinâmica baseada na posição */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent z-10 rounded-xl"
                style={{
                  opacity: useTransform(smoothProgress, [0, 0.5, 1], [0, 0.1, 0.2])
                }}
              />
              
              <img 
                src={leftBanner} 
                alt="Left feature" 
                className="w-full rounded-xl shadow-xl"
              />
              
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 rounded-b-xl"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-bold mb-1">Design elegante</h3>
                <p className="text-xs text-gray-300">
                  Acabamento premium em um design fino e leve.
                </p>
              </motion.div>
            </motion.div>
            
            {/* Banner direito com movimento horizontal, rotação e opacidade */}
            <motion.div
              className="flex-1 relative overflow-hidden rounded-xl"
              style={{
                x: rightBannerX, // Movimento da direita para o centro
                rotateZ: rightRotate, // Rotação sutil
                opacity, // Fade in
                perspective: 1000 // Adiciona perspectiva para efeito 3D
              }}
            >
              {/* Sombra dinâmica baseada na posição */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-bl from-purple-500/10 to-transparent z-10 rounded-xl"
                style={{
                  opacity: useTransform(smoothProgress, [0, 0.5, 1], [0, 0.1, 0.2])
                }}
              />
              
              <img 
                src={rightBanner} 
                alt="Right feature" 
                className="w-full rounded-xl shadow-xl"
              />
                
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 rounded-b-xl"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                        viewport={{ once: true }}
                      >
                      <h3 className="text-lg font-bold mb-1">Performance incomparável</h3>
                      <p className="text-xs text-gray-300">
                        Chip A13 Bionic para velocidade e eficiência.
                      </p>
                    </motion.div>
            </motion.div>
          </div>
          
          {/* Botão com animações de hover e clique */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium tracking-wider"
              whileHover={{ 
                scale: 1.05, // Aumenta levemente no hover
                backgroundColor: "#2563EB", // Cor mais vibrante no hover
                boxShadow: "0 0 15px rgba(59, 130, 246, 0.6)" // Efeito de brilho
              }}
              whileTap={{ scale: 0.98 }} // Comprime levemente ao clicar
              transition={{ 
                type: "spring", 
                stiffness: 500, // Mola mais responsiva
                damping: 15 // Menor amortecimento para sensação mais rápida
              }}
            >
              Conheça mais
            </motion.button>
          </motion.div>
        </div>
        
        {/* Partículas de fundo com movimento baseado na posição de rolagem */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {createParticles(15, "white", smoothProgress)}
        </div>
      </div>

      {/* Seção de áudio com ondas sonoras e telefone */}
      {soundWaveImage && phoneAudioImage && (
        <div 
          ref={audioSectionRef}
          className="min-h-screen relative bg-gradient-to-b from-gray-900 to-black overflow-hidden flex flex-col items-center justify-center py-20"
        >
          {/* Cabeçalho da seção de áudio com efeito fade in */}
          <motion.div 
            className="text-center mb-16 px-4"
            style={{ 
              opacity: audioOpacity, // Fade in
              y: useTransform(smoothAudioProgress, [0, 0.3], [50, 0]) // Move para cima ao entrar na viewport
            }}
          >
            <h2 className="text-3xl font-bold mb-4">Áudio Imersivo</h2>
            <p className="text-gray-400 max-w-lg mx-auto">
              Experiência sonora de alta definição com tecnologia avançada para músicos e amantes da música.
            </p>
          </motion.div>
          
          <div className="relative w-full max-w-6xl mx-auto px-4 flex flex-col items-center">
            {/* Animação de ondas sonoras pulsantes */}
            <motion.div
              className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden"
              style={{
                opacity: waveOpacity, // Fade in
                scale: waveScale // Aumenta e depois diminui
              }}
            >
              {/* Múltiplas camadas de ondas para profundidade */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  scale: useTransform(smoothAudioProgress, [0, 1], [0.9, 1.1])
                }}
              >
                <motion.img 
                  src={soundWaveImage} 
                  alt="Sound waves" 
                  className="w-full max-w-4xl opacity-30"
                  animate={isPlaying ? {
                    scale: [0.98, 1.02, 0.98], // Pulsa quando está reproduzindo
                    opacity: [0.3, 0.5, 0.3], // Varia a opacidade quando está reproduzindo
                  } : {}}
                  transition={{
                    duration: 2.3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
              
              {/* Segunda camada de ondas com timing diferente */}
              <motion.img 
                src={soundWaveImage} 
                alt="Sound waves" 
                className="w-full max-w-4xl"
                animate={isPlaying ? {
                  scale: [1, 1.03, 1], // Pulsa com valores diferentes
                  opacity: [0.7, 0.9, 0.7], // Varia a opacidade com valores diferentes
                } : {}}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
            
            {/* Telefone com app de áudio e efeito 3D */}
            <motion.div
              className="relative z-20 mt-8"
              style={{
                y: phoneY, // Movimento vertical
                scale: useTransform(smoothAudioProgress, [0, 0.5], [0.9, 1]), // Aumenta ao entrar na viewport
                opacity: audioOpacity, // Fade in
                rotateX: phoneRotateX, // Rotação 3D no eixo X
                rotateY: phoneRotateY, // Rotação 3D no eixo Y
                transformPerspective: 1000 // Adiciona perspectiva para efeito 3D mais convincente
              }}
            >
              {/* Reflexo dinâmico na tela */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl"
                style={{
                  opacity: useTransform(smoothAudioProgress, [0, 0.5, 1], [0, 0.1, 0.15])
                }}
              />
              
              <img 
                src={phoneAudioImage} 
                alt="Audio application" 
                className="w-full max-w-md rounded-xl shadow-2xl"
              />
              
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 rounded-b-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold mb-2">Mixagem Profissional</h3>
                <p className="text-sm text-gray-300">
                  Controle total sobre sua experiência musical com tecnologia de ponta.
                </p>
              </motion.div>
              
              
            </motion.div>
            
            {/* Botão de play/pause com efeitos de hover e clique */}
            <motion.div
              className="mt-16 text-center z-30"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.button
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-medium tracking-wider flex items-center justify-center"
                whileHover={{ 
                  scale: 1.05, // Aumenta levemente no hover
                  backgroundColor: "#F97316", // Cor mais vibrante no hover
                  boxShadow: "0 0 5px rgba(249, 115, 22, 0.6)" // Efeito de brilho
                }}
                whileTap={{ scale: 0.98 }} // Comprime levemente ao clicar
                transition={{ 
                  type: "spring", 
                  stiffness: 500,
                  damping: 15
                }}
                onClick={togglePlay}
              >
                {/* Ícone animado de play/pause */}
                <motion.span 
                  className="inline-block mr-2 w-4 h-4 relative"
                  initial={false}
                  animate={isPlaying ? {
                    scale: [1, 1.2, 1] // Pulsa quando o estado muda
                  } : {}}
                  transition={{
                    duration: 0.3
                  }}
                >
                  {isPlaying ? (
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <rect x="6" y="4" width="4" height="16" />
                      <rect x="14" y="4" width="4" height="16" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </motion.span>
                {isPlaying ? "Pausar Demonstração" : "Play Demonstração"}
                  
              </motion.button>
              {/*Toca o som claramente do Iphone :)*/}
              {isPlaying ? <audio src="hello-moto-sound-notification.mp3" autoPlay loop/> : undefined}

            </motion.div>
          </div>
          
        </div>
      )}
    </>
  );
};

export default BannerSection;