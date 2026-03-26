import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AnimatedCounter } from '@/components/common/AnimatedCounter';
import { ServiceCard } from '@/components/common/ServiceCard';
import { TestimonialCard } from '@/components/common/TestimonialCard';
import { CaseStudyCard } from '@/components/common/CaseStudyCard';
import { TeamCard } from '@/components/common/TeamCard';
import { BlogCard } from '@/components/common/BlogCard';
import { getServices, getTestimonials, getCaseStudies, getTeamMembers, getBlogPosts } from '@/db/api';
import type { Service, Testimonial, CaseStudy, TeamMember, BlogPost } from '@/types';
import { ArrowRight } from 'lucide-react';
import Galaxy from '@/components/ui/Galaxy';

export default function HomePage() {
  const [services, setServices] = useState<Service[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesData, testimonialsData, caseStudiesData, teamData, blogData] = await Promise.all([
          getServices(),
          getTestimonials(),
          getCaseStudies(3),
          getTeamMembers(),
          getBlogPosts(3),
        ]);
        setServices(servicesData);
        setTestimonials(testimonialsData);
        setCaseStudies(caseStudiesData);
        setTeamMembers(teamData);
        setBlogPosts(blogData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col bg-black">
      {/* Hero Section with Galaxy Background */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <Galaxy
            hueShift={0}
            saturation={0}
            glowIntensity={0.1}
            density={1.5}
            speed={0.5}
            transparent={false}
          />
        </div>

        <div className="container relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in text-white">
            Transform Your Digital
            <br />
            <span className="gradient-text-colorful">Vision Into Reality</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto animate-fade-in">
            We craft innovative software solutions that drive business growth and deliver exceptional user experiences.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center animate-fade-in">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-black hover:bg-gray-200 text-lg px-8" asChild>
                <span>
                  Get Free Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </span>
              </Button>
            </Link>
            <Link to="/capabilities">
              <Button 
                size="lg" 
                className="text-lg px-8 border-2 border-white bg-transparent hover:bg-white hover:text-black text-white transition-all" 
                asChild
              >
                <span>Explore Services</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                <AnimatedCounter end={25} suffix="+" />
              </div>
              <p className="text-muted-foreground">Projects Completed</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                <AnimatedCounter end={34} suffix="+" />
              </div>
              <p className="text-muted-foreground">Happy Clients</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                <AnimatedCounter end={10} suffix="+" />
              </div>
              <p className="text-muted-foreground">Team Members</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                <AnimatedCounter end={3} suffix="+" />
              </div>
              <p className="text-muted-foreground">Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="gradient-text-colorful">Services</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive software development services tailored to your business needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/capabilities">
              <Button size="lg" variant="outline" asChild>
                <span>
                  View All Services
                  <ArrowRight className="ml-2 h-5 w-5" />
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 bg-accent/5">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured <span className="gradient-text-colorful">Case Studies</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover how we've helped businesses achieve their digital goals
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((caseStudy) => (
              <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/case-studies">
              <Button size="lg" variant="outline" asChild>
                <span>
                  View All Case Studies
                  <ArrowRight className="ml-2 h-5 w-5" />
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              What Our <span className="gradient-text-colorful">Clients Say</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied clients
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-accent/5">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Meet Our <span className="gradient-text-colorful">Expert Team</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Talented professionals dedicated to your success
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Latest <span className="gradient-text-colorful">Insights</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest trends and insights in technology
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/insights">
              <Button size="lg" variant="outline" asChild>
                <span>
                  View All Articles
                  <ArrowRight className="ml-2 h-5 w-5" />
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-secondary/50 via-muted/50 to-accent/50">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your <span className="gradient-text-colorful">Digital Journey?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help transform your ideas into powerful digital solutions
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8" asChild>
              <span>
                Get Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </span>
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
