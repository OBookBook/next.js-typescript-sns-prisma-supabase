const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const authRouter = require("./routers/auth");
const postRouter = require("./routers/post");

dotenv.config();
const PORT = 5000;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth/", authRouter);
app.use("/api/posts/", postRouter);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
