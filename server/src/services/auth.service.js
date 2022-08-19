const User = require("../models/User");

exports.createUser = async (username, email, password, birthDate) => {
  const newUser = new User({
    username: username,
    email: email,
    password: password,
    birthDate: birthDate
  });

  return await newUser.save();
}

exports.getExistingUser = async (username, email) => {
  const user = await User.findOne({ $or: [{ username: username }, { email: email }] });
  return user;
}
