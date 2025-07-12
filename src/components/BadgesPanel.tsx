import { useState } from 'react';
import { Award, Star, Zap, Shield, Crown, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { motion } from 'framer-motion';

interface BadgeData {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  earned: boolean;
  progress?: number;
  maxProgress?: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  xp: number;
}

const BadgesPanel = () => {
  const [userXP] = useState(2350);
  const [nextLevelXP] = useState(3000);

  const badges: BadgeData[] = [
    {
      id: '1',
      name: 'First Answer',
      description: 'Posted your first answer',
      icon: <Star className="w-4 h-4" />,
      earned: true,
      rarity: 'common',
      xp: 50,
    },
    {
      id: '2',
      name: 'Helper',
      description: 'Answer 50 questions',
      icon: <Zap className="w-4 h-4" />,
      earned: true,
      progress: 45,
      maxProgress: 50,
      rarity: 'rare',
      xp: 200,
    },
    {
      id: '3',
      name: 'Expert',
      description: 'Get 100 upvotes on answers',
      icon: <Shield className="w-4 h-4" />,
      earned: false,
      progress: 67,
      maxProgress: 100,
      rarity: 'epic',
      xp: 500,
    },
    {
      id: '4',
      name: 'Legend',
      description: 'Reach 10K reputation',
      icon: <Crown className="w-4 h-4" />,
      earned: false,
      progress: 2350,
      maxProgress: 10000,
      rarity: 'legendary',
      xp: 1000,
    },
    {
      id: '5',
      name: 'Mentor',
      description: 'Help 25 new users',
      icon: <Target className="w-4 h-4" />,
      earned: false,
      progress: 12,
      maxProgress: 25,
      rarity: 'epic',
      xp: 300,
    },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'border-gray-400 text-gray-400';
      case 'rare':
        return 'border-blue-400 text-blue-400';
      case 'epic':
        return 'border-purple-400 text-purple-400';
      case 'legendary':
        return 'border-yellow-400 text-yellow-400';
      default:
        return 'border-gray-400 text-gray-400';
    }
  };

  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'hover:shadow-gray-400/20';
      case 'rare':
        return 'hover:shadow-blue-400/20';
      case 'epic':
        return 'hover:shadow-purple-400/20';
      case 'legendary':
        return 'hover:shadow-yellow-400/20';
      default:
        return 'hover:shadow-gray-400/20';
    }
  };

  return (
    <TooltipProvider>
      <Card className="glass-strong">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-primary" />
            <span>Your Badges</span>
          </CardTitle>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Level Progress</span>
              <span className="text-primary font-medium">{userXP} / {nextLevelXP} XP</span>
            </div>
            <Progress value={(userXP / nextLevelXP) * 100} className="h-2" />
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {badges.map((badge, index) => (
            <Tooltip key={badge.id}>
              <TooltipTrigger asChild>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-3 rounded-lg border transition-all duration-300 cursor-pointer ${
                    badge.earned
                      ? `${getRarityColor(badge.rarity)} bg-background/50 ${getRarityGlow(badge.rarity)} hover:shadow-lg`
                      : 'border-border/50 bg-background/20 opacity-60 hover:opacity-80'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <motion.div
                      className={`p-2 rounded-full border ${getRarityColor(badge.rarity)} ${
                        badge.earned ? 'bg-background/50' : 'bg-background/20'
                      }`}
                      animate={
                        badge.earned
                          ? {
                              boxShadow: [
                                '0 0 0 rgba(59, 130, 246, 0)',
                                '0 0 20px rgba(59, 130, 246, 0.3)',
                                '0 0 0 rgba(59, 130, 246, 0)',
                              ],
                            }
                          : {}
                      }
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                    >
                      {badge.icon}
                    </motion.div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{badge.name}</h4>
                        <Badge variant="outline" className={`text-xs ${getRarityColor(badge.rarity)}`}>
                          {badge.rarity}
                        </Badge>
                        {badge.earned && (
                          <Badge variant="outline" className="text-xs text-green-400 border-green-400">
                            +{badge.xp} XP
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {badge.description}
                      </p>
                      {badge.progress !== undefined && badge.maxProgress && (
                        <div className="mt-2 space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="text-primary">{badge.progress}/{badge.maxProgress}</span>
                          </div>
                          <Progress 
                            value={(badge.progress / badge.maxProgress) * 100} 
                            className="h-1"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent>
                <div className="text-center">
                  <p className="font-medium">{badge.name}</p>
                  <p className="text-sm text-muted-foreground">{badge.description}</p>
                  {badge.progress !== undefined && badge.maxProgress && (
                    <p className="text-sm text-primary mt-1">
                      {badge.progress}/{badge.maxProgress} completed
                    </p>
                  )}
                  <p className="text-xs text-yellow-400 mt-1">+{badge.xp} XP</p>
                </div>
              </TooltipContent>
            </Tooltip>
          ))}
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default BadgesPanel;