const express = require("express");
const fs = require("fs");
const path = require("path");

const visitCounter = require("./middleware/visitCounter");

const app = express();
const PORT = 3000;

app.use((req, res, next) => {
    if (req.path === "/visits") {
        return next();
    }

    visitCounter(req, res, next);
});


app.get("/home", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to j=home page"
    });
});


app.get("/about", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to about page"
    });
});


app.get("/contact", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to  contact page"
    });
});


app.get("/visits", (req, res) => {
    const filePath = path.join(__dirname, "visits.json");
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    res.json({
        success: true,
        data: data
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});