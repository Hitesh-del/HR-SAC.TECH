import { supabase } from './supabase';
import type {
  Profile,
  Service,
  TeamMember,
  CaseStudy,
  BlogPost,
  Testimonial,
  ContactSubmission,
} from '@/types';

// Profiles
export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle();

  if (error) throw error;
  return data as Profile | null;
}

export async function getAllProfiles() {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return Array.isArray(data) ? (data as Profile[]) : [];
}

export async function updateProfile(userId: string, updates: Partial<Profile>) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .maybeSingle();

  if (error) throw error;
  return data as Profile;
}

// Services
export async function getServices() {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) throw error;
  return Array.isArray(data) ? (data as Service[]) : [];
}

export async function getService(id: string) {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;
  return data as Service | null;
}

// Team Members
export async function getTeamMembers() {
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) throw error;
  return Array.isArray(data) ? (data as TeamMember[]) : [];
}

export async function getTeamMember(id: string) {
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;
  return data as TeamMember | null;
}

// Case Studies
export async function getCaseStudies(limit?: number) {
  let query = supabase
    .from('case_studies')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) throw error;
  return Array.isArray(data) ? (data as CaseStudy[]) : [];
}

export async function getCaseStudy(id: string) {
  const { data, error } = await supabase
    .from('case_studies')
    .select('*')
    .eq('id', id)
    .eq('published', true)
    .maybeSingle();

  if (error) throw error;
  return data as CaseStudy | null;
}

// Blog Posts
export async function getBlogPosts(limit?: number) {
  let query = supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) throw error;
  return Array.isArray(data) ? (data as BlogPost[]) : [];
}

export async function getBlogPost(slug: string) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle();

  if (error) throw error;
  return data as BlogPost | null;
}

export async function getBlogPostsByCategory(category: string, limit?: number) {
  let query = supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .eq('category', category)
    .order('created_at', { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) throw error;
  return Array.isArray(data) ? (data as BlogPost[]) : [];
}

// Testimonials
export async function getTestimonials() {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return Array.isArray(data) ? (data as Testimonial[]) : [];
}

// Contact Submissions
export async function createContactSubmission(submission: ContactSubmission) {
  const { error } = await supabase
    .from('contact_submissions')
    .insert([submission]);

  if (error) throw error;
}

export async function getContactSubmissions() {
  const { data, error } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return Array.isArray(data) ? (data as ContactSubmission[]) : [];
}
