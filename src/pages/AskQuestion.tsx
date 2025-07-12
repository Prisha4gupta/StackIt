import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, X, Hash, Send, AlertCircle } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';

const AskQuestion = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: '/ask' } });
    }
  }, [user, navigate]);

  if (!user) {
    return (
      <div className="min-h-screen animated-bg">
        <AnimatedBackground />
        <Navbar />
        <div className="pt-24 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Redirecting to login...</p>
          </div>
        </div>
      </div>
    );
  }

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: [] as string[]
  });
  const [currentTag, setCurrentTag] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const suggestedTags = [
    'javascript', 'react', 'typescript', 'python', 'css', 'html',
    'node.js', 'sql', 'git', 'mongodb', 'express', 'vue.js'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const addTag = (tag: string) => {
    const cleanTag = tag.toLowerCase().trim();
    if (cleanTag && !formData.tags.includes(cleanTag) && formData.tags.length < 5) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, cleanTag]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(currentTag);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 10) {
      newErrors.title = 'Title must be at least 10 characters';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Description is required';
    } else if (formData.content.length < 30) {
      newErrors.content = 'Description must be at least 30 characters';
    }

    if (formData.tags.length === 0) {
      newErrors.tags = 'At least one tag is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Question submitted:', formData);
      setIsSubmitting(false);
      navigate('/');
    }, 2000);
  };

  return (
    <div className="min-h-screen animated-bg">
      <AnimatedBackground />
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center text-primary hover:text-primary-glow transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Questions
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2">
              Ask a Question
            </h1>
            <p className="text-muted-foreground">
              Get help from our community of developers. Be specific and provide details.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card className="glass-strong">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <Plus className="w-4 h-4 text-white" />
                    </div>
                    <span>Your Question</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-sm font-medium">
                        Title *
                      </Label>
                      <Input
                        id="title"
                        placeholder="What's your programming question? Be specific."
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className={`transition-all ${errors.title ? 'border-destructive focus:border-destructive' : ''}`}
                      />
                      {errors.title && (
                        <p className="text-sm text-destructive">{errors.title}</p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        {formData.title.length}/150 characters
                      </p>
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <Label htmlFor="content" className="text-sm font-medium">
                        Description *
                      </Label>
                      <Textarea
                        id="content"
                        placeholder="Describe your problem in detail. Include what you've tried and what specific help you need."
                        value={formData.content}
                        onChange={(e) => handleInputChange('content', e.target.value)}
                        className={`min-h-[200px] transition-all ${errors.content ? 'border-destructive focus:border-destructive' : ''}`}
                      />
                      {errors.content && (
                        <p className="text-sm text-destructive">{errors.content}</p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        {formData.content.length} characters (minimum 30)
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="space-y-2">
                      <Label htmlFor="tags" className="text-sm font-medium">
                        Tags * (max 5)
                      </Label>
                      
                      {/* Current Tags */}
                      {formData.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {formData.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                            >
                              <Hash className="w-3 h-3 mr-1" />
                              {tag}
                              <button
                                type="button"
                                onClick={() => removeTag(tag)}
                                className="ml-2 hover:text-destructive transition-colors"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Tag Input */}
                      <Input
                        id="tags"
                        placeholder="Add tags (press Enter or comma to add)"
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        onKeyDown={handleKeyPress}
                        disabled={formData.tags.length >= 5}
                        className={`transition-all ${errors.tags ? 'border-destructive focus:border-destructive' : ''}`}
                      />
                      
                      {errors.tags && (
                        <p className="text-sm text-destructive">{errors.tags}</p>
                      )}

                      {/* Suggested Tags */}
                      <div className="space-y-2">
                        <p className="text-xs text-muted-foreground">Suggested tags:</p>
                        <div className="flex flex-wrap gap-2">
                          {suggestedTags.filter(tag => !formData.tags.includes(tag)).slice(0, 8).map((tag) => (
                            <Button
                              key={tag}
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => addTag(tag)}
                              disabled={formData.tags.length >= 5}
                              className="text-xs hover:bg-primary/10 hover:text-primary transition-colors"
                            >
                              <Hash className="w-3 h-3 mr-1" />
                              {tag}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end space-x-4 pt-6">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate('/')}
                        disabled={isSubmitting}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-gradient-primary glow-hover transition-all"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                            Posting...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Post Question
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Tips Sidebar */}
            <div className="lg:col-span-1">
              <Card className="glass-strong sticky top-24">
                <CardHeader>
                  <CardTitle className="text-lg">Writing Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                      <strong>Be specific:</strong> Include error messages, code snippets, and expected vs actual behavior.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-3 text-sm">
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Good question includes:</h4>
                      <ul className="text-muted-foreground space-y-1">
                        <li>• Clear, specific title</li>
                        <li>• What you're trying to do</li>
                        <li>• What you've tried</li>
                        <li>• Expected vs actual results</li>
                        <li>• Relevant code snippets</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-foreground mb-1">Choose tags wisely:</h4>
                      <ul className="text-muted-foreground space-y-1">
                        <li>• Use specific technology names</li>
                        <li>• Include programming language</li>
                        <li>• Add framework if relevant</li>
                        <li>• Max 5 tags for focus</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AskQuestion;