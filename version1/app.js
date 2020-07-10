const express = require("express");
const app = express();

app.set("view engine", "ejs");


app.get("/", (req, res) => {
    res.render("Landing");
});


app.get("/campgrounds", (req, res) => {
    const campgrounds = [
        { name: "Kanha Agrawal", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSQB6_iDI_SOiGu56Jpz6t3I-hiliG-95k5Zw&usqp=CAU" },
        { name: "Akshay Dubey", image: "https://pawnacamp.com/wp-content/uploads/2018/01/Pawna-lake-camping-camp-F-new-768x512.jpg.webp" },
        { name: "Harsh Jain", image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80" }
    ]
    res.render("campgrounds");
});

app.listen(3000, () => {
    console.log("server running on port 3000");
});