import './globals.css';
import AuthProvider from '../components/AuthProvider';

export const metadata = {
  title: 'FitMe - Dominate Your Workout',
  description: 'Premium mobile-first workout tracker and analytics',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#080A0D',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* PWA */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="FitMe" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body>
        <main className="mobile-container">
          <AuthProvider>
            {children}
          </AuthProvider>
        </main>
      </body>
    </html>
  );
}
