import express from "express";
import cors from "cors";
import cookieParse from "cookie-parser";


const app = express()

app.use(cors({
    origin: "*",
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static('public'))
app.use(cookieParse())


import productRouter from "./routes/products.routes.js"
import testRouter from "./routes/test.routes.js";

app.use('/api/v1/data', productRouter);
app.use('/api/v1/test', testRouter);


export default app;