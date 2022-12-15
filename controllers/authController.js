const UserService = require('../services/UserService');
const Nodemailer = require('../services/Nodemailer');

exports.signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const createdUser = await UserService.save(email, password);

    const nodeMailerService = new Nodemailer(email);

    await nodeMailerService.send();

    return res.status(200).send({
      message: 'OK',
      user: {
        email: createdUser.email,
      },
    });
  } catch (error) {
    return res.status(500).send({
      error: error.message || 'Something went wrong',
    });
  }
};
