import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { Icon } from '@iconify/react';

const STATUS_OPTIONS = [
  { value: 'novo', label: 'Novo', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
  { value: 'em_contato', label: 'Em Contato', color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' },
  { value: 'proposta_enviada', label: 'Proposta Enviada', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
  { value: 'fechado', label: 'Fechado', color: 'bg-green-500/20 text-green-300 border-green-500/30' },
  { value: 'perdido', label: 'Perdido', color: 'bg-red-500/20 text-red-300 border-red-500/30' },
];

const SOURCE_CONFIG = {
  home: { label: 'Home', icon: 'mdi:home-outline', color: 'bg-primary/20 text-primary border-primary/30' },
  formulario: { label: 'Formulário', icon: 'mdi:file-document-outline', color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' },
  simulacao: { label: 'Simulação', icon: 'mdi:calculator-variant-outline', color: 'bg-orange-500/20 text-orange-300 border-orange-500/30' },
  curriculo: { label: 'Currículo', icon: 'mdi:account-tie-outline', color: 'bg-teal-500/20 text-teal-300 border-teal-500/30' },
};

function StatusBadge({ status, onChange }) {
  const [open, setOpen] = useState(false);
  const current = STATUS_OPTIONS.find(s => s.value === status) || STATUS_OPTIONS[0];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border cursor-pointer transition-all ${current.color}`}
      >
        {current.label}
        <Icon icon="mdi:chevron-down" className="text-xs opacity-70" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute z-50 top-full left-0 mt-1.5 bg-navy-800 border border-white/10 rounded-xl shadow-2xl overflow-hidden min-w-[170px]">
            {STATUS_OPTIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => { onChange(opt.value); setOpen(false); }}
                className={`w-full text-left px-3 py-2.5 text-xs font-semibold hover:bg-white/5 flex items-center gap-2 transition-colors ${opt.value === status ? 'bg-white/5' : ''}`}
              >
                <span className={`inline-block w-1.5 h-1.5 rounded-full ${opt.color.includes('blue') ? 'bg-blue-400' : opt.color.includes('yellow') ? 'bg-yellow-400' : opt.color.includes('purple') ? 'bg-purple-400' : opt.color.includes('green') ? 'bg-green-400' : 'bg-red-400'}`}></span>
                <span className={`px-2 py-0.5 rounded-full border text-xs ${opt.color}`}>{opt.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError('Email ou senha inválidos.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-cubes-pattern opacity-10"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px]"></div>

      <div className="relative z-10 w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 border border-primary/30 rounded-full bg-white/5 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-primary font-sans text-xs tracking-[0.2em] uppercase font-bold">Área Restrita</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-white mb-2">
            Painel <span className="text-gradient-gold italic">Admin</span>
          </h1>
          <p className="text-slate-400 text-sm">Advance Precatórios</p>
        </div>

        <div className="glass-panel p-8 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden bg-navy-800/80 backdrop-blur-xl">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent"></div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-primary font-bold ml-1">Email</label>
              <div className="relative">
                <Icon icon="mdi:email-outline" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="form-input w-full rounded-sm pl-12 pr-4 py-3 outline-none"
                  placeholder="admin@email.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-primary font-bold ml-1">Senha</label>
              <div className="relative">
                <Icon icon="mdi:lock-outline" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="form-input w-full rounded-sm pl-12 pr-4 py-3 outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>
            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                <Icon icon="mdi:alert-circle-outline" />
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-glow bg-white text-navy-900 font-bold py-4 uppercase tracking-widest hover:bg-primary transition-all rounded-sm flex items-center justify-center gap-2 shadow-lg disabled:opacity-60 mt-2"
            >
              {loading ? <><Icon icon="mdi:loading" className="animate-spin" /> Entrando...</> : <>Entrar <Icon icon="mdi:arrow-right" /></>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function LeadModal({ lead, onClose, onStatusChange, onDelete }) {
  if (!lead) return null;
  const src = SOURCE_CONFIG[lead.origem];

  const fields = [
    { label: 'Fonte', value: src?.label || lead.origem, icon: src?.icon || 'mdi:tag-outline' },
    { label: 'Nome', value: lead.nome, icon: 'mdi:account-outline' },
    { label: 'CPF/CNPJ', value: lead.cpf_cnpj, icon: 'mdi:card-account-details-outline' },
    { label: 'Nascimento', value: lead.nascimento, icon: 'mdi:calendar-outline' },
    { label: 'Telefone', value: lead.telefone, icon: 'mdi:whatsapp' },
    { label: 'E-mail', value: lead.email, icon: 'mdi:email-outline' },
    { label: 'Estado', value: lead.estado, icon: 'mdi:map-marker-outline' },
    { label: 'Cidade', value: lead.cidade, icon: 'mdi:city-variant-outline' },
    { label: lead.origem === 'curriculo' ? 'Área de Interesse' : 'Ente Devedor', value: lead.ente_devedor, icon: lead.origem === 'curriculo' ? 'mdi:briefcase-outline' : 'mdi:bank-outline' },
    { label: 'Natureza', value: lead.origem !== 'curriculo' ? lead.natureza : null, icon: 'mdi:file-certificate-outline' },
    { label: 'Valor de Face', value: lead.origem !== 'curriculo' ? lead.valor_face : null, icon: 'mdi:cash-multiple' },
    { label: 'Valor Estimado', value: lead.origem !== 'curriculo' ? lead.valor_estimado : null, icon: 'mdi:hand-coin-outline' },
    { label: 'Ano de Expedição', value: lead.origem !== 'curriculo' ? lead.ano_expedicao : null, icon: 'mdi:calendar-clock' },
    { label: lead.origem === 'curriculo' ? 'LinkedIn / Portfólio' : 'Nº do Processo', value: lead.numero_processo, icon: lead.origem === 'curriculo' ? 'mdi:linkedin' : 'mdi:gavel' },
    { label: lead.origem === 'curriculo' ? 'Apresentação' : 'Observações', value: lead.observacoes, icon: 'mdi:message-text-outline' },
    { label: 'Data', value: lead.created_at ? new Date(lead.created_at).toLocaleString('pt-BR') : null, icon: 'mdi:clock-outline' },
  ].filter(f => f.value);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div
        className="bg-navy-800 border border-white/10 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative"
        onClick={e => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent rounded-t-2xl"></div>

        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <h2 className="font-display font-bold text-white text-xl">{lead.nome || 'Lead'}</h2>
            {src && (
              <span className={`inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${src.color}`}>
                <Icon icon={src.icon} className="text-xs" /> {src.label}
              </span>
            )}
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
            <Icon icon="mdi:close" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-5">
            <p className="text-xs uppercase tracking-wider text-slate-500 mb-2 font-semibold">Status</p>
            <StatusBadge status={lead.status || 'novo'} onChange={v => onStatusChange(lead.id, v)} />
          </div>

          <div className="space-y-3">
            {fields.map(({ label, value, icon }) => (
              <div key={label} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon icon={icon} className="text-primary text-sm" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold">{label}</p>
                  <p className="text-sm text-white break-words mt-0.5">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {lead.telefone && (
            <a
              href={`https://wa.me/55${lead.telefone.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full btn-glow bg-green-500 text-white font-bold py-3 uppercase tracking-widest hover:bg-green-400 transition-all rounded-sm flex items-center justify-center gap-2 shadow-lg"
            >
              <Icon icon="mdi:whatsapp" className="text-lg" /> Contatar via WhatsApp
            </a>
          )}

          <button
            onClick={() => {
              if (window.confirm(`Deletar o lead de "${lead.nome || 'este contato'}"? Esta ação não pode ser desfeita.`)) {
                onDelete(lead.id);
                onClose();
              }
            }}
            className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-sm border border-red-500/20 text-red-400 hover:bg-red-500/10 hover:border-red-500/40 transition-all text-sm font-semibold uppercase tracking-widest"
          >
            <Icon icon="mdi:trash-can-outline" /> Deletar lead
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Admin() {
  const [session, setSession] = useState(null);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sourceFilter, setSourceFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedLead, setSelectedLead] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setSessionLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    let query = supabase.from('leads').select('*').order('created_at', { ascending: false });
    if (sourceFilter !== 'all') query = query.eq('origem', sourceFilter);
    if (statusFilter !== 'all') query = query.eq('status', statusFilter);
    const { data, error } = await query;
    if (!error) setLeads(data || []);
    setLoading(false);
  }, [sourceFilter, statusFilter]);

  useEffect(() => {
    if (session) fetchLeads();
  }, [session, fetchLeads]);

  const updateStatus = useCallback(async (id, status) => {
    await supabase.from('leads').update({ status }).eq('id', id);
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
    if (selectedLead?.id === id) setSelectedLead(prev => ({ ...prev, status }));
  }, [selectedLead]);

  const deleteLead = useCallback(async (id) => {
    await supabase.from('leads').delete().eq('id', id);
    setLeads(prev => prev.filter(l => l.id !== id));
  }, []);

  if (sessionLoading) {
    return (
      <div className="min-h-screen bg-navy-900 flex items-center justify-center">
        <Icon icon="mdi:loading" className="text-3xl text-primary animate-spin" />
      </div>
    );
  }

  if (!session) return <LoginScreen />;

  const filtered = leads.filter(l => {
    if (!search) return true;
    const q = search.toLowerCase();
    return [l.nome, l.email, l.telefone, l.cpf_cnpj].some(v => v?.toLowerCase().includes(q));
  });

  const counts = {
    all: leads.length,
    home: leads.filter(l => l.origem === 'home').length,
    formulario: leads.filter(l => l.origem === 'formulario').length,
    simulacao: leads.filter(l => l.origem === 'simulacao').length,
    curriculo: leads.filter(l => l.origem === 'curriculo').length,
  };

  const statusCounts = STATUS_OPTIONS.reduce((acc, s) => {
    acc[s.value] = leads.filter(l => (l.status || 'novo') === s.value).length;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-navy-900 text-white">
      <div className="absolute inset-0 bg-cubes-pattern opacity-5 pointer-events-none"></div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 bg-navy-900/80 backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Icon icon="mdi:account-group-outline" className="text-primary text-lg" />
            </div>
            <div>
              <h1 className="font-display font-bold text-white text-lg leading-tight">Painel de Leads</h1>
              <p className="text-xs text-slate-500">Advance Precatórios</p>
            </div>
          </div>
          <button
            onClick={() => supabase.auth.signOut()}
            className="flex items-center gap-2 text-xs text-slate-400 hover:text-white border border-white/10 hover:border-white/20 px-3 py-2 rounded-lg transition-all"
          >
            <Icon icon="mdi:logout" /> Sair
          </button>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-8">

        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            { key: 'all', label: 'Total', icon: 'mdi:account-group-outline', count: counts.all },
            { key: 'home', label: 'Home', icon: 'mdi:home-outline', count: counts.home },
            { key: 'formulario', label: 'Formulário', icon: 'mdi:file-document-outline', count: counts.formulario },
            { key: 'curriculo', label: 'Currículos', icon: 'mdi:account-tie-outline', count: counts.curriculo },
            { key: 'simulacao', label: 'Simulação', icon: 'mdi:calculator-variant-outline', count: counts.simulacao },
          ].map(({ key, label, icon, count }) => (
            <button
              key={key}
              onClick={() => setSourceFilter(key)}
              className={`p-4 rounded-xl border text-left transition-all group ${
                sourceFilter === key
                  ? 'bg-primary/10 border-primary/40 shadow-[0_0_20px_rgba(197,160,89,0.1)]'
                  : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/8'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 transition-colors ${sourceFilter === key ? 'bg-primary/20' : 'bg-white/10'}`}>
                <Icon icon={icon} className={`text-sm ${sourceFilter === key ? 'text-primary' : 'text-slate-400'}`} />
              </div>
              <p className={`text-2xl font-display font-bold ${sourceFilter === key ? 'text-primary' : 'text-white'}`}>{count}</p>
              <p className="text-xs text-slate-500 mt-0.5">{label}</p>
            </button>
          ))}
        </div>

        {/* Filters row */}
        <div className="flex flex-wrap gap-3 mb-5 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Icon icon="mdi:magnify" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar por nome, email, telefone ou CPF..."
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-primary/50 focus:bg-white/8 transition-all"
            />
          </div>

          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-slate-300 outline-none focus:border-primary/50 cursor-pointer"
          >
            <option value="all" className="bg-navy-800">Todos os status</option>
            {STATUS_OPTIONS.map(s => (
              <option key={s.value} value={s.value} className="bg-navy-800">
                {s.label} ({statusCounts[s.value] || 0})
              </option>
            ))}
          </select>

          <button onClick={fetchLeads} className="flex items-center gap-1.5 px-3 py-2.5 border border-white/10 hover:border-white/20 rounded-lg text-sm text-slate-400 hover:text-white transition-all">
            <Icon icon="mdi:refresh" className={loading ? 'animate-spin' : ''} /> Atualizar
          </button>
        </div>

        {/* Table */}
        <div className="bg-navy-800/60 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          {loading ? (
            <div className="flex items-center justify-center py-20 text-slate-500 gap-3">
              <Icon icon="mdi:loading" className="animate-spin text-2xl text-primary" />
              <span className="text-sm">Carregando leads...</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-slate-500">
              <Icon icon="mdi:inbox-outline" className="text-5xl mx-auto mb-3 text-slate-600" />
              <p className="text-sm">Nenhum lead encontrado.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Data</th>
                    <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Fonte</th>
                    <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Nome</th>
                    <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Contato</th>
                    <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Valor Estimado</th>
                    <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-5 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filtered.map(lead => {
                    const src = SOURCE_CONFIG[lead.origem];
                    return (
                      <tr key={lead.id} className="hover:bg-white/3 transition-colors group">
                        <td className="px-5 py-4 text-xs text-slate-500 whitespace-nowrap">
                          {lead.created_at ? new Date(lead.created_at).toLocaleDateString('pt-BR') : '—'}
                        </td>
                        <td className="px-5 py-4">
                          {src ? (
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${src.color}`}>
                              <Icon icon={src.icon} className="text-xs" /> {src.label}
                            </span>
                          ) : (
                            <span className="text-xs text-slate-500">{lead.origem}</span>
                          )}
                        </td>
                        <td className="px-5 py-4 font-medium text-white">
                          {lead.nome || <span className="text-slate-600">—</span>}
                        </td>
                        <td className="px-5 py-4 hidden md:table-cell">
                          <div className="text-slate-300 text-xs">{lead.telefone || '—'}</div>
                          <div className="text-slate-500 text-xs mt-0.5">{lead.email || ''}</div>
                        </td>
                        <td className="px-5 py-4 hidden lg:table-cell">
                          <span className="text-primary font-semibold">{lead.valor_estimado || '—'}</span>
                        </td>
                        <td className="px-5 py-4">
                          <StatusBadge status={lead.status || 'novo'} onChange={v => updateStatus(lead.id, v)} />
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                            <button
                              onClick={() => setSelectedLead(lead)}
                              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-primary/20 hover:text-primary flex items-center justify-center text-slate-500 transition-all"
                              title="Ver detalhes"
                            >
                              <Icon icon="mdi:eye-outline" />
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`Deletar o lead de "${lead.nome || 'este contato'}"?`)) {
                                  deleteLead(lead.id);
                                }
                              }}
                              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-400 flex items-center justify-center text-slate-500 transition-all"
                              title="Deletar"
                            >
                              <Icon icon="mdi:trash-can-outline" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="text-xs text-slate-600 mt-3 text-right">{filtered.length} lead(s) exibido(s)</p>
      </div>

      {selectedLead && (
        <LeadModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onStatusChange={updateStatus}
          onDelete={deleteLead}
        />
      )}
    </div>
  );
}
