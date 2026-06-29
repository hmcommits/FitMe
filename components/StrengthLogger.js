"use client";

import { useState, useMemo, useEffect } from 'react';
import Dropdown from './Dropdown';
import './StrengthLogger.css';

export default function StrengthLogger({ isHomeWorkout = false, date, day, bodyWeight, onSaveSuccess, workouts = [], existingWorkout }) {
  const [timeOfDay, setTimeOfDay] = useState('morning');
  const [timeNotes, setTimeNotes] = useState('');
  
  const [exercisesList, setExercisesList] = useState([
    { muscleGroup: '', name: '', sets: [{ weight: '', unit: 'kg', reps: '' }] }
  ]);

  const [nextGoal, setNextGoal] = useState('');
  const [todayNotes, setTodayNotes] = useState('');
  const [quality, setQuality] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (existingWorkout) {
      if (existingWorkout.timeOfDay && existingWorkout.timeOfDay.length > 0) setTimeOfDay(existingWorkout.timeOfDay[0]);
      setTimeNotes(existingWorkout.timeNotes || '');
      setNextGoal(existingWorkout.nextGoal || '');
      setTodayNotes(existingWorkout.todayNotes || '');
      setQuality(existingWorkout.quality || '');
      
      if (existingWorkout.exercises && existingWorkout.exercises.length > 0) {
        setExercisesList(existingWorkout.exercises.map(ex => ({
          muscleGroup: ex.muscleGroup || '',
          name: ex.name || '',
          sets: ex.sets && ex.sets.length > 0 
            ? ex.sets.map(s => ({ weight: s.weight || '', unit: s.unit || 'kg', reps: s.reps || '' }))
            : [{ weight: '', unit: 'kg', reps: '' }]
        })));
      } else {
        setExercisesList([{ muscleGroup: '', name: '', sets: [{ weight: '', unit: 'kg', reps: '' }] }]);
      }
    } else {
      // Reset form
      setTimeOfDay('morning');
      setTimeNotes('');
      setNextGoal('');
      setTodayNotes('');
      setQuality('');
      setExercisesList([{ muscleGroup: '', name: '', sets: [{ weight: '', unit: 'kg', reps: '' }] }]);
    }
  }, [existingWorkout, date]);

  // Dynamically compute history from past workouts
  const muscleHistory = useMemo(() => {
    const muscles = new Set();
    workouts.forEach(w => {
      if (w.workoutType === 'strength' || w.workoutType === 'home_workout') {
        w.exercises?.forEach(ex => {
          if (ex.muscleGroup) muscles.add(ex.muscleGroup);
        });
      }
    });
    return Array.from(muscles);
  }, [workouts]);

  const exerciseHistoryFull = useMemo(() => {
    const list = [];
    const names = new Set();
    workouts.forEach(w => {
      if (w.workoutType === 'strength' || w.workoutType === 'home_workout') {
        w.exercises?.forEach(ex => {
          if (ex.name && !names.has(ex.name)) {
            names.add(ex.name);
            list.push({ name: ex.name, muscleGroup: ex.muscleGroup });
          }
        });
      }
    });
    return list;
  }, [workouts]);

  // Exercise List Actions
  const addExercise = (defaultMuscleGroup = '') => {
    setExercisesList([...exercisesList, { muscleGroup: defaultMuscleGroup, name: '', sets: [{ weight: '', unit: 'kg', reps: '' }] }]);
  };

  const removeExercise = (exIndex) => {
    const newList = exercisesList.filter((_, i) => i !== exIndex);
    setExercisesList(newList);
  };

  const updateExerciseField = (exIndex, field, value) => {
    const newList = [...exercisesList];
    newList[exIndex][field] = value;
    setExercisesList(newList);
  };

  // Set Actions within an Exercise
  const addSet = (exIndex) => {
    const newList = [...exercisesList];
    newList[exIndex].sets.push({ weight: '', unit: 'kg', reps: '' });
    setExercisesList(newList);
  };

  const updateSet = (exIndex, setIndex, field, value) => {
    const newList = [...exercisesList];
    newList[exIndex].sets[setIndex][field] = value;
    setExercisesList(newList);
  };

  const removeSet = (exIndex, setIndex) => {
    const newList = [...exercisesList];
    newList[exIndex].sets = newList[exIndex].sets.filter((_, i) => i !== setIndex);
    setExercisesList(newList);
  };

  const handleSave = async () => {
    // Validation
    for (let ex of exercisesList) {
      if (!ex.muscleGroup || !ex.name) {
        alert("Please ensure all exercises have a Muscle Group and Exercise name selected.");
        return;
      }
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
      exercises: exercisesList.map(ex => ({
        muscleGroup: ex.muscleGroup,
        name: ex.name,
        sets: ex.sets.map(s => ({ weight: Number(s.weight) || 0, unit: s.unit || 'kg', reps: Number(s.reps) || 0 }))
      }))
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

        {/* Dynamic List of Exercises */}
        <div className="exercises-wrapper mt-20">
          <label style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 700 }}>Your Session</label>
          
          {exercisesList.map((ex, exIndex) => {
            // Filter exercise history specifically for this exercise's selected muscle group
            const availableExercises = exerciseHistoryFull
              .filter(item => !ex.muscleGroup || item.muscleGroup === ex.muscleGroup)
              .map(item => item.name);

            return (
              <div key={exIndex} className="exercise-block mt-10" style={{ padding: '15px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <h4 style={{ margin: 0, color: 'var(--accent-strength)' }}>Exercise {exIndex + 1}</h4>
                  {exercisesList.length > 1 && (
                    <button onClick={() => removeExercise(exIndex)} style={{ background: 'transparent', border: 'none', color: '#ff2a2a', cursor: 'pointer', fontWeight: 'bold' }}>Remove</button>
                  )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <Dropdown 
                    label="Muscle Group"
                    value={ex.muscleGroup}
                    onChange={(val) => updateExerciseField(exIndex, 'muscleGroup', val)}
                    historyOptions={muscleHistory}
                    onAddHistory={() => {}} 
                  />
                  
                  <Dropdown 
                    label="Exercise"
                    value={ex.name}
                    onChange={(val) => updateExerciseField(exIndex, 'name', val)}
                    historyOptions={availableExercises}
                    onAddHistory={() => {}}
                  />
                </div>

                <div className="sets-grid mt-20">
                  <div className="sets-header">
                    <span>Set</span>
                    <span>Weight</span>
                    <span>Repetitions</span>
                    <span></span>
                  </div>
                  {ex.sets.map((set, setIndex) => (
                    <div key={setIndex} className="set-row">
                      <span className="set-number">{setIndex + 1}</span>
                      <div style={{ display: 'flex', gap: '5px' }}>
                        <input 
                          type="number" 
                          value={set.weight} 
                          onChange={(e) => updateSet(exIndex, setIndex, 'weight', e.target.value)}
                          placeholder="0"
                          style={{ width: '60%' }}
                        />
                        <select 
                          value={set.unit} 
                          onChange={(e) => updateSet(exIndex, setIndex, 'unit', e.target.value)}
                          style={{ width: '40%', background: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)', border: 'none', borderRadius: '4px', outline: 'none', padding: '0 5px' }}
                        >
                          <option value="kg">kg</option>
                          <option value="lbs">lbs</option>
                        </select>
                      </div>
                      <input 
                        type="number" 
                        value={set.reps} 
                        onChange={(e) => updateSet(exIndex, setIndex, 'reps', e.target.value)}
                        placeholder="0"
                      />
                      {ex.sets.length > 1 && (
                        <button className="remove-set-btn" onClick={() => removeSet(exIndex, setIndex)}>×</button>
                      )}
                      {ex.sets.length === 1 && <span></span>}
                    </div>
                  ))}
                  <button className="btn w-100 mt-10" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)' }} onClick={() => addSet(exIndex)}>+ Add Set</button>
                </div>
              </div>
            );
          })}
          
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
            {exercisesList.length > 0 && exercisesList[exercisesList.length - 1].muscleGroup && (
              <button 
                className="btn btn-secondary w-100" 
                onClick={() => addExercise(exercisesList[exercisesList.length - 1].muscleGroup)} 
                style={{ border: '1px dashed var(--accent-strength)', color: 'var(--accent-strength)' }}
              >
                + ADD ANOTHER {exercisesList[exercisesList.length - 1].muscleGroup.toUpperCase()} EXERCISE
              </button>
            )}
            <button 
              className="btn btn-secondary w-100" 
              onClick={() => addExercise('')} 
              style={{ border: '1px dashed rgba(255,255,255,0.2)' }}
            >
              + ADD ANOTHER MUSCLE GROUP
            </button>
          </div>
        </div>

        <div className="notes-section mt-20">
          <textarea 
            placeholder="Goal for next time..." 
            value={nextGoal} 
            onChange={(e) => setNextGoal(e.target.value)} 
            rows="2"
          />
          <textarea 
            placeholder="Notes for today's overall session..." 
            value={todayNotes} 
            onChange={(e) => setTodayNotes(e.target.value)} 
            rows="2"
            className="mt-10"
          />
        </div>

        <div className="quality-selector mt-20">
          <label>How was the overall workout?</label>
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
