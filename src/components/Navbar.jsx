import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sun, Moon, Menu, X, Vote, LogOut, User } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Timeline', path: '/timeline' },
  { label: 'Eligibility', path: '/eligibility' },
  { label: 'AI Assistant', path: '/chat' },
];

export default function Navbar({ theme, toggleTheme, currentPath }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { currentUser, loginWithGoogle, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [currentPath]);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-inner">
          {/* Logo */}
          <Link to="/" className="nav-logo">
            <div className="nav-logo-icon">
              <Vote size={18} color="#fff" />
            </div>
            <span className="nav-logo-text">
              Vote<span className="nav-logo-accent">Smart</span>
            </span>
            <span className="nav-logo-badge">India</span>
          </Link>

          {/* Desktop Links */}
          <ul className="nav-links-desktop">
            {navLinks.map(link => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`nav-link ${currentPath === link.path ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="nav-actions">
            <LanguageSelector />
            
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              id="theme-toggle-btn"
            >
              <span className="theme-toggle-track">
                <span className={`theme-toggle-thumb ${theme === 'dark' ? 'dark' : ''}`}>
                  {theme === 'dark' ? <Moon size={12} /> : <Sun size={12} />}
                </span>
              </span>
            </button>

            {currentUser ? (
              <div className="nav-user-profile" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginLeft: '0.5rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--india-blue-500)' }}>
                  {currentUser.photoURL ? (
                    <img src={currentUser.photoURL} alt="User avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--india-blue-500)', color: '#fff' }}>
                      <User size={16} />
                    </div>
                  )}
                </div>
                <button 
                  onClick={async () => {
                    await logout();
                    navigate('/');
                  }} 
                  className="btn btn-outline" 
                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                  title="Log out"
                >
                  <LogOut size={14} />
                </button>
              </div>
            ) : (
              <button onClick={loginWithGoogle} className="btn btn-primary nav-cta">
                Login
              </button>
            )}

            <button
              className="mobile-menu-btn"
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <ul>
          {navLinks.map(link => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`mobile-nav-link ${currentPath === link.path ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link to="/dashboard" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
          Get Started Free
        </Link>
      </div>
    </>
  );
}
