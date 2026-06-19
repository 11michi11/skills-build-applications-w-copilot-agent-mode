import { Schema, model } from 'mongoose';
const activitySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    activityType: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    performedAt: { type: Date, required: true },
    notes: { type: String, required: true },
}, { timestamps: true });
export const ActivityModel = model('Activity', activitySchema);
