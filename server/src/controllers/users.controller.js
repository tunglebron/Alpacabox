const CryptoJS = require("crypto-js");
const userService = require("../services/users.service");

exports.updateUser = async (req, res, next) => {
  const userId = req.params.id;
  const user = req.body;
  if (req.user.id === userId || req.user.isAdmin) {
    if (user.password) {
      user.password = CryptoJS.AES.encrypt(
        user.password,
        process.env.SECRET_KEY
      ).toString();
    }

    try {
      const updatedUser = await userService.updateUser(userId, user);
      res.success({
        result: {
          data: updatedUser
        }
      });
    } catch (err) {
      next(err);
    }
  } else {
    res.forbidden({ err: "You can update only your account!" });
  }
}

exports.deleteUser = async (req, res, next) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      const deletedUser = await userService.deleteUser(req.params.id);

      res.success({
        result: {
          data: deletedUser
        }
      });
    } catch (err) {
      next(err);
    }
  } else {
    res.forbidden({ err: "You can delete only your account!" });
  }
}

exports.getUser = async (req, res, next) => {
  try {
    const user = await userService.getUser(req.params.id);
    const { password, ...info } = user._doc;

    res.success({
      result: {
        data: info
      }
    });
  } catch (err) {
    next(err);
  }
}

exports.getAllUsers = async (req, res, next) => {
  const query = req.query.new;
  if (req.user.isAdmin) {
    try {
      const users = query
        ? await userService.getAllUsers(true)
        : await userService.getAllUsers(false);
      res.success({
        result: {
          data: users
        }
      });
    } catch (err) {
      next(err);
    }
  } else {
    res.forbidden({ err: "You are not allowed to see all users!" });
  }
}

exports.getStats = async (req, res, next) => {
  const today = new Date();
  const lastYear = today.setFullYear(today.setFullYear() - 1);

  try {
    const data = await userService.getStats();
    res.success({
      result: {
        data: data
      }
    });
  } catch (err) {
    next(err);
  }
}