import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import useRevealAnimation from '../hooks/useRevealAnimation';
import { Icon } from '@iconify/react';

export default function NossaEquipe() {
    useRevealAnimation();

    return (
        <>
            <SEO
                title="Nossa Equipe - Advance Precatórios"
                description="Conheça a equipe de especialistas da Advance Precatórios. Advogados e consultores dedicados a garantir a melhor e mais segura negociação para o seu ativo judicial."
                url="https://www.advanceprecatorios.com.br/nossa-equipe"
                canonical="https://www.advanceprecatorios.com.br/nossa-equipe"
                image="https://www.advanceprecatorios.com.br/assets/og-image.jpg"
            />

            {/* Header / Hero */}
            <header className="relative pt-40 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-navy-900">
                <div className="absolute inset-0 bg-cubes-pattern opacity-10"></div>
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px]"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 text-left md:text-center reveal">
                    <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 border border-primary/30 rounded-full bg-white/5 backdrop-blur-md">
                        <Icon icon="mdi:account-group-outline" className="text-primary" />
                        <span className="text-primary font-sans text-xs tracking-[0.2em] uppercase font-bold">Quem Faz Acontecer</span>
                    </div>
                    <h1 className="text-white font-display text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                        Excelência Humana <br />
                        <span className="text-gradient-gold italic">e Expertise Jurídica</span>
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-0 md:mx-auto font-light leading-relaxed">
                        Conheça os especialistas dedicados a transformar seus ativos judiciais em oportunidades reais, com segurança, ética e transparência.
                    </p>
                </div>
            </header>

            {/* Team Grid Section */}
            <section className="py-16 md:py-20 relative bg-slate-50">
                {/* Decorative Background */}
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-white via-slate-50 to-slate-100 -z-10"></div>

                <div className="max-w-7xl mx-auto px-6">

                    {/* Leadership */}
                    <div className="mb-20">
                        <div className="text-left md:text-center mb-12 reveal">
                            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 border border-slate-200 rounded-full bg-white shadow-sm">
                                <Icon icon="mdi:account-tie" className="text-primary" />
                                <span className="text-navy-900 font-sans text-xs tracking-[0.2em] uppercase font-bold">Liderança</span>
                            </div>
                            <h2 className="text-navy-900 font-display text-3xl md:text-5xl font-bold">
                                Sócios & <span className="text-gradient-gold italic">Diretoria</span>
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:w-4/5 xl:w-2/3 mx-auto">

                            {/* Member 1 */}
                            <div className="team-card group relative bg-white rounded-xl overflow-hidden shadow-lg border border-slate-100 reveal">
                                <div className="relative h-96 overflow-hidden bg-navy-900">
                                    <img src="assets/DSC04733.webp" alt="Dr. Diego Dutra" loading="lazy" decoding="async" className="member-photo w-full h-full object-cover object-top" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent opacity-80"></div>
                                </div>
                                <div className="p-8 text-center relative bg-white">
                                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-primary text-navy-900 px-4 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm shadow-lg">
                                        Sócio Administrador
                                    </div>
                                    <h3 className="text-2xl text-navy-900 font-display font-bold mb-4">Diego Dutra</h3>
                                    <p className="text-slate-500 text-sm font-light leading-relaxed">
                                        Especialista em Direito Constitucional com mais de 15 anos de experiência em precatórios federais e estaduais.
                                    </p>
                                </div>
                            </div>

                            {/* Member 2 */}
                            <div className="team-card group relative bg-white rounded-xl overflow-hidden shadow-lg border border-slate-100 reveal" style={{ transitionDelay: '100ms' }}>
                                <div className="relative h-80 sm:h-96 overflow-hidden bg-navy-900">
                                    <img src="assets/Advogado_1.webp" alt="Dr. Italo Nóbrega" loading="lazy" decoding="async" className="member-photo w-full h-full object-cover object-top" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent opacity-80"></div>
                                </div>
                                <div className="p-8 text-center relative bg-white">
                                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-primary text-navy-900 px-4 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm shadow-lg">
                                        Sócio Jurídico
                                    </div>
                                    <h3 className="text-2xl text-navy-900 font-display font-bold mb-1">Dr. Italo Nóbrega</h3>
                                    <p className="text-primary text-xs font-bold uppercase tracking-widest mb-4">OAB/DF 24.925</p>
                                    <p className="text-slate-500 text-sm font-light leading-relaxed">
                                        Focada em análise de riscos e compliance, garantindo segurança total e transparência em cada negociação.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Specialists Grid */}
                    <div>
                        <div className="text-left md:text-center mb-12 reveal">
                            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 border border-slate-200 rounded-full bg-white shadow-sm">
                                <Icon icon="mdi:account-star-outline" className="text-primary" />
                                <span className="text-navy-900 font-sans text-xs tracking-[0.2em] uppercase font-bold">Time de Alta Performance</span>
                            </div>
                            <h2 className="text-navy-900 font-display text-3xl md:text-5xl font-bold">
                                Especialistas & <span className="text-gradient-gold italic">Suporte</span>
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                            {/* Specialist 1 */}
                            <div className="team-card group relative bg-white rounded-xl overflow-hidden shadow-lg border border-slate-100 reveal">
                                <div className="relative h-80 sm:h-96 overflow-hidden bg-navy-900">
                                    <img src="assets/DSC04918.webp" alt="Mariana Souza" loading="lazy" decoding="async" className="member-photo w-full h-full object-cover object-top" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent opacity-80"></div>
                                </div>
                                <div className="p-8 text-center relative bg-white">
                                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-navy-700 text-white px-4 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm shadow-lg">
                                        Consultora comercial
                                    </div>
                                    <h3 className="text-2xl text-navy-900 font-display font-bold mt-4 mb-4">Beatriz Souza</h3>
                                    <p className="text-slate-500 text-sm font-light leading-relaxed">
                                        Ponto de contato principal para nossos clientes, garantindo uma experiência fluida e satisfatória do início ao fim.
                                    </p>
                                </div>
                            </div>

                            {/* Specialist 2 */}
                            <div className="team-card group relative bg-white rounded-xl overflow-hidden shadow-lg border border-slate-100 reveal" style={{ transitionDelay: '100ms' }}>
                                <div className="relative h-80 sm:h-96 overflow-hidden bg-navy-900">
                                    <img src="assets/DSC04856.webp" alt="Dra. Thaís Santos" loading="lazy" decoding="async" className="member-photo w-full h-full object-cover object-top" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent opacity-80"></div>
                                </div>
                                <div className="p-8 text-center relative bg-white">
                                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-navy-700 text-white px-4 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm shadow-lg">
                                        Advogada
                                    </div>
                                    <h3 className="text-2xl text-navy-900 font-display font-bold mt-4 mb-4">Dra. Thaís Santos</h3>
                                    <p className="text-slate-500 text-sm font-light leading-relaxed">
                                        Responsável pela análise de viabilidade e estruturação financeira das operações de cessão de crédito.
                                    </p>
                                </div>
                            </div>

                            {/* Specialist 3 */}
                            <div className="team-card group relative bg-white rounded-xl overflow-hidden shadow-lg border border-slate-100 reveal" style={{ transitionDelay: '200ms' }}>
                                <div className="relative h-80 sm:h-96 overflow-hidden bg-navy-900">
                                    <img src="assets/DSC05045.webp" alt="Dr. Bruno Mansur" loading="lazy" decoding="async" className="member-photo w-full h-full object-cover object-top" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent opacity-80"></div>
                                </div>
                                <div className="p-8 text-center relative bg-white">
                                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-navy-700 text-white px-4 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm shadow-lg">
                                        Advogado
                                    </div>
                                    <h3 className="text-2xl text-navy-900 font-display font-bold mt-4 mb-4">Dr. Bruno Mansur </h3>
                                    <p className="text-slate-500 text-sm font-light leading-relaxed">
                                        Assegura que todas as operações sigam as mais rigorosas normas de conformidade e ética do mercado.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="pt-20 pb-32 md:pt-24 md:pb-40 bg-white relative overflow-hidden">
                <div className="absolute inset-0 bg-cubes-pattern opacity-[0.02]"></div>
                <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -translate-y-1/2"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">

                        {/* Left Content */}
                        <div className="reveal-left text-left">
                            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 border border-slate-200 rounded-full bg-white shadow-sm">
                                <Icon icon="mdi:rocket-launch-outline" className="text-primary" />
                                <span className="text-navy-900 font-sans text-xs tracking-[0.2em] uppercase font-bold">Junte-se a Nós</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl text-navy-900 font-display font-bold mb-6">
                                Quer fazer parte <br /> deste <span className="text-gradient-gold italic">time de elite?</span>
                            </h2>
                            <p className="text-slate-600 mb-10 font-light text-lg leading-relaxed max-w-xl">
                                Estamos sempre em busca de talentos excepcionais que compartilham nossos valores de ética, transparência e excelência para transformar o mercado de ativos judiciais.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-start items-start">
                                <Link to="/carreiras" className="btn-glow bg-primary text-navy-900 font-bold px-10 py-4 uppercase tracking-widest hover:bg-navy-900 hover:text-white transition-all rounded-sm shadow-lg shadow-primary/30 flex items-center justify-center gap-2">
                                    Ver Vagas Abertas
                                    <Icon icon="material-symbols:arrow-forward" className="text-lg" />
                                </Link>
                                <Link to="/contato" className="px-10 py-4 uppercase tracking-widest text-navy-900 border border-navy-900/20 hover:bg-navy-900 hover:text-white transition-all rounded-sm font-bold flex items-center justify-center">
                                    Fale Conosco
                                </Link>
                            </div>
                        </div>

                        {/* Right Image */}
                        <div className="reveal-right relative mt-12 lg:mt-0">
                            <div className="max-w-md mx-auto lg:max-w-none lg:mx-0">
                                <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-transparent rounded-3xl blur-xl opacity-70"></div>
                                <div className="relative rounded-2xl overflow-hidden border-4 border-white shadow-2xl group transform -rotate-2 hover:rotate-0 transition-transform duration-700">
                                    <img src="assets/DSC04791.webp" alt="Equipe colaborando" loading="lazy" decoding="async" className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 p-6">
                                        <p className="text-white font-display text-xl italic">Inovação e colaboração <br /> em nosso DNA.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
