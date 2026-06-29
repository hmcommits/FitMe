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
          // Auto login after signup
          await signIn('credentials', {
            redirect: false,
            email,
            password,
          });
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
    <div className="login-container">
      <div className="glow-orb" style={{ top: '-50px', right: '-50px', background: 'rgba(255,42,42,0.15)' }}></div>
      <div className="glow-orb" style={{ bottom: '-50px', left: '-50px', background: 'rgba(0,229,255,0.15)' }}></div>

      <div className="login-card glass-panel">
        <h2 className="title">FIT<span style={{color: '#ff2a2a'}}>ME</span></h2>
        <p className="subtitle">{isLogin ? 'Welcome back.' : 'Create your account.'}</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              placeholder="you@example.com"
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-20" disabled={loading}>
            {loading ? 'Processing...' : isLogin ? 'LOG IN' : 'SIGN UP'}
          </button>
        </form>

        <p className="toggle-text mt-20">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span className="toggle-link" onClick={() => { setIsLogin(!isLogin); setError(''); }}>
            {isLogin ? 'Sign up' : 'Log in'}
          </span>
        </p>
      </div>

      <style jsx>{`
        .login-container {
          width: 100%;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          position: relative;
          overflow: hidden;
        }

        .glow-orb {
          position: absolute;
          width: 250px;
          height: 250px;
          border-radius: 50%;
          filter: blur(80px);
          z-index: 0;
        }

        .login-card {
          width: 100%;
          max-width: 380px;
          padding: 40px 30px;
          z-index: 10;
          text-align: center;
        }

        .title {
          font-size: 32px;
          font-weight: 900;
          margin-bottom: 5px;
        }

        .subtitle {
          color: var(--text-secondary);
          margin-bottom: 30px;
        }

        .error-message {
          background: rgba(255, 42, 42, 0.1);
          border: 1px solid rgba(255, 42, 42, 0.3);
          color: #ff2a2a;
          padding: 10px;
          border-radius: 8px;
          margin-bottom: 20px;
          font-size: 14px;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
          text-align: left;
        }

        .input-group label {
          font-size: 12px;
          text-transform: uppercase;
          color: var(--text-secondary);
          font-weight: 700;
          display: block;
          margin-bottom: 5px;
        }

        .input-group input {
          width: 100%;
          padding: 14px;
          border-radius: 8px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          font-size: 16px;
        }

        .input-group input:focus {
          border-color: var(--accent-action);
          outline: none;
        }

        .toggle-text {
          font-size: 14px;
          color: var(--text-secondary);
        }

        .toggle-link {
          color: var(--accent-action);
          cursor: pointer;
          font-weight: bold;
        }
        
        .toggle-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
