"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (isLogin) {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError(res.error);
        setLoading(false);
      } else {
        router.push('/dashboard');
      }
    } else {
      try {
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        
        const data = await res.json();
        
        if (res.ok) {
          await signIn('credentials', { redirect: false, email, password });
          router.push('/dashboard');
        } else {
          setError(data.message || 'Something went wrong');
          setLoading(false);
        }
      } catch (err) {
        setError('Server error');
        setLoading(false);
      }
    }
  };

  return (
    <div className="lp-wrapper">
      {/* Ambient glow orbs */}
      <div className="glow-orb" style={{ width: 300, height: 300, top: -80, right: -80, background: 'rgba(255,50,50,0.14)' }} />
      <div className="glow-orb" style={{ width: 250, height: 250, bottom: -60, left: -60, background: 'rgba(0,212,255,0.10)' }} />

      <div className="auth-card glass-panel">
        {/* Logo */}
        <div className="auth-logo">
          FIT<span>ME</span>
        </div>
        <p className="auth-tagline">
          {isLogin ? 'Welcome back. Time to grind.' : 'Join the grind. Every rep counts.'}
        </p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-input-group">
            <label className="auth-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="auth-input"
            />
          </div>
          <div className="auth-input-group">
            <label className="auth-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="auth-input"
            />
            {!isLogin && password.length > 0 && (
              <div className="pw-rules">
                <div className={`pw-rule ${password.length >= 8 ? 'pw-pass' : 'pw-fail'}`}>
                  {password.length >= 8 ? '✓' : '✕'} At least 8 characters
                </div>
                <div className={`pw-rule ${/[A-Z]/.test(password) ? 'pw-pass' : 'pw-fail'}`}>
                  {/[A-Z]/.test(password) ? '✓' : '✕'} At least 1 uppercase letter
                </div>
                <div className={`pw-rule ${/[0-9]/.test(password) ? 'pw-pass' : 'pw-fail'}`}>
                  {/[0-9]/.test(password) ? '✓' : '✕'} At least 1 number
                </div>
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100 auth-submit" disabled={loading}>
            {loading ? 'Loading...' : isLogin ? '🔥 LOG IN' : '🚀 CREATE ACCOUNT'}
          </button>
        </form>

        <div className="auth-divider">
          <span />
          <p>{isLogin ? "New here?" : "Already training?"}</p>
          <span />
        </div>

        <button
          className="auth-toggle-btn"
          onClick={() => { setIsLogin(!isLogin); setError(''); }}
        >
          {isLogin ? 'Create a free account →' : '← Back to login'}
        </button>
      </div>

      <style jsx>{`
        .lp-wrapper {
          width: 100%;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 24px;
          position: relative;
          overflow: hidden;
        }

        .auth-card {
          width: 100%;
          max-width: 400px;
          padding: 36px 28px;
          z-index: 10;
          display: flex;
          flex-direction: column;
          gap: 0;
          border: 1px solid rgba(255, 85, 0, 0.12);
        }

        .auth-logo {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 44px;
          font-weight: 900;
          text-transform: uppercase;
          text-align: center;
          color: var(--text-primary);
          letter-spacing: 2px;
          margin-bottom: 6px;
        }
        .auth-logo span {
          color: var(--accent-strength);
        }

        .auth-tagline {
          text-align: center;
          color: var(--text-secondary);
          font-size: 14px;
          margin-bottom: 28px;
        }

        .auth-error {
          background: rgba(255, 50, 50, 0.10);
          border: 1px solid rgba(255, 50, 50, 0.30);
          color: var(--accent-strength);
          padding: 12px 14px;
          border-radius: 10px;
          margin-bottom: 18px;
          font-size: 13px;
          text-align: center;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-bottom: 24px;
        }

        .auth-input-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .auth-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: var(--text-muted);
          font-weight: 700;
        }

        .auth-input {
          background: var(--surface-3) !important;
          border: 1px solid var(--border-medium) !important;
          color: var(--text-primary) !important;
          padding: 14px !important;
          border-radius: 10px !important;
          font-size: 15px !important;
        }

        .auth-submit {
          height: 54px;
          font-size: 15px;
          letter-spacing: 2px;
          border-radius: 12px;
          margin-top: 6px;
        }

        .auth-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        .auth-divider span {
          flex: 1;
          height: 1px;
          background: var(--border-subtle);
        }
        .auth-divider p {
          font-size: 12px;
          color: var(--text-muted);
          white-space: nowrap;
        }

        .auth-toggle-btn {
          background: transparent;
          border: 1px solid var(--border-medium);
          color: var(--accent-action);
          padding: 13px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          width: 100%;
          transition: all 0.2s;
          font-family: 'Outfit', sans-serif;
        }
        .auth-toggle-btn:hover {
          background: rgba(255, 85, 0, 0.08);
          border-color: rgba(255, 85, 0, 0.3);
        }

        /* Password Rules */
        .pw-rules {
          display: flex;
          flex-direction: column;
          gap: 5px;
          margin-top: 8px;
          padding: 10px 12px;
          background: rgba(255,255,255,0.03);
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.06);
        }
        .pw-rule {
          font-size: 12px;
          font-weight: 600;
          transition: color 0.2s;
        }
        .pw-pass { color: #2EFF6A; }
        .pw-fail { color: #7A8290; }
      `}</style>
    </div>
  );
}
