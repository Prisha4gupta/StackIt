import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUp, ArrowDown, MessageSquare, Share2, Bookmark, Flag, CheckCircle, Crown, Clock, Eye, Tag } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

const QuestionDetail = () => {
  const { id } = useParams();
  const [questionVote, setQuestionVote] = useState<'up' | 'down' | null>(null);
  const [bookmarked, setBookmarked] = useState(false);
  const [newAnswer, setNewAnswer] = useState('');

  // Mock question data
  const question = {
    id: id || '1',
    title: 'How to join 2 columns in a data set to make a separate column in SQL',
    content: `I do not know the code for it as I am a beginner. As an example what I need to do is like there is a column 1 containing First name, and column 2 consists of last name I want a column to combine both of them.

Here's what I have so far:

\`\`\`sql
SELECT first_name, last_name 
FROM users;
\`\`\`

But I need a way to combine these into a single column called "full_name". I've tried a few things but keep getting syntax errors. Any help would be appreciated!`,
    tags: ['sql', 'database', 'mysql', 'concatenation'],
    author: {
      name: 'John Doe',
      avatar: 'https://github.com/shadcn.png',
      reputation: 1250,
      badges: ['bronze', 'silver']
    },
    stats: {
      votes: 5,
      views: 127,
      bookmarks: 3
    },
    createdAt: '2025-01-12T10:30:00Z',
    lastActivity: '2025-01-12T14:15:00Z'
  };

  const answers = [
    {
      id: '1',
      content: `You can use the \`CONCAT()\` function to combine columns in SQL. Here's how:

\`\`\`sql
SELECT 
    first_name,
    last_name,
    CONCAT(first_name, ' ', last_name) AS full_name
FROM users;
\`\`\`

This will create a new column called \`full_name\` that combines the first and last name with a space in between.

Alternative approaches:
- Use the \`||\` operator (PostgreSQL, SQLite): \`first_name || ' ' || last_name\`
- Use the \`+\` operator (SQL Server): \`first_name + ' ' + last_name\`

The \`CONCAT()\` function is more portable across different database systems.`,
      author: {
        name: 'Sarah Wilson',
        avatar: '',
        reputation: 2890,
        badges: ['gold', 'silver', 'bronze']
      },
      stats: {
        votes: 8
      },
      createdAt: '2025-01-12T11:45:00Z',
      isAccepted: true
    },
    {
      id: '2',
      content: `Another approach using \`CONCAT_WS()\` (concat with separator):

\`\`\`sql
SELECT 
    CONCAT_WS(' ', first_name, last_name) AS full_name
FROM users;
\`\`\`

This is especially useful when some values might be NULL, as \`CONCAT_WS()\` ignores NULL values.`,
      author: {
        name: 'Mike Johnson',
        avatar: '',
        reputation: 5420,
        badges: ['gold']
      },
      stats: {
        votes: 3
      },
      createdAt: '2025-01-12T12:20:00Z',
      isAccepted: false
    }
  ];

  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `${diffDays}d ago`;
    if (diffHours > 0) return `${diffHours}h ago`;
    return 'Just now';
  };

  return (
    <div className="min-h-screen animated-bg">
      <AnimatedBackground />
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Breadcrumb */}
          <Link 
            to="/" 
            className="inline-flex items-center text-primary hover:text-primary-glow transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Questions
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Question */}
              <Card className="glass-strong">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <h1 className="text-2xl md:text-3xl font-bold leading-tight pr-4">
                      {question.title}
                    </h1>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setBookmarked(!bookmarked)}
                        className={bookmarked ? 'text-warning' : ''}
                      >
                        <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Flag className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Question Meta */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>Asked {timeAgo(question.createdAt)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{question.stats.views} views</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageSquare className="w-4 h-4" />
                      <span>{answers.length} answers</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {question.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="flex gap-6">
                    {/* Vote Section */}
                    <div className="flex flex-col items-center space-y-3 flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setQuestionVote(questionVote === 'up' ? null : 'up')}
                        className={`p-2 ${questionVote === 'up' ? 'text-success bg-success/10' : 'hover:text-success'}`}
                      >
                        <ArrowUp className="w-6 h-6" />
                      </Button>
                      <span className={`font-bold text-xl ${question.stats.votes > 0 ? 'text-success' : question.stats.votes < 0 ? 'text-destructive' : ''}`}>
                        {question.stats.votes}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setQuestionVote(questionVote === 'down' ? null : 'down')}
                        className={`p-2 ${questionVote === 'down' ? 'text-destructive bg-destructive/10' : 'hover:text-destructive'}`}
                      >
                        <ArrowDown className="w-6 h-6" />
                      </Button>
                      <Separator className="w-8" />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setBookmarked(!bookmarked)}
                        className={`p-2 ${bookmarked ? 'text-warning' : 'hover:text-warning'}`}
                      >
                        <Bookmark className={`w-5 h-5 ${bookmarked ? 'fill-current' : ''}`} />
                      </Button>
                      <span className="text-sm text-muted-foreground">{question.stats.bookmarks}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="prose prose-invert max-w-none">
                        <div className="whitespace-pre-wrap text-foreground">
                          {question.content}
                        </div>
                      </div>

                      {/* Author Info */}
                      <div className="flex justify-end mt-8">
                        <div className="glass rounded-lg p-4 max-w-sm">
                          <div className="text-xs text-muted-foreground mb-2">
                            asked {timeAgo(question.createdAt)}
                          </div>
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={question.author.avatar} />
                              <AvatarFallback>{question.author.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{question.author.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {question.author.reputation.toLocaleString()} reputation
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Answers */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">
                  {answers.length} Answer{answers.length !== 1 ? 's' : ''}
                </h2>

                {answers.map((answer) => (
                  <Card key={answer.id} className={`glass-strong ${answer.isAccepted ? 'ring-2 ring-success/50' : ''}`}>
                    <CardContent className="p-6">
                      <div className="flex gap-6">
                        {/* Vote Section */}
                        <div className="flex flex-col items-center space-y-3 flex-shrink-0">
                          <Button variant="ghost" size="sm" className="p-2 hover:text-success">
                            <ArrowUp className="w-6 h-6" />
                          </Button>
                          <span className={`font-bold text-xl ${answer.stats.votes > 0 ? 'text-success' : ''}`}>
                            {answer.stats.votes}
                          </span>
                          <Button variant="ghost" size="sm" className="p-2 hover:text-destructive">
                            <ArrowDown className="w-6 h-6" />
                          </Button>
                          {answer.isAccepted && (
                            <>
                              <Separator className="w-8" />
                              <div className="flex flex-col items-center">
                                <CheckCircle className="w-8 h-8 text-success fill-current" />
                                <span className="text-xs text-success font-medium mt-1">Accepted</span>
                              </div>
                            </>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="prose prose-invert max-w-none">
                            <div className="whitespace-pre-wrap text-foreground">
                              {answer.content}
                            </div>
                          </div>

                          {/* Author Info */}
                          <div className="flex justify-end mt-6">
                            <div className="glass rounded-lg p-4 max-w-sm">
                              <div className="text-xs text-muted-foreground mb-2">
                                answered {timeAgo(answer.createdAt)}
                              </div>
                              <div className="flex items-center space-x-3">
                                <Avatar className="w-10 h-10">
                                  <AvatarImage src={answer.author.avatar} />
                                  <AvatarFallback>{answer.author.name[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="flex items-center space-x-2">
                                    <span className="font-medium">{answer.author.name}</span>
                                    {answer.author.badges.includes('gold') && (
                                      <Crown className="w-4 h-4 text-yellow-500" />
                                    )}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    {answer.author.reputation.toLocaleString()} reputation
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Answer Form */}
              <Card className="glass-strong">
                <CardHeader>
                  <h3 className="text-xl font-semibold">Your Answer</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Write your answer here... Use code blocks with ``` for code snippets."
                      value={newAnswer}
                      onChange={(e) => setNewAnswer(e.target.value)}
                      className="min-h-[200px]"
                    />
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-muted-foreground">
                        {newAnswer.length} characters (minimum 30)
                      </p>
                      <Button 
                        disabled={newAnswer.length < 30}
                        className="bg-gradient-primary glow-hover"
                      >
                        Post Your Answer
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-6 sticky top-24">
                {/* Question Stats */}
                <Card className="glass-strong">
                  <CardHeader>
                    <h3 className="font-semibold">Question Stats</h3>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Asked</span>
                      <span>{timeAgo(question.createdAt)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Viewed</span>
                      <span>{question.stats.views} times</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Active</span>
                      <span>{timeAgo(question.lastActivity)}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Related Questions */}
                <Card className="glass-strong">
                  <CardHeader>
                    <h3 className="font-semibold">Related Questions</h3>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      'How to concatenate strings in MySQL?',
                      'SQL CONCAT vs CONCAT_WS differences',
                      'Handling NULL values in string concatenation'
                    ].map((title, i) => (
                      <Link
                        key={i}
                        to="#"
                        className="block text-sm hover:text-primary transition-colors"
                      >
                        {title}
                      </Link>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuestionDetail;