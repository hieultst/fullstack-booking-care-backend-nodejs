import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";

require("dotenv").config();

let app = express();

// config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);

let port = process.env.PORT || 5555;
// Port === undefined => port = 5555

app.listen(port, () => {
    // callback
    console.log("Backend Nodejs is runing on the port: " + port);
});
