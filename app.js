const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const routes = require('./routes/routes');
app.use('/', routes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server listening on port" + port));