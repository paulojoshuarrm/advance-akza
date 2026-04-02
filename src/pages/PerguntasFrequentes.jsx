import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import useRevealAnimation from '../hooks/useRevealAnimation';

export default function PerguntasFrequentes() {
    useRevealAnimation();

    return (
        <>
            <SEO
                title="Perguntas Frequentes - Advance Precatórios"
                description="Respostas para as dúvidas mais comuns sobre a venda de precatórios federais, estaduais e municipais. Entenda o processo, o deságio e a segurança jurídica."
                url="https://www.advanceprecatorios.com.br/perguntas-frequentes"
                canonical="https://www.advanceprecatorios.com.br/perguntas-frequentes"
                image="https://www.advanceprecatorios.com.br/assets/og-image.jpg"
                structuredData={{
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": [
                        {
                            "@type": "Question",
                            "name": "O que é um Precatório?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Precatórios são requisições de pagamento expedidas pelo Judiciário para cobrar de municípios, estados ou da União o pagamento de valores devidos após condenação judicial definitiva. É a forma como o governo paga suas dívidas judiciais acima de um certo valor."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "Como funciona a venda do meu precatório?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "O processo é simples: 1. Entre em contato conosco; 2. Nossa equipe faz uma análise jurídica e apresenta uma proposta formalizada no mesmo dia; 3. A assinatura da cessão de crédito particular é online e a procuração pública é em cartório; 4. O pagamento é feito em até 24 horas após a assinatura."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "O que é o deságio?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "O deságio é o desconto aplicado sobre o valor total do precatório para que a antecipação seja viável. O percentual varia de acordo com o tipo do precatório, o ente devedor e a previsão de pagamento."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "Posso vender apenas uma parte do meu precatório?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Sim! É possível realizar a cessão parcial do seu crédito. Você pode antecipar uma porcentagem para resolver necessidades imediatas e manter o restante para receber futuramente do governo."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "É legal vender meu precatório?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Sim, a cessão de créditos de precatórios é totalmente legal no Brasil, sendo expressamente permitida pela Constituição Federal (Art. 100, §13). Todos os contratos são formalizados em cartório com plena segurança jurídica."
                            }
                        }
                    ]
                }}
            />

            <header className="relative pt-28 sm:pt-32 md:pt-40 pb-12 md:pb-20 overflow-hidden bg-navy-900">
                <div className="absolute inset-0 bg-cubes-pattern opacity-10"></div>
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px]"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 text-left md:text-center">
                    <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 border border-primary/30 rounded-full bg-white/5 backdrop-blur-md">
                        <span className="material-symbols-outlined text-primary">help_outline</span>
                        <span className="text-primary font-sans text-xs tracking-[0.2em] uppercase font-bold">Central de Ajuda</span>
                    </div>
                    <h1 className="text-white font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                        Desvendando o universo <br />
                        <span className="text-gradient-gold italic">dos Precatórios</span>
                    </h1>
                    <p className="text-slate-400 text-lg max-w-3xl mx-0 md:mx-auto font-light leading-relaxed">
                        Reunimos as respostas para as dúvidas mais comuns sobre a venda de precatórios, o processo jurídico e os pagamentos. Tudo para que você tome a melhor decisão com total segurança e clareza.
                    </p>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 md:px-6 pt-10 pb-24 md:pt-16 md:pb-32 relative z-10">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                    {/* Sidebar de Navegação Rápida */}
                    <div className="hidden lg:block lg:col-span-4 space-y-8">
                        <div className="sticky top-32">
                            <div className="hidden lg:block">
                                <h3 className="text-navy-900 font-display text-2xl mb-6">Categorias</h3>
                                <div className="space-y-2">
                                    <a href="#geral" className="flex items-center gap-3 p-4 rounded-sm bg-white border border-slate-200 hover:border-primary hover:text-primary transition-all shadow-sm">
                                        <span className="material-symbols-outlined">info</span>
                                        <span className="font-medium">Sobre Precatórios</span>
                                    </a>
                                    <a href="#venda" className="flex items-center gap-3 p-4 rounded-sm bg-white border border-slate-200 hover:border-primary hover:text-primary transition-all shadow-sm">
                                        <span className="material-symbols-outlined">sell</span>
                                        <span className="font-medium">Processo de Venda</span>
                                    </a>
                                    <a href="#juridico" className="flex items-center gap-3 p-4 rounded-sm bg-white border border-slate-200 hover:border-primary hover:text-primary transition-all shadow-sm">
                                        <span className="material-symbols-outlined">gavel</span>
                                        <span className="font-medium">Segurança Jurídica</span>
                                    </a>
                                    <a href="#pagamento" className="flex items-center gap-3 p-4 rounded-sm bg-white border border-slate-200 hover:border-primary hover:text-primary transition-all shadow-sm">
                                        <span className="material-symbols-outlined">payments</span>
                                        <span className="font-medium">Pagamento e Prazos</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Conteúdo das Perguntas */}
                    <div className="lg:col-span-8 space-y-16">

                        {/* Navegação Mobile (Visível apenas em telas pequenas) */}
                        <nav aria-label="Navegação de tópicos da FAQ" className="lg:hidden mb-8 overflow-hidden">
                            <h3 className="text-navy-900 font-display text-xl mb-4">Navegue por tópicos</h3>
                            <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x scroll-pl-4 px-1">
                                <a href="#geral" className="snap-start shrink-0 flex items-center gap-2 px-4 py-3 rounded-lg bg-white border border-slate-200 text-navy-900 shadow-sm whitespace-nowrap active:bg-slate-50 transition-colors">
                                    <span className="material-symbols-outlined text-primary">info</span> Sobre
                                </a>
                                <a href="#venda" className="snap-start shrink-0 flex items-center gap-2 px-4 py-3 rounded-lg bg-white border border-slate-200 text-navy-900 shadow-sm whitespace-nowrap active:bg-slate-50 transition-colors">
                                    <span className="material-symbols-outlined text-primary">sell</span> Venda
                                </a>
                                <a href="#juridico" className="snap-start shrink-0 flex items-center gap-2 px-4 py-3 rounded-lg bg-white border border-slate-200 text-navy-900 shadow-sm whitespace-nowrap active:bg-slate-50 transition-colors">
                                    <span className="material-symbols-outlined text-primary">gavel</span> Jurídico
                                </a>
                                <a href="#pagamento" className="snap-start shrink-0 flex items-center gap-2 px-4 py-3 rounded-lg bg-white border border-slate-200 text-navy-900 shadow-sm whitespace-nowrap active:bg-slate-50 transition-colors">
                                    <span className="material-symbols-outlined text-primary">payments</span> Pagamento
                                </a>
                            </div>
                        </nav>

                        {/* Seção Geral */}
                        <section id="geral" className="scroll-mt-20 md:scroll-mt-32">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="material-symbols-outlined text-primary text-3xl">info</span>
                                <h2 className="text-navy-900 font-display text-2xl sm:text-3xl">Sobre Precatórios</h2>
                            </div>
                            <div className="space-y-4">
                                <details className="bg-white border border-slate-200 rounded-lg group transition-all duration-300 ease-in-out overflow-hidden hover:border-primary/50 group-open:border-primary/50 group-open:shadow-xl group-open:shadow-primary/10 active:scale-[0.99] md:active:scale-100">
                                    <summary className="flex justify-between items-center p-5 md:p-6 cursor-pointer list-none select-none">
                                        <h3 className="text-navy-900 font-display text-base md:text-lg font-medium group-hover:text-primary group-open:text-primary transition-colors flex-1 pr-4 text-left leading-snug">O que é um Precatório?</h3>
                                        <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-primary/10 flex items-center justify-center shrink-0 transition-colors">
                                            <span className="material-symbols-outlined text-slate-500 group-hover:text-primary group-open:text-primary transition-transform duration-300 group-open:rotate-180">expand_more</span>
                                        </div>
                                    </summary>
                                    <div className="grid grid-rows-[0fr] group-open:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-in-out">
                                        <div className="overflow-hidden">
                                            <div className="px-4 md:px-6 pb-6 text-slate-600 font-light leading-relaxed text-sm prose prose-slate max-w-none prose-p:font-light">
                                                <p>Precatórios são requisições de pagamento expedidas pelo Judiciário para cobrar de municípios, estados ou da União, assim como de autarquias e fundações, o pagamento de valores devidos após condenação judicial definitiva. Basicamente, é a forma como o governo paga suas dívidas judiciais acima de um certo valor (geralmente 60 salários mínimos para a União).</p>
                                            </div>
                                        </div>
                                    </div>
                                </details>

                                <details className="bg-white border border-slate-200 rounded-lg group transition-all duration-300 ease-in-out overflow-hidden hover:border-primary/50 group-open:border-primary/50 group-open:shadow-xl group-open:shadow-primary/10 active:scale-[0.99] md:active:scale-100">
                                    <summary className="flex justify-between items-center p-5 md:p-6 cursor-pointer list-none select-none">
                                        <h3 className="text-navy-900 font-display text-base md:text-lg font-medium group-hover:text-primary group-open:text-primary transition-colors flex-1 pr-4 text-left leading-snug">Qual a diferença entre Precatório e RPV?</h3>
                                        <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-primary/10 flex items-center justify-center shrink-0 transition-colors">
                                            <span className="material-symbols-outlined text-slate-500 group-hover:text-primary group-open:text-primary transition-transform duration-300 group-open:rotate-180">expand_more</span>
                                        </div>
                                    </summary>
                                    <div className="grid grid-rows-[0fr] group-open:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-in-out">
                                        <div className="overflow-hidden">
                                            <div className="px-4 md:px-6 pb-6 text-slate-600 font-light leading-relaxed text-sm prose prose-slate max-w-none prose-p:font-light">
                                                <p>A principal diferença é o valor e o prazo de pagamento. As RPVs (Requisições de Pequeno Valor) são para dívidas menores (até 60 salários mínimos no âmbito federal) e costumam ser pagas em até 60 dias. Já os precatórios são para valores acima desse teto e entram em uma fila cronológica de pagamento que pode levar anos.</p>
                                            </div>
                                        </div>
                                    </div>
                                </details>

                                <details className="bg-white border border-slate-200 rounded-lg group transition-all duration-300 ease-in-out overflow-hidden hover:border-primary/50 group-open:border-primary/50 group-open:shadow-xl group-open:shadow-primary/10 active:scale-[0.99] md:active:scale-100">
                                    <summary className="flex justify-between items-center p-5 md:p-6 cursor-pointer list-none select-none">
                                        <h3 className="text-navy-900 font-display text-base md:text-lg font-medium group-hover:text-primary group-open:text-primary transition-colors flex-1 pr-4 text-left leading-snug">O que são Precatórios Federais, Estaduais e Municipais?</h3>
                                        <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-primary/10 flex items-center justify-center shrink-0 transition-colors">
                                            <span className="material-symbols-outlined text-slate-500 group-hover:text-primary group-open:text-primary transition-transform duration-300 group-open:rotate-180">expand_more</span>
                                        </div>
                                    </summary>
                                    <div className="grid grid-rows-[0fr] group-open:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-in-out">
                                        <div className="overflow-hidden">
                                            <div className="px-4 md:px-6 pb-6 text-slate-600 font-light leading-relaxed text-sm prose prose-slate max-w-none prose-p:font-light">
                                                <p>A classificação depende de quem é o devedor. Precatórios Federais são dívidas da União (INSS, Governo Federal). Estaduais são dívidas dos Estados, e Municipais, das Prefeituras. A Advance Precatórios é especializada principalmente em Precatórios Federais, que possuem maior liquidez e segurança.</p>
                                            </div>
                                        </div>
                                    </div>
                                </details>
                            </div>
                        </section>

                        {/* Seção Venda */}
                        <section id="venda" className="scroll-mt-20 md:scroll-mt-32">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="material-symbols-outlined text-primary text-3xl">sell</span>
                                <h2 className="text-navy-900 font-display text-2xl sm:text-3xl">Processo de Venda</h2>
                            </div>
                            <div className="space-y-4">
                                <details className="bg-white border border-slate-200 rounded-lg group transition-all duration-300 ease-in-out overflow-hidden hover:border-primary/50 group-open:border-primary/50 group-open:shadow-xl group-open:shadow-primary/10 active:scale-[0.99] md:active:scale-100">
                                    <summary className="flex justify-between items-center p-5 md:p-6 cursor-pointer list-none">
                                        <h3 className="text-navy-900 font-display text-base md:text-lg font-medium group-hover:text-primary group-open:text-primary transition-colors flex-1 pr-4 leading-snug">Como funciona a venda do meu precatório?</h3>
                                        <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-primary/10 flex items-center justify-center shrink-0 transition-colors">
                                            <span className="material-symbols-outlined text-slate-500 group-hover:text-primary group-open:text-primary transition-transform duration-300 group-open:rotate-180">expand_more</span>
                                        </div>
                                    </summary>
                                    <div className="grid grid-rows-[0fr] group-open:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-in-out">
                                        <div className="overflow-hidden">
                                            <div className="px-4 md:px-6 pb-6 text-slate-600 font-light leading-relaxed text-sm prose prose-slate max-w-none prose-p:font-light">
                                                <p>O processo é simples e transparente: 1. Você entra em contato conosco; 2. Nossa equipe faz uma análise jurídica e apresenta uma proposta formalizada no mesmo dia; 3. Aceitando a proposta, a assinatura da cessão de crédito particular é online e a procuração pública é em cartório; 4. O pagamento é feito em até 24 horas após a assinatura.</p>
                                            </div>
                                        </div>
                                    </div>
                                </details>

                                <details className="bg-white border border-slate-200 rounded-lg group transition-all duration-300 ease-in-out overflow-hidden hover:border-primary/50 group-open:border-primary/50 group-open:shadow-xl group-open:shadow-primary/10 active:scale-[0.99] md:active:scale-100">
                                    <summary className="flex justify-between items-center p-5 md:p-6 cursor-pointer list-none">
                                        <h3 className="text-navy-900 font-display text-base md:text-lg font-medium group-hover:text-primary group-open:text-primary transition-colors flex-1 pr-4 leading-snug">O que é o deságio?</h3>
                                        <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-primary/10 flex items-center justify-center shrink-0 transition-colors">
                                            <span className="material-symbols-outlined text-slate-500 group-hover:text-primary group-open:text-primary transition-transform duration-300 group-open:rotate-180">expand_more</span>
                                        </div>
                                    </summary>
                                    <div className="grid grid-rows-[0fr] group-open:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-in-out">
                                        <div className="overflow-hidden">
                                            <div className="px-4 md:px-6 pb-6 text-slate-600 font-light leading-relaxed text-sm prose prose-slate max-w-none prose-p:font-light">
                                                <p>O deságio é o desconto aplicado sobre o valor total do precatório para que a antecipação seja viável. É a margem que remunera o investidor que irá aguardar o pagamento pelo governo. O percentual varia de acordo com o tipo do precatório, o ente devedor e a previsão de pagamento.</p>
                                            </div>
                                        </div>
                                    </div>
                                </details>

                                <details className="bg-white border border-slate-200 rounded-lg group transition-all duration-300 ease-in-out overflow-hidden hover:border-primary/50 group-open:border-primary/50 group-open:shadow-xl group-open:shadow-primary/10 active:scale-[0.99] md:active:scale-100">
                                    <summary className="flex justify-between items-center p-5 md:p-6 cursor-pointer list-none">
                                        <h3 className="text-navy-900 font-display text-base md:text-lg font-medium group-hover:text-primary group-open:text-primary transition-colors flex-1 pr-4 leading-snug">Posso vender apenas uma parte do meu precatório?</h3>
                                        <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-primary/10 flex items-center justify-center shrink-0 transition-colors">
                                            <span className="material-symbols-outlined text-slate-500 group-hover:text-primary group-open:text-primary transition-transform duration-300 group-open:rotate-180">expand_more</span>
                                        </div>
                                    </summary>
                                    <div className="grid grid-rows-[0fr] group-open:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-in-out">
                                        <div className="overflow-hidden">
                                            <div className="px-4 md:px-6 pb-6 text-slate-600 font-light leading-relaxed text-sm prose prose-slate max-w-none prose-p:font-light">
                                                <p>Sim! É possível realizar a cessão parcial do seu crédito. Você pode antecipar uma porcentagem para resolver necessidades imediatas e manter o restante para receber futuramente do governo.</p>
                                            </div>
                                        </div>
                                    </div>
                                </details>
                            </div>
                        </section>

                        {/* Seção Jurídico */}
                        <section id="juridico" className="scroll-mt-20 md:scroll-mt-32">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="material-symbols-outlined text-primary text-3xl">gavel</span>
                                <h2 className="text-navy-900 font-display text-2xl sm:text-3xl">Segurança e Jurídico</h2>
                            </div>
                            <div className="space-y-4">
                                <details className="bg-white border border-slate-200 rounded-lg group transition-all duration-300 ease-in-out overflow-hidden hover:border-primary/50 group-open:border-primary/50 group-open:shadow-xl group-open:shadow-primary/10 active:scale-[0.99] md:active:scale-100">
                                    <summary className="flex justify-between items-center p-5 md:p-6 cursor-pointer list-none">
                                        <h3 className="text-navy-900 font-display text-base md:text-lg font-medium group-hover:text-primary group-open:text-primary transition-colors flex-1 pr-4 leading-snug">É legal vender meu precatório?</h3>
                                        <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-primary/10 flex items-center justify-center shrink-0 transition-colors">
                                            <span className="material-symbols-outlined text-slate-500 group-hover:text-primary group-open:text-primary transition-transform duration-300 group-open:rotate-180">expand_more</span>
                                        </div>
                                    </summary>
                                    <div className="grid grid-rows-[0fr] group-open:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-in-out">
                                        <div className="overflow-hidden">
                                            <div className="px-4 md:px-6 pb-6 text-slate-600 font-light leading-relaxed text-sm prose prose-slate max-w-none prose-p:font-light">
                                                <p>Sim, é totalmente legal. A venda de precatórios é prevista na Constituição Federal (Art. 100, § 13 e 14). Trata-se de uma Cessão de Crédito, um instrumento jurídico regulamentado e seguro.</p>
                                            </div>
                                        </div>
                                    </div>
                                </details>

                                <details className="bg-white border border-slate-200 rounded-lg group transition-all duration-300 ease-in-out overflow-hidden hover:border-primary/50 group-open:border-primary/50 group-open:shadow-xl group-open:shadow-primary/10 active:scale-[0.99] md:active:scale-100">
                                    <summary className="flex justify-between items-center p-5 md:p-6 cursor-pointer list-none">
                                        <h3 className="text-navy-900 font-display text-base md:text-lg font-medium group-hover:text-primary group-open:text-primary transition-colors flex-1 pr-4 leading-snug">Preciso da autorização do meu advogado para vender?</h3>
                                        <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-primary/10 flex items-center justify-center shrink-0 transition-colors">
                                            <span className="material-symbols-outlined text-slate-500 group-hover:text-primary group-open:text-primary transition-transform duration-300 group-open:rotate-180">expand_more</span>
                                        </div>
                                    </summary>
                                    <div className="grid grid-rows-[0fr] group-open:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-in-out">
                                        <div className="overflow-hidden">
                                            <div className="px-4 md:px-6 pb-6 text-slate-600 font-light leading-relaxed text-sm prose prose-slate max-w-none prose-p:font-light">
                                                <p>Não é obrigatória a autorização, pois o crédito é seu. No entanto, a Advance Precatórios preza pela ética e transparência, e sempre recomendamos que seu advogado seja informado. Inclusive, os honorários contratuais do seu advogado são preservados e destacados no momento da cessão.</p>
                                            </div>
                                        </div>
                                    </div>
                                </details>

                                <details className="bg-white border border-slate-200 rounded-lg group transition-all duration-300 ease-in-out overflow-hidden hover:border-primary/50 group-open:border-primary/50 group-open:shadow-xl group-open:shadow-primary/10 active:scale-[0.99] md:active:scale-100">
                                    <summary className="flex justify-between items-center p-5 md:p-6 cursor-pointer list-none">
                                        <h3 className="text-navy-900 font-display text-base md:text-lg font-medium group-hover:text-primary group-open:text-primary transition-colors flex-1 pr-4 leading-snug">Quais documentos são necessários?</h3>
                                        <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-primary/10 flex items-center justify-center shrink-0 transition-colors">
                                            <span className="material-symbols-outlined text-slate-500 group-hover:text-primary group-open:text-primary transition-transform duration-300 group-open:rotate-180">expand_more</span>
                                        </div>
                                    </summary>
                                    <div className="grid grid-rows-[0fr] group-open:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-in-out">
                                        <div className="overflow-hidden">
                                            <div className="px-4 md:px-6 pb-6 text-slate-600 font-light leading-relaxed text-sm prose prose-slate max-w-none prose-p:font-light">
                                                <p>Para a análise inicial, precisamos apenas do número do processo. Para a formalização da venda, solicitamos: RG, CPF, Comprovante de Residência, Estado Civil e dados bancários para o pagamento.</p>
                                            </div>
                                        </div>
                                    </div>
                                </details>
                            </div>
                        </section>

                        {/* Seção Pagamento */}
                        <section id="pagamento" className="scroll-mt-20 md:scroll-mt-32">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="material-symbols-outlined text-primary text-3xl">payments</span>
                                <h2 className="text-navy-900 font-display text-2xl sm:text-3xl">Pagamento e Prazos</h2>
                            </div>
                            <div className="space-y-4">
                                <details className="bg-white border border-slate-200 rounded-lg group transition-all duration-300 ease-in-out overflow-hidden hover:border-primary/50 group-open:border-primary/50 group-open:shadow-xl group-open:shadow-primary/10 active:scale-[0.99] md:active:scale-100">
                                    <summary className="flex justify-between items-center p-5 md:p-6 cursor-pointer list-none">
                                        <h3 className="text-navy-900 font-display text-base md:text-lg font-medium group-hover:text-primary group-open:text-primary transition-colors flex-1 pr-4 leading-snug">Quando recebo o dinheiro?</h3>
                                        <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-primary/10 flex items-center justify-center shrink-0 transition-colors">
                                            <span className="material-symbols-outlined text-slate-500 group-hover:text-primary group-open:text-primary transition-transform duration-300 group-open:rotate-180">expand_more</span>
                                        </div>
                                    </summary>
                                    <div className="grid grid-rows-[0fr] group-open:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-in-out">
                                        <div className="overflow-hidden">
                                            <div className="px-4 md:px-6 pb-6 text-slate-600 font-light leading-relaxed text-sm prose prose-slate max-w-none prose-p:font-light">
                                                <p>O pagamento é realizado à vista, via TED ou PIX, em até 24 horas após a assinatura da cessão de crédito particular (online) e da procuração pública em cartório.</p>
                                            </div>
                                        </div>
                                    </div>
                                </details>

                                <details className="bg-white border border-slate-200 rounded-lg group transition-all duration-300 ease-in-out overflow-hidden hover:border-primary/50 group-open:border-primary/50 group-open:shadow-xl group-open:shadow-primary/10 active:scale-[0.99] md:active:scale-100">
                                    <summary className="flex justify-between items-center p-5 md:p-6 cursor-pointer list-none">
                                        <h3 className="text-navy-900 font-display text-base md:text-lg font-medium group-hover:text-primary group-open:text-primary transition-colors flex-1 pr-4 leading-snug">Tenho que pagar imposto sobre a venda?</h3>
                                        <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-primary/10 flex items-center justify-center shrink-0 transition-colors">
                                            <span className="material-symbols-outlined text-slate-500 group-hover:text-primary group-open:text-primary transition-transform duration-300 group-open:rotate-180">expand_more</span>
                                        </div>
                                    </summary>
                                    <div className="grid grid-rows-[0fr] group-open:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-in-out">
                                        <div className="overflow-hidden">
                                            <div className="px-4 md:px-6 pb-6 text-slate-600 font-light leading-relaxed text-sm prose prose-slate max-w-none prose-p:font-light">
                                                <p>Pode haver incidência de Imposto de Renda sobre o ganho de capital, dependendo do valor da venda e das isenções aplicáveis. Nossa equipe jurídica orientará você sobre como proceder na sua declaração anual, garantindo conformidade fiscal.</p>
                                            </div>
                                        </div>
                                    </div>
                                </details>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </>
    );
}
