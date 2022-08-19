var authService = require("../services/auth.service")
var commonUtil = require("../utils/common.util")
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

exports.register = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const birthDate = req.body.birthDate;
  const data = [username, password, email, birthDate];

  if (commonUtil.checkEmptyField(data)) {
    res.error({
      err: "At least one or more user's required information is empty"
    });
  } else {
    try {
      // Check if exist user
      const existingUser = await authService.getExistingUser(username, email);

      if (existingUser) {
        res.error({
          err: "Username or email exists"
        });
      } else {
        // Create new user
        const encryptPassword = CryptoJS.AES.encrypt(
          password,
          process.env.SECRET_KEY
        ).toString();
        const user = await authService.createUser(username, email, encryptPassword, birthDate);
        res.success({
          result: {
            data: user
          }
        });
      }
    } catch (error) {
      next(error)
    }
  }
}

exports.login = async (req, res, next) => {
  const email = req.body.email;

  if (commonUtil.checkEmptyField([email, req.body.password])) {
    res.error({
      err: "Email/username or password is empty"
    });
  } else {
    try {
      const user = await authService.getExistingUser(email, email);
      !user && res.error({ err: "Wrong password or email/username" });

      const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
      const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

      originalPassword !== req.body.password && res.error({ err: "Wrong password or email/username" });

      const accessToken = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      const { password, ...info } = user._doc;

      res.success({
        result: {
          data: { ...info, accessToken }
        }
      });
    } catch (error) {
      next(error)
    }
  }
}



