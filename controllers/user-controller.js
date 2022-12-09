const { User, Thought } = require("../models");

const userController = {
  getAllUsers(req, res) {
    User.find({})
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v"
      })
      .select("-__v")
      .then((dbUserData) => {
        // If no user is found, send 404
        if (!dbUserData) {
          res.status(404).json({ message: "No User found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },
  // update user by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No User found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },
  // delete user
  deleteUser({ params,body }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbUserData) => {
        console.log("user data is: ", dbUserData)
        if (!dbUserData) {
          res.status(404).json({ message: "No User found with this id!" });
          return;
        }
        return Thought.deleteMany({ username: dbUserData.username})
      })
      .then((updatedData) => {
        res.json(updatedData)})
      .catch((err) => res.status(400).json(err));
  },
  addFriend({ params, body }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.friendId } },
      { new: true }
    )
      .then(dbUserData => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No User found with this id!' });
          // return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.error("err: ", err);
        return res.status(500).json({message: "Something went wrong"})});
  },
  removeFriend({ params, body }, res) {
    console.log("params:", params)
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then(dbUserData => res.json(dbUserData))
      .catch((err) => {
        console.error("err: ", err);
        return res.status(500).json({message: "Something went wrong"})});
  },
};

module.exports = userController;
