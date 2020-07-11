const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/TourCamp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: true }));

//schema setup
const campgroundschema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

const campground = mongoose.model("campground", campgroundschema);

// campground.create({
//     name: "Kanha Agrawal",
//     image: "https://cdn.pixabay.com/photo/2019/10/03/11/14/camp-4522970__480.jpg ",
//     description: "This is a huge granite hill, no bathrooms, no water"
// }, function(err, Campground) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Newly Created Campground");
//         console.log(Campground);
//     }
// });



app.get("/", (req, res) => {
    res.render("Landing");
});


app.get("/campgrounds", (req, res) => {
    //gt all camp on db
    campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", { campgrounds: allCampgrounds });
        }

    });
    //res.render("campgrounds", { campgrounds: campgrounds });
});

app.post("/campgrounds", (req, res) => {
    var name = req.body.name;
    const image = req.body.image;
    const desc = req.body.description;
    const newCampground = { name: name, image: image, description: desc }
        //create a new camp for db
    campground.create(newCampground, function(err, newlycreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
    //campgrounds.push(newCampground);
    //res.redirect("/campgrounds");
});


app.get("/campgrounds/new", (req, res) => {
    res.render("new.ejs");
});
//show more info about one campground
app.get("/campgrounds/:id", (req, res) => {
    //find camp with id
    campground.findById(req.params.id, function(err, foundCampground) {
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