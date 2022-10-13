require(`dotenv`).config();
const { SECRET } = process.env;
const { User } = require(`../models/user`);
const bcrypt = require(`bcryptjs`);
const jwt = require(`jsonwebtoken`);

const createToken = (username, id) => {
  return jwt.sign({ username: username, id: id }, `${SECRET}`, {
    expiresIn: `2days`,
  });
};

module.exports = {
  login: async (req, res) => {
    console.log(`this is the login in auth.js`);

    try {
      const { username, password } = req.body;
      let foundUser = await User.findOne({ where: {username } });
      if (foundUser) {
        const isAuthenticated = bcrypt.compareSync(
          password,
          foundUser.hashedPass
        );

        if (isAuthenticated) {
          const token = createToken(
            foundUser.dataValues.username,
            foundUser.dataValues.id
          );
          const exp = Date.now() + 1000 * 60 * 60 * 48;
          res.status(200).send({
            username: foundUser.dataValues.username,
            userId: foundUser.dataValues.idd,
            token,
            exp,
          });
        } else {
          res
            .status(400)
            .send(
              `Cannot log in, please make sure to use correct username and password`
            );
        }
      } else {
        res
          .status(400)
          .send(
            `Cannot log in, please make sure to use correct username and password`
          );
      }
    } catch (error) {
      console.log(`ERROR IN LOGIN`);
      console.log(error);
      res.sendStatus(400);
    }
  },

  register: async (req, res) => {
    try {
      const { username, password } = req.body;
      let foundUser = await User.findOne({ where: { username } });
      if (foundUser) {
        res
          .status(400)
          .send(`That username exists! Please choose a differnet one.`);
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const newUser = await User.create({
          username: username,
          hashedPass: hash,
        });
        const token = createToken(
          newUser.dataValues.username,
          newUser.dataValues.id
        );
        console.log(`TOOOOOOOKEN`, token);
        const exp = Date.now() + 1000 * 60 * 60 * 48;
        res.status(200).send({
          username: newUser.dataValues.username,
          userId: newUser.dataValues.id,
          token,
          exp,
        });
      }
    } catch (error) {
      console.log(`ERROR IN REGISTER`);
      console.log(error);
      res.sendStatus(400);
    }
  },
};
