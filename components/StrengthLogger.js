"use client";

import { useState } from 'react';
import Dropdown from './Dropdown';
import './StrengthLogger.css';

export default function StrengthLogger({ isHomeWorkout = false, date, day, bodyWeight, onSaveSuccess }) {
  const [timeOfDay, setTimeOfDay] = useState('morning');
  const [timeNotes, setTimeNotes] = useState('');
  const [muscleGroup, setMuscleGroup] = useState('');
  const [exercise, setExercise] = useState('');
  const [sets, setSets] = useState([{ weight: '', reps: '' }]);
  const [nextGoal, setNextGoal] = useState('');
  const [todayNotes, setTodayNotes] = useState('');
  const [quality, setQuality] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Dummy history state (In reality, we would fetch this from the database/localStorage)
  const [muscleHistory, setMuscleHistory] = useState(['Chest', 'Back', 'Legs', 'Arms', 'Shoulders']);
  const [exerciseHistory, setExerciseHistory] = useState(['Bench Press', 'Incline Press', 'Flyes']);

  const addSet = () => {
    setSets([...sets, { weight: '', reps: '' }]);
  };

  const updateSet = (index, field, value) => {
    const newSets = [...sets];
    newSets[index][field] = value;
    setSets(newSets);
  };

  const removeSet = (index) => {
    const newSets = sets.filter((_, i) => i !== index);
    setSets(newSets);
  };

  const handleSave = async () => {
    if (!muscleGroup || !exercise) {
      alert("Please select a Muscle Group and Exercise");
      return;
    }
    
    setIsSaving(true);
    
    const payload = {
      date,
      dayOfWeek: day || 'Unknown',
      bodyWeight: Number(bodyWeight) || null,
      workoutType: isHomeWorkout ? 'home_workout' : 'strength',
      timeOfDay: [timeOfDay],
      timeNotes,
      quality,
      nextGoal,
      todayNotes,
      exercises: [{
        muscleGroup,
        name: exercise,
        sets: sets.map(s => ({ weight: Number(s.weight), reps: Number(s.reps) }))
      }]
    };

    try {
      const res = await fetch('/api/workouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        alert('Workout Saved!');
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
            label="Muscle Group"
            value={muscleGroup}
            onChange={setMuscleGroup}
            historyOptions={muscleHistory}
            onAddHistory={(newOpt) => setMuscleHistory([...muscleHistory, newOpt])}
          />
          
          <Dropdown 
            label="Exercise"
            value={exercise}
            onChange={setExercise}
            historyOptions={exerciseHistory}
            onAddHistory={(newOpt) => setExerciseHistory([...exerciseHistory, newOpt])}
          />
        </div>

        <div className="sets-grid mt-20">
          <div className="sets-header">
            <span>Set</span>
            <span>Weight (kg)</span>
            <span>Reps</span>
            <span></span>
          </div>
          {sets.map((set, index) => (
            <div key={index} className="set-row">
              <span className="set-number">{index + 1}</span>
              <input 
                type="number" 
                value={set.weight} 
                onChange={(e) => updateSet(index, 'weight', e.target.value)}
                placeholder="0"
              />
              <input 
                type="number" 
                value={set.reps} 
                onChange={(e) => updateSet(index, 'reps', e.target.value)}
                placeholder="0"
              />
              <button className="remove-set-btn" onClick={() => removeSet(index)}>×</button>
            </div>
          ))}
          <button className="btn btn-secondary w-100 mt-10" onClick={addSet}>+ Add Set</button>
        </div>

        <div className="notes-section mt-20">
          <textarea 
            placeholder="Goal for next time..." 
            value={nextGoal} 
            onChange={(e) => setNextGoal(e.target.value)} 
            rows="2"
          />
          <textarea 
            placeholder="Notes for today's exercise..." 
            value={todayNotes} 
            onChange={(e) => setTodayNotes(e.target.value)} 
            rows="2"
            className="mt-10"
          />
        </div>

        <div className="quality-selector mt-20">
          <label>How was the workout?</label>
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
          className={`btn btn-primary w-100 mt-20 save-btn ${isHomeWorkout ? 'home-btn' : 'strength-btn'}`}
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : `Save ${isHomeWorkout ? 'Home' : 'Strength'} Record`}
        </button>
      </div>
    </div>
  );
}
