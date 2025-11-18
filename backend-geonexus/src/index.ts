import express from "express";
import cors from "cors";
import externalRoutes from "./routes/external.routes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", externalRoutes);

export default app;
