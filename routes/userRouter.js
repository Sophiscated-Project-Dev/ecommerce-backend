const router = require("express").Router();
const { register, loginUser, updateUser } = require("../controllers/userController");

router.route("/register").post(register);
router.route("/login").post(loginUser);
router.route("/:id").put(updateUser)

module.exports = router;
