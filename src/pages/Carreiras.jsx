import { useState, useCallback } from 'react';
import useRevealAnimation from '../hooks/useRevealAnimation';
import SEO from '../components/SEO';
import { Icon } from '@iconify/react';
import { supabase } from '../lib/supabase';

function CurriculoModal({ onClose }) {
  const [submitState, setSubmitState] = useState('idle');
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    area: '',
    linkedin: '',
    apresentacao: '',
  });

  const mascaraTelefone = useCallback((v) => {
    v = v.replace(/\D/g, '');
    v = v.replace(/^(\d{2})(\d)/g, '($1) $2');
    v = v.replace(/(\d)(\d{4})$/, '$1-$2');
    return v;
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'telefone' ? mascaraTelefone(value) : value,
    }));
  }, [mascaraTelefone]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitState('loading');

    const { error } = await supabase.from('leads').insert({
      origem: 'curriculo',
      nome: form.nome,
      email: form.email,
      telefone: form.telefone,
      ente_devedor: form.area,
      numero_processo: form.linkedin,
      observacoes: form.apresentacao,
    });

    if (error) {
      console.error(error);
      setSubmitState('error');
    } else {
      setSubmitState('success');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-navy-800/95 backdrop-blur-xl shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent rounded-t-2xl"></div>

        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 border border-primary/30 rounded-full bg-white/5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              <span className="text-primary font-sans text-xs tracking-[0.2em] uppercase font-bold">Banco de Talentos</span>
            </div>
            <h2 className="font-display text-2xl font-bold text-white leading-tight">
              Cadastre seu <span className="text-gradient-gold italic">Currículo</span>
            </h2>
            <p className="text-slate-400 text-sm mt-1">Nossa equipe de RH entrará em contato quando surgir uma vaga no seu perfil.</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors shrink-0 ml-4 mt-1"
          >
            <Icon icon="mdi:close" />
          </button>
        </div>

        {/* Form */}
        <div className="px-6 pb-6">
          {submitState === 'success' ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon icon="mdi:check-circle-outline" className="text-4xl text-green-400" />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-2">Currículo enviado!</h3>
              <p className="text-slate-400 text-sm max-w-xs mx-auto">Seu perfil foi registrado no nosso banco de talentos. Entraremos em contato quando surgir uma oportunidade.</p>
              <button
                onClick={onClose}
                className="mt-6 btn-glow bg-white text-navy-900 font-bold px-8 py-3 uppercase tracking-widest hover:bg-primary transition-all rounded-sm text-sm"
              >
                Fechar
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nome + Telefone */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-primary font-bold ml-1">Nome Completo</label>
                  <div className="relative">
                    <Icon icon="mdi:account-outline" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
                    <input
                      type="text"
                      name="nome"
                      required
                      value={form.nome}
                      onChange={handleChange}
                      className="form-input w-full rounded-sm pl-10 pr-4 py-2.5 outline-none text-sm"
                      placeholder="Seu nome completo"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-primary font-bold ml-1">Telefone / WhatsApp</label>
                  <div className="relative">
                    <Icon icon="mdi:whatsapp" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
                    <input
                      type="tel"
                      name="telefone"
                      required
                      value={form.telefone}
                      onChange={handleChange}
                      maxLength={15}
                      className="form-input w-full rounded-sm pl-10 pr-4 py-2.5 outline-none text-sm"
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-primary font-bold ml-1">E-mail</label>
                <div className="relative">
                  <Icon icon="mdi:email-outline" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="form-input w-full rounded-sm pl-10 pr-4 py-2.5 outline-none text-sm"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              {/* Área de interesse */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-primary font-bold ml-1">Área de Interesse</label>
                <div className="relative">
                  <Icon icon="mdi:briefcase-outline" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
                  <select
                    name="area"
                    required
                    value={form.area}
                    onChange={handleChange}
                    className="form-input w-full rounded-sm pl-10 pr-8 py-2.5 outline-none cursor-pointer text-sm appearance-none"
                    defaultValue=""
                  >
                    <option value="" disabled>Selecione uma área...</option>
                    <option value="Comercial" className="text-navy-900">Comercial</option>
                    <option value="Jurídico" className="text-navy-900">Jurídico</option>
                    <option value="Financeiro" className="text-navy-900">Financeiro</option>
                    <option value="Tecnologia" className="text-navy-900">Tecnologia</option>
                    <option value="Marketing" className="text-navy-900">Marketing</option>
                    <option value="Administrativo" className="text-navy-900">Administrativo</option>
                    <option value="Outros" className="text-navy-900">Outros</option>
                  </select>
                  <Icon icon="mdi:chevron-down" className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none text-sm" />
                </div>
              </div>

              {/* LinkedIn */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-primary font-bold ml-1">
                  LinkedIn ou Portfólio <span className="text-slate-500 normal-case tracking-normal font-normal">(opcional)</span>
                </label>
                <div className="relative">
                  <Icon icon="mdi:linkedin" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
                  <input
                    type="url"
                    name="linkedin"
                    value={form.linkedin}
                    onChange={handleChange}
                    className="form-input w-full rounded-sm pl-10 pr-4 py-2.5 outline-none text-sm"
                    placeholder="https://linkedin.com/in/seu-perfil"
                  />
                </div>
              </div>

              {/* Apresentação */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-primary font-bold ml-1">Apresentação</label>
                <textarea
                  name="apresentacao"
                  required
                  value={form.apresentacao}
                  onChange={handleChange}
                  rows={3}
                  className="form-input w-full rounded-sm px-4 py-2.5 outline-none resize-none text-sm"
                  placeholder="Conte um pouco sobre sua experiência e o que você busca..."
                />
              </div>

              {submitState === 'error' && (
                <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                  <Icon icon="mdi:alert-circle-outline" />
                  Erro ao enviar. Tente novamente ou envie por e-mail para rh@advanceprecatorios.com.br
                </div>
              )}

              <button
                type="submit"
                disabled={submitState === 'loading'}
                className="w-full btn-glow bg-white text-navy-900 font-bold py-4 uppercase tracking-widest hover:bg-primary transition-all rounded-sm flex items-center justify-center gap-2 shadow-lg disabled:opacity-60 mt-2"
              >
                {submitState === 'loading' ? (
                  <><Icon icon="mdi:loading" className="animate-spin" /> Enviando...</>
                ) : (
                  <>Enviar Currículo <Icon icon="mdi:send-outline" /></>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Carreiras() {
  useRevealAnimation();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <SEO
        title="Carreiras - Advance Precatórios"
        description="Faça parte de uma equipe que está transformando o mercado de ativos judiciais no Brasil. Veja nossas vagas e construa o futuro conosco."
        url="https://www.advanceprecatorios.com.br/carreiras"
        canonical="https://www.advanceprecatorios.com.br/carreiras"
        image="https://www.advanceprecatorios.com.br/assets/og-image.jpg"
      />

      <header className="relative pt-28 pb-16 md:pt-32 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-800 to-navy-900"></div>
        <div className="absolute inset-0 bg-cubes-pattern opacity-5"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-left md:text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 border border-primary/20 rounded-full bg-white/5 backdrop-blur-md">
            <Icon icon="material-symbols:rocket-launch" className="text-primary text-sm" />
            <span className="text-primary font-sans text-xs tracking-[0.2em] uppercase font-bold">Junte-se ao time</span>
          </div>
          <h1 className="text-white font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-2xl">
            Construa o <span className="text-gradient-gold italic">Futuro</span> Conosco
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-0 md:mx-auto font-light leading-relaxed">
            Faça parte de uma equipe que está transformando o mercado de ativos judiciais no Brasil com inovação, ética e excelência.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-0 md:mx-auto mt-8"></div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-16 relative z-10">

        {/* Seção de Cultura/Benefícios */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="glass-card-premium p-6 md:p-8 rounded-sm text-center group">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
              <Icon icon="mdi:chart-timeline-variant" className="text-3xl text-primary" />
            </div>
            <h3 className="text-navy-900 font-display text-xl font-bold mb-3">Crescimento Acelerado</h3>
            <p className="text-slate-600 text-sm font-light leading-relaxed">Ambiente dinâmico que incentiva o desenvolvimento profissional contínuo e a meritocracia.</p>
          </div>
          <div className="glass-card-premium p-6 md:p-8 rounded-sm text-center group">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
              <Icon icon="mdi:handshake-outline" className="text-3xl text-primary" />
            </div>
            <h3 className="text-navy-900 font-display text-xl font-bold mb-3">Cultura Colaborativa</h3>
            <p className="text-slate-600 text-sm font-light leading-relaxed">Trabalhamos juntos para alcançar resultados extraordinários, valorizando cada opinião.</p>
          </div>
          <div className="glass-card-premium p-6 md:p-8 rounded-sm text-center group">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
              <Icon icon="mdi:star-outline" className="text-3xl text-primary" />
            </div>
            <h3 className="text-navy-900 font-display text-xl font-bold mb-3">Excelência e Ética</h3>
            <p className="text-slate-600 text-sm font-light leading-relaxed">Compromisso inegociável com a transparência e a qualidade em tudo o que fazemos.</p>
          </div>
        </div>

        <div className="text-left md:text-center mb-16 reveal">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 border border-slate-200 rounded-full bg-white shadow-sm">
            <Icon icon="mdi:briefcase-search-outline" className="text-primary" />
            <span className="text-navy-900 font-sans text-xs tracking-[0.2em] uppercase font-bold">Oportunidades</span>
          </div>
          <h2 className="text-navy-900 font-display text-3xl md:text-5xl font-bold mb-4">
            Vagas <span className="text-gradient-gold italic">Disponíveis</span>
          </h2>
          <p className="text-slate-600 font-light text-lg max-w-2xl md:mx-auto">
            Confira as posições abertas e encontre o desafio ideal para o seu perfil profissional.
          </p>
        </div>

        {/* Estado vazio */}
        <div className="text-center py-16 px-6 bg-white border border-slate-100 rounded-xl shadow-sm mb-16 reveal">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
            <Icon icon="mdi:briefcase-off-outline" className="text-4xl" />
          </div>
          <h3 className="text-navy-900 font-display text-2xl font-bold mb-3">Nenhuma vaga disponível no momento</h3>
          <p className="text-slate-500 max-w-md mx-auto leading-relaxed">
            Não temos posições abertas agora, mas estamos sempre em busca de novos talentos.
            Cadastre seu currículo no Banco de Talentos abaixo.
          </p>
        </div>

        {/* Grid de Vagas (Oculto - Remover classe 'hidden' quando houver vagas) */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 hidden">
          <div className="glass-card-premium p-6 md:p-8 rounded-sm flex flex-col relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            <div className="flex justify-between items-start mb-4">
              <span className="bg-navy-50 text-navy-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-navy-100">Comercial</span>
              <span className="flex items-center gap-1 text-slate-400 text-xs"><Icon icon="mdi:map-marker" /> Brasília, DF</span>
            </div>
            <h3 className="text-2xl text-navy-900 font-display font-bold mb-2 group-hover:text-primary transition-colors">Consultor Comercial</h3>
            <p className="text-slate-500 text-sm mb-6 font-medium">Regime Híbrido • Pleno</p>
            <p className="text-slate-600 font-light leading-relaxed mb-8 flex-grow">Buscamos um profissional com experiência em vendas consultivas e negociação para atuar diretamente com nossos clientes investidores e credores.</p>
            <div className="border-t border-slate-100 pt-6 mt-auto">
              <button onClick={() => setModalOpen(true)} className="w-full inline-flex items-center justify-center gap-2 bg-navy-900 text-white hover:bg-primary hover:text-navy-900 px-6 py-3 rounded-sm transition-all uppercase tracking-wider text-xs font-bold btn-glow">
                Aplicar para esta vaga <Icon icon="material-symbols:arrow-forward" className="text-lg" />
              </button>
            </div>
          </div>
          <div className="glass-card-premium p-6 md:p-8 rounded-sm flex flex-col relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            <div className="flex justify-between items-start mb-4">
              <span className="bg-navy-50 text-navy-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-navy-100">Jurídico</span>
              <span className="flex items-center gap-1 text-slate-400 text-xs"><Icon icon="mdi:laptop" /> Remoto</span>
            </div>
            <h3 className="text-2xl text-navy-900 font-display font-bold mb-2 group-hover:text-primary transition-colors">Analista Jurídico Júnior</h3>
            <p className="text-slate-500 text-sm mb-6 font-medium">100% Remoto • Júnior</p>
            <p className="text-slate-600 font-light leading-relaxed mb-8 flex-grow">Responsável pela análise preliminar de processos, verificação de ofícios requisitórios e suporte à equipe sênior na due diligence.</p>
            <div className="border-t border-slate-100 pt-6 mt-auto">
              <button onClick={() => setModalOpen(true)} className="w-full inline-flex items-center justify-center gap-2 bg-navy-900 text-white hover:bg-primary hover:text-navy-900 px-6 py-3 rounded-sm transition-all uppercase tracking-wider text-xs font-bold btn-glow">
                Aplicar para esta vaga <Icon icon="material-symbols:arrow-forward" className="text-lg" />
              </button>
            </div>
          </div>
        </div>

        {/* Banco de Talentos */}
        <div className="relative rounded-xl overflow-hidden bg-navy-900 border border-white/10 shadow-2xl group mt-20">
          <div className="absolute inset-0 bg-cubes-pattern opacity-5"></div>

          <div className="grid lg:grid-cols-2">
            <div className="relative h-64 sm:h-80 lg:h-auto overflow-hidden order-first">
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent z-10 lg:hidden"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-navy-900 z-10 hidden lg:block"></div>
              <img src="assets/DSC04791.webp"
                   alt="Talentos Advance"
                   loading="lazy" decoding="async"
                   className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute top-6 left-6 z-20">
                <span className="bg-primary/90 backdrop-blur-md text-navy-900 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest shadow-lg flex items-center gap-2">
                  <Icon icon="material-symbols:stars" className="text-sm" /> Banco de Talentos
                </span>
              </div>
            </div>

            <div className="relative z-10 p-8 md:p-12 lg:p-16 flex flex-col justify-center text-left">
              <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-6 text-primary shadow-lg shadow-primary/5">
                <Icon icon="material-symbols:person-search" className="text-3xl" />
              </div>

              <h2 className="text-3xl md:text-4xl text-white font-display font-bold mb-4 leading-tight">
                Não encontrou a <br />
                <span className="text-gradient-gold italic">vaga ideal?</span>
              </h2>

              <p className="text-slate-400 mb-8 font-light text-lg leading-relaxed max-w-lg">
                Seu talento pode ser a peça que falta no nosso futuro. Cadastre seu currículo e fique no radar dos nossos recrutadores para oportunidades exclusivas.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 bg-primary text-navy-900 px-8 py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-white transition-all btn-glow shadow-[0_0_20px_rgba(197,160,89,0.3)] w-full sm:w-auto"
                >
                  Cadastrar Currículo <Icon icon="material-symbols:arrow-forward" className="text-lg" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {modalOpen && <CurriculoModal onClose={() => setModalOpen(false)} />}
    </>
  );
}
