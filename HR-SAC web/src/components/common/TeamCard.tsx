import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { TeamMember } from '@/types';
import { Linkedin, Twitter } from 'lucide-react';

interface TeamCardProps {
  member: TeamMember;
}

export function TeamCard({ member }: TeamCardProps) {
  return (
    <Card className="glass-card h-full hover:glow-effect transition-all duration-300">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={member.image_url || ''} alt={member.name} />
            <AvatarFallback className="text-2xl">{member.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
        <CardTitle>{member.name}</CardTitle>
        <CardDescription className="text-primary">{member.position}</CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
        <div className="flex justify-center space-x-3">
          {member.linkedin_url && (
            <a
              href={member.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          )}
          {member.twitter_url && (
            <a
              href={member.twitter_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
