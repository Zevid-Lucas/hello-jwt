const Joi = require('joi');

const loginController = {
  validateBody(body) {
    Joi.object({
      username: Joi.string().min(5).alphanum().required(),
      password: Joi.string().min(5).required(),
    }).validate(body);
  },
  
  async login(req, res, next) {
    const { error } = this.validateBody(req.body);
    if (error) return next(error);
  }, 
};

module.exports = loginController;