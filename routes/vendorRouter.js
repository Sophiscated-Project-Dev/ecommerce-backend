const router = require("express").Router();

const { registerVendor } = require("../controllers/vendorController");

router.route("/register").post(registerVendor);

module.exports = router;
