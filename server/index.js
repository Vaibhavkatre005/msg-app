import express from "express";
import mongoose from "mongoose";

const app = express();

//add middlewares
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // Replace with the appropriate origin
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

//get request for root
app.get("/", (req, res, next) => {
  res.send("Server is stared ");
});

//mongoose Connect with database
mongoose
  .connect(
    "mongodb+srv://vaibhavkatre005:connect@api-and-param.cat6pt7.mongodb.net/?retryWrites=true&w=majority",
    { dbName: "message" }
  )
  .then(() => console.log("Connect to DB"))
  .catch((e) => console.log(e));

//Schema for the database
const userSchema = new mongoose.Schema({
  name: String,
  content: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});
const User = mongoose.model("user", userSchema);

//get all data
app.get("/msgs/all", async (req, res, next) => {
  const users = await User.find();
  res.json({
    success: true,
    users,
  });
});

//get specific id
app.get("/user/:id", async (req, res, next) => {
  const { id } = req.params;
  console.log(req.params);
  const users = await User.findById(id);
  res.json({
    success: true,
    users,
  });
});

app.get("/name/:name", async (req, res, next) => {
  const { name } = req.params;
  console.log(req.params);
  const users = await User.find({ name: name });
  res.json({
    success: true,
    users,
  });
});

//add data to database
app.post("/msg/add", async (req, res, next) => {
  const { name, content, timestamp } = req.body;
  await User.create({
    name,
    content,
    timestamp,

    // name: "Vaibhav",
    // email: "vaibhav@ricecity.in",
    // password: "Conenct@123",
  });
  res.status(201).cookie("cookie_name", "lol").json({
    success: true,
    messesge: "send Successfully",
  });
});

//define port number
app.listen(5000, () => {
  console.log("Server is Startedat 5000");
});
