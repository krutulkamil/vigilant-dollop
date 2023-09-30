import mongoose, { type Schema } from 'mongoose';

import type { IUserDocument } from './user.model';

export interface ISessionDocument extends mongoose.Document {
  user: IUserDocument['_id'];
  valid: boolean;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema: Schema<ISessionDocument> = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    valid: { type: Boolean, default: true },
    userAgent: { type: String },
  },
  {
    timestamps: true,
  }
);

export const SessionModel = mongoose.model<ISessionDocument>(
  'Session',
  sessionSchema
);
