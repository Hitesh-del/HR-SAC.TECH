import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { CaseStudy } from '@/types';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
}

export function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  return (
    <Link to={`/case-studies/${caseStudy.id}`}>
      <Card className="glass-card h-full hover:glow-effect transition-all duration-300 hover:scale-105 cursor-pointer group">
        {caseStudy.image_url && (
          <div className="aspect-video w-full overflow-hidden rounded-t-lg">
            <img
              src={caseStudy.image_url}
              alt={caseStudy.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        )}
        <CardHeader>
          <Badge variant="secondary" className="w-fit mb-2">
            {caseStudy.category}
          </Badge>
          <CardTitle className="line-clamp-2">{caseStudy.title}</CardTitle>
          <CardDescription className="text-primary font-semibold">
            {caseStudy.client}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
            {caseStudy.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {caseStudy.technologies?.slice(0, 3).map((tech: string, index: number) => (
              <Badge key={index} variant="outline">
                {tech}
              </Badge>
            ))}
          </div>
          <div className="flex items-center text-primary font-semibold group-hover:translate-x-2 transition-transform">
            View Case Study <ArrowRight className="ml-2 h-4 w-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
