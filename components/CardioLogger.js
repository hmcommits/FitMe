"use client";

import { useState } from 'react';
import Dropdown from './Dropdown';

export default function CardioLogger() {
  const [timeOfDay, setTimeOfDay] = useState('morning');
  const [timeNotes, setTimeNotes] = useState('');
  const [exercise, setExercise] = useState('');
  const [durationMinutes, setDurationMinutes] = useState('');
  const [speedLevel, setSpeedLevel] = useState(''); // Specific to Stair Master
  const [nextGoal, setNextGoal] = useState('');
  const [todayNotes, setTodayNotes] = useState('');
  const [quality, setQuality] = useState('');

  const [exerciseHistory, setExerciseHistory] = useState(['Treadmill', 'Cycling', 'Elliptical', 'Stair Master']);

  const isStairMaster = exercise.toLowerCase() === 'stair master';

  return (
    <div className="logger-container">
      <div className="glass-panel p-15">
        <div className="time-selector">
          <label>Time of Day</label>
          <div className="pill-group">
            {['morning', 'evening', 'both'].map((t) => (
              <button 
                key={t}
                className={`pill-btn ${timeOfDay === t ? 'active' : ''}`}
                onClick={() => setTimeOfDay(t)}
              >
                {t}
              </button>
            ))}
          </div>
          <input 
            type="text" 
            placeholder="Reason for time choice (optional)"
            value={timeNotes}
            onChange={(e) => setTimeNotes(e.target.value)}
            className="time-notes-input mt-10"
          />
        </div>

        <div className="mt-20">
          <Dropdown 
            label="Cardio Exercise"
            value={exercise}
            onChange={setExercise}
            historyOptions={exerciseHistory}
            onAddHistory={(newOpt) => setExerciseHistory([...exerciseHistory, newOpt])}
          />
        </div>

        <div className="sets-grid mt-20" style={{ display: 'flex', gap: '15px', padding: '20px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '8px', display: 'block' }}>Duration (Mins)</label>
            <input 
              type="number" 
              value={durationMinutes} 
              onChange={(e) => setDurationMinutes(e.target.value)}
              placeholder="0"
              style={{ width: '100%', padding: '12px', textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}
            />
          </div>
          
          {isStairMaster && (
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '8px', display: 'block' }}>Speed Level</label>
              <input 
                type="number" 
                value={speedLevel} 
                onChange={(e) => setSpeedLevel(e.target.value)}
                placeholder="0"
                style={{ width: '100%', padding: '12px', textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}
              />
            </div>
          )}
        </div>

        <div className="notes-section mt-20">
          <textarea 
            placeholder="Goal for next cardio session..." 
            value={nextGoal} 
            onChange={(e) => setNextGoal(e.target.value)} 
            rows="2"
          />
          <textarea 
            placeholder="Notes for today's session..." 
            value={todayNotes} 
            onChange={(e) => setTodayNotes(e.target.value)} 
            rows="2"
            className="mt-10"
          />
        </div>

        <div className="quality-selector mt-20">
          <label>How was the cardio?</label>
          <div className="pill-group">
            {['Good', 'Mid', 'Bad'].map((q) => (
              <button 
                key={q}
                className={`pill-btn ${quality === q ? `active-${q.toLowerCase()}` : ''}`}
                onClick={() => setQuality(q)}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        <button className="btn btn-primary w-100 mt-20 save-btn" style={{ background: 'linear-gradient(135deg, var(--accent-cardio), #0088cc)', boxShadow: '0 4px 15px rgba(0, 229, 255, 0.3)' }}>
          Save Cardio Record
        </button>
      </div>
    </div>
  );
}
