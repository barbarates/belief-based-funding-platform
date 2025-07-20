-- Criar tabelas para audit logs e blockchain transactions
CREATE TABLE public.audit_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  table_name TEXT NOT NULL,
  record_id TEXT,
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.blockchain_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id UUID REFERENCES public.investment_campaigns(id) ON DELETE CASCADE,
  investor_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  transaction_hash TEXT NOT NULL UNIQUE,
  transaction_type TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  network_id TEXT NOT NULL DEFAULT 'solana-devnet',
  block_number BIGINT,
  gas_used BIGINT,
  gas_price NUMERIC,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  confirmed_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE public.kyc_verifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending',
  full_name TEXT NOT NULL,
  document_type TEXT NOT NULL,
  document_number TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  country TEXT NOT NULL,
  phone TEXT,
  verified_at TIMESTAMP WITH TIME ZONE,
  rejected_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.security_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  two_factor_enabled BOOLEAN NOT NULL DEFAULT false,
  email_notifications BOOLEAN NOT NULL DEFAULT true,
  sms_notifications BOOLEAN NOT NULL DEFAULT false,
  login_alerts BOOLEAN NOT NULL DEFAULT true,
  withdrawal_confirmations BOOLEAN NOT NULL DEFAULT true,
  max_daily_withdrawal NUMERIC DEFAULT 1000,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blockchain_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kyc_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.security_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for audit_logs
CREATE POLICY "Users can view their own audit logs" 
ON public.audit_logs 
FOR SELECT 
USING (auth.uid() = user_id);

-- RLS Policies for blockchain_transactions
CREATE POLICY "Users can view their own transactions" 
ON public.blockchain_transactions 
FOR SELECT 
USING (auth.uid() = investor_id);

CREATE POLICY "Users can insert their own transactions" 
ON public.blockchain_transactions 
FOR INSERT 
WITH CHECK (auth.uid() = investor_id);

-- RLS Policies for kyc_verifications
CREATE POLICY "Users can view their own KYC" 
ON public.kyc_verifications 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own KYC" 
ON public.kyc_verifications 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own KYC" 
ON public.kyc_verifications 
FOR UPDATE 
USING (auth.uid() = user_id);

-- RLS Policies for security_settings
CREATE POLICY "Users can view their own security settings" 
ON public.security_settings 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own security settings" 
ON public.security_settings 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own security settings" 
ON public.security_settings 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create updated_at trigger function if not exists
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER handle_kyc_verifications_updated_at
  BEFORE UPDATE ON public.kyc_verifications
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_security_settings_updated_at
  BEFORE UPDATE ON public.security_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();