-- Rodar no SQL Editor do Supabase Dashboard
-- https://supabase.com/dashboard/project/gkyfgqsdoapvxhdbzwrd/sql

-- Adiciona colunas faltantes (seguro para rodar mesmo se já existirem)
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'novo',
  ADD COLUMN IF NOT EXISTS nascimento TEXT,
  ADD COLUMN IF NOT EXISTS estado TEXT,
  ADD COLUMN IF NOT EXISTS cidade TEXT;

-- Garante que RLS está ativo
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Remove políticas antigas se existirem
DROP POLICY IF EXISTS "anon_insert" ON leads;
DROP POLICY IF EXISTS "auth_all" ON leads;
DROP POLICY IF EXISTS "allow_insert" ON leads;
DROP POLICY IF EXISTS "allow_select" ON leads;

-- Usuários anônimos podem inserir (formulários públicos do site)
CREATE POLICY "anon_insert" ON leads
  FOR INSERT TO anon
  WITH CHECK (true);

-- Usuários autenticados (admin) têm acesso total
CREATE POLICY "auth_all" ON leads
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);
