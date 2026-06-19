import { Schema, model, type InferSchemaType, Types } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true },
    captainId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    memberIds: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    challengeFocus: { type: String, required: true },
  },
  { timestamps: true },
);

export type Team = InferSchemaType<typeof teamSchema> & {
  captainId: Types.ObjectId;
};

export const TeamModel = model('Team', teamSchema);
