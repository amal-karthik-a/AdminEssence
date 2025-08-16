import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from './../SupaBase/supa';
import Authentication from './pages/Authenticate';
import Home from './pages/HomePage';
import NetworkError from './pages/StatusDemo';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (isOffline) return;

    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [isOffline]);

  const handleRetry = async () => {
    if (navigator.onLine) {
      setIsOffline(false);
    }
  };

  if (isOffline) {
    return <NetworkError isOnline={!isOffline} onRetry={handleRetry} />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    if (!user) {
      return <Navigate to="/" replace state={{ from: location }} />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={!user ? <Authentication /> : <Navigate to="/home" replace />}
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;