const router = require("express").Router();
const {
  getAllUsers,
  addFriend,
  removeFriend,
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


router
    .route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend)



module.exports = router;
