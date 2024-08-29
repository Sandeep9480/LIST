if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const errorHandler = require("./utils/errorHandler.js");
const listingsRouter = require("./routs/listing.js");
const reviewsRouter = require("./routs/review.js");
const filterRouter = require("./routs/filters.js");
const userRouter = require("./routs/user.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash/lib/flash.js");
const passport = require("passport");
const LocalStategy = require("passport-local");
const User = require("./models/user.js");

const port = process.env.PORT || 4000;

const dbUrl = process.env.MONGO_URL;

main()
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

app.set("views", path.join(__dirname, "views"));
app.set("view engin", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: Date.now() * 7 * 24 * 60 * 60 * 100,
      maxAge: 7 * 24 * 60 * 60 * 100,
      httpOnly: true,
    },
  })
);
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.successMsg = req.flash("success");
  res.locals.errorMsg = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

app.use("/listings", listingsRouter);

app.use("/listings/:id/reviews", reviewsRouter);
app.use("/filters", filterRouter);
app.use("/", userRouter);

//err middleware
app.all("*", (req, res, next) => {
  next(new errorHandler(404, "Page not found"));
});

app.use((err, req, res, next) => {
  let { status = 500, message = "Something went wrong" } = err;
  res.status(status).render("error.ejs", { err });
});
app.listen(port, () => {
  console.log(`Server is listing at port ${port}`);
});
