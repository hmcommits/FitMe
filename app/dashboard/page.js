"use client";

import { useState, useEffect, useMemo } from 'react';
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
  const [workouts, setWorkouts] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    async function fetchWorkouts() {
      if (status !== 'authenticated') return;
      try {
        const res = await fetch('/api/workouts');
        const data = await res.json();
        if (data.workouts) setWorkouts(data.workouts);
      } catch (err) {
        console.error(err);
      } finally {
        setDataLoading(false);
      }
    }
    fetchWorkouts();
  }, [status]);

  // Sync header bodyWeight when date or workouts change
  useEffect(() => {
    if (!workouts || workouts.length === 0) return;
    const existing = workouts.find(w => new Date(w.date).toISOString().split('T')[0] === date);
    if (existing && existing.bodyWeight !== null && existing.bodyWeight !== undefined) {
      setWeight(existing.bodyWeight.toString());
    } else {
      setWeight('');
    }
  }, [date, workouts]);

  const loggedDates = useMemo(() => {
    const dates = {};
    workouts.forEach(w => {
      const d = new Date(w.date).toISOString().split('T')[0];
      const muscles = new Set(dates[d] || []);
      w.exercises?.forEach(ex => {
        if (ex.muscleGroup) muscles.add(ex.muscleGroup);
      });
      if (w.workoutType === 'cardio') muscles.add('Cardio');
      dates[d] = Array.from(muscles);
    });
    return dates;
  }, [workouts]);

  const existingWorkoutForTab = useMemo(() => {
    return workouts.find(w => new Date(w.date).toISOString().split('T')[0] === date && w.workoutType === activeTab);
  }, [workouts, date, activeTab]);

  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }

  if (status === 'loading' || dataLoading) {
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
    
    // Auto-switch tab based on existing workout
    const existing = workouts.find(w => new Date(w.date).toISOString().split('T')[0] === selectedDate);
    if (existing) {
       setActiveTab(existing.workoutType);
       if (existing.bodyWeight) setWeight(existing.bodyWeight.toString());
    }
    
    setMainTab('logger'); // Jump to the logger to view/edit this day
  };

  return (
    <div style={{ width: '100%', paddingBottom: '90px' }}>
      <GlobalHeader 
        date={date} setDate={setDate} 
        day={day} setDay={setDay} 
        weight={weight} setWeight={setWeight} 
      />

      {mainTab === 'logger' && (
        <>
          <nav className="workout-tab-nav">
            <button 
              className={`workout-tab-btn wtb-strength ${activeTab === 'strength' ? 'wtb-active-strength' : ''}`}
              onClick={() => setActiveTab('strength')}
            >
              <span className="wtb-icon">🏋️</span>
              <span className="wtb-label">Strength</span>
            </button>
            <button 
              className={`workout-tab-btn wtb-cardio ${activeTab === 'cardio' ? 'wtb-active-cardio' : ''}`}
              onClick={() => setActiveTab('cardio')}
            >
              <span className="wtb-icon">🏃</span>
              <span className="wtb-label">Cardio</span>
            </button>
            <button 
              className={`workout-tab-btn wtb-home ${activeTab === 'home_workout' ? 'wtb-active-home' : ''}`}
              onClick={() => setActiveTab('home_workout')}
            >
              <span className="wtb-icon">🏠</span>
              <span className="wtb-label">Home</span>
            </button>
          </nav>

          <div className="tab-content-area">
            {activeTab === 'strength' && <StrengthLogger isHomeWorkout={false} date={date} day={day} bodyWeight={weight} onSaveSuccess={() => window.location.reload()} workouts={workouts} existingWorkout={existingWorkoutForTab} />}
            {activeTab === 'home_workout' && <StrengthLogger isHomeWorkout={true} date={date} day={day} bodyWeight={weight} onSaveSuccess={() => window.location.reload()} workouts={workouts} existingWorkout={existingWorkoutForTab} />}
            {activeTab === 'cardio' && <CardioLogger date={date} day={day} bodyWeight={weight} onSaveSuccess={() => window.location.reload()} workouts={workouts} existingWorkout={existingWorkoutForTab} />}
          </div>
        </>
      )}

      {mainTab === 'calendar' && (
        <div style={{ padding: '0 20px' }}>
          <CalendarView onSelectDate={handleCalendarSelect} loggedDates={loggedDates} />
        </div>
      )}

      {mainTab === 'insights' && (
        <div style={{ padding: '0 20px' }}>
          <InsightsDashboard workoutHistory={workouts} />
        </div>
      )}

      {/* Fixed Bottom App Navigation */}
      <nav className="app-bottom-nav">
        <button className={`bnav-btn ${mainTab === 'logger' ? 'bnav-active' : ''}`} onClick={() => setMainTab('logger')}>
          <span className="bnav-icon">🔥</span>
          <span className="bnav-label">Log</span>
        </button>
        <button className={`bnav-btn ${mainTab === 'calendar' ? 'bnav-active' : ''}`} onClick={() => setMainTab('calendar')}>
          <span className="bnav-icon">📆</span>
          <span className="bnav-label">Calendar</span>
        </button>
        <button className={`bnav-btn ${mainTab === 'insights' ? 'bnav-active' : ''}`} onClick={() => setMainTab('insights')}>
          <span className="bnav-icon">⚡</span>
          <span className="bnav-label">Insights</span>
        </button>
      </nav>

      <style jsx>{`
        /* ─── Workout Type Tab Nav ─── */
        .workout-tab-nav {
          display: flex;
          gap: 8px;
          padding: 16px 20px 0;
          margin-bottom: 20px;
        }

        .workout-tab-btn {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 12px 6px;
          border-radius: 14px;
          background: var(--surface-2);
          border: 1.5px solid var(--border-subtle);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'Outfit', sans-serif;
        }

        .wtb-icon { font-size: 22px; line-height: 1; }
        .wtb-label {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* Strength active */
        .wtb-strength { border-color: rgba(255, 50, 50, 0.2); }
        .wtb-active-strength {
          background: rgba(255, 50, 50, 0.12);
          border-color: var(--accent-strength);
          color: var(--accent-strength);
          box-shadow: 0 0 20px var(--glow-strength);
        }

        /* Cardio active */
        .wtb-cardio { border-color: rgba(0, 212, 255, 0.2); }
        .wtb-active-cardio {
          background: rgba(0, 212, 255, 0.12);
          border-color: var(--accent-cardio);
          color: var(--accent-cardio);
          box-shadow: 0 0 20px var(--glow-cardio);
        }

        /* Home active */
        .wtb-home { border-color: rgba(46, 255, 106, 0.2); }
        .wtb-active-home {
          background: rgba(46, 255, 106, 0.12);
          border-color: var(--accent-home);
          color: var(--accent-home);
          box-shadow: 0 0 20px var(--glow-home);
        }

        /* ─── Tab content ─── */
        .tab-content-area {
          padding: 0 20px 40px;
        }

        /* ─── Bottom Nav ─── */
        .app-bottom-nav {
          position: fixed;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          max-width: 480px;
          background: rgba(8, 10, 13, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 10px 0 14px;
          border-top: 1px solid var(--border-subtle);
          z-index: 100;
        }

        .bnav-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 6px 24px;
          border-radius: 12px;
          transition: all 0.2s;
          font-family: 'Outfit', sans-serif;
        }

        .bnav-icon {
          font-size: 22px;
          line-height: 1;
        }

        .bnav-label {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--text-muted);
          transition: color 0.2s;
        }

        .bnav-active .bnav-icon {
          filter: drop-shadow(0 0 6px rgba(255, 85, 0, 0.7));
        }

        .bnav-active .bnav-label {
          color: var(--accent-action);
        }
      `}</style>
    </div>
  );
}

