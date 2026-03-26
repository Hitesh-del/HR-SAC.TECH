import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Service } from '@/types';

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className="group h-full glass-card hover:glow-effect transition-all duration-300 hover:scale-105">
      <CardHeader>
        <div className="text-4xl mb-4">{service.icon}</div>
        <CardTitle className="text-xl">{service.title}</CardTitle>
        <CardDescription className="text-muted-foreground">
          {service.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {service.features?.map((feature: string, index: number) => (
            <li key={index} className="flex items-center text-sm text-muted-foreground">
              <span className="mr-2 text-primary">✓</span>
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
