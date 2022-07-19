const router = require("express").Router();

const { registerVendor } = require("../controllers/vendorController");

router.route("/register", registerVendor);

module.exports = router;
