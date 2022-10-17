import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const PRIVATE_KEY = config.JWT_PRIVATE_KEY;

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(400).json({
      
      error: 'Key no válida',
    });
  }
  const token = authHeader.split(' ')[1];
  jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        error: 'No autorizado',
      });
    }

    req.user = decoded.data;
    next();
  });
};
