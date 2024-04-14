import model from "./model.js";

export const createUser = (user) => model.create(user);

export const findAllUsers = () => model.find();

export const findUserById = (userId) => model.findById(userId);

export const findUserByUsername = (username) =>
  model.findOne({ username: username });

export const findUserByCredentials = (username, password) =>
  model.findOne({ username: username, password: password });

export const updateUser = (userId, user) =>
  model.findOneAndUpdate({ _id: userId }, { $set: user });

export const deleteUser = (userId) => model.deleteOne({ _id: userId });
