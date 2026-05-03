import { Link } from 'react-router-dom';
import { Vote, Heart, ExternalLink, Share2, Video, Rss } from 'lucide-react';
import './Footer.css';

const footerLinks = {
  Platform: [
    { label: 'Home', path: '/' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Timeline', path: '/timeline' },
    { label: 'Eligibility Checker', path: '/eligibility' },
  ],
  Resources: [
    { label: 'AI Assistant', path: '/chat' },
    { label: 'Important Dates', path: '/#dates' },
    { label: 'Voter Guide', path: '/#guide' },
    { label: 'FAQs', path: '/#faqs' },
  ],
  Legal: [
    { label: 'Privacy Policy', path: '#' },
    { label: 'Terms of Service', path: '#' },
    { label: 'Accessibility', path: '#' },
    { label: 'Contact Us', path: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-glow" />
      <div className="container">
        <div className="footer-top">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="nav-logo-icon" style={{ marginBottom: '1rem' }}>
                <Vote size={18} color="#fff" />
              </div>
              <span style={{ fontFamily: 'Outfit', fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Vote<span style={{ color: '#f97316' }}>Smart</span>{' '}
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>India</span>
              </span>
            </div>
            <p className="footer-desc">
              Empowering every Indian citizen with the knowledge and tools to participate confidently in democracy.
            </p>
            <div className="footer-social">
              <a href="#" className="social-btn" aria-label="Twitter"><Share2 size={16} /></a>
              <a href="#" className="social-btn" aria-label="YouTube"><Video size={16} /></a>
              <a href="#" className="social-btn" aria-label="Feed"><Rss size={16} /></a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([cat, links]) => (
            <div key={cat} className="footer-links-col">
              <h4 className="footer-col-title">{cat}</h4>
              <ul>
                {links.map(l => (
                  <li key={l.label}>
                    <Link to={l.path} className="footer-link">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="footer-divider" />

        {/* Bottom */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2026 VoteSmart India. Built with <Heart size={13} style={{ color: '#f97316', display: 'inline', verticalAlign: 'middle' }} /> for Indian democracy.
          </p>
          <div className="footer-bottom-badges">
            <span className="badge badge-blue">🇮🇳 Made in India</span>
            <span className="badge badge-green">ECI Inspired</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
