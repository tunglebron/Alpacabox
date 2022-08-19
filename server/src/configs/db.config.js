const mongoose = require("mongoose");

const connectDatabase = () => {
  console.log('Connecting to database...');

  mongoose.Promise = global.Promise;

  mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => {
    console.error(`Could not connect to database. Exiting now...\n${err}`);
    process.exit();
  });

}

module.exports = connectDatabase;