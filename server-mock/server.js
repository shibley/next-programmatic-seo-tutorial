//initializes
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const path = require("path");

//app
const app = express();

//port

const port = 6400;
const mongoCreds = `mongodb+srv://admin:5hibleyB@cluster0.vymak.mongodb.net/programmatic-seo?authSource=admin&replicaSet=atlas-106bqn-shard-0&w=majority&readPreference=primary&retryWrites=true&ssl=true`;

//`mongodb://127.0.0.1:27017/Calcs`;

//admin:123456@process.env.MONGO_MOCK_DB_CREDS; // process.env.MONGO_MOCK_DB_CREDS

//mongodb+srv://admin:5hibleyB@cluster0.vymak.mongodb.net/strapi-api?authSource=admin&replicaSet=atlas-106bqn-shard-0&w=majority&readPreference=primary&retryWrites=true&ssl=true

//routes
const productRoute = require("./routes/product");
const courseRoute = require("./routes/course");
const videoCategoryRoute = require("./routes/videoCategory");
const homeRoute = require("./routes/home");
const cartRoute = require("./routes/cart");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const cityRoute = require("./routes/city");


//middleware
app.use(cors());

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//view engine
app.set("view engine", "ejs");
app.set("views", "views");

app.disable("view cache");

app.use("/", homeRoute);
app.use("/products", productRoute);
app.use("/courses", courseRoute);
app.use("/videoCategories", videoCategoryRoute);
app.use("/carts", cartRoute);
app.use("/users", userRoute);
app.use("/auth", authRoute);
app.use("/cities", cityRoute);

//mongoose
mongoose.set("useFindAndModify", false);
mongoose.set("useUnifiedTopology", true);
mongoose
  .connect(mongoCreds, { useNewUrlParser: true })
  .then(() => {
    app.listen(process.env.PORT || port, () => {
      console.log(`eCommerce API listening at ${process.env.PORT || port}...`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = app;
