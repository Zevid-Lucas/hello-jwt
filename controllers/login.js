const Joi = require('joi');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const validateBody = (body) => 
  Joi.object({
    username: Joi.string().min(5).alphanum().required(),
    password: Joi.string().min(5).required(),
  }).validate(body);
  
module.exports = async (req, res, next) => {
  const { username, password } = req.body;
  let { admin } = req.body;
  const { error } = validateBody(req.body);
  if (error) return next(error);

  if (username === 'admin' && password !== 's3nh4S3gur4???') {
    const err = new Error('Invalid username or password');
    err.statusCode = 401;
    return next(err);
  }

  admin = username === 'admin' && password === 's3nh4S3gur4???';
  
  const payload = {
    username,
    admin,
  };

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: '1h',
  });

  res.status(200).json({ token });
}; 
