import './globals.css';

export const metadata = {
  title: 'FitMe - Dominate Your Workout',
  description: 'Premium mobile-first workout tracker and analytics',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0',
  themeColor: '#0d0f12',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body>
        <main className="mobile-container">
          {children}
        </main>
      </body>
    </html>
  );
}
