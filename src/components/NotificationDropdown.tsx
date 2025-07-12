import { useState, useRef, useEffect } from 'react';
import { Bell, MessageCircle, Heart, Award, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
  id: string;
  type: 'answer' | 'mention' | 'upvote' | 'badge';
  message: string;
  time: string;
  read: boolean;
  avatar?: string;
}

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'answer',
      message: 'John Doe answered your question about React hooks',
      time: '2 minutes ago',
      read: false,
    },
    {
      id: '2',
      type: 'mention',
      message: 'Sarah mentioned you in a comment',
      time: '1 hour ago',
      read: false,
    },
    {
      id: '3',
      type: 'upvote',
      message: 'Your answer received 5 upvotes',
      time: '3 hours ago',
      read: false,
    },
    {
      id: '4',
      type: 'badge',
      message: 'You earned the "Helper" badge!',
      time: '1 day ago',
      read: true,
    },
  ]);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'answer':
        return <MessageCircle className="w-4 h-4 text-blue-400" />;
      case 'mention':
        return <User className="w-4 h-4 text-green-400" />;
      case 'upvote':
        return <Heart className="w-4 h-4 text-red-400" />;
      case 'badge':
        return <Award className="w-4 h-4 text-yellow-400" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="icon"
        className="relative hover:bg-background/50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <motion.div
          animate={unreadCount > 0 ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 2 }}
        >
          <Bell className="w-5 h-5" />
        </motion.div>
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1"
          >
            <Badge className="w-5 h-5 p-0 text-xs bg-destructive pulse-glow flex items-center justify-center">
              {unreadCount}
            </Badge>
          </motion.div>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 z-50"
          >
            <Card className="w-80 glass-strong border shadow-lg">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Notifications</CardTitle>
                  {unreadCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={markAllAsRead}
                      className="text-xs text-muted-foreground hover:text-primary"
                    >
                      Mark all read
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-2 max-h-96 overflow-y-auto">
                {notifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-3 rounded-lg border transition-all cursor-pointer ${
                      notification.read
                        ? 'bg-background/50 border-border/50'
                        : 'bg-primary/5 border-primary/20 hover:bg-primary/10'
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm ${
                          notification.read ? 'text-muted-foreground' : 'text-foreground'
                        }`}>
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {notification.time}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                      )}
                    </div>
                  </motion.div>
                ))}
                {notifications.length === 0 && (
                  <div className="text-center py-6 text-muted-foreground">
                    <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No notifications</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationDropdown;