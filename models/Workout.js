import mongoose from 'mongoose';

const setSchema = new mongoose.Schema({
  weight: { type: Number },
  unit: { type: String, enum: ['kg', 'lbs'], default: 'kg' },
  reps: { type: Number }
});

const exerciseSchema = new mongoose.Schema({
  muscleGroup: { type: String },
  name: { type: String, required: true },
  durationMinutes: { type: Number },
  speedLevel: { type: Number },
  sets: [setSchema]
});

const workoutSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  date: { type: Date, required: true },
  dayOfWeek: { type: String, required: true },
  bodyWeight: { type: Number },
  workoutType: { type: String, enum: ['strength', 'cardio', 'home_workout'], required: true },
  timeOfDay: [{ type: String, enum: ['morning', 'evening', 'both'] }],
  timeNotes: { type: String },
  quality: { type: String, enum: ['Good', 'Mid', 'Bad'] },
  nextGoal: { type: String },
  todayNotes: { type: String },
  exercises: [exerciseSchema]
}, { timestamps: true });

// Prevent mongoose from compiling the model multiple times in Next.js development
export default mongoose.models.Workout || mongoose.model('Workout', workoutSchema);
