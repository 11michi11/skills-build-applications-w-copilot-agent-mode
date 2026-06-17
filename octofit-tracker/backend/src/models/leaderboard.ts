import { Schema, model, type InferSchemaType, Types } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    period: { type: String, required: true },
    participantType: { type: String, required: true },
    participantName: { type: String, required: true },
    participantId: { type: Schema.Types.ObjectId, required: false },
    rank: { type: Number, required: true },
    points: { type: Number, required: true },
  },
  { timestamps: true },
);

export type LeaderboardEntry = InferSchemaType<typeof leaderboardSchema> & {
  participantId?: Types.ObjectId;
};

export const LeaderboardModel = model('Leaderboard', leaderboardSchema);
