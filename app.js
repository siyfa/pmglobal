const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/utils/connect");

const app = express();
dotenv.config();

const port = process.env.PORT;

//app set-up
app.use(express.json());

//routes
app.use("/users", require('./src/controllers/user'))

app.use("/", (req, res) => {
    console.log(req.url + " " + "Time: " + new Date().toLocaleString());
    res.send("Welcome to PMGlobalTechnology test...")
})

app.all("*", function (req, res) {
    console.log(req.url)
    console.log("Wrong URL. From: " + req.clientIp + ". Time: " + new Date().toLocaleString());
    res.redirect("/");
});

//server set-up
app.listen(port, async() => {
    console.log(`App is runnig at http://localhost:${port}`)
    
    await connectDB();
})