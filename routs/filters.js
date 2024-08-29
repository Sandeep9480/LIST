const express = require("express");
const router = express.Router();

const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");

router.get(
  "/room",
  wrapAsync(async (req, res) => {
    let allListing = await Listing.find({ category: "Room" });
    res.render("listings/filters.ejs", { allListing });
  })
);
router.get(
  "/camping",
  wrapAsync(async (req, res) => {
    let allListing = await Listing.find({ category: "Camping" });
    res.render("listings/filters.ejs", { allListing });
  })
);
router.get(
  "/iconic-cities",
  wrapAsync(async (req, res) => {
    let allListing = await Listing.find({ category: "Iconic cities" });
    res.render("listings/filters.ejs", { allListing });
  })
);
router.get(
  "/mountain",
  wrapAsync(async (req, res) => {
    let allListing = await Listing.find({ category: "Mountain" });
    res.render("listings/filters.ejs", { allListing });
  })
);
router.get(
  "/castles",
  wrapAsync(async (req, res) => {
    let allListing = await Listing.find({ category: "Castles" });
    res.render("listings/filters.ejs", { allListing });
  })
);
router.get(
  "/amazing-pools",
  wrapAsync(async (req, res) => {
    let allListing = await Listing.find({ category: "Amazing pools" });
    res.render("listings/filters.ejs", { allListing });
  })
);

router.get(
  "/farms",
  wrapAsync(async (req, res) => {
    let allListing = await Listing.find({ category: "Farms" });
    res.render("listings/filters.ejs", { allListing });
  })
);
router.get(
  "/arctic",
  wrapAsync(async (req, res) => {
    let allListing = await Listing.find({ category: "Arctic" });
    res.render("listings/filters.ejs", { allListing });
  })
);
router.get(
  "/boots",
  wrapAsync(async (req, res) => {
    let allListing = await Listing.find({ category: "Boots" });
    res.render("listings/filters.ejs", { allListing });
  })
);
router.get(
  "/doms",
  wrapAsync(async (req, res) => {
    let allListing = await Listing.find({ category: "Doms" });
    res.render("listings/filters.ejs", { allListing });
  })
);

module.exports = router;
