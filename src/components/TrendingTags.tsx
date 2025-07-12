import { useState } from 'react';
import { TrendingUp, Tag, Hash, ArrowUp, ArrowDown, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface TagData {
  name: string;
  count: number;
  trending: boolean;
  color: string;
  change: number; // percentage change
  direction: 'up' | 'down' | 'stable';
}

const TrendingTags = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const trendingTags: TagData[] = [
    { name: 'JavaScript', count: 1240, trending: true, color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', change: 12.5, direction: 'up' },
    { name: 'React', count: 856, trending: true, color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', change: 8.2, direction: 'up' },
    { name: 'TypeScript', count: 734, trending: true, color: 'bg-blue-600/20 text-blue-300 border-blue-600/30', change: 15.7, direction: 'up' },
    { name: 'Python', count: 623, trending: false, color: 'bg-green-500/20 text-green-400 border-green-500/30', change: -2.1, direction: 'down' },
    { name: 'Node.js', count: 456, trending: true, color: 'bg-green-600/20 text-green-300 border-green-600/30', change: 6.3, direction: 'up' },
    { name: 'CSS', count: 389, trending: false, color: 'bg-purple-500/20 text-purple-400 border-purple-500/30', change: 0.5, direction: 'stable' },
    { name: 'HTML', count: 345, trending: false, color: 'bg-orange-500/20 text-orange-400 border-orange-500/30', change: -1.2, direction: 'down' },
    { name: 'Vue.js', count: 234, trending: true, color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30', change: 9.8, direction: 'up' },
    { name: 'SQL', count: 198, trending: false, color: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30', change: -3.4, direction: 'down' },
    { name: 'Next.js', count: 167, trending: true, color: 'bg-gray-500/20 text-gray-300 border-gray-500/30', change: 18.9, direction: 'up' },
  ];

  return (
    <Card className="glass-strong sticky top-24">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2 text-lg">
          <TrendingUp className="w-5 h-5 text-primary" />
          <span>Trending Tags</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {trendingTags.map((tag, index) => (
          <motion.div
            key={tag.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center justify-between group cursor-pointer"
            onClick={() => setSelectedTag(selectedTag === tag.name ? null : tag.name)}
          >
            <div className="flex items-center space-x-3 flex-1">
              <div className="relative">
                <motion.div
                  animate={tag.trending ? {
                    boxShadow: [
                      '0 0 0 rgba(59, 130, 246, 0)',
                      '0 0 15px rgba(59, 130, 246, 0.4)',
                      '0 0 0 rgba(59, 130, 246, 0)'
                    ]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                >
                  <Badge 
                    variant="outline" 
                    className={`${tag.color} transition-all duration-300 group-hover:scale-110 ${
                      selectedTag === tag.name ? 'scale-110 glow-primary' : ''
                    }`}
                  >
                    <Hash className="w-3 h-3 mr-1" />
                    {tag.name}
                  </Badge>
                </motion.div>
                {tag.trending && (
                  <motion.div 
                    className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground font-mono">
                  {tag.count.toLocaleString()}
                </span>
                <div className="flex items-center space-x-1">
                  {tag.direction === 'up' && (
                    <ArrowUp className="w-3 h-3 text-green-400" />
                  )}
                  {tag.direction === 'down' && (
                    <ArrowDown className="w-3 h-3 text-red-400" />
                  )}
                  {tag.direction === 'stable' && (
                    <BarChart3 className="w-3 h-3 text-gray-400" />
                  )}
                  <span className={`text-xs ${
                    tag.direction === 'up' ? 'text-green-400' : 
                    tag.direction === 'down' ? 'text-red-400' : 
                    'text-gray-400'
                  }`}>
                    {tag.direction === 'up' ? '+' : ''}{tag.change}%
                  </span>
                </div>
              </div>
            </div>
            
            {tag.trending && (
              <motion.div
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <TrendingUp className="w-4 h-4 text-destructive" />
              </motion.div>
            )}
          </motion.div>
        ))}

        <div className="pt-4 border-t border-border/50">
          <Button 
            variant="ghost" 
            className="w-full text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Tag className="w-4 h-4 mr-2" />
            View all tags
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendingTags;