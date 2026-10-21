CREATE TABLE IF NOT EXISTS customer_profiles (
 id uuid PRIMARY KEY,
 email text NOT NULL UNIQUE,
 full_name text NOT NULL DEFAULT '',
 newsletter_opt_in boolean NOT NULL DEFAULT false,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 email text NOT NULL UNIQUE,
 full_name text NOT NULL DEFAULT '',
 language text NOT NULL DEFAULT 'en' CHECK(language IN ('en','ar')),
 status text NOT NULL DEFAULT 'PENDING' CHECK(status IN ('PENDING','ACTIVE','UNSUBSCRIBED')),
 confirm_token_hash text,
 confirm_expires_at timestamptz,
 consent_at timestamptz NOT NULL DEFAULT now(),
 confirmed_at timestamptz,
 unsubscribed_at timestamptz,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS newsletter_active_idx ON newsletter_subscribers(status,created_at DESC);
