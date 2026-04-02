import useBackToTop from '../hooks/useBackToTop';
import { Icon } from '@iconify/react';

export default function FloatingActions() {
    useBackToTop();

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4 items-end">
            {/* Back to Top */}
            <button id="backToTop" className="w-12 h-12 bg-navy-900 text-primary border border-primary/30 rounded-full shadow-lg flex items-center justify-center opacity-0 invisible translate-y-10 transition-all duration-300 hover:bg-primary hover:text-navy-900 hover:-translate-y-1" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Voltar ao topo">
                <span className="material-symbols-outlined">arrow_upward</span>
            </button>

            {/* WhatsApp */}
            <a href="https://wa.me/5561993807943" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] flex items-center justify-center hover:scale-110 transition-transform duration-300 relative group" aria-label="Fale conosco no WhatsApp">
                <Icon icon="mdi:whatsapp" className="text-3xl" />
                <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white text-navy-900 text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-sm">
                    Fale Conosco
                </span>
            </a>
        </div>
    );
}
