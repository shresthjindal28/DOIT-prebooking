const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./Config/Db.js");
const cors = require("cors");
const authRoutes= require('./Routes/authRoutes.js')
dotenv.config();

connectDB();
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/',function(req,res){
  res.send("hey")
})

app.use('/api/auth',authRoutes)

app.listen(process.env.PORT || 5000, () => {
  console.log(`server is running on ${process.env.PORT}`);
});
