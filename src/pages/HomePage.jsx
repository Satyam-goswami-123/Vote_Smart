import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle, Bot, Calendar, Shield, Users, TrendingUp,
  Star, ChevronRight, Play, Award, MapPin, Clock, Bell, Zap,
  BookOpen, Vote, BarChart3, Search, Globe, HelpCircle
} from 'lucide-react';
import './HomePage.css';

/* ── Animated Counter ─────────────────────────── */
function Counter({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const startTime = performance.now();
        const tick = (now) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * end));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count.toLocaleString('en-IN')}{suffix}</span>;
}

/* ── Steps (election stages) ─────────────────── */
const steps = [
  { icon: '📋', title: 'Register', desc: 'Add your name to the Electoral Roll via Form 6 online or offline.', color: '#f97316', done: true },
  { icon: '✅', title: 'Verify', desc: 'Verify your Voter ID status on the NVSP portal or Voter Helpline.', color: '#3b82f6', done: true },
  { icon: '🗺️', title: 'Find Booth', desc: 'Locate your nearest polling booth using your EPIC number.', color: '#8b5cf6', done: false },
  { icon: '🗳️', title: 'Vote', desc: 'Cast your vote on polling day using your Voter ID or Aadhaar.', color: '#22c55e', done: false },
  { icon: '📊', title: 'Results', desc: 'Track live results and see democracy in action across India.', color: '#06b6d4', done: false },
];

/* ── Feature Cards ───────────────────────────── */
const features = [
  { icon: <BookOpen size={22} />, title: 'Interactive Guide', desc: 'Step-by-step election walkthrough tailored to first-time voters.', color: '#3b82f6', path: '/timeline' },
  { icon: <Shield size={22} />, title: 'Eligibility Checker', desc: 'Instantly know if you qualify to vote in India in under 30 seconds.', color: '#22c55e', path: '/eligibility' },
  { icon: <Bot size={22} />, title: 'AI Assistant', desc: 'Ask anything about Indian elections in your preferred language.', color: '#8b5cf6', path: '/chat' },
  { icon: <BarChart3 size={22} />, title: 'Smart Dashboard', desc: 'Track your election readiness and get personalised next steps.', color: '#f97316', path: '/dashboard' },
  { icon: <Calendar size={22} />, title: 'Key Dates', desc: 'Never miss a registration deadline, nomination date, or polling day.', color: '#ec4899', path: '/#dates' },
  { icon: <MapPin size={22} />, title: 'Booth Finder', desc: 'Pinpoint your polling station with turn-by-turn directions.', color: '#06b6d4', path: '/#finder' },
];

/* ── Important Dates ─────────────────────────── */
const importantDates = [
  { label: 'Voter Registration Deadline', date: 'Jan 15, 2025', status: 'passed', icon: '📋' },
  { label: 'Candidate Nomination', date: 'Feb 01, 2025', status: 'passed', icon: '🏷️' },
  { label: 'Campaign End Date', date: 'Apr 17, 2025', status: 'upcoming', icon: '📣' },
  { label: 'Polling Day – Phase 1', date: 'Apr 19, 2025', status: 'upcoming', icon: '🗳️' },
  { label: 'Polling Day – Phase 2', date: 'Apr 26, 2025', status: 'upcoming', icon: '🗳️' },
  { label: 'Counting of Votes', date: 'Jun 04, 2025', status: 'future', icon: '📊' },
];

/* ── Stats ───────────────────────────────────── */
const stats = [
  { value: 969, suffix: 'M+', label: 'Registered Voters', icon: <Users size={20} /> },
  { value: 543, suffix: '', label: 'Lok Sabha Seats', icon: <Vote size={20} /> },
  { value: 28, suffix: '+', label: 'States & UTs', icon: <Globe size={20} /> },
  { value: 97, suffix: '%', label: 'Voters Educated', icon: <TrendingUp size={20} /> },
];

/* ── Testimonials ────────────────────────────── */
const testimonials = [
  { name: 'Priya Sharma', location: 'Mumbai, MH', text: 'VoteSmart made me confident as a first-time voter. The AI assistant answered every question I had!', avatar: 'PS', rating: 5 },
  { name: 'Arjun Nair', location: 'Kochi, KL', text: 'The eligibility checker saved me so much time. Registration was completed in 5 minutes!', avatar: 'AN', rating: 5 },
  { name: 'Fatima Begum', location: 'Hyderabad, TS', text: 'Finally a platform that explains complex election rules in simple language. Highly recommended!', avatar: 'FB', rating: 5 },
];

