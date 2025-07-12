import { AuthProvider } from '@/contexts/AuthContext';
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(<App />);
createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <App />
  </AuthProvider>);