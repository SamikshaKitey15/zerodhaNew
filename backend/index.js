require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/AuthRoute");


const { HoldingModel } = require("./model/HoldingModel.js");
const { PositionModel } = require("./model/PositionModel.js");
const { OrderModel } = require("./model/OrderModel.js");
const { WatchListModel } = require("./model/WatchListModel.js");


const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(bodyParser.json());

// app.get("/addHoldings", async (req, res) => {
//   let tempHoldings = [
//     {
//       name: "BHARTIARTL",
//       qty: 2,
//       avg: 538.05,
//       price: 541.15,
//       net: "+0.58%",
//       day: "+2.99%",
//     },
//     {
//       name: "HDFCBANK",
//       qty: 2,
//       avg: 1383.4,
//       price: 1522.35,
//       net: "+10.04%",
//       day: "+0.11%",
//     },
//     {
//       name: "WIPRO",
//       qty: 4,
//       avg: 489.3,
//       price: 577.75,
//       net: "+18.08%",
//       day: "+0.32%",
//     },
//   ];

//   tempHoldings.forEach((item) => {
//     let newHolding = new HoldingModel({
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.net,
//       day: item.day,
//     });

//     newHolding.save();
//   });
//   res.send("Done");
// });


app.get("/allHoldings", async(req, res) => { //end points to save data
  let allHoldings = await HoldingModel.find({});
  res.json(allHoldings);
});

app.get("/allPositions", async(req, res) => {
  let allPositions = await PositionModel.find({});
  res.json(allPositions);
});

app.get("/addWatchLists", async(req, res) => {
  let allWatchlist = await WatchListModel.find({});
  res.json(allWatchlist);
});

app.post("/newOrder", async (req, res) => { //to add data into database
  let newOrder = new OrderModel({
    name: req.body.name,
    price: req.body.price,
    qty: req.body.qty,
    mode: req.body.mode,
  });

  newOrder.save();
  res.send("Order saved!");
});

app.get("/newOrder", async(req, res) => {
  let newOrder = await OrderModel.find({});
  res.json(newOrder);

});

app.listen(PORT, () => {
  console.log("app started");
  mongoose.connect(uri);
  console.log("DB connected");
});



app.use(cookieParser());

app.use(express.json());

app.use("/", authRoute);
