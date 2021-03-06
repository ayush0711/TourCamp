const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require("mongoose"),
    flash = require("connect-flash");
passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User = require("./models/user");
session = require("express-session"),
    seedDB = require("./seeds");

//requring routes
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index")

// mongoose.connect("mongodb://localhost:27017/TourCamp", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

mongoose.connect("mongodb+srv://Tour_camp:ayushkanha@tourcamp.bbfjo.mongodb.net/tourcamp?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
app.use(bodyparser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require('moment');
//seedDB(); // seeds the db

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");

    next();
});


app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(3000, () => {
    console.log("server running on port 3000");
});