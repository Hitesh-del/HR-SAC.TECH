import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Testimonial } from '@/types';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="glass-card h-full">
      <CardContent className="pt-6">
        <div className="flex items-center space-x-1 mb-4">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-primary text-primary" />
          ))}
        </div>
        <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={testimonial.image_url || ''} alt={testimonial.client_name} />
            <AvatarFallback>{testimonial.client_name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{testimonial.client_name}</p>
            <p className="text-sm text-muted-foreground">
              {testimonial.client_position} at {testimonial.client_company}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
