import Joi from 'joi';
import mongoose from 'mongoose';

const email = Joi.string().min(5).required();
const date = Joi.string().min(5).required();
const text = Joi.string().min(5).required();
const response = Joi.string().min(5).required();

export default mongoose.model('message', {
  email,
  date,
  text,
  response,
});
