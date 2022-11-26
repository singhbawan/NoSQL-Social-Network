const router = require("express").Router();
const {
  getAllUsers,
  getOneUser,
  deleteUser,
  updateUser,
  createNewUser,
} = require("../../controllers/user-controller");

/*
 * endPoint : /api/user
 */
router.route("/").get(getAllUsers).post(createNewUser);

/**
 * endpoint : /api/user/:id
 */
router.route("/:id").get(getOneUser).put(updateUser).delete(deleteUser);

module.exports = router;
