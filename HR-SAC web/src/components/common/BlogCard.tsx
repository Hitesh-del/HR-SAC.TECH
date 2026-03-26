import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { BlogPost } from '@/types';
import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link to={`/insights/${post.slug}`}>
      <Card className="glass-card h-full hover:glow-effect transition-all duration-300 hover:scale-105 cursor-pointer">
        {post.image_url && (
          <div className="aspect-video w-full overflow-hidden rounded-t-lg">
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        )}
        <CardHeader>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
            <Calendar className="h-4 w-4" />
            <span>{formattedDate}</span>
          </div>
          <CardTitle className="line-clamp-2">{post.title}</CardTitle>
          <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{post.category}</Badge>
            {post.tags?.slice(0, 2).map((tag: string, index: number) => (
              <Badge key={index} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
