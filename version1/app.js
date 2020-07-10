const express = require("express");
const app = express();
const bodyparser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.render("Landing");
});


app.get("/campgrounds", (req, res) => {
    const campgrounds = [
        { name: "Kanha Agrawal", image: "https://cdn.pixabay.com/photo/2019/10/03/11/14/camp-4522970__480.jpg " },
        { name: "Akshay Dubey", image: "https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201__480.jpg" },
        { name: "Harsh Jain", image: "https://cdn.pixabay.com/photo/2018/12/24/22/19/camping-3893587__480.jpg" }
    ]
    res.render("campgrounds", { campgrounds: campgrounds });
});

app.post("/campgrounds", (req, res) => {
    res.send("you hit the post");
});


app.get("/campgrounds/new", (req, res) => {
    res.render("new.ejs");
});



app.listen(3000, () => {
    console.log("server running on port 3000");
});