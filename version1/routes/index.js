const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
var Campground = require("../models/campground");

router.get("/", (req, res) => {
    res.render("Landing");
});
//  ===========
// AUTH ROUTES
//  ===========

// show register form
router.get("/register", function(req, res) {
    res.render("register");
});
//handle sign up logic
router.post("/register", function(req, res) {
    const newUser = new User({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        avatar: req.body.avatar,
        email: req.body.avatar

    });

    if (req.body.adminCode === "secretcode123") {
        newUser.isAdmin = true;
    }
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            return res.render("register", { error: err.message });
        }
        passport.authenticate("local")(req, res, function() {
            req.flash("success", "Welcome to TourCamp" + " " + req.body.username);
            res.redirect("/campgrounds");
        });
    });
});
// show login form
//show login form
router.get("/login", function(req, res) {
    res.render("login", { page: 'login' });
});
// handling login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res) {});

// logout route
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "logged you");
    res.redirect("/campgrounds");
});

//User profile
router.get("/users/:id", function(req, res) {
    User.findById(req.params.id, function(err, foundUser) {
        if (err) {
            req.flash("error", "Something went wrong.");
            return res.redirect("/");
        }
        Campground.find().where('author.id').equals(foundUser._id).exec(function(err, campgrounds) {
            if (err) {
                req.flash("error", "Something went wrong.");
                return res.redirect("/");
            }
            res.render("users/show", { user: foundUser, campgrounds: campgrounds });
        })
    });
});

// show register form
router.get("/register", function(req, res) {
    res.render("register", { page: 'register' });
});




module.exports = router;