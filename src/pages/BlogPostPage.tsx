import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, ArrowRight, Share2, Facebook, Twitter, Bookmark, ChevronRight, Tag } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { getBlogPostBySlug, getRelatedPosts, BlogPost } from '@/data/blogData';
import { useToast } from '@/hooks/use-toast';

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const post = slug ? getBlogPostBySlug(slug) : undefined;
  const relatedPosts = post ? getRelatedPosts(post) : [];

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-display font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/blog')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Article link has been copied to clipboard.",
      });
    }
  };

  const getAuthorInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <nav className="bg-muted/30 py-3 border-b border-border">
        <div className="container mx-auto px-4">
          <ol className="flex items-center gap-2 text-sm flex-wrap">
            <li>
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
            </li>
            <ChevronRight size={14} className="text-muted-foreground" />
            <li>
              <Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </Link>
            </li>
            <ChevronRight size={14} className="text-muted-foreground" />
            <li className="text-foreground font-medium line-clamp-1">{post.title}</li>
          </ol>
        </div>
      </nav>

      <article className="py-12">
        <div className="container mx-auto px-4">
          {/* Article Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center mb-10"
          >
            <Badge variant="secondary" className="mb-4">
              {post.category}
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              {post.excerpt}
            </p>
            
            {/* Author and Meta */}
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {getAuthorInitials(post.author)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="font-medium text-sm">{post.author}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.header>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-4xl mx-auto mb-10"
          >
            <div className="aspect-video rounded-2xl overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <div 
              className="prose prose-lg dark:prose-invert max-w-none
                prose-headings:font-display prose-headings:font-bold
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-muted-foreground prose-p:leading-relaxed
                prose-strong:text-foreground
                prose-ul:text-muted-foreground prose-li:marker:text-primary
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground
                prose-hr:border-border"
            >
              {post.content.split('\n').map((paragraph, index) => {
                if (paragraph.startsWith('## ')) {
                  return <h2 key={index}>{paragraph.replace('## ', '')}</h2>;
                }
                if (paragraph.startsWith('### ')) {
                  return <h3 key={index}>{paragraph.replace('### ', '')}</h3>;
                }
                if (paragraph.startsWith('- **')) {
                  const match = paragraph.match(/- \*\*(.+?)\*\* - (.+)/);
                  if (match) {
                    return (
                      <p key={index}>
                        <strong>{match[1]}</strong> - {match[2]}
                      </p>
                    );
                  }
                }
                if (paragraph.startsWith('- ')) {
                  return <li key={index}>{paragraph.replace('- ', '')}</li>;
                }
                if (paragraph.startsWith('---')) {
                  return <hr key={index} />;
                }
                if (paragraph.startsWith('*') && paragraph.endsWith('*')) {
                  return <p key={index}><em>{paragraph.slice(1, -1)}</em></p>;
                }
                if (paragraph.trim()) {
                  return <p key={index}>{paragraph}</p>;
                }
                return null;
              })}
            </div>

            {/* Tags */}
            <div className="mt-10 pt-6 border-t border-border">
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="w-4 h-4 text-muted-foreground" />
                {post.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Share Actions */}
            <div className="mt-8 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Share:</span>
                <Button variant="outline" size="icon" onClick={handleShare}>
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a 
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a 
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                </Button>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Bookmark className="w-4 h-4" />
                Save for later
              </Button>
            </div>
          </motion.div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-display font-bold mb-8 text-center">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {relatedPosts.map((relatedPost, index) => (
                <motion.article
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <Link to={`/blog/${relatedPost.slug}`}>
                    <div className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <Badge variant="outline" className="text-xs mb-2">
                          {relatedPost.category}
                        </Badge>
                        <h3 className="font-display font-semibold group-hover:text-primary transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {relatedPost.readTime}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to Blog */}
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <Button variant="outline" size="lg" asChild>
            <Link to="/blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Articles
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPostPage;
