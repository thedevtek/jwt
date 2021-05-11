const mongoose = require("mongoose");

const momgoose = require("mongoose");
const connectDb = async () => {
  const connect = await mongoose.connect(
    "mongodb+srv://Admin:@Jwt7028@jwt.v3grb.mongodb.net/jwt?retryWrites=true&w=majority",
    {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  );
  console.log(`MongoDb Connected : ${connect.connection.host} `);
};

module.exports = connectDb;
