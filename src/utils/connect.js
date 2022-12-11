const mongoose = require("mongoose");
const dotenv = require("dotenv");

//env
dotenv.config();

//
mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);

const url = process.env.MONGO_URL;

//MongoDb
const connectDB = async() => {
  await mongoose
    .connect(url, {
      useNewUrlParser: true,
    })
    .then(() => console.log("DB is connnected."))
    .catch((err) => console.log(err));
}

module.exports = connectDB;