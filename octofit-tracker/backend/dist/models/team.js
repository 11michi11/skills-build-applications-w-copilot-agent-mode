import { Schema, model } from 'mongoose';
const teamSchema = new Schema({
    name: { type: String, required: true },
    captainId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    memberIds: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    challengeFocus: { type: String, required: true },
}, { timestamps: true });
export const TeamModel = model('Team', teamSchema);
