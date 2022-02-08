const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const http = require('http')
const server = http.Server(app);
require('dotenv').config();
const movies = require('./routes/movies');

const cors = require('cors');

app.options('*', cors());
app.use(cors())
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use("/movies",movies);

app.get("/", function (req, res) {
    console.log(`server is connected and started on port ` ,process.env.PORT);
    res.send("Successfully Running");
});
server.listen(process.env.PORT)
module.exports = server;