/* ══════════════════════════════════════════════ */
export default function HomePage() {
  const [activeStep, setActiveStep] = useState(0);
  const [chatMsg, setChatMsg] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'bot', text: 'Namaste! 🙏 I\'m VoteBot, your AI election guide. Ask me anything about Indian elections!' },
  ]);

  const fakeReplies = [
    'To register as a voter, you need to fill Form 6 on the NVSP portal. You should be at least 18 years old and an Indian citizen.',
    'The Election Commission of India (ECI) is the constitutional body that oversees elections.',
    'You can vote using your Voter ID card, Aadhaar card, passport, or any government-issued photo ID.',
    'Polling booths are typically open from 7 AM to 6 PM on election day.',
  ];
  const replyIdx = useRef(0);

  const handleChatSend = (msg) => {
    const text = msg || chatMsg;
    if (!text.trim()) return;
    setChatHistory(h => [...h, { role: 'user', text }]);
    setChatMsg('');
    setTimeout(() => {
      setChatHistory(h => [...h, { role: 'bot', text: fakeReplies[replyIdx.current % fakeReplies.length] }]);
      replyIdx.current++;
    }, 800);
  };

  const quickReplies = ['How do I register?', 'What is EPIC?', 'Polling booth hours', 'EVM safety'];

  return (
    <div className="home">
      {/* ── HERO ─────────────────────────────────── */}
      <section className="hero">
        <div className="hero-bg">
          <div className="orb orb-blue" style={{ width: 500, height: 500, top: -100, right: -100 }} />
          <div className="orb orb-saffron" style={{ width: 400, height: 400, bottom: -50, left: -100 }} />
          <div className="orb orb-green" style={{ width: 300, height: 300, top: '30%', left: '40%' }} />
          <div className="hero-grid" />
        </div>

        <div className="container hero-content">
          <div className="hero-left animate-fadeInUp">
            <div className="hero-eyebrow">
              <span className="badge badge-blue"><Zap size={11} /> India's #1 Election Guide</span>
            </div>
            <h1 className="hero-title">
              Your Vote,<br />
              <span className="gradient-text-tricolor">Your Voice,</span><br />
              Your Power.
            </h1>
            <p className="hero-desc">
              VoteSmart India makes democratic participation simple, informed, and engaging. Understand elections, check eligibility, and vote with confidence.
            </p>
            <div className="hero-cta-row">
              <Link to="/eligibility" className="btn btn-saffron">
                Check Eligibility <ArrowRight size={16} />
              </Link>
              <Link to="/timeline" className="btn btn-ghost">
                <Play size={15} /> Election Guide
              </Link>
            </div>
            <div className="hero-trust">
              <div className="hero-trust-avatars">
                {['A', 'B', 'C', 'D'].map(l => (
                  <div key={l} className="trust-avatar">{l}</div>
                ))}
              </div>
              <span>
                <strong>50,000+</strong> citizens guided this month
              </span>
            </div>
          </div>

          <div className="hero-right animate-fadeInUp delay-300">
            <div className="hero-card-stack">
              {/* Floating card 1 */}
              <div className="hero-float-card card-1 animate-float">
                <CheckCircle size={18} color="#22c55e" />
                <div>
                  <p className="hfc-title">Voter ID Verified</p>
                  <p className="hfc-sub">XMH 1234567</p>
                </div>
              </div>

              {/* Main illustration card */}
              <div className="hero-main-card glass-card">
                <div className="hero-illustration">
                  <div className="ballot-box">
                    <div className="ballot-slot" />
                    <div className="ballot-paper animate-float" style={{ animationDelay: '0.5s' }}>
                      <div className="ballot-line" style={{ background: '#f97316' }} />
                      <div className="ballot-line" style={{ background: '#3b82f6' }} />
                      <div className="ballot-line" style={{ background: '#22c55e' }} />
                    </div>
                  </div>
                  <div className="vote-progress-wrap">
                    <p style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Election Readiness</p>
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width: '72%', background: 'linear-gradient(90deg, #f97316, #3b82f6, #22c55e)' }} />
                    </div>
                    <p style={{ fontSize: '0.85rem', fontWeight: 700, marginTop: '0.5rem', color: 'var(--text-primary)' }}>72% Complete</p>
                  </div>
                </div>
                <div className="hero-steps-mini">
                  {steps.slice(0, 3).map((s, i) => (
                    <div key={i} className={`hero-step-mini ${s.done ? 'done' : ''}`}>
                      <span>{s.icon}</span>
                      <span>{s.title}</span>
                      {s.done && <CheckCircle size={12} color="#22c55e" />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating card 2 */}
              <div className="hero-float-card card-2 animate-float" style={{ animationDelay: '1s' }}>
                <Bell size={16} color="#f97316" />
                <div>
                  <p className="hfc-title">Polling Day Alert</p>
                  <p className="hfc-sub">April 19 · 7 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll-hint">
          <div className="scroll-dot" />
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────── */}
      <section id="stats" className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            {stats.map((s, i) => (
              <div key={i} className="stat-card">
                <div className="stat-icon">{s.icon}</div>
                <div className="stat-number">
                  <Counter end={s.value} suffix={s.suffix} />
                </div>
                <p className="stat-label">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID ────────────────────────── */}
      <section id="guide" className="section features-section">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-saffron mb-2">Everything You Need</span>
            <h2>Your Complete Election<br /><span className="gradient-text-blue">Toolkit</span></h2>
            <div className="tricolor-divider" />
            <p>From registration to results — VoteSmart India has every tool and resource you need to participate fully in Indian democracy.</p>
          </div>
          <div className="features-grid">
            {features.map((f, i) => (
              <Link to={f.path} key={i} className="feature-card hover-lift">
                <div className="feature-icon" style={{ '--fc': f.color }}>
                  {f.icon}
                </div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
                <span className="feature-arrow">
                  <ChevronRight size={16} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── ELECTION GUIDE STEPS ─────────────────── */}
      <section className="section steps-section">
        <div className="container">
          <div className="steps-layout">
            <div className="steps-left">
              <span className="badge badge-blue mb-2">Interactive Guide</span>
              <h2>5 Steps to <span className="gradient-text-saffron">Cast Your Vote</span></h2>
              <div className="tricolor-divider" style={{ margin: '0.75rem 0' }} />
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                The Indian election process simplified into 5 easy, actionable steps.
              </p>
              <div className="steps-nav">
                {steps.map((s, i) => (
                  <button
                    key={i}
                    className={`step-nav-btn ${activeStep === i ? 'active' : ''}`}
                    onClick={() => setActiveStep(i)}
                    style={{ '--sc': s.color }}
                  >
                    <span className="step-num">{i + 1}</span>
                    <span className="step-nav-title">{s.icon} {s.title}</span>
                    {s.done && <CheckCircle size={14} color="#22c55e" />}
                  </button>
                ))}
              </div>
              <Link to="/timeline" className="btn btn-primary mt-4">
                Full Timeline <ArrowRight size={15} />
              </Link>
            </div>

            <div className="steps-right">
              {steps.map((s, i) => (
                <div
                  key={i}
                  className={`step-detail-card glass-card ${activeStep === i ? 'active' : ''}`}
                  style={{ '--sc': s.color }}
                >
                  <div className="step-detail-icon">{s.icon}</div>
                  <h3>Step {i + 1}: {s.title}</h3>
                  <p>{s.desc}</p>
                  {s.done && (
                    <div className="step-done-badge">
                      <CheckCircle size={14} /> Completed
                    </div>
                  )}
                  <div className="step-detail-progress">
                    <div className="progress-track">
                      <div className="progress-fill" style={{
                        width: `${activeStep > i ? 100 : activeStep === i ? 60 : 0}%`,
                        background: s.color
                      }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ELIGIBILITY CHECKER CARD ──────────────── */}
      <section className="section elig-section">
        <div className="container">
          <div className="elig-card glass-card">
            <div className="elig-left">
              <span className="badge badge-green mb-2">30 Second Check</span>
              <h2>"Am I Eligible to Vote?"</h2>
              <p>Find out instantly if you qualify to cast your vote in Indian elections. Just answer 3 quick questions.</p>
              <ul className="elig-checklist">
                <li><CheckCircle size={16} color="#22c55e" /> Indian Citizen aged 18+</li>
                <li><CheckCircle size={16} color="#22c55e" /> Resident of your constituency</li>
                <li><CheckCircle size={16} color="#22c55e" /> Not disqualified under any law</li>
              </ul>
              <Link to="/eligibility" className="btn btn-green mt-3">
                Check Now <ArrowRight size={15} />
              </Link>
            </div>
            <div className="elig-right">
              <div className="elig-illustration">
                <div className="elig-circle" style={{ '--c': '#22c55e' }}>
                  <Shield size={40} color="#22c55e" />
                </div>
                <div className="elig-bubbles">
                  {['Age ✓', 'Citizen ✓', 'Resident ✓'].map((t, i) => (
                    <div key={i} className="elig-bubble" style={{ animationDelay: `${i * 0.3}s` }}>{t}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AI CHAT PREVIEW ───────────────────────── */}
      <section id="ai" className="section chat-section">
        <div className="container">
          <div className="chat-layout">
            <div className="chat-left">
              <span className="badge badge-blue mb-2"><Bot size={11} /> AI Powered</span>
              <h2>Meet <span className="gradient-text-blue">VoteBot</span> – Your Election AI</h2>
              <div className="tricolor-divider" style={{ margin: '0.75rem 0' }} />
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Ask anything about Indian elections in plain language. VoteBot is trained on ECI guidelines and constitutional law.
              </p>
              <div className="chat-features-list">
                {[
                  '24/7 availability in 10+ Indian languages',
                  'Explains complex election rules simply',
                  'Personalised guidance based on your state',
                  'Instant answers to voter registration queries',
                ].map((t, i) => (
                  <div key={i} className="chat-feat-item">
                    <div className="chat-feat-dot" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
              <Link to="/chat" className="btn btn-primary mt-3">
                Chat with VoteBot <ArrowRight size={15} />
              </Link>
            </div>

            <div className="chat-right">
              <div className="chat-preview glass-card">
                <div className="chat-header">
                  <div className="chat-header-avatar">
                    <Bot size={16} color="#fff" />
                    <span className="chat-online-dot" />
                  </div>
                  <div>
                    <p className="chat-header-name">VoteBot AI</p>
                    <p className="chat-header-status">Online · Powered by AI</p>
                  </div>
                </div>

                <div className="chat-messages">
                  {chatHistory.map((m, i) => (
                    <div key={i} className={`chat-msg-row ${m.role}`}>
                      {m.role === 'bot' && (
                        <div className="chat-bot-avatar"><Bot size={12} color="#fff" /></div>
                      )}
                      <div className={`chat-bubble chat-bubble-${m.role === 'bot' ? 'bot' : 'user'}`}>
                        {m.text}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="quick-replies">
                  {quickReplies.map((q, i) => (
                    <button key={i} className="quick-reply-btn" onClick={() => handleChatSend(q)}>{q}</button>
                  ))}
                </div>

                <div className="chat-input-row">
                  <input
                    className="input"
                    placeholder="Ask about elections…"
                    value={chatMsg}
                    onChange={e => setChatMsg(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleChatSend()}
                    style={{ borderRadius: '999px', paddingLeft: '1.25rem' }}
                  />
                  <button className="btn btn-primary chat-send-btn" onClick={() => handleChatSend()}>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── IMPORTANT DATES ───────────────────────── */}
      <section id="dates" className="section dates-section">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-saffron mb-2"><Calendar size={11} /> 2025 Elections</span>
            <h2>Important <span className="gradient-text-saffron">Dates & Deadlines</span></h2>
            <div className="tricolor-divider" />
            <p>Stay on top of every critical election date — from registration to counting day.</p>
          </div>
          <div className="dates-grid">
            {importantDates.map((d, i) => (
              <div key={i} className={`date-card glass-card ${d.status}`}>
                <div className="date-icon">{d.icon}</div>
                <div className="date-info">
                  <p className="date-label">{d.label}</p>
                  <p className="date-value">{d.date}</p>
                </div>
                <span className={`date-badge ${d.status}`}>
                  {d.status === 'passed' ? 'Done' : d.status === 'upcoming' ? 'Soon' : 'Upcoming'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────── */}
      <section className="section testimonials-section">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-green mb-2"><Star size={11} /> Trusted by Citizens</span>
            <h2>What Voters Are <span className="gradient-text-blue">Saying</span></h2>
            <div className="tricolor-divider" />
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card glass-card hover-lift">
                <div className="stars">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} fill="#f97316" color="#f97316" />
                  ))}
                </div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.avatar}</div>
                  <div>
                    <p className="testimonial-name">{t.name}</p>
                    <p className="testimonial-loc"><MapPin size={11} /> {t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────── */}
      <section className="cta-banner">
        <div className="cta-bg">
          <div className="orb orb-saffron" style={{ width: 300, height: 300, top: -100, right: 100 }} />
          <div className="orb orb-blue" style={{ width: 250, height: 250, bottom: -80, left: 50 }} />
        </div>
        <div className="container cta-content">
          <h2>Ready to Make Your Vote Count?</h2>
          <p>Join thousands of informed citizens. Check your eligibility, explore the process, and vote with confidence.</p>
          <div className="cta-buttons">
            <Link to="/eligibility" className="btn btn-saffron">
              Start Your Journey <ArrowRight size={15} />
            </Link>
            <Link to="/chat" className="btn btn-ghost">
              <Bot size={15} /> Ask VoteBot
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
