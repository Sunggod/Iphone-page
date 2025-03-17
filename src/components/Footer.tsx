import { cubicBezier, motion, useScroll, useTransform } from "framer-motion";
import { Apple, BadgePoundSterlingIcon, BaggageClaim, ChevronRight, Home, Package, PoundSterling } from "lucide-react";

const Footer = () => {
    // Hook useScroll para monitorar o progresso de rolagem da página
    // scrollYProgress retorna um valor entre 0 (topo) e 1 (final da página)
    const { scrollYProgress } = useScroll();
    
    // ===== TRANSFORMAÇÕES PARA O TELEFONE 1 =====
    // Movimento vertical: começa 120px abaixo e sobe para posição original (0)
    // Valores de scroll: inicia em 65% da página (0.65) e finaliza em 95% (0.95)
    const phone1Y = useTransform(scrollYProgress, [0.65, 0.95], [120, 0]);
    
    // Escala: começa em 75% do tamanho (0.75) e aumenta para 100% (1.0)
    // Mesmos valores de scroll: 65% a 95% da página
    const phone1Scale = useTransform(scrollYProgress, [0.65, 0.95], [0.75, 1]);
    
    // Opacidade: invisível (0) para completamente visível (1)
    // Intervalo de scroll: 65% a 85% da página
    const phone1Opacity = useTransform(scrollYProgress, [0.65, 0.85], [0, 1]);
    
    // ===== TRANSFORMAÇÕES PARA O TELEFONE 2 =====
    // Movimento vertical: começa 150px abaixo
    // Inicia em: 70% da página (0.7) até 95% (0.95)
    const phone2Y = useTransform(scrollYProgress, [0.7, 0.95], [150, 0]);
    
    // Escala: começa em 65% e aumenta para 100%
    // Intervalo de scroll: 70% a 95% da página
    const phone2Scale = useTransform(scrollYProgress, [0.7, 0.95], [0.65, 1]);
    
    // Opacidade: invisível (0) para completamente visível (1)
    // Intervalo de scroll: 70% a 90% da página
    const phone2Opacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 1]);
    
    // ===== TRANSFORMAÇÕES PARA OS ÍCONES =====
    // Movimento vertical: começa 70px abaixo e sobe para posição original
    // Intervalo de scroll: 75% a 95% da página
    const iconsY = useTransform(scrollYProgress, [0.75, 0.95], [70, 0]);
    
    // Opacidade: invisível (0) para completamente visível (1)
    // Intervalo: 75% a 90% da página
    const iconsOpacity = useTransform(scrollYProgress, [0.75, 0.9], [0, 1]);
    
    // ===== TRANSFORMAÇÕES PARA AS LINHAS DIVISÓRIAS =====
    // ===== TRANSFORMAÇÕES PARA AS LINHAS DIVISÓRIAS =====
        // A largura da linha começa em 0px e cresce até 980px com um efeito suavizado (easing).
        // Isso ocorre quando o usuário faz scroll entre 80% e 100% da página.

        // `useTransform` mapeia o progresso do scroll (`scrollYProgress`) de 0.8 a 1 
        // para uma largura que varia de 0px a 980px.

        // O easing é definido por uma curva de Bézier cúbica (`cubicBezier(0.34, 1.56, 0.64, 1)`), 
        // que cria uma aceleração e desaceleração mais suave e natural no crescimento da linha.

        const lineWidth = useTransform(scrollYProgress, [0.8, 1], [0, 980], {
            ease: cubicBezier(0.34, 1.56, 0.64, 1) // Define a curva de easing personalizada
        });


    // ===== TRANSFORMAÇÕES PARA OS CHEVRONS INFERIORES =====
    // Opacidade: invisível (0) para completamente visível (1)
    // Intervalo de scroll: 85% a 100% da página
    const chevronOpacity = useTransform(scrollYProgress, [0.85, 1], [0, 1]);
    
    // Movimento horizontal: começa 30px à esquerda e move para posição original
    // Mesmo intervalo: 85% a 100% da página
    const chevronX = useTransform(scrollYProgress, [0.85, 1], [-30, 0]);

    return (
        <footer className="sticky bottom-0 left-0 w-full bg-black text-white flex flex-col justify-between items-center py-3 px-4 shadow-sm overflow-hidden">
            <div className="flex gap-5 items-center justify-center relative pt-10 pb-10 container">
                {/* PRIMEIRO TELEFONE COM PARALLAX */}
                <motion.div 
                    className="w-64 h-auto flex flex-col items-center gap-36"
                    style={{ 
                        y: phone1Y,
                        scale: phone1Scale, 
                        opacity: phone1Opacity
                    }}
                >
                    <img src="footerPhone1.png" alt="phone1" />
                    {/* Animação do Chevron: movimento horizontal infinito */}
                    <motion.div
                        animate={{ 
                            x: [0, 5, 0]
                        }}
                        transition={{ 
                            repeat: Infinity,
                            duration: 1.5
                        }}
                    >
                        <ChevronRight className="h-3 w-3 text-blue-300" />
                    </motion.div>
                </motion.div>
                
                {/* TEXTO DO IPHONE COM OPACIDADE SINCRONIZADA */}
                <motion.div 
                    className="pb-40 flex px-10"
                    style={{ 
                        opacity: phone1Opacity
                    }}
                >
                    <span className="text-xl text-slate-300 hover:text-white transition-all px-8">
                        IPhone 7
                    </span>
                    <div className="pt-10">
                        {/* Animação do Chevron: mesmo movimento com delay */}
                        <motion.div
                            animate={{ 
                                x: [0, 5, 0]
                            }}
                            transition={{ 
                                repeat: Infinity,
                                duration: 1.5,
                                delay: 0.3
                            }}
                        >
                            <ChevronRight className="h-3 w-3 text-blue-400" />
                        </motion.div>
                    </div>
                </motion.div>
                
                {/* SEGUNDO TELEFONE COM PARALLAX */}
                <motion.div 
                    className="w-52 h-auto flex flex-col items-center gap-36"
                    style={{ 
                        y: phone2Y,
                        scale: phone2Scale,
                        opacity: phone2Opacity
                    }}
                >
                    <img src="footerPhone2.png" alt="phone2" />
                    {/* Animação do Chevron: mesmo movimento com delay maior */}
                    <motion.div
                        animate={{ 
                            x: [0, 5, 0]
                        }}
                        transition={{ 
                            repeat: Infinity,
                            duration: 1.5,
                            delay: 0.6
                        }}
                    >
                        <ChevronRight className="h-3 w-3 text-blue-300" />
                    </motion.div>
                </motion.div>
            </div>
            
            {/* PRIMEIRA LINHA DIVISÓRIA COM ANIMAÇÃO DE LARGURA */}
            <motion.span 
                className="border h-0.5 opacity-10 border-white" 
                style={{ 
                    width: lineWidth
                }}
            />
            
            {/* SEÇÃO DE ÍCONES COM PARALLAX */}
            <motion.div 
                className="flex relative pt-10"
                style={{ 
                    y: iconsY,
                    opacity: iconsOpacity
                }}
            >
                {/* ÍCONE 1: PACKAGE */}
                <motion.div 
                    className="flex flex-col items-center text-gray-400 hover:text-white pt-10 cursor-pointer"
                    whileHover={{ 
                        scale: 1.1,
                        y: -5
                    }}
                >
                    <Package className="w-8 h-8" />
                    <div className="ml-16">
                        {/* Animação do Chevron: movimento vertical */}
                        <motion.div
                            animate={{ 
                                y: [0, 5, 0]
                            }}
                            transition={{ 
                                repeat: Infinity,
                                duration: 2
                            }}
                        >
                            <ChevronRight className="h-3 w-3 mx-12 my-20 text-blue-300" />
                        </motion.div>
                    </div>
                </motion.div>
                
                {/* ÍCONE 2: APPLE */}
                <motion.div 
                    className="flex flex-col items-center text-gray-400 hover:text-white pt-10 cursor-pointer"
                    whileHover={{ 
                        scale: 1.1,
                        y: -5
                    }}
                >
                    <Apple className="w-8 h-8" />
                    <div className="ml-16">
                        {/* Animação do Chevron: movimento vertical com delay */}
                        <motion.div
                            animate={{ 
                                y: [0, 5, 0]
                            }}
                            transition={{ 
                                repeat: Infinity,
                                duration: 2,
                                delay: 0.5
                            }}
                        >
                            <ChevronRight className="h-3 w-3 mx-12 my-12 text-blue-300" />
                        </motion.div>
                    </div>
                </motion.div>
                
                {/* ÍCONE 3: BADGE POUND STERLING */}
                <motion.div 
                    className="flex flex-col items-center text-gray-400 hover:text-white pt-10 cursor-pointer"
                    whileHover={{ 
                        scale: 1.1,
                        y: -5
                    }}
                >
                    <BadgePoundSterlingIcon className="w-8 h-8" />
                    <div className="ml-16">
                        {/* Animação do Chevron: movimento vertical com delay maior */}
                        <motion.div
                            animate={{ 
                                y: [0, 5, 0]
                            }}
                            transition={{ 
                                repeat: Infinity,
                                duration: 2,
                                delay: 1.0
                            }}
                        >
                            <ChevronRight className="h-3 w-3 mx-12 my-12 text-blue-300" />
                        </motion.div>
                    </div>
                </motion.div>
                
                {/* ÍCONE 4: BAGGAGE CLAIM */}
                <motion.div 
                    className="flex flex-col items-center text-gray-400 hover:text-white pt-10 cursor-pointer"
                    whileHover={{ 
                        scale: 1.1,
                        y: -5
                    }}
                >
                    <BaggageClaim className="w-8 h-8" />
                    <div className="ml-16">
                        {/* Animação do Chevron: movimento vertical com delay ainda maior */}
                        <motion.div
                            animate={{ 
                                y: [0, 5, 0]
                            }}
                            transition={{ 
                                repeat: Infinity,
                                duration: 2,
                                delay: 1.5
                            }}
                        >
                            <ChevronRight className="h-3 w-3 mx-12 my-20 text-blue-300" />
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
            
            {/* SEGUNDA LINHA DIVISÓRIA COM ANIMAÇÃO DE LARGURA */}
            <motion.span 
                className="h-0.5 opacity-10 bg-white" 
                style={{ 
                    width: lineWidth
                }}
            />
            
            {/* SEÇÃO INFERIOR COM CHEVRONS */}
            <div className="relative h-10 w-full pb-40">
                <motion.div>
                    {/* TERCEIRA LINHA DIVISÓRIA COM ANIMAÇÃO DE LARGURA */}
                    <motion.span 
                        className="h-0.5 mt-52 opacity-10 bg-white block" 
                        style={{ 
                            width: lineWidth
                        }}
                    />
                </motion.div>
                
                {/* CHEVRONS INFERIORES COM ANIMAÇÃO */}
                <motion.div 
                    className="flex mt-2 gap-10 ml-10 pt-6"
                    style={{ 
                        opacity: chevronOpacity,
                        x: chevronX
                    }}
                >
                    {/* PRIMEIRO CHEVRON COM ROTAÇÃO */}
                    <motion.div
                        animate={{ 
                            rotate: [0, 10, 0, -10, 0],
                        }}
                        transition={{ 
                            repeat: Infinity,
                            duration: 3
                        }}
                    >
                        <ChevronRight className="h-8 w-8 text-gray-500"/>
                    </motion.div>
                    
                    {/* SEGUNDO CHEVRON COM ROTAÇÃO EM FASE OPOSTA */}
                    <motion.div
                        animate={{ 
                            rotate: [0, -10, 0, 10, 0],
                        }}
                        transition={{ 
                            repeat: Infinity,
                            duration: 3,
                            delay: 0.5
                        }}
                    >
                        <ChevronRight className="h-8 w-8 text-gray-500"/>
                    </motion.div>
                </motion.div>
            </div>
            
            {/* SEÇÃO FINAL COM LOGO E LINHA */}
            <div className="flex flex-col pb-10">
                {/* QUARTA LINHA DIVISÓRIA COM ANIMAÇÃO DE LARGURA */}
                <motion.span 
                    className="h-0.5 mt-52 opacity-10 bg-white block" 
                    style={{ 
                        width: lineWidth
                    }}
                />
                
                {/* LOGO DO PAÍS COM ANIMAÇÃO DE HOVER */}
                <motion.div 
                    className="ml-[900px] justify-items-end items-end pt-5"
                    whileHover={{ 
                        scale: 1.2,
                        rotate: 360
                    }}
                    transition={{ 
                        duration: 0.5
                    }}
                >
                    <img className="h-5 w-5" src="pais.png" alt="" />
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;