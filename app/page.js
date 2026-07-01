"use client";

import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="lp-root">
      {/* Ambient background orbs */}
      <div className="glow-orb" style={{ width: 380, height: 380, top: -120, right: -120, background: 'rgba(255,50,50,0.12)' }} />
      <div className="glow-orb" style={{ width: 300, height: 300, bottom: 80, left: -100, background: 'rgba(0,212,255,0.10)' }} />
      <div className="glow-orb" style={{ width: 200, height: 200, top: '40%', left: '30%', background: 'rgba(255,85,0,0.06)' }} />

      {/* ─── NAV ─── */}
      <nav className="lp-nav">
        <span className="lp-logo">FIT<span className="lp-logo-accent">ME</span></span>
        <Link href="/login" className="lp-login-link">Log In →</Link>
      </nav>

      {/* ─── HERO ─── */}
      <section className="lp-hero">
        <div className="lp-badge">🔥 The Ultimate Fitness Tracker</div>

        <h1 className="lp-headline">
          STOP<br />
          GUESSING.<br />
          <span className="lp-headline-accent">START DOMINATING.</span>
        </h1>

        <p className="lp-subtext">
          Log every rep, every set, every drop of sweat. FitMe turns raw effort into precision analytics so you know exactly how hard to push tomorrow.
        </p>

        <Link href="/login" style={{ textDecoration: 'none', width: '100%' }}>
          <button className="lp-cta-btn btn btn-primary w-100">
            START TRAINING FOR FREE
          </button>
        </Link>

        <p className="lp-cta-sub">No credit card. No excuses.</p>
      </section>

      {/* ─── MOCK DASHBOARD PREVIEW ─── */}
      <section className="lp-preview-card glass-panel">
        <div className="lp-preview-header">
          <div>
            <div className="section-label">Chest Volume Trend</div>
            <div className="lp-preview-title">This Week</div>
          </div>
          <span className="lp-delta-badge">▲ +18.3%</span>
        </div>

        <div className="lp-mock-chart">
          {[28, 42, 38, 65, 55, 82, 100].map((h, i) => (
            <div key={i} className="lp-mock-bar-wrap">
              <div
                className="lp-mock-bar"
                style={{
                  height: `${h}%`,
                  opacity: i === 6 ? 1 : 0.4 + i * 0.08,
                  animationDelay: `${i * 0.08}s`,
                }}
              />
            </div>
          ))}
        </div>

        <div className="lp-preview-labels">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
            <span key={d} className="lp-preview-label">{d}</span>
          ))}
        </div>
      </section>

      {/* ─── STATS ROW ─── */}
      <div className="lp-stats-row">
        <div className="lp-stat glass-panel">
          <span className="lp-stat-num">3</span>
          <span className="lp-stat-label">Workout Types</span>
        </div>
        <div className="lp-stat glass-panel">
          <span className="lp-stat-num">∞</span>
          <span className="lp-stat-label">Muscle Groups</span>
        </div>
        <div className="lp-stat glass-panel">
          <span className="lp-stat-num">100%</span>
          <span className="lp-stat-label">Your Data</span>
        </div>
      </div>

      {/* ─── FEATURE CARDS ─── */}
      <section className="lp-features">
        <h2 className="lp-features-title">Why FitMe Works</h2>

        <div className="lp-feature-card glass-panel" style={{ '--card-accent': '#FF3232' }}>
          <div className="lp-feature-icon">🏋️</div>
          <div className="lp-feature-text">
            <h3 className="lp-feature-heading" style={{ color: '#FF3232' }}>Zero-Friction Logging</h3>
            <p>Strength, Cardio & Home Workouts logged in seconds. Smart dropdowns remember every exercise you've ever done.</p>
          </div>
        </div>

        <div className="lp-feature-card glass-panel" style={{ '--card-accent': '#00D4FF' }}>
          <div className="lp-feature-icon">📈</div>
          <div className="lp-feature-text">
            <h3 className="lp-feature-heading" style={{ color: '#00D4FF' }}>Deep Analytics</h3>
            <p>Drill from Weekly Volume → Muscle Group → Individual exercise trends. Weight, Reps, Volume — all charted.</p>
          </div>
        </div>

        <div className="lp-feature-card glass-panel" style={{ '--card-accent': '#2EFF6A' }}>
          <div className="lp-feature-icon">📆</div>
          <div className="lp-feature-text">
            <h3 className="lp-feature-heading" style={{ color: '#2EFF6A' }}>Streak Calendar</h3>
            <p>A heatmap calendar proves your consistency. Every trained muscle glows in its own colour. Miss nothing.</p>
          </div>
        </div>

        <div className="lp-feature-card glass-panel" style={{ '--card-accent': '#FF5500' }}>
          <div className="lp-feature-icon">⚖️</div>
          <div className="lp-feature-text">
            <h3 className="lp-feature-heading" style={{ color: '#FF5500' }}>kg + lbs Normalised</h3>
            <p>Log weights in kg or lbs per set. Analytics auto-convert everything so your volume graphs are always accurate.</p>
          </div>
        </div>
      </section>

      {/* ─── BOTTOM CTA ─── */}
      <section className="lp-bottom-cta">
        <h2 className="lp-bottom-heading">YOUR BODY.<br />YOUR DATA.<br /><span className="lp-headline-accent">YOUR PROOF.</span></h2>
        <Link href="/login" style={{ textDecoration: 'none', width: '100%' }}>
          <button className="lp-cta-btn btn btn-primary w-100">
            BEGIN YOUR JOURNEY
          </button>
        </Link>
      </section>

      <style jsx>{`
        .lp-root {
          width: 100%;
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 0 60px 0;
          z-index: 1;
        }

        /* NAV */
        .lp-nav {
          width: 100%;
          max-width: 480px;
          padding: 20px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 10;
        }
        .lp-logo {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900;
          font-size: 28px;
          letter-spacing: 1px;
          color: var(--text-primary);
          text-transform: uppercase;
        }
        .lp-logo-accent { color: var(--accent-strength); }
        .lp-login-link {
          color: var(--text-secondary);
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          transition: color 0.2s;
        }
        .lp-login-link:hover { color: var(--text-primary); }

        /* HERO */
        .lp-hero {
          width: 100%;
          max-width: 480px;
          padding: 10px 24px 30px;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 16px;
        }
        .lp-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 85, 0, 0.12);
          border: 1px solid rgba(255, 85, 0, 0.25);
          padding: 6px 14px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 700;
          color: var(--accent-action);
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .lp-headline {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 64px;
          font-weight: 900;
          text-transform: uppercase;
          color: var(--text-primary);
          line-height: 0.95;
        }
        .lp-headline-accent {
          background: linear-gradient(135deg, var(--accent-action) 0%, var(--accent-strength) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .lp-subtext {
          font-size: 15px;
          color: var(--text-secondary);
          line-height: 1.6;
          max-width: 340px;
        }
        .lp-cta-btn {
          height: 58px;
          font-size: 15px;
          border-radius: 14px;
          letter-spacing: 2px;
          animation: pulse-glow 3s ease-in-out infinite;
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 6px 24px var(--glow-action); }
          50% { box-shadow: 0 6px 40px rgba(255, 85, 0, 0.55); }
        }
        .lp-cta-sub {
          font-size: 12px;
          color: var(--text-muted);
          margin-top: -6px;
        }

        /* PREVIEW CARD */
        .lp-preview-card {
          width: calc(100% - 48px);
          max-width: 432px;
          padding: 20px;
          z-index: 10;
          border: 1px solid rgba(255, 85, 0, 0.15);
          margin-bottom: 20px;
        }
        .lp-preview-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
        }
        .lp-preview-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 22px;
          font-weight: 800;
          text-transform: uppercase;
          color: var(--text-primary);
          margin-top: 2px;
        }
        .lp-delta-badge {
          background: rgba(46, 255, 106, 0.12);
          color: var(--accent-home);
          border: 1px solid rgba(46, 255, 106, 0.25);
          padding: 5px 10px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 700;
        }
        .lp-mock-chart {
          display: flex;
          align-items: flex-end;
          gap: 6px;
          height: 90px;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--border-subtle);
        }
        .lp-mock-bar-wrap {
          flex: 1;
          display: flex;
          align-items: flex-end;
          height: 100%;
        }
        .lp-mock-bar {
          width: 100%;
          border-radius: 4px 4px 0 0;
          background: linear-gradient(180deg, var(--accent-action) 0%, var(--accent-strength) 100%);
          animation: bar-grow 0.6s ease-out both;
        }
        @keyframes bar-grow {
          from { height: 0 !important; opacity: 0; }
        }
        .lp-preview-labels {
          display: flex;
          gap: 6px;
          margin-top: 8px;
        }
        .lp-preview-label {
          flex: 1;
          text-align: center;
          font-size: 10px;
          color: var(--text-muted);
          font-weight: 600;
        }

        /* STATS */
        .lp-stats-row {
          display: flex;
          gap: 10px;
          width: calc(100% - 48px);
          max-width: 432px;
          margin-bottom: 30px;
          z-index: 10;
        }
        .lp-stat {
          flex: 1;
          padding: 16px 10px;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .lp-stat-num {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 28px;
          font-weight: 900;
          color: var(--accent-action);
          line-height: 1;
        }
        .lp-stat-label {
          font-size: 10px;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 600;
        }

        /* FEATURES */
        .lp-features {
          width: calc(100% - 48px);
          max-width: 432px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          z-index: 10;
          margin-bottom: 40px;
        }
        .lp-features-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 3px;
          text-align: center;
          margin-bottom: 4px;
        }
        .lp-feature-card {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 18px;
          border-left: 3px solid var(--card-accent, var(--accent-action));
          transition: transform 0.2s, border-color 0.2s;
        }
        .lp-feature-card:hover {
          transform: translateX(3px);
        }
        .lp-feature-icon {
          font-size: 26px;
          flex-shrink: 0;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.04);
          border-radius: 10px;
        }
        .lp-feature-heading {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 20px;
          font-weight: 800;
          margin-bottom: 5px;
          text-transform: uppercase;
        }
        .lp-feature-text p {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        /* BOTTOM CTA */
        .lp-bottom-cta {
          width: calc(100% - 48px);
          max-width: 432px;
          text-align: center;
          z-index: 10;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .lp-bottom-heading {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 52px;
          font-weight: 900;
          text-transform: uppercase;
          color: var(--text-primary);
          line-height: 0.95;
        }
      `}</style>
    </div>
  );
}
