const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

MONGO_URL =
  "mongodb+srv://sandeepmd2003:6C6cd0zfIXWgTyEa@cluster0.m3aps.mongodb.net/";

main()
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

let initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "664e17e5a85872a9c8c8a73c",
    category: "Camping",
  }));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();
