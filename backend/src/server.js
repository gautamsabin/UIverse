import "dotenv/config";
import express from "express";
import databaseConfig from "./config/config.js";

const app = express();
databaseConfig()

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
