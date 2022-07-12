const router = require("express").Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authenticate");
const {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

router
  .route("/")
  .post([authenticateUser, authorizePermissions("user")], createReview)
  .get(getAllReviews);
router
  .route("/:id")
  .patch([authenticateUser, authorizePermissions("user")], updateReview)
  .delete(authenticateUser, deleteReview)
  .get(getSingleReview);

module.exports = router;
