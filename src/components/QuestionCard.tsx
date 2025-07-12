import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, ArrowUp, ArrowDown, Eye, Clock, User, Tag } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface Question {
  id: string;
  title: string;
  content: string;
  tags: string[];
  author: {
    name: string;
    avatar?: string;
    reputation: number;
  };
  stats: {
    votes: number;
    answers: number;
    views: number;
  };
  createdAt: string;
  hasAcceptedAnswer: boolean;
}

interface QuestionCardProps {
  question: Question;
  onVote?: (questionId: string, direction: 'up' | 'down') => void;
}

const QuestionCard = ({ question, onVote }: QuestionCardProps) => {
  const [votes, setVotes] = useState(question.stats.votes);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);

  const handleVote = (direction: 'up' | 'down') => {
    if (userVote === direction) {
      // Remove vote
      setVotes(votes - (direction === 'up' ? 1 : -1));
      setUserVote(null);
    } else {
      // Add or change vote
      const adjustment = userVote ? (direction === 'up' ? 2 : -2) : (direction === 'up' ? 1 : -1);
      setVotes(votes + adjustment);
      setUserVote(direction);
    }
    onVote?.(question.id, direction);
  };

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
    <Card className="glass-strong hover:shadow-medium transition-all duration-300 card-hover group">
      <CardContent className="p-6">
        <div className="flex gap-4">
          {/* Vote Section */}
          <div className="flex flex-col items-center space-y-2 flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleVote('up')}
              className={`p-1 transition-colors ${
                userVote === 'up' ? 'text-success bg-success/10' : 'hover:text-success'
              }`}
            >
              <ArrowUp className="w-5 h-5" />
            </Button>
            <span className={`font-bold text-lg ${votes > 0 ? 'text-success' : votes < 0 ? 'text-destructive' : ''}`}>
              {votes}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleVote('down')}
              className={`p-1 transition-colors ${
                userVote === 'down' ? 'text-destructive bg-destructive/10' : 'hover:text-destructive'
              }`}
            >
              <ArrowDown className="w-5 h-5" />
            </Button>
          </div>

          {/* Content Section */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-3">
              <Link
                to={`/question/${question.id}`}
                className="text-lg font-semibold hover:text-primary transition-colors group-hover:text-primary line-clamp-2"
              >
                {question.title}
              </Link>
              {question.hasAcceptedAnswer && (
                <Badge variant="outline" className="ml-2 text-success border-success bg-success/10 flex-shrink-0">
                  Solved
                </Badge>
              )}
            </div>

            <p className="text-muted-foreground mb-4 line-clamp-2">
              {question.content}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {question.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-6 py-4 bg-background/50 border-t border-border/50">
        <div className="flex items-center justify-between w-full">
          {/* Author Info */}
          <div className="flex items-center space-x-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={question.author.avatar} />
              <AvatarFallback>
                <User className="w-4 h-4" />
              </AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <span className="font-medium">{question.author.name}</span>
              <span className="text-muted-foreground ml-2">
                {question.author.reputation.toLocaleString()} rep
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <MessageSquare className="w-4 h-4" />
              <span>{question.stats.answers}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{question.stats.views}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{timeAgo(question.createdAt)}</span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default QuestionCard;