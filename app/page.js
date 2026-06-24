"use client";

import { useState } from 'react';
import GlobalHeader from '../components/GlobalHeader';
import StrengthLogger from '../components/StrengthLogger';

export default function Home() {
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [day, setDay] = useState('');
  const [weight, setWeight] = useState('');
  
  const [activeTab, setActiveTab] = useState('strength');

  return (
    <div style={{ width: '100%' }}>
      <GlobalHeader 
        date={date} setDate={setDate} 
        day={day} setDay={setDay} 
        weight={weight} setWeight={setWeight} 
      />

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
        {activeTab === 'cardio' && <div className="glass-panel" style={{padding: '20px', textAlign: 'center'}}>Cardio Logger coming soon!</div>}
      </div>

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
      `}</style>
    </div>
  );
}
