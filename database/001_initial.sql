CREATE SEQUENCE IF NOT EXISTS machine_number_seq AS bigint NO CYCLE;
CREATE TABLE IF NOT EXISTS staff (id uuid PRIMARY KEY, email text NOT NULL UNIQUE, role text NOT NULL CHECK(role IN ('ADMIN','SALES','MARKETING')), active boolean NOT NULL DEFAULT true);
CREATE TABLE IF NOT EXISTS settings (id integer PRIMARY KEY CHECK(id=1), data jsonb NOT NULL DEFAULT '{}');
INSERT INTO settings(id) VALUES(1) ON CONFLICT DO NOTHING;
CREATE TABLE IF NOT EXISTS taxonomy (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), kind text NOT NULL CHECK(kind IN ('category','manufacturer')), slug text NOT NULL UNIQUE, name_en text NOT NULL, name_ar text NOT NULL, parent_id uuid REFERENCES taxonomy(id), active boolean NOT NULL DEFAULT true, sort_order integer NOT NULL DEFAULT 0);
CREATE TABLE IF NOT EXISTS machines (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), number bigint NOT NULL DEFAULT nextval('machine_number_seq') UNIQUE,
 code text NOT NULL UNIQUE, status text NOT NULL DEFAULT 'DRAFT' CHECK(status IN ('DRAFT','AVAILABLE','RESERVED','SOLD','ARCHIVED')),
 manufacturer text NOT NULL, model text NOT NULL, category text NOT NULL, subcategory text NOT NULL DEFAULT '', year integer CHECK(year BETWEEN 1850 AND 2200),
 title_en text NOT NULL, title_ar text NOT NULL, description_en text NOT NULL DEFAULT '', description_ar text NOT NULL DEFAULT '',
 location text NOT NULL DEFAULT '', condition text NOT NULL DEFAULT '', specs jsonb NOT NULL DEFAULT '{}', configuration_en text NOT NULL DEFAULT '', configuration_ar text NOT NULL DEFAULT '',
 seo_en text NOT NULL DEFAULT '', seo_ar text NOT NULL DEFAULT '', slug text NOT NULL UNIQUE, search_text text NOT NULL DEFAULT '',
 version integer NOT NULL DEFAULT 1, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE OR REPLACE FUNCTION assign_machine_code() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
 IF TG_OP='INSERT' THEN NEW.code := 'RGM-M-' || lpad(NEW.number::text,greatest(6,length(NEW.number::text)),'0');
 ELSIF TG_OP='DELETE' THEN RAISE EXCEPTION 'Machine records cannot be deleted; archive instead';
 ELSIF NEW.code IS DISTINCT FROM OLD.code OR NEW.number IS DISTINCT FROM OLD.number OR NEW.id IS DISTINCT FROM OLD.id THEN RAISE EXCEPTION 'Machine identity is immutable'; END IF;
 RETURN NEW;
