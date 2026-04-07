import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import useRevealAnimation from '../hooks/useRevealAnimation';
import SEO from '../components/SEO';
import { Icon } from '@iconify/react';
import { supabase } from '../lib/supabase';

export default function Formulario() {
  useRevealAnimation();

  const [currentStep, setCurrentStep] = useState(1);
  const [displayValorFace, setDisplayValorFace] = useState('R$ 0,00');
  const [displayValorLiquido, setDisplayValorLiquido] = useState('R$ 0,00');
  const [submitState, setSubmitState] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'

  const formatarMoeda = useCallback((elemento) => {
    let valor = elemento.value.replace(/\D/g, "");
    valor = (valor / 100).toFixed(2) + "";
    valor = valor.replace(".", ",");
    valor = valor.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    elemento.value = valor;
  }, []);

  const mascaraCpfCnpj = useCallback((i) => {
    let v = i.value.replace(/\D/g, "");
    if (v.length <= 11) {
      v = v.replace(/(\d{3})(\d)/, "$1.$2");
      v = v.replace(/(\d{3})(\d)/, "$1.$2");
      v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else {
      v = v.replace(/^(\d{2})(\d)/, "$1.$2");
      v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
      v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
      v = v.replace(/(\d{4})(\d)/, "$1-$2");
    }
    i.value = v;
  }, []);

  const mascaraTelefone = useCallback((i) => {
    let v = i.value.replace(/\D/g, "");
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
    v = v.replace(/(\d)(\d{4})$/, "$1-$2");
    i.value = v;
  }, []);

  const mascaraProcesso = useCallback((i) => {
    let v = i.value.replace(/\D/g, "");
    v = v.replace(/^(\d{7})(\d)/, "$1-$2");
    v = v.replace(/^(\d{7}-\d{2})(\d)/, "$1.$2");
    v = v.replace(/^(\d{7}-\d{2}\.\d{4})(\d)/, "$1.$2");
    v = v.replace(/^(\d{7}-\d{2}\.\d{4}\.\d)(\d)/, "$1.$2");
    v = v.replace(/^(\d{7}-\d{2}\.\d{4}\.\d\.\d{2})(\d)/, "$1.$2");
    i.value = v;
  }, []);

  const nextStep = useCallback(() => {
    const step1El = document.getElementById('step1');
    const inputs = step1El.querySelectorAll('input, select');
    let valid = true;

    inputs.forEach(input => {
      if (!input.checkValidity()) {
        input.reportValidity();
        valid = false;
      }
    });

    if (valid) {
      setCurrentStep(2);
    }
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep(1);
  }, []);

  const calculateAndShowStep3 = useCallback(() => {
    const step2El = document.getElementById('step2');
    const valorInput = document.getElementById('valorFace');
    const enteDevedor = document.getElementById('enteDevedor');
    const natureza = document.getElementById('natureza');

    let valid = true;
    step2El.querySelectorAll('input[required], select[required]').forEach(input => {
      if (!input.checkValidity() || !input.value) {
        input.reportValidity();
        valid = false;
      }
    });

    if (valid) {
      const valorNumerico = parseFloat(valorInput.value.replace(/\./g, '').replace(',', '.'));
      const ente = enteDevedor.value;

      let fatorDesagio = 0;
      if (ente === 'federal') { fatorDesagio = 0.82; }
      else if (ente === 'estadual') { fatorDesagio = 0.65; }
      else { fatorDesagio = 0.50; }
      if (natureza.value === 'alimentar') { fatorDesagio += 0.03; }

      const valorLiquido = valorNumerico * fatorDesagio;

      setDisplayValorFace(valorNumerico.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
      setDisplayValorLiquido(valorLiquido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));

      setCurrentStep(3);
    }
  }, []);

  const backToStep2 = useCallback(() => {
    setCurrentStep(2);
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setSubmitState('loading');

    const getValue = (id) => document.getElementById(id)?.value || '';
    const getInputByPlaceholder = (placeholder) => {
      const el = document.querySelector(`input[placeholder="${placeholder}"]`);
      return el?.value || '';
    };

    const lead = {
      origem: 'formulario',
      nome: getInputByPlaceholder('Digite seu nome completo'),
      cpf_cnpj: getInputByPlaceholder('000.000.000-00 ou CNPJ'),
      telefone: getInputByPlaceholder('(00) 00000-0000'),
      email: getInputByPlaceholder('seu@email.com'),
      ente_devedor: getValue('enteDevedor'),
      natureza: getValue('natureza'),
      valor_face: getValue('valorFace'),
      ano_expedicao: document.querySelector('input[placeholder="Ex: 2022"]')?.value || '',
      numero_processo: document.querySelector('input[placeholder="Ex: 0000000-00.0000.0.00.0000"]')?.value || '',
      observacoes: document.querySelector('textarea')?.value || '',
      valor_estimado: displayValorLiquido,
    };

    const { error } = await supabase.from('leads').insert(lead);

    if (error) {
      console.error('Erro ao enviar lead:', error);
      setSubmitState('error');
    } else {
      setSubmitState('success');
    }
  }, [displayValorLiquido]);

  return (
    <>
      <SEO
        title="Análise de Precatório - Advance Precatórios"
        description="Inicie a análise do seu precatório. Preencha nosso formulário seguro para receber uma proposta de compra formalizada em até 24 horas. Análise gratuita e sigilosa."
        url="https://www.advanceprecatorios.com.br/formulario"
        canonical="https://www.advanceprecatorios.com.br/formulario"
        image="https://www.advanceprecatorios.com.br/assets/og-image.jpg"
      />

      {/* Main Section */}
      <section className="relative min-h-screen flex items-center pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden" id="formulario">
        {/* Background Elements */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-navy-900"></div>
          <div className="absolute inset-0 bg-cubes-pattern opacity-10"></div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="grid lg:grid-cols-12 gap-16 items-center">

            {/* Left Column: Persuasive Text */}
            <div className="lg:col-span-5 reveal-left">
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 border border-primary/30 rounded-full bg-white/5 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-primary font-sans text-xs tracking-[0.2em] uppercase font-bold">Atendimento Prioritário</span>
              </div>

              <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight text-white">
                Inicie a análise do <br />
                <span className="text-gradient-gold italic">seu ativo judicial</span>
              </h1>

              <p className="text-slate-400 text-lg mb-10 font-light leading-relaxed">
                Preencha o formulário para receber uma proposta oficial de compra do seu ativo judicial. Nossa equipe jurídica garante sigilo absoluto e retorno em até 24 horas.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:hover:border-primary/50 transition-colors">
                    <Icon icon="mdi:file-document-check-outline" className="text-2xl" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white font-display text-lg">Análise Gratuita</h4>
                    <p className="text-sm text-slate-400">Avaliação completa sem custos iniciais.</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:hover:border-primary/50 transition-colors">
                    <Icon icon="mdi:shield-lock-outline" className="text-2xl" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white font-display text-lg">Segurança de Dados</h4>
                    <p className="text-sm text-slate-400">Informações protegidas conforme a LGPD.</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:hover:border-primary/50 transition-colors">
                    <Icon icon="mdi:flash-outline" className="text-2xl" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white font-display text-lg">Agilidade</h4>
                    <p className="text-sm text-slate-400">Proposta formalizada em tempo recorde.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: The Form */}
            <div className="lg:col-span-7 reveal-right">
              <div className="glass-panel p-6 md:p-10 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden bg-navy-800/80 backdrop-blur-xl">
                {/* Decorative Top Line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent"></div>

                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-display font-bold text-white">Solicitação de Proposta</h3>
                  <Icon icon="mdi:scale-balance" className="text-3xl text-primary/50" />
                </div>

                <form className="space-y-8" onSubmit={handleSubmit}>
                  {/* Seção 1: Dados Pessoais */}
                  <div id="step1" className={`transition-opacity duration-300${currentStep !== 1 ? ' hidden' : ''}`}>
                    <h4 className="text-white/80 font-display text-sm uppercase tracking-widest mb-4 border-b border-white/10 pb-2 flex items-center gap-2">
                      <Icon icon="mdi:account-circle-outline" /> 1. Dados do Titular
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-xs uppercase tracking-wider text-primary font-bold ml-1">Nome Completo</label>
                        <div className="relative">
                          <Icon icon="mdi:account-outline" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                          <input type="text" required className="form-input w-full rounded-sm pl-12 pr-4 py-3 outline-none" placeholder="Digite seu nome completo" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-primary font-bold ml-1">CPF/CNPJ</label>
                        <div className="relative">
                          <Icon icon="mdi:card-account-details-outline" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                          <input type="text" required className="form-input w-full rounded-sm pl-12 pr-4 py-3 outline-none" placeholder="000.000.000-00 ou CNPJ" onInput={(e) => mascaraCpfCnpj(e.target)} maxLength="18" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-primary font-bold ml-1">Telefone / WhatsApp</label>
                        <div className="relative">
                          <Icon icon="mdi:whatsapp" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                          <input type="tel" required className="form-input w-full rounded-sm pl-12 pr-4 py-3 outline-none" placeholder="(00) 00000-0000" onInput={(e) => mascaraTelefone(e.target)} maxLength="15" />
                        </div>
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-xs uppercase tracking-wider text-primary font-bold ml-1">E-mail</label>
                        <div className="relative">
                          <Icon icon="mdi:email-outline" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                          <input type="email" required className="form-input w-full rounded-sm pl-12 pr-4 py-3 outline-none" placeholder="seu@email.com" />
                        </div>
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-xs uppercase tracking-wider text-primary font-bold ml-1">Você é?</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          <label className="cursor-pointer"><input type="radio" name="titular" /></label>
                        </div>
                      </div>
                    </div>
                    {/* Botão Avançar */}
                    <button type="button" onClick={nextStep} className="w-full btn-glow bg-white text-navy-900 font-bold py-4 uppercase tracking-widest hover:bg-primary transition-all mt-8 rounded-sm flex items-center justify-center gap-2 group shadow-lg">
                      Continuar
                      <Icon icon="mdi:arrow-right" className="text-xl group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {/* Seção 2: Dados do Precatório */}
                  <div id="step2" className={`transition-opacity duration-300${currentStep !== 2 ? ' hidden' : ''}`}>
                    <h4 className="text-white/80 font-display text-sm uppercase tracking-widest mb-4 border-b border-white/10 pb-2 flex items-center gap-2">
                      <Icon icon="mdi:file-document-outline" /> 2. Dados do Ativo
                    </h4>
                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-primary font-bold ml-1">Ente Devedor</label>
                        <div className="relative">
                          <Icon icon="mdi:bank-outline" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                          <select id="enteDevedor" required className="form-input w-full rounded-sm pl-12 pr-8 py-3 outline-none cursor-pointer" defaultValue="">
                            <option value="" disabled>Selecione...</option>
                            <option value="federal" className="text-navy-900">Federal (União)</option>
                            <option value="estadual" className="text-navy-900">Estadual</option>
                            <option value="municipal" className="text-navy-900">Municipal</option>
                          </select>
                          <Icon icon="mdi:chevron-down" className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-primary font-bold ml-1">Natureza</label>
                        <div className="relative">
                          <Icon icon="mdi:file-certificate-outline" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                          <select id="natureza" required className="form-input w-full rounded-sm pl-12 pr-8 py-3 outline-none cursor-pointer" defaultValue="">
                            <option value="" disabled>Selecione...</option>
                            <option value="alimentar" className="text-navy-900">Alimentar</option>
                            <option value="comum" className="text-navy-900">Comum</option>
                          </select>
                          <Icon icon="mdi:chevron-down" className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-primary font-bold ml-1">Valor de Face (R$)</label>
                        <div className="relative">
                          <Icon icon="mdi:cash-multiple" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                          <input type="text" id="valorFace" required className="form-input w-full rounded-sm pl-12 pr-4 py-3 outline-none" placeholder="0,00" onKeyUp={(e) => formatarMoeda(e.target)} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-primary font-bold ml-1">Ano de Expedição</label>
                        <div className="relative">
                          <Icon icon="mdi:calendar-clock" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                          <input type="number" required className="form-input w-full rounded-sm pl-12 pr-4 py-3 outline-none" placeholder="Ex: 2022" onInput={(e) => { e.target.value = e.target.value.slice(0, 4); }} />
                        </div>
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-xs uppercase tracking-wider text-primary font-bold ml-1">Número do Processo</label>
                        <div className="relative">
                          <Icon icon="mdi:gavel" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                          <input type="text" className="form-input w-full rounded-sm pl-12 pr-4 py-3 outline-none" placeholder="Ex: 0000000-00.0000.0.00.0000" onInput={(e) => mascaraProcesso(e.target)} maxLength="25" />
                        </div>
                        <p className="text-[10px] text-slate-500 ml-1">*Caso não tenha o número exato, informe o nome do advogado ou vara.</p>
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-xs uppercase tracking-wider text-primary font-bold ml-1">Observações</label>
                        <div className="relative">
                          <span className="iconify absolute left-4 top-4 text-slate-500" data-icon="mdi:message-text-outline"></span>
                          <textarea rows="3" className="form-input w-full rounded-sm pl-12 pr-4 py-3 outline-none resize-none" placeholder="Detalhes adicionais..."></textarea>
                        </div>
                      </div>
                    </div>

                    {/* Botões Ação */}
                    <div className="flex gap-4 mt-8">
                      <button type="button" onClick={prevStep} className="w-auto border border-white/10 text-slate-300 font-bold p-4 uppercase tracking-widest hover:bg-white/5 transition-all rounded-sm flex items-center justify-center gap-2">
                        <span className="iconify text-xl" data-icon="mdi:arrow-left"></span> Voltar
                      </button>
                      <button type="button" onClick={calculateAndShowStep3} className="flex-grow btn-glow bg-white text-navy-900 font-bold py-4 uppercase tracking-widest hover:bg-primary transition-all rounded-sm flex items-center justify-center gap-2 group shadow-lg">
                        Ver Pré-Proposta
                        <span className="iconify text-xl group-hover:translate-x-1 transition-transform" data-icon="mdi:calculator"></span>
                      </button>
                    </div>
                  </div>

                  {/* Seção 3: Pré-Proposta */}
                  <div id="step3" className={`transition-opacity duration-300${currentStep !== 3 ? ' hidden' : ''}`}>
                    <h4 className="text-white/80 font-display text-sm uppercase tracking-widest mb-4 border-b border-white/10 pb-2 flex items-center gap-2">
                      <span className="iconify" data-icon="mdi:file-check-outline"></span> 3. Pré-Análise da Proposta
                    </h4>
                    <div className="bg-navy-900/40 p-6 rounded-xl border border-white/10 space-y-6" style={{ animation: 'fadeIn 0.5s ease-out' }}>
                      <div>
                        <p className="text-slate-400 text-xs uppercase tracking-widest">Valor de Face Informado</p>
                        <p className="text-2xl text-white font-medium tracking-tight">{displayValorFace}</p>
                      </div>
                      <div className="bg-gradient-to-br from-primary/20 to-navy-900/80 p-6 rounded-xl border border-primary/30">
                        <p className="text-primary text-xs uppercase tracking-widest font-bold">Estimativa de Pagamento à Vista</p>
                        <p className="text-3xl md:text-4xl font-display font-bold text-gradient-gold tracking-tight">{displayValorLiquido}</p>
                      </div>
                      <p className="text-[10px] text-slate-500 text-center">*Esta é uma estimativa e não constitui uma proposta vinculante. O valor final depende de análise jurídica detalhada.</p>
                    </div>

                    {/* Botões Ação */}
                    {submitState === 'success' ? (
                      <div className="mt-8 bg-green-500/10 border border-green-500/30 rounded-lg p-6 text-center">
                        <Icon icon="mdi:check-circle" className="text-4xl text-green-400 mx-auto mb-3" />
                        <h4 className="text-white font-bold text-lg mb-1">Solicitação enviada!</h4>
                        <p className="text-slate-400 text-sm">Nossa equipe entrará em contato em até 24 horas.</p>
                      </div>
                    ) : (
                      <div className="flex gap-4 mt-8">
                        <button type="button" onClick={backToStep2} disabled={submitState === 'loading'} className="w-auto border border-white/10 text-slate-300 font-bold p-4 uppercase tracking-widest hover:bg-white/5 transition-all rounded-sm flex items-center justify-center gap-2 disabled:opacity-50">
                          <span className="iconify text-xl" data-icon="mdi:arrow-left"></span> Voltar
                        </button>
                        <button type="submit" disabled={submitState === 'loading'} className="flex-grow btn-glow bg-primary text-navy-900 font-bold py-4 uppercase tracking-widest hover:bg-white transition-all rounded-sm flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(197,160,89,0.3)] disabled:opacity-70">
                          {submitState === 'loading' ? (
                            <><Icon icon="mdi:loading" className="text-xl animate-spin" /> Enviando...</>
                          ) : (
                            <>Solicitar Proposta <span className="iconify text-xl group-hover:translate-x-1 transition-transform" data-icon="mdi:check-circle-outline"></span></>
                          )}
                        </button>
                      </div>
                    )}
                    {submitState === 'error' && (
                      <p className="text-red-400 text-sm text-center mt-2">Erro ao enviar. Tente novamente ou entre em contato por WhatsApp.</p>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
