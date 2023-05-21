const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
var cors = require('cors');
const path = require('path');

/*
 * Import Config
 */
const connectDatabase = require("./src/configs/db.config");

/*
 * Import Middleware
 */
const applicationMiddleware = require("./src/middlewares/application.middleware");

/*
 * Import Routes
 */
const authRoute = require("./src/routes/auth.route");
const userRoute = require("./src/routes/users.route");
const movieRoute = require("./src/routes/movies.route");
const listRoute = require("./src/routes/lists.route")

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

dotenv.config();

/*
 * Connect to database
 */
connectDatabase();

/*
 * Api listening
 */
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});

/*
 * Using middleware for global response
 */
app.use(applicationMiddleware.globalResponse)

/*
 * Using routes
 */
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/movies", movieRoute)
app.use("/api/lists", listRoute)

app.use(express.static(path.join(__dirname, "../client/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

/*
 * Using middleware for request not found
 */
app.use(applicationMiddleware.requestNotFound)

/*
 * Using middleware for handling server errors
 */
app.use(applicationMiddleware.errorHandling)
