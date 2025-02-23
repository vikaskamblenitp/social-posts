import express from "express";
import apiRoutes from "./api/index.js";
import { pinoHttpLogger } from "#helpers";
import { errorMiddleware } from "#middlewares";
import { jsend } from "#utils";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(pinoHttpLogger);
app.use(jsend());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", apiRoutes);

app.use(((err, req, res, next) => {
	errorMiddleware(err, req, res);
}) as express.ErrorRequestHandler);

export { app };