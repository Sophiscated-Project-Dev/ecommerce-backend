const router = require("express").Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authenticate");

const {
  registerVendor,
  createVendorReview,
} = require("../controllers/vendorController");

router.route("/register").post(registerVendor);
router
  .route("/create-review")
  .post([authenticateUser, authorizePermissions("user")], createVendorReview);

module.exports = router;
