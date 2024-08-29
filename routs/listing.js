const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const errorHandler = require("../utils/errorHandler.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controller/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router.route("/").get(wrapAsync(listingController.index)).post(
  isLoggedIn,

  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.addListings)
);

//New Route
router.get("/new", isLoggedIn, listingController.newListings);

router
  .route("/:id")
  // show route
  .get(wrapAsync(listingController.showListings))
  //upadte route
  .patch(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListings)
  )
  //delete route
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListings));

//edit route

router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.editListings)
);

module.exports = router;
