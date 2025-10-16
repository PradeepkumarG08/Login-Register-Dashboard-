const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
console.log("MONGO_URI:", process.env.MONGO_URI);


const app = express();
app.use(cors({
  origin: {"https://ai-dashboard-pi-umber.vercel.app"},
  methods: {"POST","GET"},
  credentials: true
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || "mongodb+srv://pradeepg2468_db_user:pradeep2002@cluster1.meacgzu.mongodb.net/test", { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log(" Connected to MongoDB Atlas"))
.catch((err) => console.error(" MongoDB connection error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
