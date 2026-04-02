import { Link } from 'react-router-dom';
import useRevealAnimation from '../hooks/useRevealAnimation';
import SEO from '../components/SEO';
import { Icon } from '@iconify/react';

export default function PoliticaDePrivacidade() {
  useRevealAnimation();

  return (
    <>
      <SEO
        title="Política de Privacidade - Advance Precatórios"
        description="Entenda como a Advance Precatórios coleta, usa e protege seus dados. Nosso compromisso com a segurança e transparência em conformidade com a LGPD."
        url="https://www.advanceprecatorios.com.br/politica-de-privacidade"
        canonical="https://www.advanceprecatorios.com.br/politica-de-privacidade"
        noindex
      />

      <header className="relative pt-28 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-800 to-navy-900"></div>
        <div className="absolute inset-0 bg-cubes-pattern opacity-5"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-left md:text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 border border-primary/20 rounded-full bg-white/5 backdrop-blur-md">
            <Icon icon="material-symbols:security" className="text-primary text-sm" />
            <span className="text-primary font-sans text-xs tracking-[0.2em] uppercase font-bold">Segurança e Transparência</span>
          </div>
          <h1 className="text-white font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-2xl">
            Política de <span className="text-gradient-gold italic">Privacidade</span>
          </h1>
          <p className="text-slate-400 text-sm uppercase tracking-widest mb-8">Última atualização: 12 de fevereiro de 2026</p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-0 md:mx-auto"></div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-16 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12">

          {/* Sidebar de Navegação */}
          <aside className="hidden lg:block lg:col-span-4">
            <div className="sticky top-32 space-y-2">
              <h3 className="text-navy-900 font-display text-xl mb-6 px-4">Índice</h3>
              <a href="#coleta" className="flex items-center gap-3 p-4 rounded-sm bg-white border border-slate-200 hover:border-primary hover:text-primary transition-all shadow-sm group">
                <span className="iconify text-slate-400 group-hover:text-primary transition-colors" data-icon="mdi:database-search-outline"></span>
                <span className="font-medium text-sm">1. Coleta de Dados</span>
              </a>
              <a href="#uso" className="flex items-center gap-3 p-4 rounded-sm bg-white border border-slate-200 hover:border-primary hover:text-primary transition-all shadow-sm group">
                <span className="iconify text-slate-400 group-hover:text-primary transition-colors" data-icon="mdi:file-document-edit-outline"></span>
                <span className="font-medium text-sm">2. Uso das Informações</span>
              </a>
              <a href="#compartilhamento" className="flex items-center gap-3 p-4 rounded-sm bg-white border border-slate-200 hover:border-primary hover:text-primary transition-all shadow-sm group">
                <span className="iconify text-slate-400 group-hover:text-primary transition-colors" data-icon="mdi:share-variant-outline"></span>
                <span className="font-medium text-sm">3. Compartilhamento</span>
              </a>
              <a href="#seguranca" className="flex items-center gap-3 p-4 rounded-sm bg-white border border-slate-200 hover:border-primary hover:text-primary transition-all shadow-sm group">
                <span className="iconify text-slate-400 group-hover:text-primary transition-colors" data-icon="mdi:shield-check-outline"></span>
                <span className="font-medium text-sm">4. Segurança</span>
              </a>
              <a href="#cookies" className="flex items-center gap-3 p-4 rounded-sm bg-white border border-slate-200 hover:border-primary hover:text-primary transition-all shadow-sm group">
                <span className="iconify text-slate-400 group-hover:text-primary transition-colors" data-icon="mdi:cookie-outline"></span>
                <span className="font-medium text-sm">5. Cookies e Tecnologias</span>
              </a>
              <a href="#direitos" className="flex items-center gap-3 p-4 rounded-sm bg-white border border-slate-200 hover:border-primary hover:text-primary transition-all shadow-sm group">
                <span className="iconify text-slate-400 group-hover:text-primary transition-colors" data-icon="mdi:scale-balance"></span>
                <span className="font-medium text-sm">6. Seus Direitos (LGPD)</span>
              </a>
            </div>
          </aside>

          {/* Conteúdo Principal */}
          <div className="lg:col-span-8 space-y-10">

            <div className="glass-card-premium p-6 md:p-10 rounded-sm relative overflow-hidden" id="coleta">
              <div className="absolute top-0 right-0 p-6 opacity-5">
                <span className="iconify text-9xl text-navy-900" data-icon="mdi:database-search-outline"></span>
              </div>
              <h2 className="text-2xl text-navy-900 font-display mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">1</span>
                Coleta de Informações
              </h2>
              <p className="text-slate-600 font-light leading-relaxed mb-4">
                A Advance Precatórios coleta informações essenciais para a prestação de nossos serviços de análise e antecipação de ativos judiciais. Os dados podem ser coletados das seguintes formas:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600 font-light ml-2">
                <li><strong className="text-navy-900 font-medium">Dados fornecidos diretamente:</strong> Nome, e-mail, telefone, CPF e número do processo judicial ao preencher nossos formulários.</li>
                <li><strong className="text-navy-900 font-medium">Dados de navegação:</strong> Endereço IP, tipo de navegador, tempo de permanência e páginas visitadas (via Cookies).</li>
                <li><strong className="text-navy-900 font-medium">Dados públicos:</strong> Informações disponíveis em diários oficiais e portais de transparência dos tribunais.</li>
              </ul>
            </div>

            <div className="glass-card-premium p-6 md:p-10 rounded-sm relative overflow-hidden" id="uso">
              <h2 className="text-2xl text-navy-900 font-display mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">2</span>
                Uso das Informações
              </h2>
              <p className="text-slate-600 font-light leading-relaxed">
                Utilizamos seus dados com a finalidade principal de realizar a <strong>Due Diligence</strong> (análise jurídica) do seu precatório e apresentar uma proposta financeira de compra. Além disso, seus dados são usados para:
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="bg-slate-50 p-4 rounded-sm border border-slate-100">
                  <span className="iconify text-primary text-2xl mb-2" data-icon="mdi:check-circle-outline"></span>
                  <p className="text-sm text-slate-600">Elaboração de contratos e escrituras públicas.</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-sm border border-slate-100">
                  <span className="iconify text-primary text-2xl mb-2" data-icon="mdi:whatsapp"></span>
                  <p className="text-sm text-slate-600">Contato comercial via WhatsApp ou E-mail.</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-sm border border-slate-100">
                  <span className="iconify text-primary text-2xl mb-2" data-icon="mdi:shield-lock-outline"></span>
                  <p className="text-sm text-slate-600">Prevenção à fraude e segurança jurídica.</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-sm border border-slate-100">
                  <span className="iconify text-primary text-2xl mb-2" data-icon="mdi:chart-line"></span>
                  <p className="text-sm text-slate-600">Melhoria da experiência do usuário no site.</p>
                </div>
              </div>
            </div>

            <div className="glass-card-premium p-6 md:p-10 rounded-sm relative overflow-hidden" id="compartilhamento">
              <h2 className="text-2xl text-navy-900 font-display mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">3</span>
                Compartilhamento de Dados
              </h2>
              <p className="text-slate-600 font-light leading-relaxed">
                A Advance Precatórios preza pelo sigilo. Não vendemos seus dados. O compartilhamento ocorre apenas quando estritamente necessário para a operação, como:
              </p>
              <p className="text-slate-600 font-light leading-relaxed mt-4">
                <strong>Cartórios de Notas:</strong> Para lavratura da Escritura Pública de Cessão de Crédito.<br />
                <strong>Parceiros Jurídicos:</strong> Escritórios associados para análise processual específica.<br />
                <strong>Autoridades Judiciais:</strong> Quando exigido por lei ou ordem judicial.
              </p>
            </div>

            <div className="glass-card-premium p-6 md:p-10 rounded-sm relative overflow-hidden" id="seguranca">
              <h2 className="text-2xl text-navy-900 font-display mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">4</span>
                Segurança da Informação
              </h2>
              <p className="text-slate-600 font-light leading-relaxed">
                Adotamos medidas técnicas e organizacionais robustas para proteger seus dados pessoais contra acessos não autorizados, destruição, perda ou alteração. Utilizamos criptografia SSL em nosso site e servidores seguros com acesso restrito.
              </p>
            </div>

            <div className="glass-card-premium p-6 md:p-10 rounded-sm relative overflow-hidden" id="direitos">
              <h2 className="text-2xl text-navy-900 font-display mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">6</span>
                Seus Direitos (LGPD)
              </h2>
              <p className="text-slate-600 font-light leading-relaxed mb-6">
                Conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você tem o direito de:
              </p>
              <ul className="grid md:grid-cols-2 gap-3">
                <li className="flex items-center gap-2 text-sm text-slate-600"><Icon icon="material-symbols:check" className="text-primary text-lg" /> Confirmar a existência de tratamento de dados.</li>
                <li className="flex items-center gap-2 text-sm text-slate-600"><Icon icon="material-symbols:check" className="text-primary text-lg" /> Acessar seus dados.</li>
                <li className="flex items-center gap-2 text-sm text-slate-600"><Icon icon="material-symbols:check" className="text-primary text-lg" /> Corrigir dados incompletos ou desatualizados.</li>
                <li className="flex items-center gap-2 text-sm text-slate-600"><Icon icon="material-symbols:check" className="text-primary text-lg" /> Solicitar a eliminação dos dados (quando aplicável).</li>
              </ul>
              <div className="mt-8 p-6 bg-navy-900 rounded-sm text-center">
                <p className="text-slate-300 text-sm mb-4">Para exercer seus direitos, entre em contato com nosso Encarregado de Dados (DPO):</p>
                <a href="mailto:dpo@advanceprecatorios.com.br" className="text-primary font-bold hover:text-white transition-colors">dpo@advanceprecatorios.com.br</a>
              </div>
            </div>

          </div>
        </div>
      </main>
    </>
  );
}
