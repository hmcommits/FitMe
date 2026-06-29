"use client";

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import GlobalHeader from '../../components/GlobalHeader';
import StrengthLogger from '../../components/StrengthLogger';
import CardioLogger from '../../components/CardioLogger';
import CalendarView from '../../components/CalendarView';
import InsightsDashboard from '../../components/InsightsDashboard';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [day, setDay] = useState('');
  const [weight, setWeight] = useState('');
  
  const [mainTab, setMainTab] = useState('logger'); // 'logger', 'calendar', 'insights'
  const [activeTab, setActiveTab] = useState('strength');

  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }

  if (status === 'loading') {
    return <div style={{width:'100%', height:'100vh', display:'flex', justifyContent:'center', alignItems:'center'}}>Loading...</div>;
  }

  const handleCalendarSelect = (selectedDate) => {
    setDate(selectedDate);
    // Auto-calculate day
    const dateObj = new Date(selectedDate);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    if (!isNaN(dateObj.getDay())) {
      setDay(days[dateObj.getDay()]);
    }
    setMainTab('logger'); // Jump to the logger to view/edit this day
  };

  return (
    <div style={{ width: '100%', paddingBottom: '80px' }}>
      <GlobalHeader 
        date={date} setDate={setDate} 
        day={day} setDay={setDay} 
        weight={weight} setWeight={setWeight} 
      />

      {mainTab === 'logger' && (
        <>
          <nav className="tab-navigation">
            <button 
              className={`tab-btn tab-strength ${activeTab === 'strength' ? 'active' : ''}`}
              onClick={() => setActiveTab('strength')}
            >
              Strength
            </button>
            <button 
              className={`tab-btn tab-cardio ${activeTab === 'cardio' ? 'active' : ''}`}
              onClick={() => setActiveTab('cardio')}
            >
              Cardio
            </button>
            <button 
              className={`tab-btn tab-home ${activeTab === 'home_workout' ? 'active' : ''}`}
              onClick={() => setActiveTab('home_workout')}
            >
              Home Workout
            </button>
          </nav>

          <div className="tab-content" style={{ padding: '0 20px', paddingBottom: '40px' }}>
            {activeTab === 'strength' && <StrengthLogger isHomeWorkout={false} />}
            {activeTab === 'home_workout' && <StrengthLogger isHomeWorkout={true} />}
            {activeTab === 'cardio' && <CardioLogger />}
          </div>
        </>
      )}

      {mainTab === 'calendar' && (
        <div style={{ padding: '0 20px' }}>
          <CalendarView onSelectDate={handleCalendarSelect} />
        </div>
      )}

      {mainTab === 'insights' && (
        <div style={{ padding: '0 20px' }}>
          <InsightsDashboard />
        </div>
      )}

      {/* Fixed Bottom App Navigation */}
      <nav className="app-bottom-nav">
        <button className={mainTab === 'logger' ? 'active' : ''} onClick={() => setMainTab('logger')}>📝 Log</button>
        <button className={mainTab === 'calendar' ? 'active' : ''} onClick={() => setMainTab('calendar')}>📅 Calendar</button>
        <button className={mainTab === 'insights' ? 'active' : ''} onClick={() => setMainTab('insights')}>📈 Insights</button>
      </nav>

      <style jsx>{`
        .tab-navigation {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-bottom: 20px;
          padding: 0 20px;
        }
        .tab-btn {
          flex: 1;
          padding: 10px 0;
          border-radius: 20px;
          background: transparent;
          font-weight: 700;
          font-size: 14px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s;
          color: var(--text-secondary);
        }
        
        .tab-strength { border: 2px solid var(--accent-strength); }
        .tab-strength.active { background: var(--accent-strength); color: #fff; }
        
        .tab-cardio { border: 2px solid var(--accent-cardio); }
        .tab-cardio.active { background: var(--accent-cardio); color: #000; }
        
        .tab-home { border: 2px solid var(--accent-home); }
        .tab-home.active { background: var(--accent-home); color: #000; }

        .app-bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          max-width: 480px; /* match container */
          left: 50%;
          transform: translateX(-50%);
          background: var(--surface-color);
          display: flex;
          justify-content: space-around;
          padding: 15px 0;
          border-top: 1px solid rgba(255,255,255,0.1);
          z-index: 100;
        }

        .app-bottom-nav button {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: color var(--transition-speed);
        }

        .app-bottom-nav button.active {
          color: var(--accent-action);
        }
      `}</style>
    </div>
  );
}
