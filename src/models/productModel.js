import Joi from 'joi';
import mongoose from 'mongoose';

const name = Joi.string().min(5).required();
const description = Joi.string().min(5).required();
const imageUrl = Joi.string().min(5).required();
const price = Joi.number().required();
const category = Joi.string().min(5).required();

export default mongoose.model('products', {
  name,
  description,
  imageUrl,
  price,
  category,
});