END $$;
DROP TRIGGER IF EXISTS machine_identity ON machines;
CREATE TRIGGER machine_identity BEFORE INSERT OR UPDATE OR DELETE ON machines FOR EACH ROW EXECUTE FUNCTION assign_machine_code();
CREATE TABLE IF NOT EXISTS machine_commercial (machine_id uuid PRIMARY KEY REFERENCES machines(id) ON DELETE RESTRICT, selling_price numeric(16,2) CHECK(selling_price>=0), currency text NOT NULL DEFAULT 'EUR' CHECK(currency ~ '^[A-Z]{3}$'), show_public_price boolean NOT NULL DEFAULT false, send_email_price boolean NOT NULL DEFAULT false);
CREATE TABLE IF NOT EXISTS machine_internal (machine_id uuid PRIMARY KEY REFERENCES machines(id) ON DELETE RESTRICT, supplier text NOT NULL DEFAULT '', supplier_contact text NOT NULL DEFAULT '', purchase_price numeric(16,2), cost numeric(16,2), commission numeric(16,2), notes text NOT NULL DEFAULT '', serial text NOT NULL DEFAULT '', source_url text NOT NULL DEFAULT '');
CREATE TABLE IF NOT EXISTS media (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), machine_id uuid REFERENCES machines(id), lead_id uuid, kind text NOT NULL CHECK(kind IN ('image','pdf')), storage_key text NOT NULL, mime text NOT NULL, bytes integer NOT NULL, alt_en text NOT NULL DEFAULT '', alt_ar text NOT NULL DEFAULT '', sort_order integer NOT NULL DEFAULT 0, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS leads (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), type text NOT NULL CHECK(type IN ('MACHINE_INQUIRY','MACHINE_WANTED','SELL_MACHINE','INSPECTION_REQUEST','SERVICE_INQUIRY','GENERAL_CONTACT')), status text NOT NULL DEFAULT 'NEW' CHECK(status IN ('NEW','CONTACTED','QUALIFIED','OFFER_SENT','NEGOTIATION','WON','LOST','SPAM')), name text NOT NULL, company text NOT NULL DEFAULT '', country text NOT NULL, email text NOT NULL, phone text NOT NULL, language text NOT NULL CHECK(language IN ('en','ar')), message text NOT NULL DEFAULT '', machine_id uuid REFERENCES machines(id) ON DELETE RESTRICT, snapshot jsonb NOT NULL DEFAULT '{}', detail jsonb NOT NULL DEFAULT '{}', attribution jsonb NOT NULL DEFAULT '{}', privacy_consent boolean NOT NULL, whatsapp_consent boolean NOT NULL DEFAULT false, assigned_to uuid REFERENCES staff(id), idempotency_key uuid NOT NULL UNIQUE, request_hash text NOT NULL, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS lead_events (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), lead_id uuid NOT NULL REFERENCES leads(id), actor uuid REFERENCES staff(id), text text NOT NULL, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS outbox (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), lead_id uuid NOT NULL REFERENCES leads(id), kind text NOT NULL CHECK(kind IN ('CUSTOMER_EMAIL','INTERNAL_EMAIL','WHATSAPP')), status text NOT NULL DEFAULT 'PENDING', attempts integer NOT NULL DEFAULT 0, next_attempt timestamptz NOT NULL DEFAULT now(), lease_until timestamptz, provider_id text, error text, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(), UNIQUE(lead_id,kind));
CREATE TABLE IF NOT EXISTS delivery_attempts (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), outbox_id uuid NOT NULL REFERENCES outbox(id), provider text NOT NULL, status text NOT NULL, error text, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS webhook_receipts (event_key text PRIMARY KEY, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS content (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), slug text NOT NULL UNIQUE, kind text NOT NULL CHECK(kind IN ('page','service','article')), title_en text NOT NULL, title_ar text NOT NULL, body_en text NOT NULL, body_ar text NOT NULL DEFAULT '', published boolean NOT NULL DEFAULT false, arabic_ready boolean NOT NULL DEFAULT false, source_url text, original_date timestamptz, seo_en text NOT NULL DEFAULT '', seo_ar text NOT NULL DEFAULT '', updated_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS imports (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), actor uuid REFERENCES staff(id), checksum text NOT NULL, rows jsonb NOT NULL, committed boolean NOT NULL DEFAULT false, result jsonb, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS redirects (source text PRIMARY KEY, destination text NOT NULL CHECK(destination LIKE '/%' AND destination NOT LIKE '//%'), enabled boolean NOT NULL DEFAULT true);
CREATE TABLE IF NOT EXISTS audit (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), actor uuid, action text NOT NULL, entity_id text, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS rate_limits (key text PRIMARY KEY, count integer NOT NULL, expires_at timestamptz NOT NULL);
CREATE TABLE IF NOT EXISTS analytics (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), event text NOT NULL, machine_id uuid, created_at timestamptz NOT NULL DEFAULT now());
CREATE INDEX IF NOT EXISTS machines_status_idx ON machines(status,created_at DESC,id);
CREATE INDEX IF NOT EXISTS machines_category_idx ON machines(category,status);
CREATE INDEX IF NOT EXISTS machines_brand_idx ON machines(manufacturer,status);
CREATE INDEX IF NOT EXISTS leads_status_idx ON leads(status,created_at DESC);
CREATE INDEX IF NOT EXISTS outbox_pending_idx ON outbox(status,next_attempt);
-- All tables are server-only. No anon/authenticated browser policies are granted.
DO $$ DECLARE r record; BEGIN FOR r IN SELECT tablename FROM pg_tables WHERE schemaname='public' LOOP EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY',r.tablename); END LOOP; END $$;
