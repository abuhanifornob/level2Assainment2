import express, { Application, Request, Response } from "express";

import cors from "cors";

import { UsersRoutes } from "./app/modules/users/users.routes";
const app: Application = express();

app.use(express.json());
app.use(cors());

// application routes

app.use("/api/users", UsersRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World! Assainment two project");
});

export default app;
