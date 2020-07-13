const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
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
            res.render("campgrounds/index", { campgrounds: allCampgrounds });
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
    res.render("campgrounds/new");
});
//show more info about one campground
app.get("/campgrounds/:id", (req, res) => {
    //find camp with id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            //render show template with that camp
            res.render("campgrounds/show", { campground: foundCampground });
        }

    });

});

//comments routes
app.get("/campgrounds/:id/comments/new", function(req, res) {
    // find campground by id
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", { campground: campground });
        }
    })
});

app.post("/campgrounds/:id/comments", function(req, res) {
    //lookup campground using ID
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
    //create new comment
    //connect new comment to campground
    //redirect campground show page
});


app.listen(3000, () => {
    console.log("server running on port 3000");
});