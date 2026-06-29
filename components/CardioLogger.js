"use client";

import { useState, useMemo } from 'react';
import Dropdown from './Dropdown';

export default function CardioLogger({ date, day, bodyWeight, onSaveSuccess, workouts = [] }) {
  const [timeOfDay, setTimeOfDay] = useState('morning');
  const [timeNotes, setTimeNotes] = useState('');
  const [exercise, setExercise] = useState('');
  const [duration, setDuration] = useState('');
  const [speedLevel, setSpeedLevel] = useState(''); // Specific to Stair Master
  const [nextGoal, setNextGoal] = useState('');
  const [todayNotes, setTodayNotes] = useState('');
  const [quality, setQuality] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const exerciseHistory = useMemo(() => {
    const exercises = new Set();
    workouts.forEach(w => {
      if (w.workoutType === 'cardio') {
        w.exercises?.forEach(ex => {
          if (ex.name) exercises.add(ex.name);
        });
      }
    });
    return Array.from(exercises);
  }, [workouts]);

  const handleSave = async () => {
    if (!exercise || !duration) {
      alert("Please select an Exercise and enter Duration");
      return;
    }
    
    setIsSaving(true);
    
    const payload = {
      date,
      dayOfWeek: day || 'Unknown',
      bodyWeight: Number(bodyWeight) || null,
      workoutType: 'cardio',
      timeOfDay: [timeOfDay],
      timeNotes,
      quality,
      nextGoal,
      todayNotes,
      exercises: [{
        muscleGroup: 'Cardio',
        name: exercise,
        durationMinutes: Number(duration),
        speedLevel: exercise === 'Stair Master' ? Number(speedLevel) : null,
      }]
    };

    try {
      const res = await fetch('/api/workouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        alert('Cardio Workout Saved!');
        if (onSaveSuccess) onSaveSuccess();
      } else {
        alert('Error saving workout');
      }
    } catch (e) {
      console.error(e);
      alert('Error saving workout');
    } finally {
      setIsSaving(false);
    }
  };

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
            onAddHistory={() => {}}
          />
        </div>

        <div className="sets-grid mt-20" style={{ display: 'flex', gap: '15px', padding: '20px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '8px', display: 'block' }}>Duration (Mins)</label>
            <input 
              type="number" 
              value={duration} 
              onChange={(e) => setDuration(e.target.value)}
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

        <button 
          className="btn btn-primary w-100 mt-20 cardio-btn save-btn"
          onClick={handleSave}
          disabled={isSaving}
          style={{ background: 'linear-gradient(135deg, var(--accent-cardio), #0088cc)', boxShadow: '0 4px 15px rgba(0, 229, 255, 0.3)' }}
        >
          {isSaving ? 'Saving...' : 'Save Cardio Record'}
        </button>
      </div>
    </div>
  );
}
