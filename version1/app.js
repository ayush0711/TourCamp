const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    seedDB = require("./seeds");


mongoose.connect("mongodb://localhost:27017/TourCamp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
app.use(bodyparser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
seedDB();


app.get("/", (req, res) => {
    res.render("Landing");
});


app.get("/campgrounds", (req, res) => {
    //gt all camp on db
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", { campgrounds: allCampgrounds });
        }

    });
});
// CREATE- add new campground to DB
app.post("/campgrounds", (req, res) => {
    var name = req.body.name;
    const image = req.body.image;
    const desc = req.body.description;
    const newCampground = { name: name, image: image, description: desc }
        //create a new camp for db
    Campground.create(newCampground, function(err, newlycreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

//New- show form to create new campground
app.get("/campgrounds/new", (req, res) => {
    res.render("new.ejs");
});
//show more info about one campground
app.get("/campgrounds/:id", (req, res) => {
    //find camp with id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            //render show template with that camp
            res.render("show", { campground: foundCampground });
        }

    });

});




app.listen(3000, () => {
    console.log("server running on port 3000");
});