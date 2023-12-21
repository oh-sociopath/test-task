import express from 'express';
import { User } from '../models/userModel.js';
import bcrypt from 'bcrypt';
import { upload } from '../multer.config.js';
import mongoose from 'mongoose';
import { routeHandler } from '../error-handler/error-handler.js';
import { ConflictException } from '../error-handler/conflict-exception.js';
import { WrongInputException } from '../error-handler/wrong-input-exception.js';

export const authRouter = express.Router();

// const Picture = mongoose.model('Picture', {
//   filename: String,
// })

authRouter.post('/signup', upload.single('file'), routeHandler(async (request, response) => {
    if (
      !request.body.name ||
      !request.body.email ||
      !request.body.password ||
      !request.body.gender ||
      !request.body.birthdate
    ) {
      return response.status(400).send({
        message: 'Send all required fields: name, email, password, gender, birthdate',
      });
    }
    const {name, email, password, gender, birthdate} = request.body;
  console.log('name: ', name);
  console.log('email: ', email);
  console.log('password: ', password);
  console.log('gender: ', gender);
  console.log('birthdate: ', birthdate);

    const checkEmail = await User.findOne({
      email: email.toLowerCase(),
    });
    if (checkEmail) {
      throw new ConflictException();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // const newPicture = new Picture({ filename: request.file.originalname });
    // await newPicture.save();

    const newUser = {
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      gender,
      birthdate: new Date(request.body.birthdate),
      profilePictureName: request.file,
    };

    const user = await User.create(newUser);

    return user;
}));

authRouter.post('/signin', routeHandler(async (request, response) => {
    if (!(request.body.email && request.body.password)) {
      return response.status(400).json({message: 'Fill all required fields'})
    }
    const {email, password} = request.body;
    const user = await User.findOne({
      email
    });

    const isPassMatched = await bcrypt.compare(password, user.password);

    if (!isPassMatched) {
      throw new WrongInputException();
    }

    return response.status(200).json(user);
}));
