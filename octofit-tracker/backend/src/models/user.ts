import { Schema, model, type InferSchemaType } from 'mongoose';

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    joinedAt: { type: Date, required: true },
    weeklyGoalMinutes: { type: Number, required: true },
  },
  { timestamps: true },
);

export type User = InferSchemaType<typeof userSchema>;

export const UserModel = model('User', userSchema);
