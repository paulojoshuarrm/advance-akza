import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Icon } from '@iconify/react';

export default function NotFound() {
    return (
        <>
            <SEO
                title="Página não encontrada - Advance Precatórios"
                description="A página que você procura não foi encontrada."
                noindex
            />

            <section className="relative min-h-screen flex items-center justify-center bg-navy-900 overflow-hidden pt-24">
                {/* Background Effects */}
                <div className="absolute inset-0">
                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] animate-pulse"></div>
                    <div className="absolute bottom-0 right-0 w-[40%] h-[60%] rounded-full bg-primary/10 blur-[100px] opacity-60"></div>
                    <div className="absolute inset-0 bg-cubes-pattern opacity-[0.03]"></div>
                </div>

                <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
                    {/* 404 Number */}
                    <div className="relative mb-8">
                        <span className="font-display text-[12rem] md:text-[16rem] font-bold leading-none text-white/[0.03] select-none">404</span>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="font-display text-7xl md:text-9xl font-bold text-gradient-gold">404</span>
                        </div>
                    </div>

                    {/* Badge */}
                    <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 border border-primary/30 rounded-full bg-white/5 backdrop-blur-md shadow-[0_0_15px_rgba(197,160,89,0.15)]">
                        <Icon icon="mdi:alert-circle-outline" className="text-primary text-lg" />
                        <span className="text-primary font-sans text-xs tracking-[0.2em] uppercase font-bold">Página não encontrada</span>
                    </div>

                    {/* Title */}
                    <h1 className="text-white font-display text-3xl md:text-5xl font-bold mb-6 leading-tight">
                        Ops! Este caminho não <span className="italic text-gradient-gold">existe</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-slate-400 text-base md:text-lg mb-12 font-light leading-relaxed max-w-lg mx-auto">
                        A página que você está procurando pode ter sido movida, removida ou nunca existiu. Volte ao início e continue navegando com segurança.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                        <Link to="/" className="btn-glow bg-primary text-navy-900 font-bold px-8 py-4 uppercase tracking-widest hover:bg-white transition-all transform hover:-translate-y-1 rounded-sm text-sm shadow-[0_10px_30px_rgba(197,160,89,0.3)] flex items-center justify-center gap-2">
                            <Icon icon="material-symbols:home" />
                            Voltar ao Início
                        </Link>
                        <Link to="/contato" className="border border-white/20 text-white font-bold px-8 py-4 uppercase tracking-widest hover:border-primary hover:text-primary transition-all transform hover:-translate-y-1 rounded-sm text-sm flex items-center justify-center gap-2 backdrop-blur-sm bg-white/5">
                            <Icon icon="material-symbols:mail" />
                            Falar Conosco
                        </Link>
                    </div>

                    {/* Trust Indicators */}
                    <div className="mt-16 flex items-center justify-center gap-6 text-sm text-slate-500 font-light">
                        <div className="flex items-center gap-2">
                            <Icon icon="mdi:shield-check-outline" className="text-primary/60 text-lg" />
                            <span>Processo Seguro</span>
                        </div>
                        <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                        <div className="flex items-center gap-2">
                            <Icon icon="mdi:flash-outline" className="text-primary/60 text-lg" />
                            <span>Pagamento à Vista</span>
                        </div>
                    </div>
                </div>

                {/* Wave Divider */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-30" style={{ transform: 'translateY(1px)' }}>
                    <svg className="relative block w-full h-[80px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M0,95 C400,50 800,120 1200,95 V120 H0 Z" className="fill-navy-900"></path>
                    </svg>
                </div>
            </section>
        </>
    );
}
