import { Link } from 'react-router-dom';
import useRevealAnimation from '../hooks/useRevealAnimation';
import SEO from '../components/SEO';
import { Icon } from '@iconify/react';

export default function TermosDeUso() {
  useRevealAnimation();

  return (
    <>
      <SEO
        title="Termos de Uso - Advance Precatórios"
        description="Consulte os Termos de Uso que regem a utilização do site e dos serviços da Advance Precatórios. Entenda nossas diretrizes e responsabilidades."
        url="https://www.advanceprecatorios.com.br/termos-de-uso"
        canonical="https://www.advanceprecatorios.com.br/termos-de-uso"
        noindex
      />

      <header className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-800 to-navy-900"></div>
        <div className="absolute inset-0 bg-cubes-pattern opacity-5"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-left md:text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 border border-primary/20 rounded-full bg-white/5 backdrop-blur-md">
            <Icon icon="material-symbols:gavel" className="text-primary text-sm" />
            <span className="text-primary font-sans text-xs tracking-[0.2em] uppercase font-bold">Regras e Condições</span>
          </div>
          <h1 className="text-white font-display text-3xl md:text-6xl font-bold mb-6 drop-shadow-2xl">
            Termos de <span className="text-gradient-gold italic">Uso</span>
          </h1>
          <p className="text-slate-400 text-sm uppercase tracking-widest mb-8">Última atualização: 12 de fevereiro de 2026</p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-0 md:mx-auto"></div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16 relative z-10">
        <div className="space-y-8">

          <div className="glass-card-premium p-8 md:p-10 rounded-sm relative overflow-hidden" id="aceitacao">
            <div className="absolute top-0 right-0 p-6 opacity-5">
              <span className="iconify text-9xl text-navy-900" data-icon="mdi:handshake-outline"></span>
            </div>
            <h2 className="text-2xl text-navy-900 font-display mb-6 flex items-center gap-4">
              <span className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-2xl shrink-0">
                <span className="iconify" data-icon="mdi:handshake-outline"></span>
              </span>
              1. Aceitação dos Termos
            </h2>
            <div className="prose prose-slate max-w-none font-light prose-p:leading-relaxed">
              <p>
                Ao acessar e usar o site da <strong>Advance Precatórios</strong>, você aceita e concorda em estar vinculado aos termos e disposições deste acordo. Além disso, ao usar nossos serviços específicos (como formulários de contato e simulação), você estará sujeito a quaisquer diretrizes ou regras aplicáveis publicadas. Toda participação neste serviço constituirá aceitação deste acordo. Se você não concorda em cumprir o acima, por favor, não use este serviço.
              </p>
            </div>
          </div>

          <div className="glass-card-premium p-8 md:p-10 rounded-sm relative overflow-hidden" id="servico">
            <div className="absolute top-0 right-0 p-6 opacity-5">
              <span className="iconify text-9xl text-navy-900" data-icon="mdi:briefcase-outline"></span>
            </div>
            <h2 className="text-2xl text-navy-900 font-display mb-6 flex items-center gap-4">
              <span className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-2xl shrink-0">
                <span className="iconify" data-icon="mdi:briefcase-outline"></span>
              </span>
              2. Descrição do Serviço
            </h2>
            <div className="prose prose-slate max-w-none font-light prose-p:leading-relaxed">
              <p>
                A Advance Precatórios fornece serviços de intermediação, análise e compra de ativos judiciais (precatórios). Você entende e concorda que o serviço é fornecido "COMO ESTÁ" e que não assumimos responsabilidade pela pontualidade, exatidão das informações de simulação (que são estimativas), exclusão, falha na entrega ou falha no armazenamento de quaisquer comunicações do usuário ou configurações de personalização. As propostas formais só são emitidas após análise jurídica (due diligence) completa.
              </p>
            </div>
          </div>

          <div className="glass-card-premium p-8 md:p-10 rounded-sm relative overflow-hidden" id="conduta">
            <div className="absolute top-0 right-0 p-6 opacity-5">
              <span className="iconify text-9xl text-navy-900" data-icon="mdi:shield-account-outline"></span>
            </div>
            <h2 className="text-2xl text-navy-900 font-display mb-6 flex items-center gap-4">
              <span className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-2xl shrink-0">
                <span className="iconify" data-icon="mdi:shield-account-outline"></span>
              </span>
              3. Conduta do Usuário
            </h2>
            <div className="prose prose-slate max-w-none font-light prose-p:leading-relaxed">
              <p>
                Você concorda em não usar o serviço para fornecer informações falsas, imprecisas ou enganosas. É sua responsabilidade garantir que você é o legítimo titular do crédito que pretende negociar e que possui o direito de fazê-lo. Você concorda em não usar o site para carregar, postar, enviar por e-mail, transmitir ou de outra forma disponibilizar qualquer conteúdo que seja ilegal, prejudicial, ameaçador, abusivo, assediante, difamatório, vulgar, obsceno, calunioso, invasivo da privacidade de outrem, odioso ou racial, etnicamente ou de outra forma censurável.
              </p>
            </div>
          </div>

          <div className="glass-card-premium p-8 md:p-10 rounded-sm relative overflow-hidden" id="propriedade">
            <div className="absolute top-0 right-0 p-6 opacity-5">
              <span className="iconify text-9xl text-navy-900" data-icon="mdi:copyright"></span>
            </div>
            <h2 className="text-2xl text-navy-900 font-display mb-6 flex items-center gap-4">
              <span className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-2xl shrink-0">
                <span className="iconify" data-icon="mdi:copyright"></span>
              </span>
              4. Propriedade Intelectual
            </h2>
            <div className="prose prose-slate max-w-none font-light prose-p:leading-relaxed">
              <p>
                O site e seu conteúdo original, recursos e funcionalidades são de propriedade da Advance Precatórios e estão protegidos por direitos autorais internacionais, marcas registradas, patentes, segredos comerciais e outras leis de propriedade intelectual ou de direitos de propriedade.
              </p>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
