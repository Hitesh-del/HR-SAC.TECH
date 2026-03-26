import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BlogCard } from '@/components/common/BlogCard';
import { getBlogPosts, getBlogPost } from '@/db/api';
import type { BlogPost } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, User } from 'lucide-react';

export default function InsightsPage() {
  const { slug } = useParams();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (slug) {
          const data = await getBlogPost(slug);
          setSelectedPost(data);
        } else {
          const data = await getBlogPosts();
          setBlogPosts(data);
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };

    fetchData();
  }, [slug]);

  if (slug && selectedPost) {
    const formattedDate = new Date(selectedPost.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return (
      <div className="flex flex-col">
        {/* Blog Post Detail */}
        <section className="py-20">
          <div className="container max-w-4xl">
            <Link to="/insights">
              <Button variant="ghost" className="mb-6" asChild>
                <span>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Insights
                </span>
              </Button>
            </Link>

            <Badge variant="secondary" className="mb-4">
              {selectedPost.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{selectedPost.title}</h1>

            <div className="flex items-center space-x-4 text-muted-foreground mb-8">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>HR-SAC Team</span>
              </div>
            </div>

            {selectedPost.image_url && (
              <div className="aspect-video w-full overflow-hidden rounded-lg mb-8">
                <img
                  src={selectedPost.image_url}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-muted-foreground mb-6">{selectedPost.excerpt}</p>
              <div className="whitespace-pre-wrap text-muted-foreground">{selectedPost.content}</div>
            </div>

            {selectedPost.tags && selectedPost.tags.length > 0 && (
              <div className="mt-8 pt-8 border-t border-border">
                <h3 className="text-lg font-semibold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedPost.tags.map((tag: string, index: number) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
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
              Latest <span className="gradient-text-colorful">Insights</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Stay updated with the latest trends, best practices, and insights from the world of technology and software development.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
