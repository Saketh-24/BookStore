import express from "express";
import { PORT, mongoURL } from "./config.js";
import { mongoose } from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

//middleware
app.use(express.json());
app.use(cors());

app.use("/BookStore", booksRoute);

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("db connected successfully");
    app.listen(PORT, () => {
      console.log(`App is running at ${PORT}`);
    });
  })
  .catch((err) => console.log("error connecting db", err));
