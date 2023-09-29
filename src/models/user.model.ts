import mongoose, { type HydratedDocument, type Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';

export interface IUserDocument extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema: Schema<IUserDocument> = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre<HydratedDocument<IUserDocument>>('save', async function (next) {
  const user = this as IUserDocument;

  if (!user.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor'));
  user.password = bcrypt.hashSync(user.password, salt);

  return next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const user = this as IUserDocument;
  try {
    return await bcrypt.compare(candidatePassword, user.password);
  } catch (error) {
    return false;
  }
};

export const UserModel = mongoose.model('User', userSchema);
