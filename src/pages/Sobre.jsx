import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Icon } from '@iconify/react';
import useRevealAnimation from '../hooks/useRevealAnimation';

export default function Sobre() {
    useRevealAnimation();

    return (
        <>
            <SEO
                title="Sobre Nós - Advance Precatórios"
                description="Conheça a história, missão, visão e valores da Advance Precatórios. Entenda por que somos referência em confiança e excelência na antecipação de ativos judiciais."
                url="https://www.advanceprecatorios.com.br/sobre"
                canonical="https://www.advanceprecatorios.com.br/sobre"
                image="https://www.advanceprecatorios.com.br/assets/og-image.jpg"
                structuredData={{
                    "@context": "https://schema.org",
                    "@type": "AboutPage",
                    "name": "Sobre a Advance Precatórios",
                    "url": "https://www.advanceprecatorios.com.br/sobre",
                    "description": "Conheça a história, missão, visão e valores da Advance Precatórios.",
                    "publisher": {
                        "@type": "Organization",
                        "name": "Advance Precatórios",
                        "url": "https://www.advanceprecatorios.com.br",
                        "logo": "https://www.advanceprecatorios.com.br/assets/logo_advance.svg"
                    }
                }}
            />

            {/* Header / Hero */}
            <header className="relative pt-40 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-navy-900">
                <div className="absolute inset-0 bg-cubes-pattern opacity-10"></div>
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px]"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 text-left md:text-center reveal">
                    <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 border border-primary/30 rounded-full bg-white/5 backdrop-blur-md">
                        <Icon icon="mdi:domain" className="text-primary" />
                        <span className="text-primary font-sans text-xs tracking-[0.2em] uppercase font-bold">Nossa História</span>
                    </div>
                    <h1 className="text-white font-display text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                        Um Legado de <br />
                        <span className="text-gradient-gold italic">Confiança e Excelência</span>
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-0 md:mx-auto font-light leading-relaxed">
                        Conheça a trajetória da Advance Precatórios e como nos tornamos referência nacional na antecipação de ativos judiciais.
                    </p>
                </div>
            </header>

            {/* History Section */}
            <section className="py-16 md:py-20 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                    <div className="reveal-left">
                        <h2 className="text-navy-900 font-display text-3xl md:text-4xl font-bold mb-6">
                            Transformando o mercado <br /> com <span className="text-primary italic">inovação e ética</span>
                        </h2>
                        <div className="space-y-6 text-slate-600 font-light text-lg leading-relaxed">
                            <p>
                                A Advance Precatórios nasceu da união de advogados experientes e especialistas financeiros que identificaram uma lacuna crítica no mercado: a falta de transparência e humanidade no tratamento com os credores de precatórios.
                            </p>
                            <p>
                                Desde 2015, nossa missão tem sido clara: oferecer liquidez imediata para quem esperou anos pela justiça, mas fazendo isso de forma justa. Diferente das práticas predatórias comuns no setor, estabelecemos um padrão de negociação onde o credor é o protagonista.
                            </p>
                            <p>
                                Hoje, com mais de R$ 500 milhões em ativos negociados, orgulhamo-nos de ser uma instituição que alia solidez financeira com um atendimento verdadeiramente consultivo e personalizado.
                            </p>
                        </div>
                    </div>
                    <div className="reveal-right relative">
                        <div className="absolute inset-0 bg-primary/10 transform rotate-3 rounded-2xl"></div>
                        <img src="assets/DSC04823.webp" alt="Escritório Advance" loading="lazy" decoding="async" className="relative z-10 rounded-2xl shadow-2xl border border-slate-100" />
                    </div>
                </div>
            </section>

            {/* Mission, Vision, Values */}
            <section className="py-16 md:py-24 bg-navy-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-cubes-pattern opacity-5"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-left md:text-center mb-16 reveal">
                        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 border border-primary/20 rounded-full bg-white/5 backdrop-blur-md">
                            <Icon icon="mdi:pillar" className="text-primary" />
                            <span className="text-primary font-sans text-xs tracking-[0.2em] uppercase font-bold">Nossos Fundamentos</span>
                        </div>
                        <h2 className="text-white font-display text-3xl md:text-5xl font-bold mb-6">
                            Pilares da <span className="text-gradient-gold italic">Nossa Excelência</span>
                        </h2>
                        <p className="text-slate-400 font-light max-w-2xl md:mx-auto text-lg">Os fundamentos que guiam cada decisão, garantindo a integridade e o sucesso de cada negociação.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Missão */}
                        <div className="group relative bg-navy-800/50 backdrop-blur-xl border border-white/5 p-10 rounded-3xl hover:bg-navy-800 transition-all duration-500 hover:shadow-[0_20px_50px_-12px_rgba(197,160,89,0.15)] hover:-translate-y-2 reveal">
                            <span className="absolute top-8 right-8 font-display text-8xl font-bold text-white/5 group-hover:text-primary/10 transition-colors duration-500 z-0">01</span>
                            <div className="relative z-10">
                                <div className="w-20 h-20 rounded-2xl bg-navy-900/50 border border-white/10 flex items-center justify-center mb-8 shadow-lg group-hover:border-primary/30 transition-colors">
                                    <Icon icon="solar:hand-money-linear" className="text-4xl text-primary drop-shadow-[0_0_10px_rgba(197,160,89,0.5)]" />
                                </div>
                                <h3 className="text-2xl font-display font-bold text-white mb-4 group-hover:text-primary transition-colors">Missão</h3>
                                <p className="text-slate-300 font-light leading-relaxed">
                                    Prover liquidez e justiça financeira aos credores do Estado, transformando títulos judiciais em capital imediato através de negociações transparentes, ágeis e seguras.
                                </p>
                            </div>
                        </div>

                        {/* Visão */}
                        <div className="group relative bg-navy-800/50 backdrop-blur-xl border border-white/5 p-10 rounded-3xl hover:bg-navy-800 transition-all duration-500 hover:shadow-[0_20px_50px_-12px_rgba(197,160,89,0.15)] hover:-translate-y-2 reveal" style={{ transitionDelay: '100ms' }}>
                            <span className="absolute top-8 right-8 font-display text-8xl font-bold text-white/5 group-hover:text-primary/10 transition-colors duration-500 z-0">02</span>
                            <div className="relative z-10">
                                <div className="w-20 h-20 rounded-2xl bg-navy-900/50 border border-white/10 flex items-center justify-center mb-8 shadow-lg group-hover:border-primary/30 transition-colors">
                                    <Icon icon="solar:crown-star-linear" className="text-4xl text-primary drop-shadow-[0_0_10px_rgba(197,160,89,0.5)]" />
                                </div>
                                <h3 className="text-2xl font-display font-bold text-white mb-4 group-hover:text-primary transition-colors">Visão</h3>
                                <p className="text-slate-300 font-light leading-relaxed">
                                    Ser reconhecida nacionalmente como a instituição mais confiável e inovadora no mercado de ativos judiciais, estabelecendo novos padrões de excelência e ética no setor.
                                </p>
                            </div>
                        </div>

                        {/* Valores */}
                        <div className="group relative bg-navy-800/50 backdrop-blur-xl border border-white/5 p-10 rounded-3xl hover:bg-navy-800 transition-all duration-500 hover:shadow-[0_20px_50px_-12px_rgba(197,160,89,0.15)] hover:-translate-y-2 reveal" style={{ transitionDelay: '200ms' }}>
                            <span className="absolute top-8 right-8 font-display text-8xl font-bold text-white/5 group-hover:text-primary/10 transition-colors duration-500 z-0">03</span>
                            <div className="relative z-10">
                                <div className="w-20 h-20 rounded-2xl bg-navy-900/50 border border-white/10 flex items-center justify-center mb-8 shadow-lg group-hover:border-primary/30 transition-colors">
                                    <Icon icon="solar:shield-check-linear" className="text-4xl text-primary drop-shadow-[0_0_10px_rgba(197,160,89,0.5)]" />
                                </div>
                                <h3 className="text-2xl font-display font-bold text-white mb-4 group-hover:text-primary transition-colors">Valores</h3>
                                <p className="text-slate-300 font-light leading-relaxed">
                                    Integridade inegociável, transparência absoluta em cada contrato, foco na satisfação do cliente e excelência técnica em todas as análises jurídicas.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Leadership / Directory */}
            <section className="py-16 md:py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-left md:text-center mb-20 reveal">
                        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 border border-slate-200 rounded-full bg-white shadow-sm">
                            <Icon icon="mdi:account-tie" className="text-primary" />
                            <span className="text-navy-900 font-sans text-xs tracking-[0.2em] uppercase font-bold">Nossa Liderança</span>
                        </div>
                        <h2 className="text-navy-900 font-display text-3xl md:text-5xl font-bold mb-4">Nossa <span className="text-gradient-gold italic">Diretoria Executiva</span></h2>
                        <p className="text-slate-600 font-light max-w-2xl md:mx-auto text-lg">Liderança experiente comprometida com a segurança e a valorização do seu patrimônio.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:w-4/5 xl:w-2/3 mx-auto">
                        {/* Member 1 */}
                        <div className="team-card group relative bg-white rounded-xl overflow-hidden shadow-lg border border-slate-100 reveal">
                            <div className="relative h-80 sm:h-96 overflow-hidden bg-navy-900">
                                <img src="assets/DSC04733.webp" alt="Dr. Diego Dutra" loading="lazy" decoding="async" className="member-photo w-full h-full object-cover object-top" />
                                <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent opacity-80"></div>
                            </div>
                            <div className="p-8 text-center relative bg-white">
                                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-primary text-navy-900 px-4 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm shadow-lg">
                                    Sócio Administrador
                                </div>
                                <h3 className="text-2xl text-navy-900 font-display font-bold mb-4">Diego Dutra</h3>
                                <p className="text-slate-500 text-sm font-light leading-relaxed">
                                    Focado em análise de riscos e compliance, garantindo segurança total e transparência em cada negociação.
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
                                    Especialista em Direito Constitucional com mais de 15 anos de experiência em precatórios federais e estaduais.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feedbacks / Success Stories */}
            <section className="py-16 md:py-24 bg-navy-900 relative border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-left md:text-center mb-16 reveal">
                        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 border border-primary/20 rounded-full bg-white/5 backdrop-blur-md">
                            <Icon icon="mdi:heart-multiple-outline" className="text-primary" />
                            <span className="text-primary font-sans text-xs tracking-[0.2em] uppercase font-bold">Satisfação Garantida</span>
                        </div>
                        <h2 className="text-white font-display text-3xl md:text-5xl font-bold mb-4">
                            Histórias de <span className="text-gradient-gold italic">Sucesso</span>
                        </h2>
                        <p className="text-slate-400 font-light text-lg max-w-2xl md:mx-auto">
                            Junte-se a centenas de credores que transformaram seus precatórios em liquidez imediata e realizaram seus sonhos.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feedback 1 */}
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-xl hover:border-primary/30 transition-all duration-300 reveal">
                            <div className="flex gap-1 text-primary mb-6">
                                <Icon icon="mdi:star" /><Icon icon="mdi:star" /><Icon icon="mdi:star" /><Icon icon="mdi:star" /><Icon icon="mdi:star" />
                            </div>
                            <p className="text-slate-300 font-light italic mb-6">{'"'}A Advance foi a única empresa que me explicou cada detalhe do contrato. O pagamento caiu na conta no mesmo dia do cartório. Recomendo de olhos fechados.{'"'}</p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">MJ</div>
                                <div>
                                    <p className="text-white font-bold text-sm">Maria José</p>
                                    <p className="text-slate-500 text-xs">Precatório Federal - SP</p>
                                </div>
                            </div>
                        </div>

                        {/* Feedback 2 */}
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-xl hover:border-primary/30 transition-all duration-300 reveal" style={{ transitionDelay: '100ms' }}>
                            <div className="flex gap-1 text-primary mb-6">
                                <Icon icon="mdi:star" /><Icon icon="mdi:star" /><Icon icon="mdi:star" /><Icon icon="mdi:star" /><Icon icon="mdi:star" />
                            </div>
                            <p className="text-slate-300 font-light italic mb-6">{'"'}Profissionalismo impecável. A Dra. Camila tirou todas as minhas dúvidas jurídicas e me senti muito seguro para realizar a venda do meu ativo.{'"'}</p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">CS</div>
                                <div>
                                    <p className="text-white font-bold text-sm">Carlos Silva</p>
                                    <p className="text-slate-500 text-xs">Precatório Federal - RJ</p>
                                </div>
                            </div>
                        </div>

                        {/* Feedback 3 */}
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-xl hover:border-primary/30 transition-all duration-300 reveal" style={{ transitionDelay: '200ms' }}>
                            <div className="flex gap-1 text-primary mb-6">
                                <Icon icon="mdi:star" /><Icon icon="mdi:star" /><Icon icon="mdi:star" /><Icon icon="mdi:star" /><Icon icon="mdi:star" />
                            </div>
                            <p className="text-slate-300 font-light italic mb-6">{'"'}Consegui investir no meu negócio graças à agilidade da Advance. O processo foi muito mais rápido do que eu imaginava. Gratidão a toda equipe.{'"'}</p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">RM</div>
                                <div>
                                    <p className="text-white font-bold text-sm">Roberto Mendes</p>
                                    <p className="text-slate-500 text-xs">Precatório Federal- MG</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
