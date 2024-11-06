import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import cors from "cors";

const app = express();


app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
app.use(express.static(path.join(dirname, '../client')))


import apiResultsRouter from "./routes/apiResults.routes.js";

app.use("/api", apiResultsRouter)

export {app}