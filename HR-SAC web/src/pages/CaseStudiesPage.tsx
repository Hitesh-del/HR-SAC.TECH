import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CaseStudyCard } from '@/components/common/CaseStudyCard';
import { getCaseStudies, getCaseStudy } from '@/db/api';
import type { CaseStudy } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ExternalLink } from 'lucide-react';

export default function CaseStudiesPage() {
  const { id } = useParams();
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const data = await getCaseStudy(id);
          setSelectedCase(data);
        } else {
          const data = await getCaseStudies();
          setCaseStudies(data);
        }
      } catch (error) {
        console.error('Error fetching case studies:', error);
      }
    };

    fetchData();
  }, [id]);

  if (id && selectedCase) {
    return (
      <div className="flex flex-col">
        {/* Case Study Detail */}
        <section className="py-20">
          <div className="container max-w-4xl">
            <Link to="/case-studies">
              <Button variant="ghost" className="mb-6" asChild>
                <span>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Case Studies
                </span>
              </Button>
            </Link>

            <Badge variant="secondary" className="mb-4">
              {selectedCase.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{selectedCase.title}</h1>
            <p className="text-xl text-primary font-semibold mb-8">{selectedCase.client}</p>

            {selectedCase.image_url && (
              <div className="aspect-video w-full overflow-hidden rounded-lg mb-8">
                <img
                  src={selectedCase.image_url}
                  alt={selectedCase.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Overview</h2>
                <p className="text-muted-foreground">{selectedCase.description}</p>
              </div>

              {selectedCase.problem && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">The Challenge</h2>
                  <p className="text-muted-foreground">{selectedCase.problem}</p>
                </div>
              )}

              {selectedCase.solution && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Our Solution</h2>
                  <p className="text-muted-foreground">{selectedCase.solution}</p>
                </div>
              )}

              {selectedCase.results && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Results</h2>
                  <p className="text-muted-foreground">{selectedCase.results}</p>
                </div>
              )}

              {selectedCase.technologies && selectedCase.technologies.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Technologies Used</h2>
                  <div className="flex flex-wrap gap-2">
                    {selectedCase.technologies.map((tech: string, index: number) => (
                      <Badge key={index} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {selectedCase.project_url && (
                <div>
                  <a
                    href={selectedCase.project_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-primary hover:bg-primary/90" asChild>
                      <span>
                        Visit Project
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </span>
                    </Button>
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background via-background to-accent/10">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Case <span className="gradient-text-colorful">Studies</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Explore our portfolio of successful projects and see how we've helped businesses achieve their digital goals.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((caseStudy) => (
              <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
