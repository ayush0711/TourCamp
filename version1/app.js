const express = require("express");
const app = express();
const bodyparser = require("body-parser"),
    mongoose = require("mongoose");

mongoose.connect("mongod://localhost/Tour_Camp");

app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: true }));
const campgrounds = [
    { name: "Kanha Agrawal", image: "https://cdn.pixabay.com/photo/2019/10/03/11/14/camp-4522970__480.jpg " },
    { name: "Akshay Dubey", image: "https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201__480.jpg" },
    { name: "Harsh Jain", image: "https://cdn.pixabay.com/photo/2016/11/22/23/08/adventure-1851092__480.jpg" },
    { name: "chirag garg", image: "https://cdn.pixabay.com/photo/2016/01/19/16/48/teepee-1149402__480.jpg " },
    { name: "radhika goyal", image: "https://cdn.pixabay.com/photo/2016/11/21/16/03/campfire-1846142__480.jpg" },
    { name: "janvi goyal", image: "https://cdn.pixabay.com/photo/2016/02/09/16/35/night-1189929__480.jpg" }
]


app.get("/", (req, res) => {
    res.render("Landing");
});


app.get("/campgrounds", (req, res) => {
    res.render("campgrounds", { campgrounds: campgrounds });
});

app.post("/campgrounds", (req, res) => {
    var name = req.body.name;
    const image = req.body.image;
    const newCampground = { name: name, image: image }
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});


app.get("/campgrounds/new", (req, res) => {
    res.render("new.ejs");
});



app.listen(3000, () => {
    console.log("server running on port 3000");
});