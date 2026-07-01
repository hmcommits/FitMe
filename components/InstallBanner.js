"use client";

import { useState, useEffect } from 'react';

export default function InstallBanner() {
  const [show, setShow] = useState(false);
  const [os, setOs] = useState(null); // 'ios' | 'android' | null
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [step, setStep] = useState(0); // for iOS multi-step guide

  useEffect(() => {
    // Don't show if already dismissed or installed
    const dismissed = localStorage.getItem('fitme_install_dismissed');
    if (dismissed) return;

    // Detect if already running as standalone (installed)
    const isStandalone =
      window.navigator.standalone === true || // iOS Safari
      window.matchMedia('(display-mode: standalone)').matches; // Android
    if (isStandalone) return;

    // Detect OS
    const ua = navigator.userAgent;
    const isIOS = /iphone|ipad|ipod/i.test(ua);
    const isAndroid = /android/i.test(ua);

    if (!isIOS && !isAndroid) return; // Only show on mobile

    if (isIOS) {
      setOs('ios');
      setShow(true);
    }

    // Android: listen for browser's native install prompt
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setOs('android');
      setShow(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('fitme_install_dismissed', '1');
    setShow(false);
  };

  const handleAndroidInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      localStorage.setItem('fitme_install_dismissed', '1');
    }
    setShow(false);
  };

  if (!show) return null;

  const iosSteps = [
    { icon: '↑', label: 'Tap the Share button in Safari' },
    { icon: '＋', label: 'Tap "Add to Home Screen"' },
    { icon: '✓', label: 'Tap "Add" — you\'re done!' },
  ];

  return (
    <div className="install-banner">
      <button className="install-dismiss" onClick={handleDismiss} aria-label="Dismiss">✕</button>

      <div className="install-icon">
        <img src="/icons/icon-192.png" alt="FitMe icon" />
      </div>

      <div className="install-body">
        <p className="install-title">Add FitMe to your Home Screen</p>
        <p className="install-sub">Use it like a real app — no browser bar, instant launch.</p>

        {os === 'android' && (
          <button className="install-cta-btn" onClick={handleAndroidInstall}>
            📲 Install App
          </button>
        )}

        {os === 'ios' && (
          <>
            <div className="install-steps">
              {iosSteps.map((s, i) => (
                <div
                  key={i}
                  className={`install-step ${step === i ? 'install-step-active' : ''}`}
                  onClick={() => setStep(i)}
                >
                  <div className="install-step-icon">{s.icon}</div>
                  <div className="install-step-label">{s.label}</div>
                </div>
              ))}
            </div>
            <p className="install-ios-note">⚠️ Must use Safari — not Chrome or Firefox</p>
          </>
        )}
      </div>

      <style jsx>{`
        .install-banner {
          position: fixed;
          bottom: 90px; /* above bottom nav */
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 32px);
          max-width: 448px;
          background: linear-gradient(135deg, #191C24 0%, #111318 100%);
          border: 1px solid rgba(255, 85, 0, 0.30);
          border-radius: 18px;
          padding: 16px;
          z-index: 200;
          display: flex;
          gap: 14px;
          align-items: flex-start;
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.7), 0 0 30px rgba(255, 85, 0, 0.10);
          animation: slideUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes slideUp {
          from { transform: translateX(-50%) translateY(30px); opacity: 0; }
          to   { transform: translateX(-50%) translateY(0);   opacity: 1; }
        }

        .install-dismiss {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(255,255,255,0.06);
          border: none;
          color: #7A8290;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          font-size: 11px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }
        .install-dismiss:hover { background: rgba(255,255,255,0.12); }

        .install-icon {
          flex-shrink: 0;
          width: 52px;
          height: 52px;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid rgba(255,85,0,0.25);
        }
        .install-icon img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .install-body {
          flex: 1;
          padding-right: 20px;
        }

        .install-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 18px;
          font-weight: 800;
          text-transform: uppercase;
          color: #F0F2F5;
          margin-bottom: 3px;
        }

        .install-sub {
          font-size: 12px;
          color: #7A8290;
          margin-bottom: 12px;
          line-height: 1.4;
        }

        /* Android */
        .install-cta-btn {
          background: linear-gradient(135deg, #FF5500, #FF3232);
          color: #fff;
          border: none;
          padding: 10px 20px;
          border-radius: 100px;
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.5px;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(255, 85, 0, 0.35);
          transition: all 0.2s;
        }
        .install-cta-btn:hover {
          box-shadow: 0 6px 24px rgba(255, 85, 0, 0.55);
          transform: translateY(-1px);
        }

        /* iOS Steps */
        .install-steps {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 8px;
        }

        .install-step {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 10px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.02);
          cursor: pointer;
          transition: all 0.2s;
        }
        .install-step:hover {
          background: rgba(255, 85, 0, 0.06);
          border-color: rgba(255,85,0,0.2);
        }
        .install-step-active {
          background: rgba(255, 85, 0, 0.10);
          border-color: rgba(255, 85, 0, 0.35);
        }

        .install-step-icon {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: rgba(255, 85, 0, 0.15);
          color: #FF5500;
          font-size: 14px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .install-step-active .install-step-icon {
          background: #FF5500;
          color: #fff;
        }

        .install-step-label {
          font-size: 12px;
          color: #F0F2F5;
          font-weight: 500;
          line-height: 1.3;
        }

        .install-ios-note {
          font-size: 11px;
          color: #7A8290;
          font-style: italic;
        }
      `}</style>
    </div>
  );
}
