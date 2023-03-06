const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const dbConnect = async () => {
  await mongoose
    .connect(process.env.MONGO_CONN_URI)
    .then(() => {
      console.log("connected to db sucessfully.");
    })
    .catch((err) => {
      new Error(err.message);
    });
};

module.exports= dbConnect;
