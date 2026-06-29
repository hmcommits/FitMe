"use client";

import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="landing-container">
      {/* Background Graphic Elements */}
      <div className="glow-orb top-right"></div>
      <div className="glow-orb bottom-left"></div>

      <nav className="landing-nav">
        <h2 className="logo">FIT<span style={{color: '#ff2a2a'}}>ME</span></h2>
        <Link href="/login" className="login-link">Log In</Link>
      </nav>

      <main className="main-content">
        <div className="hero">
          <div className="badge">🚀 The Ultimate Fitness Tracker</div>
          <h1 className="hero-title">
            ENGINEER YOUR <br />
            <span className="accent-gradient">PHYSIQUE</span>
          </h1>
          <p className="hero-subtitle">
            Stop guessing your progress. FitMe gives you precision analytics, streak tracking, and intelligent workout logging so you know exactly what to lift today.
          </p>
          
          <div className="cta-group">
            <Link href="/login" style={{textDecoration: 'none'}}>
              <button className="btn btn-primary cta-btn">
                START TRACKING FOR FREE
              </button>
            </Link>
          </div>
        </div>

        {/* CSS Art: Mock Progress Dashboard to look attractive */}
        <div className="progress-showcase glass-panel mt-20">
          <div className="showcase-header">
            <span style={{fontSize: '14px', fontWeight: 'bold'}}>Chest Volume Trend</span>
            <span className="delta-badge">▲ +12.5%</span>
          </div>
          
          <div className="mock-chart mt-20">
            <div className="mock-bar" style={{height: '30%', backgroundColor: 'rgba(0, 229, 255, 0.4)'}}></div>
            <div className="mock-bar" style={{height: '45%', backgroundColor: 'rgba(0, 229, 255, 0.6)'}}></div>
            <div className="mock-bar" style={{height: '70%', backgroundColor: 'rgba(0, 229, 255, 0.8)'}}></div>
            <div className="mock-bar" style={{height: '100%', backgroundColor: '#00e5ff', boxShadow: '0 0 15px rgba(0,229,255,0.5)'}}></div>
          </div>
          <p style={{fontSize: '11px', color: 'var(--text-secondary)', textAlign: 'center', marginTop: '10px'}}>Actual app analytics visualization</p>
        </div>

        <div className="features mt-20">
          <h3 className="section-title">Why FitMe Works</h3>
          
          <div className="glass-panel feature-card">
            <div className="feature-icon">🏋️‍♂️</div>
            <div className="feature-text">
              <h4 style={{ color: '#ff2a2a' }}>Frictionless Logging</h4>
              <p>Log Strength, Cardio, and Home Workouts in seconds. History-aware dropdowns remember your exact exercises.</p>
            </div>
          </div>

          <div className="glass-panel feature-card mt-10">
            <div className="feature-icon">📈</div>
            <div className="feature-text">
              <h4 style={{ color: '#00e5ff' }}>Deep Analytics</h4>
              <p>Drill down from Weekly Muscle Volume all the way to individual exercise trends (Weight, Reps, Workload).</p>
            </div>
          </div>

          <div className="glass-panel feature-card mt-10">
            <div className="feature-icon">🔥</div>
            <div className="feature-text">
              <h4 style={{ color: '#39ff14' }}>Streak Calendar</h4>
              <p>A visual heatmap calendar proves your consistency. Missed days are gray, active days glow with the muscles you trained.</p>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .landing-container {
          width: 100%;
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .glow-orb {
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          filter: blur(100px);
          z-index: 0;
        }
        .top-right {
          top: -100px;
          right: -100px;
          background: rgba(255, 42, 42, 0.15);
        }
        .bottom-left {
          bottom: 100px;
          left: -100px;
          background: rgba(0, 229, 255, 0.15);
        }

        .landing-nav {
          width: 100%;
          max-width: 480px;
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 10;
        }
        .logo {
          font-weight: 900;
          font-size: 24px;
          letter-spacing: -1px;
        }
        .login-link {
          color: var(--text-primary);
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
        }

        .main-content {
          width: 100%;
          max-width: 480px;
          padding: 0 20px 60px 20px;
          z-index: 10;
          display: flex;
          flex-direction: column;
        }
        
        .hero {
          text-align: center;
          margin-top: 20px;
          margin-bottom: 30px;
        }

        .badge {
          display: inline-block;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          margin-bottom: 20px;
          color: var(--text-secondary);
        }

        .hero-title {
          font-size: 46px;
          line-height: 1.05;
          margin-bottom: 15px;
          color: var(--text-primary);
          text-transform: uppercase;
        }

        .accent-gradient {
          background: linear-gradient(135deg, #ff2a2a, var(--accent-action));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-subtitle {
          font-size: 16px;
          color: var(--text-secondary);
          margin: 0 auto 25px auto;
          line-height: 1.5;
        }

        .cta-btn {
          width: 100%;
          padding: 18px;
          font-size: 16px;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(255, 42, 42, 0.3);
        }

        .progress-showcase {
          padding: 20px;
          border-radius: 16px;
          background: linear-gradient(180deg, rgba(26, 29, 36, 0.8) 0%, rgba(26, 29, 36, 0.4) 100%);
          border: 1px solid rgba(0, 229, 255, 0.2);
        }

        .showcase-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .delta-badge {
          background: rgba(57, 255, 20, 0.1);
          color: #39ff14;
          padding: 4px 8px;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 700;
        }

        .mock-chart {
          display: flex;
          align-items: flex-end;
          justify-content: space-around;
          height: 100px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          padding-bottom: 5px;
        }

        .mock-bar {
          width: 30px;
          border-radius: 4px 4px 0 0;
        }

        .section-title {
          font-size: 14px;
          color: var(--text-secondary);
          text-transform: uppercase;
          text-align: center;
          margin-bottom: 15px;
          letter-spacing: 2px;
        }

        .feature-card {
          display: flex;
          align-items: flex-start;
          gap: 15px;
          padding: 15px;
          border-radius: 12px;
        }
        
        .feature-icon {
          font-size: 28px;
          background: rgba(255,255,255,0.05);
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
        }

        .feature-text h4 {
          margin: 0 0 5px 0;
          font-size: 16px;
        }

        .feature-text p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 13px;
          line-height: 1.4;
        }
      `}</style>
    </div>
  );
}
