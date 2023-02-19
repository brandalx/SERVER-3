const express = require("express");
const http = require("http");
const path = require("path");
const cors = require("cors");

const { routesInit } = require("./routes/configRoutes");
require("./db/mongoConnect");

const app = express();
// To disable security, and allows make an IP request from another domain from another server
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));
routesInit(app);

const server = http.createServer(app);
let port = process.env.PORT || 3003;

server.listen(port);
