const User = require("../model/User");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (!users) {
    return res.status(204).json({ message: "No users found." });
  }

  res.json(users);
};

const createUser = async (req, res) => {
  let missingData = [];
  if (!req?.body?.username || !req?.body?.password) {
    if (!req?.body?.username) {
      missingData.push("username");
    }

    if (!req?.body?.password) {
      missingData.push("password");
    }

    return res
      .status(400)
      .json({ message: `Missing required fields: ${missingData.join(", ")}.` });
  }

  try {
    const hashedPwd = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({
      username: req.body.username,
      password: hashedPwd,
      roles: req.body.roles,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "ID parameter is required" });
  }

  const user = await User.findOne({ _id: req.body.id }).exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `No user matched ID of ${req.body.id}.` });
  }

  if (req?.body?.username) {
    user.username = req.body.username;
  }

  if (req?.body?.password) {
    user.username = req.body.password;
  }

  try {
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  const id = req?.body?.id;
  if (!id) {
    return res.status(400).json({ message: "User ID required" });
  }
  const user = await User.findOne({ _id: req.body.id }).exec();
  if (!user) {
    return res.status(204).json({ message: `No user with ID ${id} was found` });
  }

  const deletedUser = await user.deleteOne({ _id: req.body.id });
  res.json(deletedUser);
};

const getUser = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "User ID required." });
  }

  try {
    const user = await User.findOne({ _id: req.params.id }).exec();
    if (!user) {
      return res
        .status(204)
        .json({ message: `No user matches ID of ${req.params.id}.` });
    }

    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
  createUser,
  updateUser,
  getUser,
};
