const bcrypt = require('bcrypt');
const User = require('../models/User');

const save = async (email, password) => {
  const hash = await bcrypt.hash(password, 10);
  const user = { email, password: hash };
  const createdUser = await User.create(user);
  return createdUser;
};

const findByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

module.exports = { save, findByEmail };
