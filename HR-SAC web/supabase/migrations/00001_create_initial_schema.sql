-- Create user_role enum
CREATE TYPE public.user_role AS ENUM ('user', 'admin');

-- Create profiles table
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  phone text,
  role public.user_role NOT NULL DEFAULT 'user'::public.user_role,
  created_at timestamptz DEFAULT now()
);

-- Create services table
CREATE TABLE public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  icon text,
  features text[],
  created_at timestamptz DEFAULT now()
);

-- Create team_members table
CREATE TABLE public.team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  position text NOT NULL,
  bio text,
  image_url text,
  linkedin_url text,
  twitter_url text,
  display_order int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create case_studies table
CREATE TABLE public.case_studies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  client text NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  problem text,
  solution text,
  results text,
  image_url text,
  technologies text[],
  project_url text,
  created_at timestamptz DEFAULT now(),
  published boolean DEFAULT true
);

-- Create blog_posts table
CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  author_id uuid REFERENCES public.profiles(id),
  category text NOT NULL,
  image_url text,
  tags text[],
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create testimonials table
CREATE TABLE public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  client_position text NOT NULL,
  client_company text NOT NULL,
  content text NOT NULL,
  rating int CHECK (rating >= 1 AND rating <= 5),
  image_url text,
  created_at timestamptz DEFAULT now(),
  published boolean DEFAULT true
);

-- Create contact_submissions table
CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  message text NOT NULL,
  service_interest text,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

-- Create trigger function for new user
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  user_count int;
BEGIN
  SELECT COUNT(*) INTO user_count FROM profiles;
  INSERT INTO public.profiles (id, email, phone, role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.phone,
    CASE WHEN user_count = 0 THEN 'admin'::public.user_role ELSE 'user'::public.user_role END
  );
  RETURN NEW;
END;
$$;

-- Create trigger
DROP TRIGGER IF EXISTS on_auth_user_confirmed ON auth.users;
CREATE TRIGGER on_auth_user_confirmed
  AFTER UPDATE ON auth.users
  FOR EACH ROW
  WHEN (OLD.confirmed_at IS NULL AND NEW.confirmed_at IS NOT NULL)
  EXECUTE FUNCTION handle_new_user();

-- Create helper function for admin check
CREATE OR REPLACE FUNCTION is_admin(uid uuid)
RETURNS boolean LANGUAGE sql SECURITY DEFINER AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles p
    WHERE p.id = uid AND p.role = 'admin'::user_role
  );
$$;

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Admins have full access to profiles" ON profiles
  FOR ALL TO authenticated USING (is_admin(auth.uid()));

CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT TO authenticated USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id)
  WITH CHECK (role IS NOT DISTINCT FROM (SELECT role FROM profiles WHERE id = auth.uid()));

-- Public view for profiles
CREATE VIEW public_profiles AS
  SELECT id, role FROM profiles;

-- Services policies (public read, admin write)
CREATE POLICY "Anyone can view services" ON services
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Admins can manage services" ON services
  FOR ALL TO authenticated USING (is_admin(auth.uid()));

-- Team members policies (public read, admin write)
CREATE POLICY "Anyone can view team members" ON team_members
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Admins can manage team members" ON team_members
  FOR ALL TO authenticated USING (is_admin(auth.uid()));

-- Case studies policies (public read published, admin full access)
CREATE POLICY "Anyone can view published case studies" ON case_studies
  FOR SELECT TO anon, authenticated USING (published = true);

CREATE POLICY "Admins can manage case studies" ON case_studies
  FOR ALL TO authenticated USING (is_admin(auth.uid()));

-- Blog posts policies (public read published, admin full access)
CREATE POLICY "Anyone can view published blog posts" ON blog_posts
  FOR SELECT TO anon, authenticated USING (published = true);

CREATE POLICY "Admins can manage blog posts" ON blog_posts
  FOR ALL TO authenticated USING (is_admin(auth.uid()));

-- Testimonials policies (public read published, admin full access)
CREATE POLICY "Anyone can view published testimonials" ON testimonials
  FOR SELECT TO anon, authenticated USING (published = true);

CREATE POLICY "Admins can manage testimonials" ON testimonials
  FOR ALL TO authenticated USING (is_admin(auth.uid()));

-- Contact submissions policies (anyone can insert, admin can view all)
CREATE POLICY "Anyone can submit contact form" ON contact_submissions
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Anyone can view their submissions" ON contact_submissions
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Admins can manage contact submissions" ON contact_submissions
  FOR ALL TO authenticated USING (is_admin(auth.uid()));