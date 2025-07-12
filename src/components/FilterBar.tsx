import { useState } from 'react';
import { Filter, ChevronDown, SortAsc, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface FilterBarProps {
  activeFilter: string;
  activeSort: string;
  onFilterChange: (filter: string) => void;
  onSortChange: (sortOption: string) => void;
  questionCount: number;
}

const FilterBar = ({ 
  activeFilter, 
  activeSort,
  onFilterChange, 
  onSortChange,
  questionCount 
}: FilterBarProps) => {
  const filters = [
    { key: 'newest', label: 'Newest', icon: Clock, description: 'Most recently asked' },
    { key: 'trending', label: 'Trending', icon: TrendingUp, description: 'Hot questions' },
    { key: 'unanswered', label: 'Unanswered', icon: Filter, description: 'No answers yet' },
    { key: 'solved', label: 'Solved', icon: CheckCircle, description: 'Has accepted answer' },
  ];

  const sortOptions = [
    { key: 'newest', label: 'Newest first' },
    { key: 'oldest', label: 'Oldest first' },
    { key: 'most-votes', label: 'Most votes' },
    { key: 'most-answers', label: 'Most answers' },
    { key: 'most-views', label: 'Most views' },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <div className="flex items-center space-x-4">
        <h2 className="text-xl font-semibold">
          Questions
          <Badge variant="secondary" className="ml-2">
            {questionCount.toLocaleString()}
          </Badge>
        </h2>
      </div>

      <div className="flex items-center space-x-2 w-full sm:w-auto">
        {/* Filter Chips */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 sm:pb-0">
          {filters.map((filter) => {
            const Icon = filter.icon;
            const isActive = activeFilter === filter.key;
            
            return (
              <Button
                key={filter.key}
                variant={isActive ? "default" : "outline"}
                size="sm"
                onClick={() => onFilterChange(filter.key)}
                className={`flex items-center space-x-2 whitespace-nowrap transition-all ${
                  isActive 
                    ? 'bg-gradient-primary glow-primary scale-105' 
                    : 'hover:bg-primary/10 hover:text-primary hover:scale-105'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{filter.label}</span>
              </Button>
            );
          })}
        </div>

        {/* Sort Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center space-x-2 hover:bg-primary/10"
            >
              <SortAsc className="w-4 h-4" />
              <span className="hidden sm:inline">Sort</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="glass-strong min-w-[180px]" align="end">
            {sortOptions.map((option) => (
              <DropdownMenuItem 
                key={option.key}
                className={`hover:bg-primary/10 focus:bg-primary/10 cursor-pointer ${
                  activeSort === option.key ? 'bg-primary/10 text-primary' : ''
                }`}
                onClick={() => onSortChange(option.key)}
              >
                {option.label}
                {activeSort === option.key && (
                  <span className="ml-auto">✓</span>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default FilterBar;