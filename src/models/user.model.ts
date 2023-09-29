import mongoose, { type Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';

export interface IUserDocument extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema<IUserDocument> = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    methods: {
      async comparePassword(candidatePassword: string) {
        try {
          return await bcrypt.compare(candidatePassword, this.password);
        } catch (error) {
          return false;
        }
      },
    },
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor'));
  this.password = bcrypt.hashSync(this.password, salt);

  return next();
});

export const UserModel = mongoose.model('User', userSchema);
