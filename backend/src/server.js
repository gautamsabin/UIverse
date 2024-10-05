import "dotenv/config";
import express from "express";
import { Router } from "express";
import cors from "cors"
import databaseConfig from "./config/config.js";
import categoryRouter from "./routes/categoryRoute.js";

const app = express();
const apiRoute = Router();

databaseConfig()
app.use(express.json());

const port = process.env.PORT || 5000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

apiRoute.use("/category", categoryRouter);

app.use("/api", apiRoute);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
