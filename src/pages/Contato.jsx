import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import useRevealAnimation from '../hooks/useRevealAnimation';
import SEO from '../components/SEO';

export default function Contato() {
  useRevealAnimation();

  return (
    <>
      <SEO
        title="Fale Conosco - Advance Precatórios"
        description="Entre em contato com a Advance Precatórios. Nossa equipe de especialistas está pronta para atender você por telefone, e-mail, WhatsApp ou em nosso escritório em Brasília."
        url="https://www.advanceprecatorios.com.br/contato"
        canonical="https://www.advanceprecatorios.com.br/contato"
        image="https://www.advanceprecatorios.com.br/assets/og-image.jpg"
        structuredData={{
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Fale Conosco - Advance Precatórios",
            "url": "https://www.advanceprecatorios.com.br/contato",
            "description": "Entre em contato com a Advance Precatórios.",
            "publisher": {
                "@type": "Organization",
                "name": "Advance Precatórios",
                "url": "https://www.advanceprecatorios.com.br",
                "telephone": "+55-61-99133-6601",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "SGAS 902, Edifício Athenas Bloco B, salas 125/126",
                    "addressLocality": "Brasília",
                    "addressRegion": "DF",
                    "postalCode": "70390-020",
                    "addressCountry": "BR"
                }
            }
        }}
      />

      {/* Header / Hero */}
      <header className="relative pt-40 pb-16 md:pt-40 md:pb-20 overflow-hidden bg-navy-900">
        <div className="absolute inset-0 bg-cubes-pattern opacity-10"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px]"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-left md:text-center reveal">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 border border-primary/30 rounded-full bg-white/5 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-primary font-sans text-xs tracking-[0.2em] uppercase font-bold">Canais Oficiais</span>
          </div>
          <h1 className="text-white font-display text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Estamos prontos para <br />
            <span className="text-gradient-gold italic">atender você</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-0 md:mx-auto font-light leading-relaxed">
            Tire suas dúvidas, agende uma reunião presencial ou inicie seu atendimento online com nossa equipe de especialistas.
          </p>
        </div>
      </header>

      {/* Contact Cards */}
      <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-100 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Phone */}
            <a href="tel:+5561993807943" className="card-light group relative p-6 rounded-2xl reveal text-center block h-full flex flex-col justify-center items-center hover:-translate-y-2 transition-transform duration-300">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <div className="relative w-20 h-20 mb-6 mx-auto shrink-0">
                <div className="absolute inset-0 bg-primary/5 rounded-2xl rotate-12 group-hover:rotate-6 transition-transform duration-500 border border-primary/10"></div>
                <div className="absolute inset-0 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-primary shadow-md group-hover:border-primary/30 transition-colors duration-500">
                  <Icon icon="mdi:phone-in-talk-outline" className="text-4xl" />
                </div>
              </div>
              <h3 className="font-display text-2xl text-navy-900 mb-3 font-bold group-hover:text-primary transition-colors">Telefone</h3>
              <p className="text-slate-600 font-light leading-relaxed mb-6 text-sm flex-grow">Atendimento de Seg. a Sex. das 9h às 18h</p>
              <span className="text-primary font-bold text-base md:text-lg group-hover:text-navy-900 transition-colors whitespace-nowrap">(61) 99380-7943</span>
            </a>

            {/* Email */}
            <a href="mailto:contato@advanceprecatorios.com.br" className="card-light group relative p-6 rounded-2xl reveal text-center block h-full flex flex-col justify-center items-center hover:-translate-y-2 transition-transform duration-300" style={{ transitionDelay: '100ms' }}>
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <div className="relative w-20 h-20 mb-6 mx-auto shrink-0">
                <div className="absolute inset-0 bg-primary/5 rounded-2xl rotate-12 group-hover:rotate-6 transition-transform duration-500 border border-primary/10"></div>
                <div className="absolute inset-0 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-primary shadow-md group-hover:border-primary/30 transition-colors duration-500">
                  <Icon icon="mdi:email-outline" className="text-4xl" />
                </div>
              </div>
              <h3 className="font-display text-2xl text-navy-900 mb-3 font-bold group-hover:text-primary transition-colors">E-mail</h3>
              <p className="text-slate-600 font-light leading-relaxed mb-6 text-sm flex-grow">Envie documentos ou solicite propostas</p>
              <span className="text-primary font-bold text-sm md:text-base group-hover:text-navy-900 transition-colors break-words w-full">contato@advanceprecatorios.com.br</span>
            </a>

            {/* WhatsApp */}
            <a href="https://wa.me/5561993807943" target="_blank" rel="noopener noreferrer" className="card-light group relative p-6 rounded-2xl reveal text-center block h-full flex flex-col justify-center items-center hover:-translate-y-2 transition-transform duration-300" style={{ transitionDelay: '200ms' }}>
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <div className="relative w-20 h-20 mb-6 mx-auto shrink-0">
                <div className="absolute inset-0 bg-primary/5 rounded-2xl rotate-12 group-hover:rotate-6 transition-transform duration-500 border border-primary/10"></div>
                <div className="absolute inset-0 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-primary shadow-md group-hover:border-primary/30 transition-colors duration-500">
                  <Icon icon="mdi:whatsapp" className="text-4xl" />
                </div>
              </div>
              <h3 className="font-display text-2xl text-navy-900 mb-3 font-bold group-hover:text-primary transition-colors">WhatsApp</h3>
              <p className="text-slate-600 font-light leading-relaxed mb-6 text-sm flex-grow">Plantão 24h para urgências</p>
              <span className="text-primary font-bold text-base md:text-lg group-hover:text-navy-900 transition-colors">Iniciar Conversa</span>
            </a>
          </div>
        </div>
      </section>

      {/* Location & Social */}
      <section className="py-16 md:py-24 bg-navy-900 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Info */}
            <div className="reveal-left">
              <div className="flex items-center gap-3 mb-6">
                <Icon icon="mdi:map-marker-radius-outline" className="text-3xl text-primary" />
                <h2 className="text-white font-display text-3xl font-bold">Nossa Sede</h2>
              </div>
              <p className="text-slate-400 text-lg leading-relaxed mb-8 font-light">
                Estamos localizados no coração de Brasília, próximos aos principais tribunais superiores. Venha tomar um café conosco e conhecer nossa estrutura.
              </p>

              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <Icon icon="mdi:office-building-marker-outline" className="text-primary text-xl mt-1" />
                  <div>
                    <h4 className="text-white font-bold mb-1">Endereço</h4>
                    <p className="text-slate-400 text-sm">SGAS | Setor de Grandes Áreas Sul 902 Edifício Athenas Bloco B, salas 125/126 - Asa Sul Brasília - DF, 70390-020</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Icon icon="mdi:clock-outline" className="text-primary text-xl mt-1" />
                  <div>
                    <h4 className="text-white font-bold mb-1">Horário de Funcionamento</h4>
                    <p className="text-slate-400 text-sm">Segunda a Sexta: 09:00 às 18:00</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 border border-white/10 rounded-lg flex items-center justify-center text-slate-400 hover:bg-primary hover:text-navy-900 hover:border-primary transition-all duration-300">
                  <Icon icon="mdi:instagram" className="text-2xl" />
                </a>
                <a href="#" className="w-12 h-12 border border-white/10 rounded-lg flex items-center justify-center text-slate-400 hover:bg-primary hover:text-navy-900 hover:border-primary transition-all duration-300">
                  <Icon icon="mdi:linkedin" className="text-2xl" />
                </a>
                <a href="#" className="w-12 h-12 border border-white/10 rounded-lg flex items-center justify-center text-slate-400 hover:bg-primary hover:text-navy-900 hover:border-primary transition-all duration-300">
                  <Icon icon="mdi:facebook" className="text-2xl" />
                </a>
              </div>
            </div>

            {/* Map Placeholder/Visual */}
            <div className="reveal-right">
              <div className="glass-card-dark p-2 rounded-2xl border border-white/10 relative overflow-hidden group">
                {/* Interactive Map Iframe */}
                <iframe
                  src="https://maps.google.com/maps?q=SGAS+Quadra+902+Edif%C3%ADcio+Athenas+Bloco+B,+Bras%C3%ADlia,+DF,+70390-020&t=m&z=17&output=embed&iwloc=near"
                  style={{ border: 0, borderRadius: '12px', filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
                  allowFullScreen=""
                  loading="lazy" decoding="async"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-80 md:h-[400px] group-hover:filter-none transition-all duration-500"
                ></iframe>
                <div className="absolute bottom-6 left-6 bg-navy-900/90 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 pointer-events-none">
                  <span className="text-primary text-xs font-bold uppercase tracking-widest">Localização</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
