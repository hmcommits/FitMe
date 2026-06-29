"use client";

import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="landing-container">
      <div className="hero">
        <h1 className="hero-title">
          DOMINATE YOUR <br />
          <span className="accent-gradient">WORKOUT</span>
        </h1>
        <p className="hero-subtitle">
          The premium, mobile-first fitness tracker for those who take their gains seriously.
        </p>
        
        <div className="cta-group mt-20">
          <Link href="/login">
            <button className="btn btn-primary w-100" style={{ padding: '18px', fontSize: '18px' }}>
              GET STARTED
            </button>
          </Link>
          <Link href="/login?mode=login">
            <button className="btn w-100 mt-10" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)' }}>
              LOG IN
            </button>
          </Link>
        </div>
      </div>

      <div className="features mt-20">
        <div className="glass-panel feature-card">
          <h3 style={{ color: '#00e5ff' }}>Tracking</h3>
          <p>Seamlessly log Strength, Cardio, and Home Workouts with a single tap.</p>
        </div>
        <div className="glass-panel feature-card mt-10">
          <h3 style={{ color: '#ff2a2a' }}>Analytics</h3>
          <p>Visualize your progress with Level 1, 2, and 3 volume drill-downs.</p>
        </div>
        <div className="glass-panel feature-card mt-10">
          <h3 style={{ color: '#39ff14' }}>Consistency</h3>
          <p>Keep your streak alive with the visual Calendar heatmaps.</p>
        </div>
      </div>

      <style jsx>{`
        .landing-container {
          width: 100%;
          min-height: 100vh;
          padding: 40px 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: radial-gradient(circle at top right, rgba(255,42,42,0.1), transparent 50%),
                      radial-gradient(circle at bottom left, rgba(0,229,255,0.1), transparent 50%);
        }
        
        .hero {
          text-align: center;
          margin-bottom: 40px;
        }

        .hero-title {
          font-size: 42px;
          line-height: 1.1;
          margin-bottom: 15px;
          color: var(--text-primary);
        }

        .accent-gradient {
          background: linear-gradient(135deg, var(--accent-action), #ff2a2a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-subtitle {
          font-size: 16px;
          color: var(--text-secondary);
          max-width: 300px;
          margin: 0 auto;
        }

        .cta-group {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .feature-card {
          padding: 20px;
          text-align: left;
        }
        
        .feature-card h3 {
          margin-bottom: 5px;
          font-size: 20px;
        }

        .feature-card p {
          color: var(--text-secondary);
          font-size: 14px;
          line-height: 1.4;
        }
      `}</style>
    </div>
  );
}
