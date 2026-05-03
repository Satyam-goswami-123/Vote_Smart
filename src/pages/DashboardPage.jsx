import { useState } from 'react';
import {
  CheckCircle, Circle, Clock, AlertCircle, TrendingUp, Award,
  Bell, ChevronRight, User, MapPin, FileText, Zap, BarChart3,
  Calendar, Shield, Target, Star, ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PollingBoothMap from '../components/PollingBoothMap';
import { useAuth } from '../context/AuthContext';
import './DashboardPage.css';

const tasks = [
  { id: 1, title: 'Complete Voter Registration', desc: 'Register on NVSP portal using Form 6', done: true, priority: 'high', icon: '📋' },
  { id: 2, title: 'Verify Voter ID Status', desc: 'Check status at voters.eci.gov.in', done: true, priority: 'high', icon: '✅' },
  { id: 3, title: 'Download Voter ID Card', desc: 'Download e-EPIC from NVSP portal', done: false, priority: 'medium', icon: '📄' },
  { id: 4, title: 'Find Your Polling Booth', desc: 'Locate booth using your EPIC number', done: false, priority: 'medium', icon: '🗺️' },
  { id: 5, title: 'Read Election Code of Conduct', desc: 'Understand your rights as a voter', done: false, priority: 'low', icon: '📖' },
  { id: 6, title: 'Set Polling Day Reminder', desc: 'Add April 19 to your calendar', done: false, priority: 'low', icon: '🔔' },
];

const achievements = [
  { icon: '🏅', title: 'First Login', desc: 'Welcome aboard!', unlocked: true },
  { icon: '📋', title: 'Registered Voter', desc: 'Completed registration', unlocked: true },
  { icon: '🎯', title: 'Election Expert', desc: 'Read the full guide', unlocked: false },
  { icon: '🗳️', title: 'First Vote', desc: 'Cast your first vote', unlocked: false },
];

const activities = [
  { icon: '✅', text: 'Voter ID verified successfully', time: '2 hours ago', color: '#22c55e' },
  { icon: '📋', text: 'Registration form submitted', time: '1 day ago', color: '#3b82f6' },
  { icon: '🤖', text: 'Asked VoteBot about polling hours', time: '2 days ago', color: '#8b5cf6' },
  { icon: '📖', text: 'Completed "Rights & Duties" quiz', time: '3 days ago', color: '#f97316' },
];

export default function DashboardPage() {
  const { currentUser, loginWithGoogle } = useAuth();
  const [taskList, setTaskList] = useState(tasks);
  const [activeTab, setActiveTab] = useState('tasks');

  const completed = taskList.filter(t => t.done).length;
  const total = taskList.length;
  const progress = Math.round((completed / total) * 100);

  const toggleTask = (id) => {
    setTaskList(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const progressColor = progress < 40 ? '#f97316' : progress < 70 ? '#3b82f6' : '#22c55e';

  return (
    <div className="dashboard-page">
      <div className="dashboard-hero">
        <div className="orb orb-blue" style={{ width: 400, height: 400, top: -100, right: 0 }} />
        <div className="container">
          <div className="dashboard-hero-inner">
            <div className="dashboard-welcome">
              <div className="user-avatar">
                {currentUser?.photoURL ? (
                  <img src={currentUser.photoURL} alt="Avatar" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                ) : (
                  <User size={28} color="#fff" />
                )}
              </div>
              <div>
                <p className="welcome-greeting">Good evening 👋</p>
                <h1 className="welcome-name">{currentUser?.displayName || 'Guest Voter'}</h1>
                <p className="welcome-sub"><MapPin size={13} /> {currentUser ? 'Logged In' : 'Not Logged In'}</p>
              </div>
            </div>
            <div className="dashboard-hero-actions">
              {!currentUser && (
                <button onClick={loginWithGoogle} className="btn btn-outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.5)' }}>
                  Login to Save Progress
                </button>
              )}
              <Link to="/chat" className="btn btn-ghost">
                Ask VoteBot
              </Link>
              <Link to="/eligibility" className="btn btn-saffron">
                Check Eligibility <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container dashboard-body">
        {/* Progress Overview */}
        <div className="progress-overview">
          <div className="progress-main-card glass-card">
            <div className="progress-header">
              <div>
                <h3>Election Readiness Score</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>Complete tasks to improve your score</p>
              </div>
              <div className="readiness-badge" style={{ '--rc': progressColor }}>
                <TrendingUp size={16} />
                {progress}%
              </div>
            </div>
            <div className="big-progress-ring" style={{ '--prog': progress, '--rc': progressColor }}>
              <svg viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" fill="none" stroke="var(--bg-secondary)" strokeWidth="10" />
                <circle
                  cx="60" cy="60" r="50"
                  fill="none"
                  stroke={progressColor}
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 50}`}
                  strokeDashoffset={`${2 * Math.PI * 50 * (1 - progress / 100)}`}
                  transform="rotate(-90 60 60)"
                  style={{ transition: 'stroke-dashoffset 1s ease' }}
                />
              </svg>
              <div className="ring-label">
                <span className="ring-value">{progress}%</span>
                <span className="ring-sub">Ready</span>
              </div>
            </div>
            <div className="progress-stats">
              <div className="pstat"><span className="pstat-num">{completed}</span><span>Done</span></div>
              <div className="pstat"><span className="pstat-num">{total - completed}</span><span>Pending</span></div>
              <div className="pstat"><span className="pstat-num">{total}</span><span>Total</span></div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="quick-stats">
            {[
              { label: 'Days to Election', value: '16', icon: <Calendar size={20} />, color: '#f97316' },
              { label: 'AI Questions Asked', value: '12', icon: <Zap size={20} />, color: '#8b5cf6' },
              { label: 'Guides Read', value: '4', icon: <FileText size={20} />, color: '#3b82f6' },
              { label: 'Achievements', value: '2/4', icon: <Award size={20} />, color: '#22c55e' },
            ].map((s, i) => (
              <div key={i} className="qstat-card glass-card" style={{ '--qc': s.color }}>
                <div className="qstat-icon">{s.icon}</div>
                <div className="qstat-value">{s.value}</div>
                <div className="qstat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="dashboard-main">
          <div className="dashboard-left">
            {/* Tab bar */}
            <div className="tab-bar">
              {['tasks', 'activity', 'achievements'].map(tab => (
                <button
                  key={tab}
                  className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {activeTab === 'tasks' && (
              <div className="tasks-panel">
                <div className="tasks-header">
                  <h3>Your Pending Tasks</h3>
                  <span className="badge badge-blue">{total - completed} remaining</span>
                </div>
                <div className="tasks-list">
                  {taskList.map(task => (
                    <div
                      key={task.id}
                      className={`task-item ${task.done ? 'done' : ''} ${task.priority}`}
                      onClick={() => toggleTask(task.id)}
                    >
                      <div className="task-check">
                        {task.done
                          ? <CheckCircle size={20} color="#22c55e" />
                          : <Circle size={20} color="var(--text-muted)" />
                        }
                      </div>
                      <div className="task-icon">{task.icon}</div>
                      <div className="task-body">
                        <p className="task-title">{task.title}</p>
                        <p className="task-desc">{task.desc}</p>
                      </div>
                      <span className={`priority-badge ${task.priority}`}>
                        {task.priority}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="activity-panel">
                <h3 className="mb-3">Recent Activity</h3>
                <div className="activity-list">
                  {activities.map((a, i) => (
                    <div key={i} className="activity-item">
                      <div className="activity-dot" style={{ background: a.color }}>{a.icon}</div>
                      <div className="activity-body">
                        <p className="activity-text">{a.text}</p>
                        <p className="activity-time"><Clock size={11} /> {a.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="achievements-panel">
                <h3 className="mb-3">Your Achievements</h3>
                <div className="achievements-grid">
                  {achievements.map((a, i) => (
                    <div key={i} className={`achievement-card glass-card ${a.unlocked ? 'unlocked' : 'locked'}`}>
                      <div className="achievement-icon">{a.icon}</div>
                      <p className="achievement-title">{a.title}</p>
                      <p className="achievement-desc">{a.desc}</p>
                      {!a.unlocked && <div className="achievement-lock">🔒</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="dashboard-sidebar">
            {/* Suggestions */}
            <div className="suggestion-card glass-card">
              <div className="suggestion-header">
                <Target size={16} color="#f97316" />
                <h4>Personalised Suggestions</h4>
              </div>
              <div className="suggestions">
                {[
                  { text: 'Download your e-EPIC card from NVSP', link: '/dashboard', icon: '📄' },
                  { text: 'Read about your voting rights', link: '/timeline', icon: '📖' },
                  { text: 'Locate your nearest polling booth', link: '/eligibility', icon: '🗺️' },
                ].map((s, i) => (
                  <Link key={i} to={s.link} className="suggestion-item">
                    <span>{s.icon}</span>
                    <p>{s.text}</p>
                    <ChevronRight size={14} color="var(--text-muted)" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Upcoming dates */}
            <div className="upcoming-dates glass-card">
              <div className="suggestion-header">
                <Bell size={16} color="#3b82f6" />
                <h4>Upcoming Alerts</h4>
              </div>
              {[
                { label: 'Polling Day', date: 'Apr 19', urgent: true },
                { label: 'Result Declaration', date: 'Jun 04', urgent: false },
              ].map((d, i) => (
                <div key={i} className={`upcoming-item ${d.urgent ? 'urgent' : ''}`}>
                  <div>
                    <p className="upcoming-label">{d.label}</p>
                    <p className="upcoming-date">{d.date}, 2025</p>
                  </div>
                  {d.urgent && <span className="badge badge-saffron">Soon!</span>}
                </div>
              ))}
            </div>

            {/* Voter profile */}
            <div className="voter-profile glass-card">
              <div className="suggestion-header">
                <Shield size={16} color="#22c55e" />
                <h4>Voter Profile</h4>
              </div>
              {[
                { label: 'EPIC No.', value: 'XMH 1234567' },
                { label: 'State', value: 'Delhi' },
                { label: 'Constituency', value: 'New Delhi AC' },
                { label: 'Polling Booth', value: 'Booth #142' },
              ].map((p, i) => (
                <div key={i} className="profile-row">
                  <span className="profile-label">{p.label}</span>
                  <span className="profile-value">{p.value}</span>
                </div>
              ))}
            </div>
            
            {/* Polling Booth Map */}
            <div className="map-card glass-card" style={{ padding: '1.25rem', marginTop: '1.25rem' }}>
              <div className="suggestion-header">
                <MapPin size={16} color="#ef4444" />
                <h4>Your Polling Booth</h4>
              </div>
              <PollingBoothMap />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
