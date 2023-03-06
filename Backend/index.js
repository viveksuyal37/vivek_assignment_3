const express = require("express");
const cors = require("cors");
const errorMiddleware = require("./middlewares/errorMiddleware.js");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });
const dbConnect = require("./config/dbConnect.js");
const router = require("./routes/routes.js");

const PORT = process.env.PORT || 5500;
const app = express();

//fixing cors issue
app.use(cors());

//body parser
app.use(express.json());

//connect to db
dbConnect();

//including routes
app.use("/api/v1", router);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
