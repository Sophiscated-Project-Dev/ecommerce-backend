const router = require("express").Router();
const {
  authenticateUsser,
  authorizePermissions,
} = require("../middleware/authenticate");
const {
  uploadImage,
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deletProduct,
} = require("../controllers/productController");

router.route("/uploads").post(uploadImage);
router
  .route("/")
  .post([authenticateUsser, authorizePermissions("admin")], createProduct)
  .get(getAllProducts);
router
  .route("/:id")
  .patch([authenticateUsser, authorizePermissions("admin")], updateProduct)
  .get(getSingleProduct)
  .delete([authenticateUsser, authorizePermissions("admin")], deletProduct);

module.exports = router;
