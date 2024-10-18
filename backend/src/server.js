import "dotenv/config";
import express from "express";
import { Router } from "express";
import cors from "cors"
import databaseConfig from "./config/config.js";
import categoryRouter from "./routes/categoryRoute.js";
import websiteRouter from "./routes/websiteRoute.js";
import pageScreenshotRoute from "./routes/pageScreenshotRoute.js";
import elementScreenshotRoute from "./routes/elementScreenshotRoute.js";

const app = express();
const apiRoute = Router();

databaseConfig()
app.use(express.json());

const port = process.env.PORT || 5000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

apiRoute
  .use("/category", categoryRouter)
  .use("/website", websiteRouter)
  .use("/pageScreenshot", pageScreenshotRoute)
  .use("/elementScreenshot", elementScreenshotRoute);

app.use("/api", apiRoute);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
