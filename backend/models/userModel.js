import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    birthdate: {
      type: Date,
      required: true
    },
    profilePicture: {
      type: Buffer,
    },
    file: {
      type: String,
    }
  }
);

export const User = mongoose.model('User', userSchema);
