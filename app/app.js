import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/router.js";
import error from "./middleware/erorr.js";

app.use(
  cors({
    origin: "https://narnowin.vercel.app/",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use("/", router);

// it's for ErrorHandling
app.use(error);

export default app;
