const express = require("express");
const dotenv = require("dotenv");

//Environment Variables
dotenv.config({ path: "./config/config.env" });
const PORT = process.env.PORT;

const app = express();

//Middlewares
app.use(express.json());

//Getting Connected to Database
const connectDb = require("./connect");
connectDb();

//Creating Routes
const router = require("./router/router");
const privaterouter = require("./router/dashboard");
app.use("/", router);
app.use("/dashboard", privaterouter);

//Server Listening
app.listen(PORT, console.log(`Server is running on ${PORT}`));
