const User = require("../models/User");

exports.updateUser = async (userId, user) => {
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      $set: user,
    },
    { new: true }
  );

  return updatedUser;
}

exports.deleteUser = async (userId) => {
  const deletedUser = await User.findByIdAndDelete(userId);

  return deletedUser;
}

exports.getUser = async (userId) => {
  const user = await User.findById(userId);

  return user;
}

/**
* Get all users or lastest users
* @author: lntung
* CreatedDate: 14/06/2022
*/
exports.getAllUsers = async (lastest = false) => {
  if (lastest == true) return await User.find().sort({ _id: -1 }).limit(5)
  else return await User.find();
}

exports.getStats = async () => {
  const data = await User.aggregate([
    {
      $project: {
        month: { $month: "$createdAt" },
      },
    },
    {
      $group: {
        _id: "$month",
        total: { $sum: 1 },
      },
    },
  ]);
  return data;
}


