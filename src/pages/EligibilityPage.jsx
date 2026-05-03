import { useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, ArrowRight, RefreshCw, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import './EligibilityPage.css';

const questions = [
  {
    id: 'citizen',
    question: 'Are you a citizen of India?',
    desc: 'Only Indian citizens can vote in Indian elections (General/State).',
    options: [
      { label: 'Yes, I am an Indian Citizen', value: 'yes', icon: '🇮🇳' },
      { label: 'No, I am a foreign national', value: 'no', icon: '🌍' },
    ],
  },
  {
    id: 'age',
    question: 'Are you 18 years or older?',
    desc: 'The voting age in India is 18 years, as per Article 326 of the Constitution.',
    options: [
      { label: 'Yes, I am 18 or above', value: 'yes', icon: '✅' },
      { label: 'No, I am under 18', value: 'no', icon: '🚫' },
    ],
  },
  {
    id: 'resident',
    question: 'Are you ordinarily resident in a constituency?',
    desc: 'You must be a resident of the constituency where you wish to be enrolled as a voter.',
    options: [
      { label: 'Yes, I have a permanent residence', value: 'yes', icon: '🏠' },
      { label: 'No, I am currently homeless / NRI', value: 'no', icon: '🌐' },
    ],
  },
  {
    id: 'unsound',
    question: 'Are you of sound mind?',
    desc: 'A person of unsound mind (declared by a competent court) is disqualified from voting under Section 16 of the Representation of the People Act, 1950.',
    options: [
      { label: 'Yes, I am of sound mind', value: 'yes', icon: '🧠' },
      { label: 'No / Not applicable', value: 'no', icon: '⚠️' },
    ],
  },
  {
    id: 'registered',
    question: 'Is your name on the Electoral Roll?',
    desc: 'Even if eligible, you can only vote if you\'re registered on the electoral roll of your constituency.',
    options: [
      { label: 'Yes, I have checked and confirmed', value: 'yes', icon: '📋' },
      { label: 'No, I haven\'t registered yet', value: 'no', icon: '📝' },
    ],
  },
];

const faqItems = [
  {
    q: 'Can OCI / NRI holders vote in Indian elections?',
    a: 'NRIs (Non-Resident Indians) who are Indian citizens CAN register and vote in their home constituency. However, OCI (Overseas Citizen of India) cardholders who are NOT Indian citizens cannot vote. NRIs need to be physically present in India to vote — postal/online voting is not yet available.',
  },
  {
    q: 'What if I am homeless or a migrant worker?',
    a: 'Migrant workers and homeless individuals can register in the constituency where they currently live, even without a permanent address. You can use a declared place of usual abode as your address.',
  },
  {
    q: 'Can I vote if I have a criminal record?',
    a: 'A person serving a prison sentence of 2 years or more is disqualified from voting. However, once released, their voting rights are typically restored. Those under trial (awaiting conviction) can still vote.',
  },
  {
    q: 'How do I register if I recently turned 18?',
    a: 'You can register using Form 6 on the NVSP portal at any time. The ECI conducts Special Summary Revision (SSR) every year, with January 1st as the qualifying date. You can also use advance registration if you\'ll turn 18 by December 1st of that year.',
  },
  {
    q: 'Can persons with disabilities vote?',
    a: 'Yes! ECI provides comprehensive support for PwD voters including accessible polling stations, ramp facilities, wheelchairs, braille-enabled EVMs, scribes/companions, and priority queuing. All 100% of polling stations are PwD-accessible.',
  },
];

export default function EligibilityPage() {
  const [answers, setAnswers] = useState({});
  const [currentQ, setCurrentQ] = useState(0);
  const [result, setResult] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(null);

  const handleAnswer = (qId, value) => {
    const newAnswers = { ...answers, [qId]: value };
    setAnswers(newAnswers);

    if (value === 'no') {
      // Immediate disqualification for some
      const disqMessages = {
        citizen: { eligible: false, reason: 'Non-citizens cannot vote in Indian elections.', tip: 'OCI/NRI cardholders who are Indian citizens are eligible.' },
        age: { eligible: false, reason: 'You must be at least 18 years old by January 1st of the qualifying year.', tip: 'You can apply for advance registration if you turn 18 before December 1st.' },
        unsound: { eligible: false, reason: 'Persons declared of unsound mind by a competent court are disqualified.', tip: 'Please consult with a legal advisor about your specific situation.' },
      };
      if (disqMessages[qId]) {
        setResult(disqMessages[qId]);
        return;
      }
      if (qId === 'resident') {
        setResult({ eligible: 'partial', reason: 'NRIs who are Indian citizens may still be eligible.', tip: 'NRIs can register in their home constituency. Contact 1950 for guidance.' });
        return;
      }
      if (qId === 'registered') {
        setResult({ eligible: 'register', reason: 'You are eligible but need to register first!', tip: 'Visit voters.eci.gov.in to complete your registration. It takes just 5 minutes.' });
        return;
      }
    }

    if (currentQ < questions.length - 1) {
      setTimeout(() => setCurrentQ(q => q + 1), 300);
    } else {
      // All answered yes
      setResult({ eligible: true, reason: 'Congratulations! You are eligible to vote in Indian elections.', tip: 'Make sure to carry a valid photo ID on polling day!' });
    }
  };

  const reset = () => {
    setAnswers({});
    setCurrentQ(0);
    setResult(null);
  };

  const progress = ((currentQ + (result ? 1 : 0)) / questions.length) * 100;

  return (
    <div className="eligibility-page">
      <div className="elig-hero">
        <div className="orb orb-green" style={{ width: 400, height: 400, top: -100, right: -50 }} />
        <div className="container">
          <div className="elig-hero-inner">
            <span className="badge badge-green">30-Second Check</span>
            <h1 style={{ color: '#fff', marginTop: '0.75rem' }}>
              Am I Eligible <span style={{ color: '#4ade80' }}>to Vote?</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', marginTop: '0.75rem', maxWidth: 520 }}>
              Answer 5 quick questions to instantly find out if you can vote in Indian elections and what steps to take next.
            </p>
          </div>
        </div>
      </div>

      <div className="container elig-body">
        <div className="elig-checker-layout">
          {/* Checker Card */}
          <div className="checker-wrapper">
            {/* Progress */}
            <div className="checker-progress">
              <div className="checker-progress-bar">
                <div className="checker-progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <p className="checker-progress-text">
                {result ? 'Complete!' : `Question ${currentQ + 1} of ${questions.length}`}
              </p>
            </div>

            {!result ? (
              <div className="checker-card glass-card animate-fadeInUp">
                <div className="question-number">Q{currentQ + 1}</div>
                <h2 className="question-text">{questions[currentQ].question}</h2>
                <p className="question-desc">
                  <Info size={13} />
                  {questions[currentQ].desc}
                </p>
                <div className="question-options">
                  {questions[currentQ].options.map((opt, i) => (
                    <button
                      key={i}
                      className={`option-btn ${answers[questions[currentQ].id] === opt.value ? 'selected' : ''}`}
                      onClick={() => handleAnswer(questions[currentQ].id, opt.value)}
                    >
                      <span className="option-icon">{opt.icon}</span>
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>

                {/* Mini timeline */}
                <div className="question-dots">
                  {questions.map((_, i) => (
                    <div key={i} className={`q-dot ${i === currentQ ? 'active' : i < currentQ ? 'done' : ''}`} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="result-card glass-card animate-bounce-in">
                <div className={`result-icon ${result.eligible === true ? 'eligible' : result.eligible === 'register' ? 'register' : 'ineligible'}`}>
                  {result.eligible === true
                    ? <CheckCircle size={48} />
                    : result.eligible === 'register'
                    ? <AlertCircle size={48} />
                    : result.eligible === 'partial'
                    ? <AlertCircle size={48} />
                    : <XCircle size={48} />
                  }
                </div>

                <h2 className={`result-title ${result.eligible === true ? 'eligible' : result.eligible === 'register' || result.eligible === 'partial' ? 'partial' : 'ineligible'}`}>
                  {result.eligible === true ? '🎉 You Can Vote!' :
                   result.eligible === 'register' ? '📋 Almost There!' :
                   result.eligible === 'partial' ? 'ℹ️ Special Case' :
                   '❌ Not Eligible'}
                </h2>

                <p className="result-reason">{result.reason}</p>

                <div className="result-tip">
                  <Info size={14} />
                  <p>{result.tip}</p>
                </div>

                <div className="result-actions">
                  {result.eligible === true && (
                    <Link to="/dashboard" className="btn btn-green">
                      View Your Dashboard <ArrowRight size={14} />
                    </Link>
                  )}
                  {(result.eligible === 'register' || result.eligible === false) && (
                    <a href="https://voters.eci.gov.in" target="_blank" rel="noopener" className="btn btn-primary">
                      Register on NVSP <ArrowRight size={14} />
                    </a>
                  )}
                  <button className="btn btn-outline" onClick={reset}>
                    <RefreshCw size={14} /> Try Again
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Side panel */}
          <div className="elig-side">
            <div className="elig-info-card glass-card">
              <h3>Eligibility Criteria</h3>
              <div className="criteria-list">
                {[
                  { icon: '🇮🇳', label: 'Indian Citizen', desc: 'Article 326, Constitution of India' },
                  { icon: '🎂', label: 'Age 18+', desc: 'As on January 1st of qualifying year' },
                  { icon: '🏠', label: 'Ordinary Resident', desc: 'Of any constituency in India' },
                  { icon: '🧠', label: 'Sound Mind', desc: 'Not declared unsound by court' },
                  { icon: '📋', label: 'Registered', desc: 'Name on electoral roll' },
                ].map((c, i) => (
                  <div key={i} className="criteria-item">
                    <span className="criteria-icon">{c.icon}</span>
                    <div>
                      <p className="criteria-label">{c.label}</p>
                      <p className="criteria-desc">{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="elig-stats glass-card">
              <p className="elig-stat-title">Election by Numbers</p>
              <div className="elig-stat-row"><span>Registered Voters</span><strong>969M+</strong></div>
              <div className="elig-stat-row"><span>Total Booths</span><strong>10.5L+</strong></div>
              <div className="elig-stat-row"><span>First-time Voters (2024)</span><strong>1.82 Cr</strong></div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="elig-faq">
          <div className="section-header">
            <h2>Frequently Asked <span className="gradient-text-blue">Questions</span></h2>
            <div className="tricolor-divider" />
          </div>
          <div className="faq-list">
            {faqItems.map((f, i) => (
              <div key={i} className="faq-item glass-card">
                <button
                  className="faq-question"
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                >
                  <span>{f.q}</span>
                  {expandedFaq === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {expandedFaq === i && (
                  <div className="faq-answer animate-fadeInUp">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
