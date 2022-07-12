const router = require("express").Router();
const { authenticateUser } = require("../middleware/authenticate");
const {
  register,
  loginUser,
  logout,
  getAllUsers,
  getUser,
  updateUser
} = require("../controllers/userController");

router.route("/register").post(register);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/").get(getAllUsers);
router.route("/single-user").get(authenticateUser, getUser);
router.route("/:id").put(updateUser)

module.exports = router;
