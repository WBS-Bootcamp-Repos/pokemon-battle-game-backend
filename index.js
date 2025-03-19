import express from "express";
import "./db/db.js";
import logger from "./utils/logger.js";
import morgan from "morgan";
import leaderboardRouter from "./routes/leaderboardRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import cors from "cors";

const app = express();
const port = process.env.PORT ?? 3003;

const morganFormat = ":method :url :status :response-time ms";

app.use(cors());
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

app.use(express.json());
app.use("/leaderboards", leaderboardRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
