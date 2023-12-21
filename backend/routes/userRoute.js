import express from 'express';
import { User } from '../models/userModel.js';
import bcrypt from 'bcrypt';
import { routeHandler } from '../error-handler/error-handler.js';
import { NotFoundException } from '../error-handler/not-found-exception.js';

export const userRouter = express.Router();

userRouter.get('/', routeHandler(async (request, response) => {
  console.log('request.query: ', request.query);

  const { email } = request.query;
  console.log('email: ', email);

  const user = await User.findOne({
    email: email
  });

  if (!user) {
    throw new NotFoundException();
  }

  return user;
}));

userRouter.patch('/', routeHandler(async (request, response) => {
  console.log('request.body: ', request.body);
  // if (request.body?.name && request.body?.password && request.body?.email) {
  //   response.status(400).json('The required param is missed');
  // }
  const {name, password, email, profilePicture} = request.body;

  const user = await User.findOne({
    email: email
  });

  console.log('user: ', user);

  if (!user) {
    throw new NotFoundException();
  }
  const hashedPassword = await bcrypt.hash(password.trim(), 10);
  await User.updateOne(
    {
    _id: user._id
    },
    {
      $set: {
        name: name.trim(),
        password: hashedPassword,
        profilePicture: profilePicture
      }
    });
  return user;
}))
