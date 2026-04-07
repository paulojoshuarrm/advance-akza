import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import SEO from '../components/SEO';
import useRevealAnimation from '../hooks/useRevealAnimation';
import { supabase } from '../lib/supabase';

export default function Home() {
    useRevealAnimation();
    const trackRef = useRef(null);
    const dotsRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Testimonial Carousel
    useEffect(() => {
        const track = trackRef.current;
        const dotsContainer = dotsRef.current;
        if (!track || !dotsContainer) return;

        const slides = Array.from(track.children);
        let idx = 0;

        function getItemsPerPage() {
            if (window.innerWidth >= 1024) return 3;
            if (window.innerWidth >= 768) return 2;
            return 1;
        }

        function updateSlider() {
            const itemsPerPage = getItemsPerPage();
            const slideWidth = 100 / itemsPerPage;
            track.style.transform = `translateX(-${idx * slideWidth}%)`;

            const dots = Array.from(dotsContainer.children);
            dots.forEach((dot, index) => {
                if (index === idx) {
                    dot.classList.add('bg-primary', 'w-6', 'opacity-100');
                    dot.classList.remove('bg-white/20', 'w-2', 'opacity-50');
                } else {
                    dot.classList.remove('bg-primary', 'w-6', 'opacity-100');
                    dot.classList.add('bg-white/20', 'w-2', 'opacity-50');
                }
            });
        }

        function createDots() {
            dotsContainer.innerHTML = '';
            const slides = Array.from(track.children);
            for (let i = 0; i < slides.length; i++) {
                const dot = document.createElement('button');
                dot.className = `h-2 rounded-full transition-all duration-300 ${i === 0 ? 'bg-primary w-6 opacity-100' : 'bg-white/20 w-2 opacity-50'}`;
                dot.addEventListener('click', () => {
                    idx = i;
                    if (idx > slides.length - getItemsPerPage()) idx = slides.length - getItemsPerPage();
                    updateSlider();
                });
                dotsContainer.appendChild(dot);
            }
        }

        function nextSlide() {
            const itemsPerPage = getItemsPerPage();
            if (idx < slides.length - itemsPerPage) {
                idx++;
            } else {
                idx = 0;
            }
            updateSlider();
        }

        const handleResize = () => updateSlider();
        window.addEventListener('resize', handleResize);

        createDots();

        let autoPlay = setInterval(nextSlide, 5000);
        const carouselContainer = track.closest('#testimonial-carousel');
        const handleEnter = () => clearInterval(autoPlay);
        const handleLeave = () => { autoPlay = setInterval(nextSlide, 5000); };

        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', handleEnter);
            carouselContainer.addEventListener('mouseleave', handleLeave);
        }

        return () => {
            clearInterval(autoPlay);
            window.removeEventListener('resize', handleResize);
            if (carouselContainer) {
                carouselContainer.removeEventListener('mouseenter', handleEnter);
                carouselContainer.removeEventListener('mouseleave', handleLeave);
            }
        };
    }, []);

    // Stats Counter
    useEffect(() => {
        const statsStrip = document.getElementById('stats-strip');
        if (!statsStrip) return;

        const counters = Array.from(statsStrip.querySelectorAll('h3[data-target]'));
        let animated = false;

        const countUp = (counter) => {
            const target = +counter.dataset.target;
            const originalText = counter.innerText;
            const duration = 2000;
            let startTime = null;

            const step = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / duration, 1);
                let currentValue = Math.floor(progress * target);
                let newText = currentValue;
                if (originalText.includes('+')) newText = '+' + newText;
                if (originalText.includes('%')) newText = newText + '%';
                if (originalText.includes('h')) newText = newText + 'h';
                counter.innerText = newText;

                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    let finalText = target;
                    if (originalText.includes('+')) finalText = '+' + finalText;
                    if (originalText.includes('%')) finalText = finalText + '%';
                    if (originalText.includes('h')) finalText = finalText + 'h';
                    counter.innerText = finalText;
                }
            };
            requestAnimationFrame(step);
        };

        const statsObserver = new IntersectionObserver((entries) => {
            const entry = entries[0];
            if (entry.isIntersecting && !animated) {
                counters.forEach(countUp);
                animated = true;
                statsObserver.unobserve(statsStrip);
            }
        }, { threshold: 0.5 });

        statsObserver.observe(statsStrip);
        return () => statsObserver.disconnect();
    }, []);

    // Form masks
    const mascaraTelefone = (e) => {
        let v = e.target.value.replace(/\D/g, "");
        v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
        v = v.replace(/(\d)(\d{4})$/, "$1-$2");
        e.target.value = v;
    };

    const formatarMoeda = (e) => {
        let valor = e.target.value.replace(/\D/g, "");
        valor = (valor / 100).toFixed(2) + "";
        valor = valor.replace(".", ",").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        e.target.value = valor;
    };

    const [leadSubmitState, setLeadSubmitState] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'

    const handleLeadSubmit = async (e) => {
        e.preventDefault();
        setLeadSubmitState('loading');

        const form = e.target;
        const inputs = form.querySelectorAll('input');
        const lead = {
            origem: 'home',
            nome: inputs[0]?.value || '',
            telefone: inputs[1]?.value || '',
            email: inputs[2]?.value || '',
            valor_face: inputs[3]?.value || '',
        };

        const { error } = await supabase.from('leads').insert(lead);
        if (error) {
            setLeadSubmitState('error');
        } else {
            setLeadSubmitState('success');
            form.reset();
        }
    };

    return (
        <>
            <SEO
                title="Advance Precatórios - Transformamos espera em oportunidade"
                description="A Advance Precatórios é líder em antecipação de precatórios federais. Receba seu crédito à vista com segurança, transparência e as melhores taxas do mercado. Análise gratuita!"
                url="https://www.advanceprecatorios.com.br/"
                image="https://www.advanceprecatorios.com.br/assets/og-image.jpg"
                canonical="https://www.advanceprecatorios.com.br/"
                structuredData={{
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": "Advance Precatórios",
                    "url": "https://www.advanceprecatorios.com.br",
                    "logo": "https://www.advanceprecatorios.com.br/assets/logo_advance.svg",
                    "description": "Líder em antecipação de precatórios federais. Receba seu crédito à vista com segurança e transparência.",
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "SGAS 902, Edifício Athenas Bloco B, salas 125/126",
                        "addressLocality": "Brasília",
                        "addressRegion": "DF",
                        "postalCode": "70390-020",
                        "addressCountry": "BR"
                    },
                    "contactPoint": [
                        { "@type": "ContactPoint", "telephone": "+55-61-99133-6601", "contactType": "sales" },
                        { "@type": "ContactPoint", "telephone": "+55-61-99380-7943", "contactType": "customer service" }
                    ],
                    "sameAs": [
                        "https://facebook.com/advanceprecatorios",
                        "https://www.instagram.com/advance.precatorios/"
                    ]
                }}
            />

            {/* Cabeçalho / Hero */}
            <header className="relative min-h-[90vh] flex items-stretch overflow-hidden pt-40 lg:pb-0 bg-navy-900">
                {/* Background Image & Overlay */}
                <div className="absolute inset-0 z-0">
                    <img src="https://images.unsplash.com/photo-1589216532372-1c2a36790049?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                         alt=""
                         role="presentation"
                         decoding="async"
                         fetchpriority="low"
                         className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-navy-900/80 backdrop-blur-sm"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/50 to-transparent"></div>
                </div>

                {/* Background Effects */}
                <div className="absolute inset-0 w-full h-full overflow-hidden z-10">
                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] animate-pulse md:blur-[80px]"></div>
                    <div className="absolute bottom-0 right-0 w-[40%] h-[60%] rounded-full bg-primary/10 blur-[100px] opacity-60"></div>
                    <div className="absolute inset-0 bg-cubes-pattern opacity-[0.03]"></div>
                </div>

                <div className="relative z-20 max-w-7xl mx-auto px-6 flex flex-col lg:grid lg:grid-cols-2 gap-16 w-full">
                    <div className="text-left reveal self-center">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 border border-primary/30 rounded-full bg-white/5 backdrop-blur-md shadow-[0_0_15px_rgba(197,160,89,0.15)] hover:border-primary/60 transition-colors cursor-default">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            <span className="text-primary font-sans text-xs tracking-[0.2em] uppercase font-bold">Líder em Antecipação</span>
                        </div>

                        {/* Title */}
                        <h1 className="text-white font-display text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-[1.1] drop-shadow-2xl">
                            Transformamos sua espera em <span className="italic text-gradient-gold relative inline-block">
                                oportunidade
                                <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary/40 opacity-70" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none"></path>
                                </svg>
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-slate-400 text-base md:text-lg max-w-xl mb-8 font-light leading-relaxed">
                            Receba seu precatório Federal, com segurança jurídica total. Analisamos seu processo gratuitamente e a proposta é formalizada no mesmo dia.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 items-start justify-start">
                            <Link className="btn-glow bg-primary text-navy-900 font-bold px-8 py-4 uppercase tracking-widest hover:bg-white transition-all transform hover:-translate-y-1 rounded-sm text-sm shadow-[0_10px_30px_rgba(197,160,89,0.3)] flex items-center justify-center gap-2" to="/contato#formulario-contato">
                                Solicitar Proposta <span className="material-symbols-outlined">arrow_forward</span>
                            </Link>
                        </div>

                        <div className="mt-12 flex items-center justify-start gap-6 text-sm text-slate-400 font-light">
                            <div className="flex items-center gap-2">
                                <Icon icon="mdi:shield-check-outline" className="text-primary text-xl" />
                                <span>Processo Seguro</span>
                            </div>
                            <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                            <div className="flex items-center gap-2">
                                <Icon icon="mdi:flash-outline" className="text-primary text-xl" />
                                <span>Pagamento à Vista</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-grow flex justify-center lg:justify-end items-end reveal-right mt-12 lg:mt-0 relative z-40">
                        <img src="/assets/foto_hero(site).webp" alt="Advogados da Advance Precatórios" fetchpriority="high" className="w-auto h-auto max-h-[60vh] lg:max-h-[70vh] object-contain object-bottom drop-shadow-[0_25px_25px_rgba(0,0,0,0.5)] lg:scale-110 lg:origin-bottom-right" />
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-30" style={{ transform: 'translateY(1px)' }}>
                    <svg className="relative block w-full h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M0,95 C400,50 800,120 1200,95 V120 H0 Z" className="fill-slate-50"></path>
                    </svg>
                </div>
            </header>

            <main>
                {/* Sobre Nós */}
                <section className="py-20 md:py-24 relative overflow-hidden bg-slate-50" id="sobre">
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-slate-100 to-transparent -z-10"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>

                    <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
                        <div className="reveal-left">
                            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 border border-primary/20 rounded-full bg-white shadow-sm">
                                <Icon icon="mdi:scale-balance" className="text-primary" />
                                <span className="text-navy-900 font-sans text-xs tracking-[0.2em] uppercase font-bold">Justiça e Equilíbrio</span>
                            </div>

                            <h2 className="text-navy-900 font-display text-4xl sm:text-5xl md:text-6xl mb-8 leading-tight">
                                O valor <span className="text-gradient-gold italic relative inline-block">mais justo
                                    <svg className="absolute w-full h-2 -bottom-1 left-0 text-primary/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                                        <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                                    </svg>
                                </span> pelo seu crédito
                            </h2>

                            <div className="space-y-6 text-slate-600 leading-relaxed text-lg font-light mb-10">
                                <p>Os sócios fundadores, ao observarem o mercado tradicional de compra e venda de precatórios, verificaram que as empresas buscam pagar o menor preço possível, sacrificando o credor.</p>
                                <p>Diante desse cenário, visaram a oportunidade de trazer inovação. Assim nasceu a <strong className="text-navy-900 font-medium">Advance Precatórios</strong>, com a proposta de equilibrar essa balança, garantindo um retorno, mas com um valor justo para o credor.</p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="group bg-white p-8 rounded-xl border border-slate-100 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-6 -mt-6 transition-transform group-hover:scale-110"></div>
                                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                        <Icon icon="mdi:target-arrow" className="text-3xl text-primary group-hover:text-white transition-colors" />
                                    </div>
                                    <h4 className="text-navy-900 font-display font-bold text-xl mb-3">Nossa Missão</h4>
                                    <p className="text-sm text-slate-500 leading-relaxed">Intermediação ética e transparente, buscando o melhor valor para o negócio e para você.</p>
                                </div>

                                <div className="group bg-white p-8 rounded-xl border border-slate-100 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-6 -mt-6 transition-transform group-hover:scale-110"></div>
                                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                        <Icon icon="mdi:eye-check-outline" className="text-3xl text-primary group-hover:text-white transition-colors" />
                                    </div>
                                    <h4 className="text-navy-900 font-display font-bold text-xl mb-3">Nossa Visão</h4>
                                    <p className="text-sm text-slate-500 leading-relaxed">Ser a referência nacional na intermediação de ativos, destacando-se pela inovação e confiança.</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative reveal-right lg:pl-12 mt-12 lg:mt-0">
                            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform rotate-1 hover:rotate-0 transition-transform duration-700">
                                <img src="/assets/imagem-equipe.webp" alt="Equipe Advance Precatórios" loading="lazy" decoding="async" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent"></div>
                                <div className="absolute bottom-0 left-0 w-full p-8">
                                    <p className="text-white/90 font-display italic text-lg">Compromisso com a verdade e agilidade em cada etapa.</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4 mt-6 justify-center">
                                <div className="flex-1 bg-white px-5 py-4 rounded-xl shadow-lg border border-slate-100 flex items-center gap-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-green-200 cursor-default">
                                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                                        <Icon icon="mdi:check-decagram" className="text-xl" />
                                    </div>
                                    <p className="text-navy-900 font-bold text-sm leading-tight">Transparência Total</p>
                                </div>

                                <div className="flex-1 bg-navy-900 px-5 py-4 rounded-xl shadow-lg border border-white/10 flex items-center gap-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/40 cursor-default">
                                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                                        <Icon icon="mdi:shield-star" className="text-xl" />
                                    </div>
                                    <div>
                                        <p className="text-white font-bold text-sm">Segurança Jurídica</p>
                                        <p className="text-slate-400 text-xs">Garantida</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Nossos Serviços */}
                <section className="py-20 md:py-24 relative bg-navy-900" id="servicos">
                    <div className="absolute inset-0 bg-cubes-pattern opacity-5"></div>
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <div className="text-left md:text-center mb-20 reveal">
                            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 border border-primary/20 rounded-full bg-white/5 backdrop-blur-md">
                                <Icon icon="mdi:diamond-stone" className="text-primary" />
                                <span className="text-primary font-sans text-xs tracking-[0.2em] uppercase font-bold">Padrão Ouro</span>
                            </div>
                            <h2 className="text-white font-display text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
                                Excelência em cada <br />
                                <span className="text-gradient-gold italic">detalhe da operação</span>
                            </h2>
                            <p className="text-slate-400 max-w-2xl mx-0 md:mx-auto text-lg font-light">
                                Elevamos o padrão do mercado de precatórios com uma estrutura robusta, desenhada para oferecer a máxima valorização do seu ativo.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { icon: 'mdi:trophy-award', title: 'Expertise de Elite', desc: 'Líderes em transações de alto volume, com um histórico impecável de sucesso e satisfação em precatórios federais.', delay: '' },
                                { icon: 'mdi:trending-up', title: 'Valorização Máxima', desc: 'Nossa estrutura de capital próprio nos permite oferecer as taxas de deságio mais competitivas do mercado nacional.', delay: '100ms' },
                                { icon: 'mdi:crown-outline', title: 'Atendimento VIP', desc: 'Consultoria personalizada com gerentes de conta dedicados, disponíveis 24/7 para esclarecer cada etapa do processo.', delay: '200ms' },
                                { icon: 'mdi:scale-balance', title: 'Segurança Jurídica', desc: 'Corpo jurídico especializado em Direito Constitucional e Administrativo, garantindo blindagem total na cessão.', delay: '300ms' },
                                { icon: 'mdi:file-document-check-outline', title: 'Transparência Total', desc: 'Sem letras miúdas. Contratos claros, auditados e explicados detalhadamente antes de qualquer assinatura.', delay: '400ms' },
                                { icon: 'mdi:shield-lock-outline', title: 'Ética e Compliance', desc: 'Rigoroso controle de conformidade e governança corporativa, assegurando a idoneidade de cada operação.', delay: '500ms' },
                            ].map((card, i) => (
                                <div key={i} className="group relative bg-gradient-to-b from-white/5 to-transparent border border-white/10 p-8 rounded-2xl hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_-10px_rgba(197,160,89,0.3)] hover:-translate-y-2 reveal" style={card.delay ? { transitionDelay: card.delay } : undefined}>
                                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                                    <div className="relative w-16 h-16 mb-8">
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl rotate-3 group-hover:rotate-12 transition-transform duration-500 border border-white/5"></div>
                                        <div className="absolute inset-0 bg-navy-900/80 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center text-primary shadow-lg group-hover:border-primary/30 transition-colors duration-500">
                                            <Icon icon={card.icon} className="text-3xl drop-shadow-[0_0_10px_rgba(197,160,89,0.5)]" />
                                        </div>
                                    </div>
                                    <h3 className="font-display text-2xl text-white mb-4 font-bold group-hover:text-primary transition-colors">{card.title}</h3>
                                    <p className="text-slate-400 font-light leading-relaxed mb-6 text-sm">{card.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Diferenciais */}
                <section className="py-20 md:py-24 relative overflow-hidden bg-white" id="diferenciais">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-50 via-white to-white -z-10"></div>

                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid lg:grid-cols-12 gap-16 items-center">
                            <div className="lg:col-span-7">
                                <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 border border-primary/20 rounded-full bg-slate-50">
                                    <Icon icon="mdi:star-four-points" className="text-primary" />
                                    <span className="text-navy-900 font-sans text-xs tracking-[0.2em] uppercase font-bold">Autoridade no Assunto</span>
                                </div>

                                <h2 className="text-navy-900 font-display text-4xl md:text-5xl lg:text-6xl mb-10 leading-tight">
                                    Por que a <span className="text-primary">Advance</span> é a <br />
                                    escolha certa para você?
                                </h2>

                                <div className="space-y-6">
                                    {[
                                        { icon: 'mdi:hand-coin-outline', title: 'Melhores Ofertas Garantidas', desc: 'Monitoramos o mercado diariamente para garantir que nossa proposta seja a mais competitiva e justa para o seu ativo.' },
                                        { icon: 'mdi:rocket-launch-outline', title: 'Agilidade no Pagamento', desc: 'Sem filas ou burocracia desnecessária. Pagamento à vista no ato da assinatura da escritura pública. Pagamento após assinatura da cessão creditória em até 24 horas.' },
                                        { icon: 'mdi:shield-check-outline', title: 'Segurança Jurídica Total', desc: 'Processo auditado por equipe jurídica especializada, garantindo conformidade e tranquilidade para você.' },
                                        { icon: 'mdi:file-search-outline', title: 'Avaliação gratuita e sem compromisso', desc: 'Analisamos seu precatório e enviamos uma proposta de compra. Você decide com total tranquilidade: se não gostar da oferta, simplesmente não precisa aceitar.' },
                                    ].map((item, i) => (
                                        <div key={i} className="group bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex gap-6 items-start relative overflow-hidden">
                                            <div className="absolute right-0 top-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                                            <div className="w-16 h-16 rounded-xl bg-navy-900 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-300 shadow-lg">
                                                <Icon icon={item.icon} className="text-3xl text-primary group-hover:text-white transition-colors" />
                                            </div>
                                            <div className="relative z-10">
                                                <h4 className="font-display text-xl text-navy-900 font-bold mb-2">{item.title}</h4>
                                                <p className="text-slate-500 leading-relaxed text-sm">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="lg:col-span-5 relative">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/20 blur-3xl rounded-full -z-10"></div>

                                <div className="bg-navy-900 text-white p-10 rounded-2xl shadow-2xl relative overflow-hidden border border-white/10 transform hover:-translate-y-2 transition-transform duration-500">
                                    <div className="absolute inset-0 bg-cubes-pattern opacity-10"></div>

                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-6">
                                            <div>
                                                <p className="text-primary text-xs font-bold uppercase tracking-widest mb-1">Disponibilidade</p>
                                                <h3 className="font-display text-2xl font-bold">Atendimento Premium</h3>
                                            </div>
                                            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                                                <Icon icon="mdi:clock-check-outline" className="text-2xl" />
                                            </div>
                                        </div>

                                        <div className="space-y-4 mb-8">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-slate-400">Segunda a Sexta</span>
                                                <span className="font-bold text-white">09:00 - 18:00</span>
                                            </div>
                                            <div className="w-full bg-white/5 h-px"></div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-slate-400">Plantão WhatsApp</span>
                                                <span className="font-bold text-primary">24 Horas</span>
                                            </div>
                                        </div>

                                        <div className="bg-white/5 rounded-xl p-6 border border-white/5 mb-8">
                                            <p className="text-slate-300 text-sm leading-relaxed italic">
                                                Nossa equipe está pronta para tirar suas dúvidas a qualquer momento. Não hesite em nos chamar.
                                            </p>
                                        </div>

                                        <a href="#contato" className="w-full flex items-center justify-center gap-3 bg-primary text-navy-900 py-4 rounded-lg font-bold uppercase tracking-wider hover:bg-white transition-colors duration-300">
                                            <Icon icon="mdi:whatsapp" className="text-xl" />
                                            Falar com Especialista
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Passo a Passo */}
                <section id="passos" className="py-20 md:py-24 bg-navy-900 overflow-hidden relative">
                    <div className="absolute inset-0 bg-cubes-pattern opacity-5"></div>
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none animate-pulse"></div>

                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <div className="text-left md:text-center mb-24 reveal">
                            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 border border-primary/20 rounded-full bg-white/5 backdrop-blur-md">
                                <Icon icon="mdi:rocket-launch-outline" className="text-primary" />
                                <span className="text-primary font-sans text-xs tracking-[0.2em] uppercase font-bold">Processo Simplificado</span>
                            </div>
                            <h2 className="text-white font-display text-4xl md:text-5xl lg:text-6xl mb-4 leading-tight">
                                O caminho para vender seu precatório<br /><span className="text-gradient-gold italic">sem burocracia</span>
                            </h2>
                            <p className="text-slate-400 max-w-2xl mx-0 md:mx-auto text-lg font-light">Quatro etapas simples e seguras para transformar seu ativo judicial em dinheiro na conta.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                            {[
                                { num: '01', icon: 'mdi:phone-in-talk-outline', title: 'Contato Inicial', desc: 'Preencha o formulário em nosso site ou fale diretamente por WhatsApp com nossos consultores.', revealClass: 'reveal-left', animDelay: '' },
                                { num: '02', icon: 'mdi:file-document-edit-outline', title: 'Análise Jurídica', desc: 'Nossa equipe de especialistas irá analisar a situação do seu precatório detalhadamente para precificação.', revealClass: 'reveal-right', animDelay: '2.5s' },
                                { num: '03', icon: 'mdi:signature-freehand', title: 'Proposta e Cessão', desc: 'Após o aceite da nossa melhor oferta, a assinatura da cessão de crédito particular é online e a procuração pública é em cartório.', revealClass: 'reveal-left', animDelay: '5s' },
                                { num: '04', icon: 'mdi:cash-multiple', title: 'Pagamento à Vista', desc: 'Pagamento após assinatura da cessão de crédito em até 24 horas, via TED ou PIX direto na sua conta.', revealClass: 'reveal-right', animDelay: '7.5s' },
                            ].map((step, i) => (
                                <div key={i} className={`${step.revealClass} group relative`}>
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-blue-500/50 rounded-2xl blur opacity-20 group-hover:opacity-50 transition duration-1000 animate-tilt" style={step.animDelay ? { animationDelay: step.animDelay } : undefined}></div>
                                    <div className="relative bg-navy-800/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/10 transition-all duration-500 h-full">
                                        <span className="absolute -top-2 -right-2 font-display text-8xl font-bold text-white/10 group-hover:text-primary/20 transition-colors duration-500 z-0">{step.num}</span>
                                        <div className="relative z-10">
                                            <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6 border border-primary/20 group-hover:scale-110 transition-transform duration-300">
                                                <Icon icon={step.icon} className="text-3xl" />
                                            </div>
                                            <h4 className="text-white font-display text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{step.title}</h4>
                                            <p className="text-slate-400 font-light leading-relaxed">{step.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-20 md:py-24 bg-slate-50 relative" id="faq">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                            <div className="lg:col-span-5 reveal-left">
                                <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 border border-primary/20 rounded-full bg-white shadow-sm">
                                    <Icon icon="mdi:help-circle-outline" className="text-primary" />
                                    <span className="text-navy-900 font-sans text-xs tracking-[0.2em] uppercase font-bold">Dúvidas Comuns</span>
                                </div>
                                <h2 className="text-navy-900 font-display text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
                                    Respostas <span className="text-gradient-gold italic">diretas</span> para suas perguntas
                                </h2>
                                <p className="text-slate-600 text-lg font-light mb-10 leading-relaxed">
                                    Entendemos que o processo pode gerar dúvidas. Por isso, separamos as perguntas mais frequentes para te ajudar a tomar a melhor decisão com clareza e segurança.
                                </p>
                                <Link to="/perguntas-frequentes" className="btn-glow bg-navy-900 text-white font-bold px-10 py-4 uppercase tracking-widest hover:bg-primary hover:text-navy-900 transition-all rounded-sm text-sm hidden lg:flex items-center justify-center gap-2 w-full sm:w-auto">
                                    Ver todas as Dúvidas
                                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </Link>
                            </div>

                            <div className="lg:col-span-7 space-y-4 reveal-right">
                                {[
                                    { q: 'O que é um precatório?', a: 'Um precatório é um valor que você tem direito a receber após ganhar um processo contra o governo (União, estado ou município). Esse pagamento pode demorar anos, mas você pode antecipar esse dinheiro vendendo o precatório.' },
                                    { q: 'O que é o deságio e por que ele existe?', a: 'O deságio é um desconto aplicado sobre o valor de face do precatório. Ele representa o custo de oportunidade e o risco que o comprador assume ao adiantar o valor e aguardar o pagamento do governo, que pode levar anos. A Advance garante as taxas mais justas do mercado.' },
                                    { q: 'É legal vender meu precatório?', a: 'Sim, é 100% legal. A venda de precatórios é um direito do credor, garantido pela Constituição Federal (Art. 100, §§ 13 e 14). A operação é formalizada por uma Cessão de Crédito em cartório, conferindo total segurança jurídica.' },
                                    { q: 'Quando recebo o dinheiro?', a: 'O pagamento é realizado à vista, via TED ou PIX, em até 24 horas após a assinatura da cessão de crédito particular (online) e da procuração pública em cartório.' },
                                ].map((faq, i) => (
                                    <details key={i} className="card-light rounded-xl group">
                                        <summary className="flex justify-between items-center p-6 cursor-pointer select-none">
                                            <h3 className="text-navy-900 font-display text-lg font-medium group-hover:text-primary transition-colors">{faq.q}</h3>
                                            <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-transform duration-300 group-open:rotate-180">expand_more</span>
                                        </summary>
                                        <div className="px-6 pb-6 text-slate-600 font-light leading-relaxed border-t border-slate-100 pt-4">
                                            <p>{faq.a}</p>
                                        </div>
                                    </details>
                                ))}
                                <Link to="/perguntas-frequentes" className="btn-glow bg-navy-900 text-white font-bold px-10 py-4 uppercase tracking-widest hover:bg-primary hover:text-navy-900 transition-all rounded-sm text-sm flex lg:hidden items-center justify-center gap-2 w-full sm:w-auto mt-8">
                                    Ver todas as Dúvidas
                                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Depoimentos */}
                <section className="py-20 md:py-24 bg-navy-900 relative overflow-hidden" id="depoimentos">
                    <div className="absolute inset-0 bg-cubes-pattern opacity-5"></div>
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-navy-900 via-[#0f172a] to-navy-900"></div>
                    <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"></div>

                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <div className="text-left md:text-center mb-20 reveal">
                            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 border border-primary/30 rounded-full bg-white/5 backdrop-blur-md">
                                <Icon icon="solar:cup-star-bold" className="text-primary text-lg" />
                                <span className="text-primary font-sans text-xs tracking-[0.2em] uppercase font-bold">Histórias Reais</span>
                            </div>
                            <h2 className="text-white font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                                Quem confiou, <span className="text-gradient-gold italic">recebeu.</span>
                            </h2>
                            <p className="text-slate-400 text-lg font-light max-w-2xl mx-0 md:mx-auto">
                                A transparência e a agilidade que transformaram a vida de centenas de credores em todo o Brasil.
                            </p>
                        </div>

                        <div className="relative max-w-7xl mx-auto" id="testimonial-carousel">
                            <div className="overflow-hidden -mx-4 px-4 py-10">
                                <div className="testimonial-track" ref={trackRef}>
                                    {/* Slide 1 */}
                                    <div className="testimonial-slide">
                                        <div className="h-full bg-[#151F32] backdrop-blur-xl border border-white/10 p-8 rounded-2xl relative group hover:border-primary/50 transition-all duration-300 shadow-xl hover:shadow-primary/10 flex flex-col">
                                            <div className="absolute -top-4 right-8 bg-navy-900 border border-white/10 p-3 rounded-full text-primary shadow-lg group-hover:scale-110 transition-transform duration-300">
                                                <Icon icon="solar:quote-up-square-bold" className="text-2xl" />
                                            </div>
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="w-14 h-14 rounded-full p-[2px] bg-gradient-to-tr from-primary to-transparent">
                                                    <img src="https://ui-avatars.com/api/?name=Roberto+Mendes&background=C5A059&color=0B1120" alt="Roberto M." loading="lazy" decoding="async" className="w-full h-full rounded-full object-cover border-2 border-navy-900" />
                                                </div>
                                                <div>
                                                    <h4 className="text-white font-display font-bold text-lg">Roberto Mendes</h4>
                                                    <div className="flex items-center gap-2">
                                                        <p className="text-slate-500 text-xs uppercase tracking-wider font-bold">São Paulo, SP</p>
                                                        <span className="w-1 h-1 rounded-full bg-primary"></span>
                                                        <span className="text-green-500 text-xs flex items-center gap-0.5"><Icon icon="mdi:check-circle" /> Verificado</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-1 text-primary mb-4 text-sm">
                                                {[...Array(5)].map((_, i) => <Icon key={i} icon="solar:star-bold" />)}
                                            </div>
                                            <p className="text-slate-300 font-light leading-relaxed mb-8 flex-grow italic">
                                                "Eu não acreditava que receberia tão rápido. O processo foi transparente do início ao fim, e o dinheiro caiu na conta exatamente como combinado no cartório."
                                            </p>
                                            <div className="w-full h-px bg-white/5 mb-6"></div>
                                            <div className="flex justify-between items-center text-xs">
                                                <div className="bg-white/5 px-3 py-1.5 rounded-full border border-white/5 text-slate-300">
                                                    <span className="text-slate-500 uppercase font-bold mr-1">Ativo:</span> Federal (TRF-3)
                                                </div>
                                                <div className="bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20 text-primary font-bold">2 Dias Úteis</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Slide 2 (Destaque) */}
                                    <div className="testimonial-slide">
                                        <div className="h-full bg-gradient-to-b from-[#1a2336] to-[#0f1623] border border-primary/30 p-8 rounded-2xl relative group hover:border-primary/60 transition-all duration-300 shadow-2xl shadow-primary/5 flex flex-col transform md:-translate-y-2">
                                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-navy-900 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg z-20">Destaque da Semana</div>
                                            <div className="absolute -top-4 right-8 bg-navy-900 border border-primary/30 p-3 rounded-full text-primary shadow-lg group-hover:scale-110 transition-transform duration-300">
                                                <Icon icon="solar:quote-up-square-bold" className="text-2xl" />
                                            </div>
                                            <div className="flex items-center gap-4 mb-6 pt-2">
                                                <div className="w-14 h-14 rounded-full p-[2px] bg-gradient-to-tr from-primary to-transparent">
                                                    <img src="https://ui-avatars.com/api/?name=Ana+Lucia&background=C5A059&color=0B1120" alt="Ana Lúcia" loading="lazy" decoding="async" className="w-full h-full rounded-full object-cover border-2 border-navy-900" />
                                                </div>
                                                <div>
                                                    <h4 className="text-white font-display font-bold text-lg">Ana Lúcia</h4>
                                                    <div className="flex items-center gap-2">
                                                        <p className="text-slate-500 text-xs uppercase tracking-wider font-bold">Rio de Janeiro, RJ</p>
                                                        <span className="w-1 h-1 rounded-full bg-primary"></span>
                                                        <span className="text-green-500 text-xs flex items-center gap-0.5"><Icon icon="mdi:check-circle" /> Verificado</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-1 text-primary mb-4 text-sm">
                                                {[...Array(5)].map((_, i) => <Icon key={i} icon="solar:star-bold" />)}
                                            </div>
                                            <p className="text-slate-300 font-light leading-relaxed mb-8 flex-grow italic">
                                                "Consegui reformar minha loja com a venda do precatório. A equipe da Advance foi impecável, tirou todas as minhas dúvidas jurídicas. Recomendo demais!"
                                            </p>
                                            <div className="w-full h-px bg-white/5 mb-6"></div>
                                            <div className="flex justify-between items-center text-xs">
                                                <div className="bg-white/5 px-3 py-1.5 rounded-full border border-white/5 text-slate-300">
                                                    <span className="text-slate-500 uppercase font-bold mr-1">Ativo:</span> Estadual (RJ)
                                                </div>
                                                <div className="bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20 text-primary font-bold">5 Dias Úteis</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Slide 3 */}
                                    <div className="testimonial-slide">
                                        <div className="h-full bg-[#151F32] backdrop-blur-xl border border-white/10 p-8 rounded-2xl relative group hover:border-primary/50 transition-all duration-300 shadow-xl hover:shadow-primary/10 flex flex-col">
                                            <div className="absolute -top-4 right-8 bg-navy-900 border border-white/10 p-3 rounded-full text-primary shadow-lg group-hover:scale-110 transition-transform duration-300">
                                                <Icon icon="solar:quote-up-square-bold" className="text-2xl" />
                                            </div>
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="w-14 h-14 rounded-full p-[2px] bg-gradient-to-tr from-primary to-transparent">
                                                    <img src="https://ui-avatars.com/api/?name=Carlos+Ferreira&background=C5A059&color=0B1120" alt="Carlos F." loading="lazy" decoding="async" className="w-full h-full rounded-full object-cover border-2 border-navy-900" />
                                                </div>
                                                <div>
                                                    <h4 className="text-white font-display font-bold text-lg">Carlos Ferreira</h4>
                                                    <div className="flex items-center gap-2">
                                                        <p className="text-slate-500 text-xs uppercase tracking-wider font-bold">Belo Horizonte, MG</p>
                                                        <span className="w-1 h-1 rounded-full bg-primary"></span>
                                                        <span className="text-green-500 text-xs flex items-center gap-0.5"><Icon icon="mdi:check-circle" /> Verificado</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-1 text-primary mb-4 text-sm">
                                                {[...Array(5)].map((_, i) => <Icon key={i} icon="solar:star-bold" />)}
                                            </div>
                                            <p className="text-slate-300 font-light leading-relaxed mb-8 flex-grow italic">
                                                "Atendimento de primeira linha. Eu tinha receio de vender, mas a segurança que me passaram com o contrato e a análise gratuita foi decisiva."
                                            </p>
                                            <div className="w-full h-px bg-white/5 mb-6"></div>
                                            <div className="flex justify-between items-center text-xs">
                                                <div className="bg-white/5 px-3 py-1.5 rounded-full border border-white/5 text-slate-300">
                                                    <span className="text-slate-500 uppercase font-bold mr-1">Ativo:</span> Alimentar
                                                </div>
                                                <div className="bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20 text-primary font-bold">24 Horas</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Slide 4 */}
                                    <div className="testimonial-slide">
                                        <div className="h-full bg-[#151F32] backdrop-blur-xl border border-white/10 p-8 rounded-2xl relative group hover:border-primary/50 transition-all duration-300 shadow-xl hover:shadow-primary/10 flex flex-col">
                                            <div className="absolute -top-4 right-8 bg-navy-900 border border-white/10 p-3 rounded-full text-primary shadow-lg group-hover:scale-110 transition-transform duration-300">
                                                <Icon icon="solar:quote-up-square-bold" className="text-2xl" />
                                            </div>
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="w-14 h-14 rounded-full p-[2px] bg-gradient-to-tr from-primary to-transparent">
                                                    <img src="https://ui-avatars.com/api/?name=Fernanda+O&background=C5A059&color=0B1120" alt="Fernanda O." loading="lazy" decoding="async" className="w-full h-full rounded-full object-cover border-2 border-navy-900" />
                                                </div>
                                                <div>
                                                    <h4 className="text-white font-display font-bold text-lg">Fernanda Oliveira</h4>
                                                    <div className="flex items-center gap-2">
                                                        <p className="text-slate-500 text-xs uppercase tracking-wider font-bold">Curitiba, PR</p>
                                                        <span className="w-1 h-1 rounded-full bg-primary"></span>
                                                        <span className="text-green-500 text-xs flex items-center gap-0.5"><Icon icon="mdi:check-circle" /> Verificado</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-1 text-primary mb-4 text-sm">
                                                {[...Array(5)].map((_, i) => <Icon key={i} icon="solar:star-bold" />)}
                                            </div>
                                            <p className="text-slate-300 font-light leading-relaxed mb-8 flex-grow italic">
                                                "Estava precisando capitalizar minha empresa e a venda do precatório foi a solução ideal. Ótima taxa e equipe muito atenciosa."
                                            </p>
                                            <div className="w-full h-px bg-white/5 mb-6"></div>
                                            <div className="flex justify-between items-center text-xs">
                                                <div className="bg-white/5 px-3 py-1.5 rounded-full border border-white/5 text-slate-300">
                                                    <span className="text-slate-500 uppercase font-bold mr-1">Ativo:</span> Municipal
                                                </div>
                                                <div className="bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20 text-primary font-bold">3 Dias Úteis</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Slide 5 */}
                                    <div className="testimonial-slide">
                                        <div className="h-full bg-[#151F32] backdrop-blur-xl border border-white/10 p-8 rounded-2xl relative group hover:border-primary/50 transition-all duration-300 shadow-xl hover:shadow-primary/10 flex flex-col">
                                            <div className="absolute -top-4 right-8 bg-navy-900 border border-white/10 p-3 rounded-full text-primary shadow-lg group-hover:scale-110 transition-transform duration-300">
                                                <Icon icon="solar:quote-up-square-bold" className="text-2xl" />
                                            </div>
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="w-14 h-14 rounded-full p-[2px] bg-gradient-to-tr from-primary to-transparent">
                                                    <img src="https://ui-avatars.com/api/?name=Ricardo+S&background=C5A059&color=0B1120" alt="Ricardo S." loading="lazy" decoding="async" className="w-full h-full rounded-full object-cover border-2 border-navy-900" />
                                                </div>
                                                <div>
                                                    <h4 className="text-white font-display font-bold text-lg">Ricardo Santos</h4>
                                                    <div className="flex items-center gap-2">
                                                        <p className="text-slate-500 text-xs uppercase tracking-wider font-bold">Brasília, DF</p>
                                                        <span className="w-1 h-1 rounded-full bg-primary"></span>
                                                        <span className="text-green-500 text-xs flex items-center gap-0.5"><Icon icon="mdi:check-circle" /> Verificado</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-1 text-primary mb-4 text-sm">
                                                {[...Array(5)].map((_, i) => <Icon key={i} icon="solar:star-bold" />)}
                                            </div>
                                            <p className="text-slate-300 font-light leading-relaxed mb-8 flex-grow italic">
                                                "Transação segura e rápida. Fiquei impressionado com a seriedade da empresa. Recomendo para quem quer antecipar."
                                            </p>
                                            <div className="w-full h-px bg-white/5 mb-6"></div>
                                            <div className="flex justify-between items-center text-xs">
                                                <div className="bg-white/5 px-3 py-1.5 rounded-full border border-white/5 text-slate-300">
                                                    <span className="text-slate-500 uppercase font-bold mr-1">Ativo:</span> Federal
                                                </div>
                                                <div className="bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20 text-primary font-bold">48 Horas</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center gap-3 mt-4" ref={dotsRef}></div>
                        </div>

                        {/* Trust Strip */}
                        <div className="mt-20 border-t border-white/5 pt-12">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                                {[
                                    { icon: 'solar:users-group-rounded-linear', value: '+1.200', label: 'Clientes Atendidos' },
                                    { icon: 'solar:shield-check-linear', value: '100%', label: 'Segurança Jurídica' },
                                    { icon: 'solar:star-circle-linear', value: '4.9/5', label: 'Avaliação Google' },
                                    { icon: 'solar:wad-of-money-linear', value: 'R$ 500mi', label: 'Antecipados' },
                                ].map((stat, i) => (
                                    <div key={i} className="group">
                                        <div className="mb-2 flex justify-center">
                                            <Icon icon={stat.icon} className="text-3xl text-primary/50 group-hover:text-primary transition-colors" />
                                        </div>
                                        <h4 className="text-3xl font-display font-bold text-white mb-1">{stat.value}</h4>
                                        <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Parceiros */}
            <section className="py-16 bg-white border-y border-slate-100">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mb-12">
                        Parceiros que <span className="text-gradient-gold italic">confiam na Advance</span>
                    </h2>
                    <div className="group w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0%,_black_20%,_black_80%,transparent_100%)]">
                        {[0, 1].map((listIdx) => (
                            <ul key={listIdx} className="flex items-center justify-center [&_li]:mx-8 animate-infinite-scroll" aria-hidden={listIdx === 1 ? true : undefined}>
                                {[...Array(10)].map((_, i) => (
                                    <li key={i}><img src="/assets/logo_advance.svg" loading="lazy" decoding="async" className="h-10 max-w-none filter grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all" alt={`Logo Parceiro ${i + 1}`} /></li>
                                ))}
                            </ul>
                        ))}
                    </div>
                </div>
            </section>

            {/* Captura de Leads */}
            <section className="py-20 md:py-24 relative bg-navy-900 overflow-hidden" id="analise">
                <div className="absolute inset-0 bg-cubes-pattern opacity-5"></div>
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-12 gap-16 items-center">
                        <div className="lg:col-span-5 reveal-left">
                            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 border border-primary/30 rounded-full bg-white/5 backdrop-blur-md">
                                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                                <span className="text-primary font-sans text-xs tracking-[0.2em] uppercase font-bold">Análise Gratuita</span>
                            </div>

                            <h2 className="text-white font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
                                Inicie a análise do <br />
                                <span className="text-gradient-gold italic">seu ativo judicial</span>
                            </h2>

                            <p className="text-slate-400 text-lg mb-8 font-light leading-relaxed">
                                Preencha o formulário para receber uma proposta oficial de compra do seu precatório. Nossa equipe jurídica garante sigilo absoluto e retorno em até 24 horas.
                            </p>

                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center gap-3 text-slate-300 font-light">
                                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                        <Icon icon="solar:file-check-linear" className="text-base" />
                                    </div>
                                    Sem compromisso de venda
                                </li>
                                <li className="flex items-center gap-3 text-slate-300 font-light">
                                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                        <Icon icon="solar:shield-user-linear" className="text-base" />
                                    </div>
                                    Dados protegidos (LGPD)
                                </li>
                            </ul>
                        </div>

                        <div className="lg:col-span-7 reveal-right">
                            <div className="glass-panel p-6 md:p-10 rounded-2xl border border-white/10 relative bg-navy-800/60 backdrop-blur-xl shadow-2xl">
                                <form id="leadForm" className="space-y-5" onSubmit={handleLeadSubmit}>
                                    <div className="grid md:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label className="text-xs uppercase tracking-wider text-primary font-bold ml-1">Nome Completo</label>
                                            <input type="text" className="w-full bg-white border border-slate-200 rounded px-4 py-3 text-navy-900 placeholder-slate-600 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="Seu nome" required />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs uppercase tracking-wider text-primary font-bold ml-1">WhatsApp</label>
                                            <input type="tel" className="w-full bg-white border border-slate-200 rounded px-4 py-3 text-navy-900 placeholder-slate-600 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="(00) 00000-0000" onInput={mascaraTelefone} maxLength="15" required />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-wider text-primary font-bold ml-1">E-mail</label>
                                        <input type="email" className="w-full bg-white border border-slate-200 rounded px-4 py-3 text-navy-900 placeholder-slate-600 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="seu@email.com" required />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-wider text-primary font-bold ml-1">Valor Aproximado do Precatório</label>
                                        <input type="text" className="w-full bg-white border border-slate-200 rounded px-4 py-3 text-navy-900 placeholder-slate-600 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="R$ 0,00" onKeyUp={formatarMoeda} />
                                    </div>

                                    {leadSubmitState === 'success' ? (
                                        <div className="mt-4 bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-center">
                                            <Icon icon="mdi:check-circle" className="text-3xl text-green-400 mx-auto mb-1" />
                                            <p className="text-white font-bold">Solicitação enviada!</p>
                                            <p className="text-slate-400 text-sm">Nossa equipe entrará em contato em até 24 horas.</p>
                                        </div>
                                    ) : (
                                        <button type="submit" disabled={leadSubmitState === 'loading'} className="w-full btn-glow bg-primary text-navy-900 font-bold py-4 rounded uppercase tracking-widest hover:bg-white transition-all shadow-lg mt-4 group flex justify-center items-center gap-2 disabled:opacity-70">
                                            {leadSubmitState === 'loading' ? (
                                                <><Icon icon="mdi:loading" className="animate-spin" /> Enviando...</>
                                            ) : (
                                                <>Solicitar Proposta <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span></>
                                            )}
                                        </button>
                                    )}
                                    {leadSubmitState === 'error' && (
                                        <p className="text-red-400 text-xs text-center mt-2">Erro ao enviar. Tente por WhatsApp.</p>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
