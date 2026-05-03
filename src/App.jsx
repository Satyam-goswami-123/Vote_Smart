import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import ChatPage from './pages/ChatPage';
import TimelinePage from './pages/TimelinePage';
import EligibilityPage from './pages/EligibilityPage';

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('vs-theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('vs-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  const location = useLocation();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar theme={theme} toggleTheme={toggleTheme} currentPath={location.pathname} />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/"           element={<HomePage />} />
          <Route path="/dashboard"  element={<DashboardPage />} />
          <Route path="/chat"       element={<ChatPage />} />
          <Route path="/timeline"   element={<TimelinePage />} />
          <Route path="/eligibility" element={<EligibilityPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
