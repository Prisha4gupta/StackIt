import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { registerWithEmail } from '@/services/authService';
import { createUserProfile } from '@/services/userService';
import { useAuth } from '@/contexts/AuthContext';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await registerWithEmail(email, password);
      await createUserProfile(userCredential.user.uid, {
        displayName,
        email,
        createdAt: new Date().toISOString(),
      });
      navigate(from, { replace: true });
    } catch (err) {
      setError('Registration failed. ' + (err as Error).message);
    }
  };

  if (user) {
    navigate(from, { replace: true });
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-8 glass rounded-lg">
        <h2 className="text-2xl font-bold text-center">Create Account</h2>
        {error && <div className="text-red-500 text-center">{error}</div>}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Display Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>
        <div className="text-center text-sm">
          Already have an account? <Link to="/login" className="text-primary">Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;