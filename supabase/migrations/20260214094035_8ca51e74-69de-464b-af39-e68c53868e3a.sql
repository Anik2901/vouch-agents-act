
-- Profiles table for user data
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    full_name TEXT,
    wallet_address TEXT,
    avatar_url TEXT,
    kyc_status TEXT DEFAULT 'unverified' CHECK (kyc_status IN ('unverified', 'pending', 'verified', 'rejected')),
    identity_score NUMERIC(5,2) DEFAULT 0,
    did_identifier TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

-- Agents table
CREATE TABLE public.agents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    agent_name TEXT NOT NULL,
    agent_code TEXT NOT NULL,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'terminated')),
    tasks_processed INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own agents" ON public.agents FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create agents" ON public.agents FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own agents" ON public.agents FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own agents" ON public.agents FOR DELETE USING (auth.uid() = user_id);

-- Mandates table
CREATE TABLE public.mandates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    mandate_name TEXT NOT NULL,
    spending_limit NUMERIC(12,2) NOT NULL DEFAULT 500,
    spent NUMERIC(12,2) NOT NULL DEFAULT 0,
    time_window TEXT DEFAULT '24h' CHECK (time_window IN ('24h', 'weekly', 'monthly', 'onetime')),
    tx_limit NUMERIC(12,2) DEFAULT 100,
    verification_mode TEXT DEFAULT 'strict' CHECK (verification_mode IN ('strict', 'flexible')),
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'expired')),
    agent_id UUID REFERENCES public.agents(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.mandates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own mandates" ON public.mandates FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create mandates" ON public.mandates FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own mandates" ON public.mandates FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own mandates" ON public.mandates FOR DELETE USING (auth.uid() = user_id);

-- Transactions table
CREATE TABLE public.transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    agent_id UUID REFERENCES public.agents(id) ON DELETE SET NULL,
    mandate_id UUID REFERENCES public.mandates(id) ON DELETE SET NULL,
    merchant TEXT NOT NULL,
    amount NUMERIC(12,2) NOT NULL,
    currency TEXT DEFAULT 'USDC',
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'settled', 'flagged', 'rejected')),
    tx_hash TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own transactions" ON public.transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create transactions" ON public.transactions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Merchant whitelist
CREATE TABLE public.merchant_whitelist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mandate_id UUID REFERENCES public.mandates(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    domain TEXT NOT NULL,
    category TEXT,
    auto_approved BOOLEAN DEFAULT false,
    mfa_required BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.merchant_whitelist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own whitelist" ON public.merchant_whitelist FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create whitelist entries" ON public.merchant_whitelist FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update whitelist entries" ON public.merchant_whitelist FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete whitelist entries" ON public.merchant_whitelist FOR DELETE USING (auth.uid() = user_id);

-- API keys table
CREATE TABLE public.api_keys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    key_prefix TEXT NOT NULL,
    key_hash TEXT NOT NULL,
    label TEXT DEFAULT 'Default',
    is_active BOOLEAN DEFAULT true,
    last_used_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own api keys" ON public.api_keys FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create api keys" ON public.api_keys FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own api keys" ON public.api_keys FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own api keys" ON public.api_keys FOR DELETE USING (auth.uid() = user_id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (user_id, full_name)
    VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
    RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_agents_updated_at BEFORE UPDATE ON public.agents FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_mandates_updated_at BEFORE UPDATE ON public.mandates FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
