const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "visits.json");

function visitCounter(req, res, next) {
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    data.totalVisits += 1;

    if (data.routes[req.path]) {
        data.routes[req.path] += 1;
    } else {
        data.routes[req.path] = 1;
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    next();
}

module.exports = visitCounter;