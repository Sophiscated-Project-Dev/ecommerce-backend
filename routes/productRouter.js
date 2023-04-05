const router = require("express").Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authenticate");
const {
  uploadImage,
  // createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deletProduct,
  createNewProduct
} = require("../controllers/productController");

router.route("/uploads").post(uploadImage);
router
  .route("/")
  .post([authenticateUser, authorizePermissions("admin")],createNewProduct)
  .get(getAllProducts);
router
  .route("/:id")
  .patch([authenticateUser, authorizePermissions("admin")], updateProduct)
  .get(getSingleProduct)
  .delete([authenticateUser, authorizePermissions("admin")], deletProduct);

module.exports = router;
