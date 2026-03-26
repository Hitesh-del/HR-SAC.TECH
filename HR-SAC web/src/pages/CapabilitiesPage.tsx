import { useEffect, useState } from 'react';
import { ServiceCard } from '@/components/common/ServiceCard';
import TechStack from '@/components/common/TechStack';
import { getServices } from '@/db/api';
import type { Service } from '@/types';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function CapabilitiesPage() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background via-background to-accent/10">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our <span className="gradient-text-colorful">Capabilities</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Comprehensive software development services designed to transform your business and drive digital innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <TechStack />

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose <span className="gradient-text-colorful">HR-SAC</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              What sets us apart from the competition
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Expert Team',
                description: 'Highly skilled developers with years of experience in cutting-edge technologies',
              },
              {
                title: 'Agile Methodology',
                description: 'Flexible and iterative approach ensuring rapid delivery and continuous improvement',
              },
              {
                title: 'Quality Assurance',
                description: 'Rigorous testing processes to ensure bug-free, high-performance applications',
              },
              {
                title: 'Scalable Solutions',
                description: 'Architecture designed to grow with your business needs',
              },
              {
                title: 'Ongoing Support',
                description: 'Dedicated maintenance and support to keep your applications running smoothly',
              },
              {
                title: 'Competitive Pricing',
                description: 'Transparent pricing with no hidden costs, delivering maximum value',
              },
            ].map((item, index) => (
              <div key={index} className="glass-card p-6 hover:glow-effect transition-all">
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-secondary/50 via-muted/50 to-accent/50">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Get <span className="gradient-text-colorful">Started?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss your project and how we can help bring your vision to life
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
