import mongoose from "mongoose";
import "dotenv/config";

const databaseConfig = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then(() => {
      console.log("Database Connection Ready...");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default databaseConfig;
