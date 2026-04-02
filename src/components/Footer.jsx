import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

export default function Footer() {
    return (
        <footer className="bg-navy-900 text-slate-400 py-24 border-t border-white/5 relative bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#0a2238] to-navy-900" id="contato">
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid md:grid-cols-4 gap-16">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-3 mb-8">
                            <img src="/assets/logo_advance(branco).svg" alt="Advance Precatórios" className="h-16 w-auto" />
                        </div>
                        <p className="text-sm leading-relaxed mb-8 font-light text-slate-500">
                            Excelência no mercado de antecipação de ativos judiciais, com foco em transparência e no melhor retorno para o credor.
                        </p>
                        <div className="flex gap-4">
                            <a className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-primary hover:text-primary transition-all rounded-sm bg-white/5 hover:bg-white/10" href="#" aria-label="Facebook da Advance Precatórios">
                                <Icon icon="mdi:facebook" aria-hidden="true" />
                            </a>
                            <a className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-primary hover:text-primary transition-all rounded-sm bg-white/5 hover:bg-white/10" href="https://www.instagram.com/advance.precatorios/" aria-label="Instagram da Advance Precatórios">
                                <Icon icon="mdi:instagram" aria-hidden="true" />
                            </a>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <h4 className="text-white font-display text-lg mb-8 uppercase tracking-widest border-b border-primary/30 pb-2 inline-block">Links Rápidos</h4>
                        <ul className="space-y-4 text-sm font-light">
                            <li><Link className="hover:text-primary transition-colors hover:pl-2 duration-300 block" to="/">Início</Link></li>
                            <li><Link className="hover:text-primary transition-colors hover:pl-2 duration-300 block" to="/perguntas-frequentes">FAQ</Link></li>
                            <li><Link className="hover:text-primary transition-colors hover:pl-2 duration-300 block" to="/termos-de-uso">Termos de Uso</Link></li>
                            <li><Link className="hover:text-primary transition-colors hover:pl-2 duration-300 block" to="/politica-de-privacidade">Política de Privacidade</Link></li>
                            <li><Link className="hover:text-primary transition-colors hover:pl-2 duration-300 block" to="/carreiras">Trabalhe Conosco</Link></li>
                        </ul>
                    </div>
                    <div className="col-span-1 md:col-span-2">
                        <h4 className="text-white font-display text-lg mb-8 uppercase tracking-widest border-b border-primary pb-2 inline-block">Contato</h4>
                        <div className="space-y-5 text-sm font-light">
                            <p className="flex items-start gap-4"><span className="material-symbols-outlined text-primary text-sm mt-1">location_on</span> <span className="text-gray-400">SGAS | Setor de Grandes Áreas Sul 902 Edifício Athenas Bloco B, salas 125/126 - Asa Sul Brasília - DF, 70390-020</span></p>
                            <p className="flex items-center gap-4"><span className="material-symbols-outlined text-primary text-sm">mail</span> <a className="hover:text-white transition-colors" href="mailto:atendimento@advanceprecatorios.com.br">contato@advanceprecatorios.com.br</a></p>
                            <p className="flex items-center gap-4"><span className="material-symbols-outlined text-primary text-sm">call</span> <a className="hover:text-white transition-colors" href="tel:61993807943">(61) 99380-7943</a></p>
                            <p className="flex items-center gap-4"><span className="material-symbols-outlined text-primary text-sm">call</span> <a className="hover:text-white transition-colors" href="tel:61991336601">(61) 99133-6601</a></p>
                        </div>
                    </div>
                </div>
                <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-2 text-xs tracking-widest uppercase text-slate-600">
                    <p>© 2026 Direitos reservados Advance Precatórios</p>
                    <p>CNPJ: 52.807.251/0001-86</p>
                </div>
            </div>
        </footer>
    );
}
