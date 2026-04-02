import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import useRevealAnimation from '../hooks/useRevealAnimation';
import SEO from '../components/SEO';

export default function Simulacao() {
  useRevealAnimation();

  const [currentStep, setCurrentStep] = useState(1);
  const [resultState, setResultState] = useState('placeholder'); // 'placeholder' | 'loading' | 'final'
  const [displayValorFace, setDisplayValorFace] = useState('R$ 0,00');
  const [displayValorLiquido, setDisplayValorLiquido] = useState('R$ 0,00');
  const [msgErro, setMsgErro] = useState('');
  const [showMsgSucesso, setShowMsgSucesso] = useState(false);

  const formatarMoeda = useCallback((elemento) => {
    let valor = elemento.value.replace(/\D/g, "");
    valor = (valor / 100).toFixed(2) + "";
    valor = valor.replace(".", ",");
    valor = valor.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    elemento.value = valor;
  }, []);

  const mascaraCPF = useCallback((i) => {
    let v = i.value;
    if (isNaN(v[v.length - 1])) {
      i.value = v.substring(0, v.length - 1);
      return;
    }
    i.setAttribute("maxlength", "14");
    v = v.replace(/\D/g, "");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    i.value = v;
  }, []);

  const mascaraTelefone = useCallback((i) => {
    let v = i.value;
    v = v.replace(/\D/g, "");
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
    v = v.replace(/(\d)(\d{4})$/, "$1-$2");
    i.value = v;
  }, []);

  const validarCPF = useCallback((cpf) => {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf === '') return false;
    if (cpf.length !== 11 ||
      cpf === "00000000000" ||
      cpf === "11111111111" ||
      cpf === "22222222222" ||
      cpf === "33333333333" ||
      cpf === "44444444444" ||
      cpf === "55555555555" ||
      cpf === "66666666666" ||
      cpf === "77777777777" ||
      cpf === "88888888888" ||
      cpf === "99999999999")
      return false;
    let add = 0;
    for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
    let rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(9))) return false;
    add = 0;
    for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(10))) return false;
    return true;
  }, []);

  const validarAvancar = useCallback(() => {
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const nascimento = document.getElementById('nascimento').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;
    const estado = document.getElementById('estado').value;
    const cidade = document.getElementById('cidade').value;

    if (!nome || !cpf || !nascimento || !telefone || !email || !estado || !cidade) {
      setMsgErro("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (!validarCPF(cpf)) {
      setMsgErro("CPF inválido. Verifique os números digitados.");
      return;
    }

    console.log("Enviando dados para o backend...", { nome, cpf, nascimento, telefone, email, estado, cidade });

    setMsgErro('');
    setCurrentStep(2);
    setShowMsgSucesso(true);
  }, [validarCPF]);

  const calcularSimulacao = useCallback((e) => {
    e.preventDefault();

    const valorInput = document.getElementById('valorFace').value;
    const ente = document.getElementById('enteDevedor').value;
    const natureza = document.getElementById('natureza').value;

    const valorNumerico = parseFloat(valorInput.replace(/\./g, '').replace(',', '.'));

    if (!valorNumerico || valorNumerico <= 0) {
      setMsgErro("Por favor, insira o valor válido");
      return;
    }
    setMsgErro('');

    let fatorDesagio = 0;
    if (ente === 'federal') {
      fatorDesagio = 0.82;
    } else if (ente === 'estadual') {
      fatorDesagio = 0.65;
    } else {
      fatorDesagio = 0.50;
    }

    if (natureza === 'alimentar') {
      fatorDesagio += 0.03;
    }

    setResultState('loading');

    setTimeout(() => {
      const valorLiquido = valorNumerico * fatorDesagio;

      setDisplayValorFace(valorNumerico.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
      setDisplayValorLiquido(valorLiquido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));

      setResultState('final');
    }, 2000);
  }, []);

  return (
    <>
      <SEO
        title="Simulação de Venda - Advance Precatórios"
        description="Simule agora o valor de venda do seu precatório. Nossa calculadora online oferece uma estimativa rápida e gratuita de quanto você pode receber à vista pelo seu ativo."
        url="https://www.advanceprecatorios.com.br/simulacao"
        canonical="https://www.advanceprecatorios.com.br/simulacao"
        image="https://www.advanceprecatorios.com.br/assets/og-image.jpg"
      />

      {/* Header */}
      <header className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-cubes-pattern opacity-10"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px]"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-left md:text-center reveal">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 border border-primary/30 rounded-full bg-white/5 backdrop-blur-md">
            <span className="iconify text-primary" data-icon="mdi:calculator-variant-outline"></span>
            <span className="text-primary font-sans text-xs tracking-[0.2em] uppercase font-bold">Calculadora Online</span>
          </div>
          <h1 className="text-white font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Simule o valor do <br />
            <span className="text-gradient-gold italic">seu precatório</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-0 md:mx-auto font-light leading-relaxed">
            Descubra em instantes uma estimativa de quanto você pode receber à vista pelo seu ativo judicial. Sem compromisso.
          </p>
        </div>
      </header>

      {/* Simulation Section */}
      <section className="py-16 md:py-20 pb-24 md:pb-32 relative z-10 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12">

            {/* Calculator Form */}
            <div className="lg:col-span-5 reveal">
              <div className="glass-card-premium p-6 md:p-8 rounded-2xl relative overflow-hidden">
                {/* Decorative Glow */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

                {/* Progress Indicator */}
                <div className="flex items-center justify-between mb-8 relative px-4">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-white/10 rounded-full -z-10"></div>
                  <div className="flex flex-col items-center gap-2 z-10 cursor-default group">
                    <div className={`w-10 h-10 rounded-full ${currentStep === 1 ? 'step-active' : 'step-completed bg-green-500 border-green-500 text-white'} flex items-center justify-center font-bold text-sm border-2 transition-all duration-500`}>
                      {currentStep === 1 ? '1' : <span className="iconify" data-icon="mdi:check"></span>}
                    </div>
                    <span className={`text-[10px] font-bold ${currentStep === 1 ? 'text-primary' : 'text-green-500'} uppercase tracking-widest`}>Pessoal</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 z-10 cursor-default group">
                    <div className={`w-10 h-10 rounded-full ${currentStep >= 2 ? 'step-active' : 'step-inactive'} flex items-center justify-center font-bold text-sm border-2 transition-all duration-500`}>2</div>
                    <span className={`text-[10px] font-bold ${currentStep >= 2 ? 'text-primary' : 'text-slate-500'} uppercase tracking-widest`}>Ativo</span>
                  </div>
                </div>

                <form id="simulacaoForm" className="space-y-6" onSubmit={calcularSimulacao}>

                  {/* ETAPA 1: Informações Pessoais */}
                  <div id="etapa1" className={`space-y-5${currentStep !== 1 ? ' hidden' : ''}`}>
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-display text-white mb-1">Quem é você?</h3>
                      <p className="text-slate-400 text-xs">Precisamos de alguns dados para iniciar.</p>
                    </div>

                    <div className="input-group-premium space-y-2">
                      <label className="text-xs uppercase tracking-wider text-primary font-bold ml-1">Nome Completo</label>
                      <div className="relative">
                        <span className="iconify icon-prefix absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg transition-colors" data-icon="solar:user-circle-bold"></span>
                        <input type="text" id="nome" className="w-full rounded-lg pl-12 pr-4 py-3.5 outline-none text-sm font-medium" placeholder="Digite seu nome completo" required />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="input-group-premium space-y-2">
                        <label className="text-xs uppercase tracking-wider text-primary font-bold ml-1">CPF</label>
                        <div className="relative">
                          <span className="iconify icon-prefix absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg transition-colors" data-icon="solar:card-bold"></span>
                          <input type="text" id="cpf" className="w-full rounded-lg pl-12 pr-4 py-3.5 outline-none text-sm font-medium" placeholder="000.000.000-00" onInput={(e) => mascaraCPF(e.target)} maxLength="14" required />
                        </div>
                      </div>
                      <div className="input-group-premium space-y-2">
                        <label className="text-xs uppercase tracking-wider text-primary font-bold ml-1">Nascimento</label>
                        <div className="relative">
                          <input type="date" id="nascimento" className="w-full rounded-lg px-4 py-3.5 outline-none text-sm font-medium" required />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="input-group-premium space-y-2">
                        <label className="text-xs uppercase tracking-wider text-primary font-bold ml-1">Telefone</label>
                        <div className="relative">
                          <span className="iconify icon-prefix absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg transition-colors" data-icon="solar:phone-bold"></span>
                          <input type="tel" id="telefone" className="w-full rounded-lg pl-12 pr-4 py-3.5 outline-none text-sm font-medium" placeholder="(00) 00000-0000" onInput={(e) => mascaraTelefone(e.target)} maxLength="15" required />
                        </div>
                      </div>
                      <div className="input-group-premium space-y-2">
                        <label className="text-xs uppercase tracking-wider text-primary font-bold ml-1">E-mail</label>
                        <div className="relative">
                          <span className="iconify icon-prefix absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg transition-colors" data-icon="solar:letter-bold"></span>
                          <input type="email" id="email" className="w-full rounded-lg pl-12 pr-4 py-3.5 outline-none text-sm font-medium" placeholder="seu@email.com" required />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="input-group-premium space-y-2">
                        <label className="text-xs uppercase tracking-wider text-primary font-bold ml-1">Estado</label>
                        <div className="relative">
                          <select id="estado" className="w-full rounded-lg px-4 py-3.5 outline-none appearance-none cursor-pointer text-sm font-medium" required defaultValue="">
                            <option value="" disabled>UF</option>
                            <option value="DF">DF</option>
                            <option value="SP">SP</option>
                            <option value="RJ">RJ</option>
                            <option value="MG">MG</option>
                            <option value="RS">RS</option>
                            <option value="PR">PR</option>
                            <option value="OUTRO">Outro</option>
                          </select>
                          <span className="iconify absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" data-icon="solar:alt-arrow-down-bold"></span>
                        </div>
                      </div>
                      <div className="input-group-premium space-y-2">
                        <label className="text-xs uppercase tracking-wider text-primary font-bold ml-1">Cidade</label>
                        <div className="relative">
                          <span className="iconify icon-prefix absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg transition-colors" data-icon="solar:city-bold"></span>
                          <input type="text" id="cidade" className="w-full rounded-lg pl-12 pr-4 py-3.5 outline-none text-sm font-medium" placeholder="Sua cidade" required />
                        </div>
                      </div>
                    </div>

                    <button type="button" onClick={validarAvancar} className="w-full btn-glow bg-white text-navy-900 font-bold py-4 uppercase tracking-widest hover:hover:bg-primary transition-all rounded-lg flex items-center justify-center gap-2 mt-6 shadow-lg">
                      Continuar <span className="iconify text-xl" data-icon="mdi:arrow-right"></span>
                    </button>
                  </div>

                  {/* ETAPA 2: Dados do Ativo (Inicialmente Oculto) */}
                  <div id="etapa2" className={`space-y-6${currentStep !== 2 ? ' hidden' : ''}`}>
                    {showMsgSucesso && (
                      <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-lg text-sm text-center mb-6 flex items-center justify-center gap-2">
                        <span className="iconify inline mr-1" data-icon="mdi:check-circle"></span> Informações registradas com sucesso. Agora você pode realizar a simulação.
                      </div>
                    )}

                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-display text-white mb-1 flex items-center justify-center gap-2">
                        Sobre o Precatório
                        <div className="tooltip-container">
                          <span className="iconify tooltip-trigger text-lg" data-icon="mdi:information-outline"></span>
                          <span className="tooltip-text">Preencha com os dados exatos do seu ativo para uma simulação mais precisa.</span>
                        </div>
                      </h3>
                      <p className="text-slate-400 text-xs">Informe os detalhes do seu título.</p>
                    </div>

                    <div className="input-group-premium space-y-2">
                      <div className="flex items-center gap-2">
                        <label className="text-xs uppercase tracking-wider text-primary font-bold ml-1">Valor de Face (R$)</label>
                        <div className="tooltip-container">
                          <span className="iconify tooltip-trigger" data-icon="mdi:information-outline"></span>
                          <span className="tooltip-text">É o valor total do precatório definido pela Justiça.</span>
                        </div>
                      </div>
                      <div className="relative">
                        <span className="text-primary font-bold absolute left-4 top-1/2 -translate-y-1/2">R$</span>
                        <input type="text" id="valorFace" className="w-full rounded-lg pl-12 pr-4 py-4 outline-none text-xl font-bold tracking-wide" placeholder="0,00" onKeyUp={(e) => formatarMoeda(e.target)} />
                      </div>
                    </div>

                    <div className="input-group-premium space-y-2">
                      <div className="flex items-center gap-2">
                        <label className="text-xs uppercase tracking-wider text-primary font-bold ml-1">Ente Devedor</label>
                        <div className="tooltip-container">
                          <span className="iconify tooltip-trigger" data-icon="mdi:information-outline"></span>
                          <span className="tooltip-text">É o órgão público responsável por pagar o precatório.</span>
                        </div>
                      </div>
                      <div className="relative">
                        <select id="enteDevedor" className="w-full rounded-lg px-4 py-3.5 outline-none appearance-none cursor-pointer text-sm font-medium" defaultValue="federal">
                          <option value="federal">Federal (União/INSS)</option>
                          <option value="estadual">Estadual</option>
                          <option value="municipal">Municipal</option>
                        </select>
                        <span className="iconify absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" data-icon="solar:alt-arrow-down-bold"></span>
                      </div>
                    </div>

                    <div className="input-group-premium space-y-2">
                      <div className="flex items-center gap-2">
                        <label className="text-xs uppercase tracking-wider text-primary font-bold ml-1">Natureza</label>
                        <div className="tooltip-container">
                          <span className="iconify tooltip-trigger" data-icon="mdi:information-outline"></span>
                          <span className="tooltip-text">É o tipo do precatório, como alimentar (salários/pensões) ou comum.</span>
                        </div>
                      </div>
                      <div className="relative">
                        <select id="natureza" className="w-full rounded-lg px-4 py-3.5 outline-none appearance-none cursor-pointer text-sm font-medium" defaultValue="alimentar">
                          <option value="alimentar">Alimentar (Salários, Pensões)</option>
                          <option value="comum">Comum (Desapropriações, Tributos)</option>
                        </select>
                        <span className="iconify absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" data-icon="solar:alt-arrow-down-bold"></span>
                      </div>
                    </div>

                    <button type="submit" className="w-full btn-glow bg-primary text-navy-900 font-bold py-4 uppercase tracking-widest hover:hover:bg-white transition-all rounded-lg flex items-center justify-center gap-2 mt-6 shadow-lg shadow-primary/20">
                      Calcular Agora <span className="iconify text-xl" data-icon="mdi:calculator"></span>
                    </button>
                  </div>

                  {msgErro && (
                    <p className="text-red-400 text-sm mt-3 text-center font-medium">{msgErro}</p>
                  )}
                </form>
              </div>
            </div>

            {/* Results Area */}
            <div className="lg:col-span-7 reveal" style={{ transitionDelay: '200ms' }}>
              <div className="h-full glass-card-premium p-6 md:p-10 rounded-2xl border border-primary/30 relative overflow-hidden flex flex-col shadow-[0_0_50px_rgba(197,160,89,0.1)]">

                {/* Placeholder Content */}
                {resultState === 'placeholder' && (
                  <div className="flex-grow flex flex-col items-center justify-center text-center">
                    <div className="w-24 h-24 bg-navy-900/40 rounded-full flex items-center justify-center mb-6 shadow-2xl border border-white/5 relative z-10">
                      <span className="iconify text-5xl text-slate-600" data-icon="solar:chart-square-bold-duotone"></span>
                    </div>
                    <h3 className="text-2xl text-white font-display mb-3 relative z-10">Aguardando Dados</h3>
                    <p className="text-slate-500 max-w-xs font-light relative z-10">Preencha os campos ao lado para visualizar a estimativa de antecipação do seu precatório.</p>
                  </div>
                )}

                {/* Loading Content */}
                {resultState === 'loading' && (
                  <div className="flex-grow flex flex-col items-center justify-center text-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent animate-pulse"></div>
                    <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-6 shadow-[0_0_30px_rgba(197,160,89,0.2)]"></div>
                    <h3 className="text-2xl text-white font-display mb-2 relative z-10 animate-pulse">Calculando Proposta...</h3>
                    <p className="text-slate-500 text-sm relative z-10">Analisando taxas de mercado e deságio.</p>
                  </div>
                )}

                {/* Result Content */}
                {resultState === 'final' && (
                  <div className="flex-grow flex flex-col">
                    {/* Background Effects */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] -ml-10 -mb-10 pointer-events-none"></div>

                    <div className="flex items-center justify-between mb-8 relative z-10">
                      <h3 className="text-2xl font-display text-white flex items-center gap-3">
                        <span className="iconify text-primary text-3xl" data-icon="solar:verified-check-bold"></span>
                        Análise Preliminar
                      </h3>
                      <span className="bg-green-500/20 text-green-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-green-500/30">Disponível</span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                      <div className="bg-navy-900/40 p-6 rounded-xl border border-white/5 backdrop-blur-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="iconify text-slate-400" data-icon="solar:wallet-money-linear"></span>
                          <p className="text-slate-400 text-xs uppercase tracking-widest">Valor de Face</p>
                        </div>
                        <p className="text-2xl text-white font-medium tracking-tight">{displayValorFace}</p>
                      </div>
                      <div className="bg-gradient-to-br from-primary/20 to-navy-900/80 p-6 rounded-xl border border-primary/30 relative overflow-hidden group hover:hover:border-primary/50 transition-colors">
                        <div className="absolute inset-0 bg-cubes-pattern opacity-10"></div>
                        <div className="flex items-center gap-2 mb-2 relative z-10">
                          <span className="iconify text-primary" data-icon="solar:hand-money-bold"></span>
                          <p className="text-primary text-xs uppercase tracking-widest font-bold">Você Recebe (Estimado)</p>
                        </div>
                        <p className="text-3xl md:text-4xl font-display font-bold text-gradient-gold relative z-10 tracking-tight">{displayValorLiquido}</p>
                        <p className="text-[10px] text-slate-300 mt-2 relative z-10 opacity-80 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span> Pagamento à vista
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-4 text-sm text-slate-300 p-3 rounded-lg hover:hover:bg-white/5 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <span className="iconify text-lg" data-icon="solar:shield-check-bold"></span>
                        </div>
                        <span>Sem custos de honorários advocatícios na venda</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-300 p-3 rounded-lg hover:hover:bg-white/5 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <span className="iconify text-lg" data-icon="solar:clock-circle-bold"></span>
                        </div>
                        <span>Análise jurídica gratuita em até 24h</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-300 p-3 rounded-lg hover:hover:bg-white/5 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <span className="iconify text-lg" data-icon="solar:banknote-bold"></span>
                        </div>
                        <span>Pagamento via TED no ato da assinatura</span>
                      </div>
                    </div>

                    <div className="border-t border-white/10 pt-6">
                      <h4 className="text-white font-display text-lg mb-2">Gostou da estimativa?</h4>
                      <p className="text-slate-400 text-sm mb-6 font-light">Congele essa oferta agora e receba o contato de um especialista.</p>

                      <div className="grid md:grid-cols-2 gap-4">
                        <Link to="/formulario" className="md:col-span-2 btn-glow bg-white text-navy-900 font-bold py-4 uppercase tracking-widest hover:hover:bg-primary transition-all rounded-lg shadow-lg flex items-center justify-center gap-2 group">
                          Formalizar Proposta <span className="iconify text-xl group-hover:hover:translate-x-1 transition-transform" data-icon="solar:arrow-right-bold"></span>
                        </Link>
                      </div>
                    </div>

                    <p className="text-[10px] text-slate-600 mt-6 text-center">
                      *Esta simulação é apenas uma estimativa baseada em índices médios de mercado e não constitui uma proposta vinculante. O valor final depende de análise jurídica detalhada (Due Diligence).
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
