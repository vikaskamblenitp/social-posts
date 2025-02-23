import express from "express";
import apiRoutes from "./api/index.js";
import { pinoHttpLogger } from "#helpers";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(pinoHttpLogger);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", apiRoutes);

export { app };