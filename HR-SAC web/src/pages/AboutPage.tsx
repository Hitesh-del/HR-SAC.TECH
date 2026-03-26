import { useEffect, useState } from 'react';
import { AnimatedCounter } from '@/components/common/AnimatedCounter';
import { TeamCard } from '@/components/common/TeamCard';
import { getTeamMembers } from '@/db/api';
import type { TeamMember } from '@/types';
import { Target, Eye, Zap, Users, Award, TrendingUp } from 'lucide-react';

export default function AboutPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await getTeamMembers();
        setTeamMembers(data);
      } catch (error) {
        console.error('Error fetching team:', error);
      }
    };

    fetchTeam();
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background via-background to-accent/10">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About <span className="gradient-text-colorful">HR-SAC</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              We are a team of passionate technologists dedicated to building innovative software solutions that empower businesses to thrive in the digital age.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Our <span className="gradient-text-colorful">Story</span>
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded with a vision to bridge the gap between technology and business, HR-SAC has grown from a small startup to a leading software development company serving clients worldwide.
                </p>
                <p>
                  Our journey began with a simple belief: that great software should be accessible to businesses of all sizes. Today, we continue to uphold this principle while pushing the boundaries of what's possible with modern technology.
                </p>
                <p>
                  With over a decade of experience, we've helped hundreds of businesses transform their digital presence and achieve their goals through innovative software solutions.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="glass-card p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  <AnimatedCounter end={25} suffix="+" />
                </div>
                <p className="text-sm text-muted-foreground">Projects Delivered</p>
              </div>
              <div className="glass-card p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  <AnimatedCounter end={34} suffix="+" />
                </div>
                <p className="text-sm text-muted-foreground">Happy Clients</p>
              </div>
              <div className="glass-card p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  <AnimatedCounter end={10} suffix="+" />
                </div>
                <p className="text-sm text-muted-foreground">Team Members</p>
              </div>
              <div className="glass-card p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  <AnimatedCounter end={3} suffix="+" />
                </div>
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-accent/5">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-8">
              <Target className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-muted-foreground">
                To empower businesses with cutting-edge software solutions that drive growth, enhance efficiency, and create exceptional user experiences. We strive to be the trusted technology partner for companies looking to innovate and succeed in the digital landscape.
              </p>
            </div>
            <div className="glass-card p-8">
              <Eye className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-muted-foreground">
                To be recognized globally as a leader in software innovation, known for delivering transformative digital solutions that shape the future of business. We envision a world where technology seamlessly integrates with business goals to create unlimited possibilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="gradient-text-colorful">Core Values</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-6 text-center hover:glow-effect transition-all">
              <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p className="text-sm text-muted-foreground">
                Constantly pushing boundaries and exploring new technologies
              </p>
            </div>
            <div className="glass-card p-6 text-center hover:glow-effect transition-all">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Collaboration</h3>
              <p className="text-sm text-muted-foreground">
                Working together with clients as true partners
              </p>
            </div>
            <div className="glass-card p-6 text-center hover:glow-effect transition-all">
              <Award className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Excellence</h3>
              <p className="text-sm text-muted-foreground">
                Delivering the highest quality in every project
              </p>
            </div>
            <div className="glass-card p-6 text-center hover:glow-effect transition-all">
              <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Growth</h3>
              <p className="text-sm text-muted-foreground">
                Committed to continuous learning and improvement
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Development Process */}
      <section className="py-20 bg-accent/5">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="gradient-text-colorful">Development Process</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A proven methodology that ensures project success
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Discovery', description: 'Understanding your needs and defining project scope' },
              { step: '02', title: 'Design', description: 'Creating intuitive interfaces and user experiences' },
              { step: '03', title: 'Development', description: 'Building robust and scalable solutions' },
              { step: '04', title: 'Delivery', description: 'Launching and providing ongoing support' },
            ].map((phase) => (
              <div key={phase.step} className="glass-card p-6">
                <div className="text-4xl font-bold text-primary mb-4">{phase.step}</div>
                <h3 className="text-xl font-bold mb-2">{phase.title}</h3>
                <p className="text-sm text-muted-foreground">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Meet Our <span className="gradient-text-colorful">Team</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The talented people behind our success
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
