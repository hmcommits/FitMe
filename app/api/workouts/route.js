import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectToDatabase from '../../../lib/mongodb';
import Workout from '../../../models/Workout';

export async function GET(req) {
  try {
    const session = await getServerSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    
    // Fetch all workouts for this user, sorted by date
    const workouts = await Workout.find({ userEmail: session.user.email }).sort({ date: -1 });
    
    return NextResponse.json({ workouts }, { status: 200 });
  } catch (error) {
    console.error('Error fetching workouts:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();
    await connectToDatabase();

    // Upsert logic: if a workout already exists for this date and type, update it. Otherwise create new.
    // Actually, users might log multiple things in a day. We will just save a new document per session or update the existing day's log.
    // Let's keep it simple: create a new record.

    const newWorkout = await Workout.create({
      userEmail: session.user.email,
      date: new Date(data.date),
      dayOfWeek: data.dayOfWeek,
      bodyWeight: data.bodyWeight || null,
      workoutType: data.workoutType,
      timeOfDay: data.timeOfDay,
      timeNotes: data.timeNotes,
      quality: data.quality,
      nextGoal: data.nextGoal,
      todayNotes: data.todayNotes,
      exercises: data.exercises,
    });

    return NextResponse.json({ message: 'Workout saved successfully', workout: newWorkout }, { status: 201 });
  } catch (error) {
    console.error('Error saving workout:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
