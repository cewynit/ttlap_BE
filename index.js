const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require ("cookie-parser");
const authRoute = require("./routes/auth.js");
const userRoute = require("./routes/user.js")

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("Ket Noi Thanh Cong")
}).catch((err)=>{
    console.log(err)
})

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/v1/auth", authRoute);
app.use("/v1/user",userRoute);

app.listen(8000, () => {
    console.log("Server is running");
});

