import mongoose from 'mongoose';
import { ActivityModel, LeaderboardModel, TeamModel, UserModel, WorkoutModel } from '../models/index.js';
import { connectDatabase } from '../lib/database.js';

// Seed the octofit_db database with test data
console.log('Seed the octofit_db database with test data');

async function seed() {
  await connectDatabase();

  await Promise.all([
    ActivityModel.deleteMany({}),
    LeaderboardModel.deleteMany({}),
    TeamModel.deleteMany({}),
    UserModel.deleteMany({}),
    WorkoutModel.deleteMany({}),
  ]);

  const users = await UserModel.create([
    {
      firstName: 'Maya',
      lastName: 'Chen',
      email: 'maya.chen@example.com',
      role: 'captain',
      joinedAt: new Date('2026-05-01T08:00:00.000Z'),
      weeklyGoalMinutes: 300,
    },
    {
      firstName: 'Jordan',
      lastName: 'Cole',
      email: 'jordan.cole@example.com',
      role: 'member',
      joinedAt: new Date('2026-05-03T08:00:00.000Z'),
      weeklyGoalMinutes: 240,
    },
    {
      firstName: 'Ava',
      lastName: 'Patel',
      email: 'ava.patel@example.com',
      role: 'member',
      joinedAt: new Date('2026-05-04T08:00:00.000Z'),
      weeklyGoalMinutes: 210,
    },
  ]);

  const [maya, jordan, ava] = users;

  await TeamModel.create([
    {
      name: 'Blue Octos',
      captainId: maya._id,
      memberIds: [maya._id, jordan._id],
      challengeFocus: 'Consistency and cardio',
    },
    {
      name: 'Pulse Squad',
      captainId: ava._id,
      memberIds: [ava._id],
      challengeFocus: 'Strength and mobility',
    },
  ]);

  await ActivityModel.create([
    {
      userId: maya._id,
      activityType: 'Rowing',
      durationMinutes: 42,
      caloriesBurned: 380,
      performedAt: new Date('2026-06-15T07:30:00.000Z'),
      notes: 'Interval row session with strong finishing sprint.',
    },
    {
      userId: jordan._id,
      activityType: 'Strength Training',
      durationMinutes: 55,
      caloriesBurned: 410,
      performedAt: new Date('2026-06-15T18:00:00.000Z'),
      notes: 'Upper-body workout with progressive overload focus.',
    },
    {
      userId: ava._id,
      activityType: 'Yoga',
      durationMinutes: 35,
      caloriesBurned: 150,
      performedAt: new Date('2026-06-16T06:45:00.000Z'),
      notes: 'Recovery flow with breathing and hip mobility.',
    },
  ]);

  await LeaderboardModel.create([
    {
      period: 'weekly',
      participantType: 'user',
      participantName: 'Maya Chen',
      participantId: maya._id,
      rank: 1,
      points: 980,
    },
    {
      period: 'weekly',
      participantType: 'user',
      participantName: 'Jordan Cole',
      participantId: jordan._id,
      rank: 2,
      points: 910,
    },
    {
      period: 'weekly',
      participantType: 'team',
      participantName: 'Blue Octos',
      rank: 1,
      points: 1890,
    },
  ]);

  await WorkoutModel.create([
    {
      title: 'OctoBlast Cardio Circuit',
      focusArea: 'Cardio',
      difficulty: 'Intermediate',
      durationMinutes: 30,
      exercises: ['Jump rope', 'Burpees', 'Mountain climbers', 'Air squats'],
      description: 'A quick metabolic workout for busy weekdays.',
    },
    {
      title: 'Harbor Strength Builder',
      focusArea: 'Strength',
      difficulty: 'Advanced',
      durationMinutes: 45,
      exercises: ['Deadlift', 'Bench press', 'Dumbbell row', 'Plank hold'],
      description: 'Compound lift session with core finisher.',
    },
    {
      title: 'Recovery Flow',
      focusArea: 'Mobility',
      difficulty: 'Beginner',
      durationMinutes: 20,
      exercises: ['Cat-cow', "World's greatest stretch", 'Child pose', 'Deep squat hold'],
      description: 'Low-intensity routine to restore mobility and calm the body.',
    },
  ]);

  console.log('Seed completed successfully');
}

seed()
  .catch((error) => {
    console.error('Failed to seed octofit_db', error);
    process.exit(1);
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
