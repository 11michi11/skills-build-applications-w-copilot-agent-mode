import express from 'express';
import { connectDatabase } from './lib/database.js';
import { ActivityModel, LeaderboardModel, TeamModel, UserModel, WorkoutModel, } from './models/index.js';
const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
function getApiBaseUrl() {
    return codespaceName
        ? `https://${codespaceName}-8000.app.github.dev`
        : 'http://localhost:8000';
}
app.use(express.json());
app.get('/api/health', (_request, response) => {
    response.json({ status: 'ok', apiBaseUrl: getApiBaseUrl() });
});
app.get('/api/config', (_request, response) => {
    response.json({ apiBaseUrl: getApiBaseUrl() });
});
app.get('/api/users/', (_request, response) => {
    UserModel.find()
        .sort({ createdAt: -1 })
        .lean()
        .then((items) => response.json({ resource: 'users', items }))
        .catch((error) => response.status(500).json({ error: 'Failed to load users', details: String(error) }));
});
app.get('/api/teams/', (_request, response) => {
    TeamModel.find().sort({ createdAt: -1 }).lean()
        .then((items) => response.json({ resource: 'teams', items }))
        .catch((error) => response.status(500).json({ error: 'Failed to load teams', details: String(error) }));
});
app.get('/api/activities/', (_request, response) => {
    ActivityModel.find().sort({ performedAt: -1 }).lean()
        .then((items) => response.json({ resource: 'activities', items }))
        .catch((error) => response.status(500).json({ error: 'Failed to load activities', details: String(error) }));
});
app.get('/api/leaderboard/', (_request, response) => {
    LeaderboardModel.find().sort({ rank: 1, points: -1 }).lean()
        .then((items) => response.json({ resource: 'leaderboard', items }))
        .catch((error) => response.status(500).json({ error: 'Failed to load leaderboard', details: String(error) }));
});
app.get('/api/workouts/', (_request, response) => {
    WorkoutModel.find().sort({ createdAt: -1 }).lean()
        .then((items) => response.json({ resource: 'workouts', items }))
        .catch((error) => response.status(500).json({ error: 'Failed to load workouts', details: String(error) }));
});
async function start() {
    await connectDatabase();
    app.listen(port, () => {
        console.log(`OctoFit Tracker API listening on port ${port}`);
        console.log(`API base URL: ${getApiBaseUrl()}`);
    });
}
start().catch((error) => {
    console.error('Failed to start backend', error);
    process.exit(1);
});
