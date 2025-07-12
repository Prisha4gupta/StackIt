import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BadgesPanel from '@/components/BadgesPanel';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen animated-bg">
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link to="/" className="inline-flex items-center text-primary hover:text-primary-glow mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Info */}
            <div className="lg:col-span-1">
              <Card className="glass-strong sticky top-24">
                <CardHeader className="items-center">
                  <Avatar className="w-24 h-24 mb-4">
                    <AvatarImage src={user?.photoURL || ''} />
                    <AvatarFallback>
                      {user?.displayName?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-center">
                    {user?.displayName || 'Anonymous User'}
                  </CardTitle>
                  <p className="text-muted-foreground text-center">
                    {user?.email}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Reputation</span>
                      <span className="font-medium">1,250</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Questions</span>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Answers</span>
                      <span className="font-medium">34</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Badges and Activity */}
            <div className="lg:col-span-2 space-y-6">
              <BadgesPanel />
              
              {/* Add additional user activity sections here if needed */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;