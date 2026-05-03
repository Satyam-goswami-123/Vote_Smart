import { useState } from 'react';
import { CheckCircle, Circle, ChevronRight, Info, ExternalLink, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './TimelinePage.css';

const phases = [
  {
    id: 1,
    color: '#f97316',
    icon: '📋',
    title: 'Voter Registration',
    subtitle: 'The Foundation of Democracy',
    date: 'Ongoing · Form 6',
    status: 'complete',
    description: 'Every citizen aged 18 and above must register as a voter. Registration can be done online via the NVSP portal or offline at your local BLO (Booth Level Officer) office.',
    steps: [
      'Visit voters.eci.gov.in or use the Voter Helpline App',
      'Click "New Registration" and fill Form 6',
      'Upload proof of age (birth certificate/10th marksheet)',
      'Upload proof of address (Aadhaar/ration card/utility bill)',
      'Submit and note your Application Reference Number',
      'Track status online; expect 3–4 weeks for verification',
    ],
    tips: ['Register before the electoral roll revision deadline', 'Check your name on the final electoral roll before election day'],
    links: ['NVSP Portal (voters.eci.gov.in)', 'Voter Helpline App', 'Call 1950 for assistance'],
  },
  {
    id: 2,
    color: '#3b82f6',
    icon: '🏷️',
    title: 'Candidate Nomination',
    subtitle: 'Democratic Representation',
    date: 'Phase-specific Dates',
    status: 'complete',
    description: 'Candidates file their nomination papers with the Returning Officer. Each candidate must be an Indian citizen aged 25+ for Lok Sabha (35+ for Rajya Sabha) and not disqualified under any law.',
    steps: [
      'Candidate files nomination with Returning Officer',
      'Affidavit of assets and criminal record submitted',
      'Security deposit paid (₹25,000 for general, ₹12,500 for SC/ST)',
      'Scrutiny of nominations by RO',
      'Withdrawal period (candidates may withdraw nominations)',
      'Final list of candidates published',
    ],
    tips: ['Candidates with declared criminal cases must publicise this information', 'All assets must be disclosed in the affidavit'],
    links: ['ECI Candidate Nomination Guidelines', 'Affidavit Format Download'],
  },
  {
    id: 3,
    color: '#8b5cf6',
    icon: '📣',
    title: 'Election Campaign',
    subtitle: 'Model Code of Conduct Period',
    date: '2–3 Weeks Before Poll',
    status: 'active',
    description: 'Political parties and candidates campaign across constituencies. The Model Code of Conduct (MCC) applies from the date of announcement until results. Expenditure limits are enforced.',
    steps: [
      'Model Code of Conduct comes into effect',
      'Political rallies, door-to-door campaigns, and advertising begin',
      'Campaign expenditure tracked (Lok Sabha: ₹95 lakh limit)',
      'ECI deploys Flying Squads to monitor violations',
      'Campaign period ends 48 hours before polling',
      'Election eve – no campaigning (silence period)',
    ],
    tips: ['MCC prohibits government freebies announcements after election schedule', 'Paid news is strictly prohibited under ECI guidelines'],
    links: ['Model Code of Conduct', 'Election Expenditure Limits', 'Report MCC Violations: cVIGIL App'],
  },
  {
    id: 4,
    color: '#22c55e',
    icon: '🗳️',
    title: 'Polling Day',
    subtitle: 'Exercise Your Franchise',
    date: 'Multiple Phase Dates',
    status: 'upcoming',
    description: 'The most important day of the election process. Voters cast their votes at designated polling stations between 7 AM and 6 PM using EVMs (Electronic Voting Machines).',
    steps: [
      'Collect your Voter Slip from BLO (or check online)',
      'Carry valid photo ID (Voter ID / Aadhaar / Passport etc.)',
      'Locate your polling booth in advance',
      'Join the queue at your assigned polling station',
      'Show ID, get finger ink-marked, receive ballot slip',
      'Press the EVM button for your chosen candidate and verify on VVPAT',
    ],
    tips: ['Polling booths are open 7 AM – 6 PM (timings may vary)', 'You must vote at YOUR designated booth — no transfers allowed'],
    links: ['Find Your Booth', 'List of Accepted ID Documents', 'Know Your Candidate (affidavits)'],
  },
  {
    id: 5,
    color: '#06b6d4',
    icon: '📊',
    title: 'Vote Counting & Results',
    subtitle: 'Democracy Delivers its Verdict',
    date: 'Announced by ECI',
    status: 'future',
    description: 'After all phases of polling are complete, votes are counted simultaneously across constituencies on a designated date. Results are declared by the Returning Officer.',
    steps: [
      'EVM strongrooms unsealed in presence of observers & candidates',
      'Postal ballot counting begins first',
      'EVM round-by-round counting commences',
      'Leading/winning trends updated in real-time on ECI website',
      'Returning Officer declares winner after completing all rounds',
      'Winning candidate files election expenses return within 30 days',
    ],
    tips: ['Follow ECI website for live results', 'The new Lok Sabha must be constituted within 6 months of dissolution'],
    links: ['ECI Results Dashboard', 'How Votes Are Counted (ECI Video)', 'Election Results Archive'],
  },
];

const statusConfig = {
  complete: { label: 'Completed', color: '#22c55e', bg: 'rgba(34,197,94,0.12)' },
  active: { label: 'In Progress', color: '#f97316', bg: 'rgba(249,115,22,0.12)' },
  upcoming: { label: 'Upcoming', color: '#3b82f6', bg: 'rgba(59,130,246,0.12)' },
  future: { label: 'Future', color: '#94a3b8', bg: 'rgba(148,163,184,0.12)' },
};

export default function TimelinePage() {
  const [activePhase, setActivePhase] = useState(3);
  const [expandedStep, setExpandedStep] = useState(null);

  const phase = phases[activePhase];

  return (
    <div className="timeline-page">
      <div className="timeline-hero">
        <div className="orb orb-blue" style={{ width: 400, height: 400, top: -100, right: -50 }} />
        <div className="orb orb-saffron" style={{ width: 300, height: 300, bottom: -100, left: 0 }} />
        <div className="container timeline-hero-inner">
          <span className="badge badge-blue">Interactive Guide</span>
          <h1 style={{ marginTop: '0.75rem', color: '#fff', fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}>
            Election Process <span style={{ color: '#f97316' }}>Timeline</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', marginTop: '0.75rem', fontSize: '1.05rem' }}>
            Navigate through each phase of the Indian election process with detailed guidance.
          </p>
        </div>
      </div>

      <div className="container timeline-body">
        {/* Phase Selector (horizontal scroll) */}
        <div className="phase-selector">
          {phases.map((p, i) => (
            <button
              key={p.id}
              className={`phase-btn ${activePhase === i ? 'active' : ''} ${p.status}`}
              onClick={() => setActivePhase(i)}
              style={{ '--pc': p.color }}
            >
              <span className="phase-btn-icon">{p.icon}</span>
              <span className="phase-btn-label">{p.title}</span>
              <span className="phase-btn-status" style={{ background: statusConfig[p.status].bg, color: statusConfig[p.status].color }}>
                {statusConfig[p.status].label}
              </span>
            </button>
          ))}
        </div>

        {/* Phase Detail */}
        <div className="phase-detail-wrapper">
          {/* Left: Vertical timeline */}
          <div className="phase-vertical-timeline">
            {phases.map((p, i) => (
              <div
                key={p.id}
                className={`vt-item ${activePhase === i ? 'active' : ''} ${p.status}`}
                onClick={() => setActivePhase(i)}
                style={{ '--pc': p.color }}
              >
                <div className="vt-dot">{p.icon}</div>
                {i < phases.length - 1 && (
                  <div className="vt-line" style={{ background: i < activePhase ? p.color : 'var(--border-color)' }} />
                )}
                <div className="vt-content">
                  <p className="vt-title">{p.title}</p>
                  <p className="vt-date">{p.date}</p>
                </div>
                <div className="vt-status-dot" style={{ background: statusConfig[p.status].color }} />
              </div>
            ))}
          </div>

          {/* Right: Phase detail */}
          <div className="phase-detail glass-card" style={{ borderTop: `4px solid ${phase.color}` }}>
            <div className="phase-detail-header">
              <div className="phase-icon-large" style={{ '--pc': phase.color }}>
                {phase.icon}
              </div>
              <div>
                <div className="phase-status-badge" style={{ background: statusConfig[phase.status].bg, color: statusConfig[phase.status].color }}>
                  {statusConfig[phase.status].label}
                </div>
                <h2 style={{ marginTop: '0.5rem', marginBottom: '0.25rem' }}>{phase.title}</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{phase.subtitle} · {phase.date}</p>
              </div>
            </div>

            <p className="phase-description">{phase.description}</p>

            <div className="phase-sections">
              <div className="phase-steps-section">
                <h4 className="section-sub-title">📋 Step-by-Step Process</h4>
                <div className="phase-steps">
                  {phase.steps.map((step, i) => (
                    <div
                      key={i}
                      className="phase-step-item"
                      style={{ '--pc': phase.color }}
                    >
                      <div className="step-number" style={{ background: phase.color }}>{i + 1}</div>
                      <p>{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="phase-side-info">
                <div className="tips-card glass-card">
                  <h4 className="section-sub-title">💡 Key Tips</h4>
                  <ul>
                    {phase.tips.map((tip, i) => (
                      <li key={i}>
                        <Info size={12} color={phase.color} />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="links-card glass-card">
                  <h4 className="section-sub-title">🔗 Useful Links</h4>
                  <ul>
                    {phase.links.map((link, i) => (
                      <li key={i}>
                        <ExternalLink size={12} color={phase.color} />
                        <span>{link}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="phase-nav">
              {activePhase > 0 && (
                <button className="btn btn-outline" onClick={() => setActivePhase(p => p - 1)}>
                  ← Previous Phase
                </button>
              )}
              {activePhase < phases.length - 1 && (
                <button className="btn btn-primary" style={{ marginLeft: 'auto' }} onClick={() => setActivePhase(p => p + 1)}>
                  Next Phase <ArrowRight size={15} />
                </button>
              )}
              {activePhase === phases.length - 1 && (
                <Link to="/dashboard" className="btn btn-green" style={{ marginLeft: 'auto' }}>
                  Go to Dashboard <ArrowRight size={15} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
