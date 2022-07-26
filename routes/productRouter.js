const router = require("express").Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authenticate");
const {
  uploadImage,
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deletProduct,
  getTopRankProducts,
  getTopBrands,
  getNewArrival
} = require("../controllers/productController");

router
  .route("/uploads")
  .post([authenticateUser, authorizePermissions("admin")], uploadImage);
router
  .route("/")
  .post([authenticateUser, authorizePermissions("admin")], createProduct)
  .get(getAllProducts);
router
  .route("/:id")
  .patch([authenticateUser, authorizePermissions("admin")], updateProduct)
  .get(getSingleProduct)
  .delete([authenticateUser, authorizePermissions("admin")], deletProduct);
router.route("/top-ranks").get(getTopRankProducts);
router.route("/top-brands").get(getTopBrands);
router.route("/new-arrivals").get(getNewArrival);

module.exports = router;
