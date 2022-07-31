const router = require("express").Router();

const {
  registerVendor,
  createVendorReview,
} = require("../controllers/vendorController");

router.route("/register").post(registerVendor);
router.route("/create-review").post(createVendorReview);

module.exports = router;
