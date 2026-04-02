import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <>
            {/* Navegação */}
            <nav className="fixed top-0 w-full z-50 glass-panel transition-all duration-300">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-3">
                        <img src="/assets/logo_advance.svg" alt="Advance Precatórios" className="h-16 w-auto" />
                    </Link>
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-widest text-slate-600 uppercase">
                        <Link className="hover:text-primary transition-colors duration-300 relative group" to="/">
                            Início
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                        </Link>
                        <Link className="hover:text-primary transition-colors duration-300 relative group" to="/sobre">
                            Sobre
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                        </Link>
                        <Link className="hover:text-primary transition-colors duration-300 relative group" to="/nossa-equipe">
                            Nossa Equipe
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                        </Link>
                        <Link className="hover:text-primary transition-colors duration-300 relative group" to="/perguntas-frequentes">
                            FAQ
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                        </Link>
                        <Link className="hover:text-primary transition-colors duration-300 relative group" to="/contato">
                            Contato
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                        </Link>
                        <div className="flex items-center gap-4">
                            <a href="https://facebook.com/advanceprecatorios" aria-label="Facebook da Advance Precatórios" title="Facebook" className="hover:text-primary transition-colors duration-300">
                                <Icon icon="mdi:facebook" className="text-2xl" aria-hidden="true" />
                            </a>
                            <a href="https://www.instagram.com/advance.precatorios/" aria-label="Instagram da Advance Precatórios" title="Instagram" className="hover:text-primary transition-colors duration-300">
                                <Icon icon="mdi:instagram" className="text-2xl" aria-hidden="true" />
                            </a>
                        </div>
                    </div>
                    <button className="md:hidden text-navy-900 p-2" onClick={() => setMobileOpen(true)} aria-label="Abrir menu de navegação">
                        <span className="material-symbols-outlined text-3xl">menu</span>
                    </button>
                </div>
            </nav>

            {/* Menu Mobile */}
            <div className={`fixed inset-0 z-[110] bg-navy-900/95 backdrop-blur-xl transform transition-transform duration-300 md:hidden flex flex-col h-full ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-white/5">
                    <img src="/assets/logo_advance(branco).svg" alt="Advance Precatórios" className="h-10 w-auto" />
                    <button className="text-slate-400 hover:text-white transition-colors p-2" onClick={() => setMobileOpen(false)} aria-label="Fechar menu de navegação">
                        <span className="material-symbols-outlined text-3xl">close</span>
                    </button>
                </div>

                {/* Scrollable Links */}
                <div className="flex-1 overflow-y-auto py-6 px-6 space-y-6">
                    <nav className="flex flex-col space-y-2">
                        <Link className="flex items-center gap-4 text-lg font-display text-primary bg-primary/10 transition-colors p-3 rounded-lg group" to="/" onClick={() => setMobileOpen(false)}>
                            <span className="material-symbols-outlined text-primary group-hover:text-primary transition-colors">home</span> Início
                        </Link>
                        <Link className="flex items-center gap-4 text-lg font-display text-white hover:text-primary transition-colors p-3 rounded-lg hover:bg-white/5 group" to="/sobre" onClick={() => setMobileOpen(false)}>
                            <span className="material-symbols-outlined text-slate-500 group-hover:text-primary transition-colors">business</span> Sobre
                        </Link>
                        <Link className="flex items-center gap-4 text-lg font-display text-white hover:text-primary transition-colors p-3 rounded-lg hover:bg-white/5 group" to="/nossa-equipe" onClick={() => setMobileOpen(false)}>
                            <span className="material-symbols-outlined text-slate-500 group-hover:text-primary transition-colors">groups</span> Nossa Equipe
                        </Link>
                        <Link className="flex items-center gap-4 text-lg font-display text-white hover:text-primary transition-colors p-3 rounded-lg hover:bg-white/5 group" to="/perguntas-frequentes" onClick={() => setMobileOpen(false)}>
                            <span className="material-symbols-outlined text-slate-500 group-hover:text-primary transition-colors">help</span> FAQ
                        </Link>
                        <Link className="flex items-center gap-4 text-lg font-display text-white hover:text-primary transition-colors p-3 rounded-lg hover:bg-white/5 group" to="/contato" onClick={() => setMobileOpen(false)}>
                            <span className="material-symbols-outlined text-slate-500 group-hover:text-primary transition-colors">mail</span> Contato
                        </Link>
                    </nav>

                    <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                    <div className="space-y-4 px-3">
                        <a href="tel:61993807943" className="flex items-center gap-3 text-slate-400 hover:text-primary transition-colors text-sm">
                            <Icon icon="mdi:phone" /> (61) 99380-7943
                        </a>
                        <a href="mailto:atendimento@advanceprecatorios.com.br" className="flex items-center gap-3 text-slate-400 hover:text-primary transition-colors text-sm">
                            <Icon icon="mdi:email" /> atendimento@advanceprecatorios.com.br
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
