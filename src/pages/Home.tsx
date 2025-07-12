import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import QuestionCard from '@/components/QuestionCard';
import FilterBar from '@/components/FilterBar';
import TrendingTags from '@/components/TrendingTags';
import CommunityStats from '@/components/CommunityStats';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const mockQuestions = [
  {
    id: '1',
    title: 'How to join 2 columns in a data set to make a separate column in SQL',
    content: 'I do not know the code for it as I am a beginner. As an example what I need to do is like there is a column 1 containing First name, and column 2 consists of last name I want a column to combine both of them.',
    tags: ['sql', 'database', 'mysql'],
    author: {
      name: 'John Doe',
      avatar: 'https://github.com/shadcn.png',
      reputation: 1250
    },
    stats: {
      votes: 5,
      answers: 3,
      views: 127
    },
    createdAt: '2025-01-12T10:30:00Z',
    hasAcceptedAnswer: true
  },
   {
    id: '2',
    title: 'React useEffect dependency array best practices',
    content: 'What are the best practices for managing dependency arrays in React useEffect hooks? I keep running into infinite re-render issues.',
    tags: ['react', 'javascript', 'hooks'],
    author: {
      name: 'Sarah Wilson',
      avatar: '',
      reputation: 2890
    },
    stats: {
      votes: 12,
      answers: 7,
      views: 342
    },
    createdAt: '2025-01-12T08:15:00Z',
    hasAcceptedAnswer: false
  },
  {
    id: '3',
    title: 'TypeScript generic constraints with conditional types',
    content: 'I am trying to create a utility type that constrains generics based on certain conditions but I am having trouble with the syntax.',
    tags: ['typescript', 'generics', 'types'],
    author: {
      name: 'Mike Johnson',
      avatar: '',
      reputation: 5420
    },
    stats: {
      votes: 8,
      answers: 2,
      views: 89
    },
    createdAt: '2025-01-12T07:45:00Z',
    hasAcceptedAnswer: false
  },
  {
    id: '4',
    title: 'How to optimize Python pandas performance for large datasets',
    content: 'Working with a 10GB CSV file and pandas is extremely slow. What are the best strategies for optimizing performance?',
    tags: ['python', 'pandas', 'performance'],
    author: {
      name: 'Alice Brown',
      avatar: '',
      reputation: 3210
    },
    stats: {
      votes: 15,
      answers: 9,
      views: 567
    },
    createdAt: '2025-01-11T16:20:00Z',
    hasAcceptedAnswer: true
  },
  {
    id: '5',
    title: 'CSS Grid vs Flexbox: When to use which?',
    content: 'I am confused about when to use CSS Grid versus Flexbox. Can someone explain the key differences and use cases?',
    tags: ['css', 'grid', 'flexbox'],
    author: {
      name: 'David Lee',
      avatar: '',
      reputation: 1890
    },
    stats: {
      votes: 22,
      answers: 11,
      views: 1230
    },
    createdAt: '2025-01-11T14:10:00Z',
    hasAcceptedAnswer: true
  }
];

const Home = () => {
  const [questions, setQuestions] = useState(mockQuestions);
  const [activeFilter, setActiveFilter] = useState('newest');
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAskQuestionClick = () => {
    if (!user) {
      navigate('/login', { state: { from: '/ask' } });
      return;
    }
    navigate('/ask');
  };

  const handleBrowseQuestions = () => {
    // Refresh the page to see newest questions
    window.location.reload();
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    // Actual filtering logic would go here
    let filteredQuestions = [...mockQuestions];
    
    switch(filter) {
      case 'trending':
        filteredQuestions.sort((a, b) => b.stats.views - a.stats.views);
        break;
      case 'unanswered':
        filteredQuestions = filteredQuestions.filter(q => !q.hasAcceptedAnswer);
        break;
      case 'solved':
        filteredQuestions = filteredQuestions.filter(q => q.hasAcceptedAnswer);
        break;
      default: // 'newest'
        filteredQuestions.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }
    
    setQuestions(filteredQuestions);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Initial sort by newest
      handleFilterChange('newest');
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleVote = (questionId: string, direction: 'up' | 'down') => {
    if (!user) {
      navigate('/login', { state: { from: window.location.pathname } });
      return;
    }
    // Update the mock data with new votes
    setQuestions(prev => prev.map(q => 
      q.id === questionId 
        ? { 
            ...q, 
            stats: { 
              ...q.stats, 
              votes: direction === 'up' ? q.stats.votes + 1 : q.stats.votes - 1 
            } 
          } 
        : q
    ));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen animated-bg">
        <AnimatedBackground loading={isLoading} />
        <Navbar />
        <div className="pt-24 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading awesome questions...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen animated-bg">
      <AnimatedBackground loading={false} />
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Welcome to StackIt</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join our community of developers, share knowledge, and get answers to your coding questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-primary glow-hover transition-spring"
                onClick={handleAskQuestionClick}
              >
                <Plus className="w-5 h-5 mr-2" />
                Ask Your First Question
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="glass transition-spring"
                onClick={handleBrowseQuestions}
              >
                Browse Questions
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <FilterBar
                activeFilter={activeFilter}
                onFilterChange={handleFilterChange}
                questionCount={questions.length}
              />

              {/* Questions List */}
              <div className="space-y-6">
                {questions.map((question, index) => (
                  <div
                    key={question.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <QuestionCard 
                      question={question} 
                      onVote={handleVote} 
                      onTagClick={(tag) => {
                        // Implement tag filtering if needed
                        console.log(`Filter by tag: ${tag}`);
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-12">
                <Button 
                  variant="outline" 
                  className="glass hover:scale-105 transition-spring"
                  onClick={() => {
                    // In a real app, this would load more questions
                    console.log('Load more questions');
                  }}
                >
                  Load More Questions
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <CommunityStats />
              <TrendingTags 
                onTagClick={(tag) => {
                  // Implement tag filtering
                  console.log(`Filter by trending tag: ${tag}`);
                }}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;