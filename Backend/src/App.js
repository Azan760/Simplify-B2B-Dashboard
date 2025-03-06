import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"



const app = express();

app.use(cors({
    origin: "*",
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(cookieParser())

import  teamMemberRouter  from "./Routes/TeamMember.route.js"
import  ProductRouter  from "./Routes/Product.route.js"


app.use("/team", teamMemberRouter);
app.use("/product", ProductRouter);



export { app }
