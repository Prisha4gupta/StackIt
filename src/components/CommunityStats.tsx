import { useState, useEffect } from 'react';
import { HelpCircle, MessageSquare, Users, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface StatItem {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

const CommunityStats = () => {
  const [counts, setCounts] = useState({
    questions: 0,
    answers: 0,
    users: 0,
    badges: 0,
  });

  const stats: StatItem[] = [
    {
      label: 'Questions',
      value: 12543,
      icon: <HelpCircle className="w-5 h-5" />,
      color: 'text-blue-400',
    },
    {
      label: 'Answers',
      value: 34521,
      icon: <MessageSquare className="w-5 h-5" />,
      color: 'text-green-400',
    },
    {
      label: 'Users',
      value: 8967,
      icon: <Users className="w-5 h-5" />,
      color: 'text-purple-400',
    },
    {
      label: 'Badges Earned',
      value: 15234,
      icon: <Award className="w-5 h-5" />,
      color: 'text-yellow-400',
    },
  ];

  useEffect(() => {
    // Animate counters on mount
    const animateCounters = () => {
      stats.forEach((stat, index) => {
        const duration = 2000; // 2 seconds
        const increment = stat.value / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= stat.value) {
            current = stat.value;
            clearInterval(timer);
          }
          
          setCounts(prev => ({
            ...prev,
            [stat.label.toLowerCase().replace(' ', '').replace(' earned', '')]: Math.floor(current),
          }));
        }, 16);
        
        // Cleanup function
        setTimeout(() => clearInterval(timer), duration + 100);
      });
    };

    // Delay to create staggered effect
    const timeout = setTimeout(animateCounters, 500);
    return () => clearTimeout(timeout);
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
  };

  const getCountValue = (label: string) => {
    const key = label.toLowerCase().replace(' ', '').replace(' earned', '');
    return counts[key as keyof typeof counts] || 0;
  };

  return (
    <Card className="glass-strong">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>Community Stats</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-4 rounded-lg bg-background/30 border border-border/50 hover:bg-background/50 transition-all duration-300"
            >
              <motion.div
                className={`${stat.color} mx-auto mb-2`}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {stat.icon}
              </motion.div>
              <motion.div
                className="text-2xl font-bold gradient-text"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.2, type: "spring", stiffness: 200 }}
              >
                {formatNumber(getCountValue(stat.label))}
              </motion.div>
              <div className="text-xs text-muted-foreground mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunityStats;