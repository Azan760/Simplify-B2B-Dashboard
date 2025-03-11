import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"



const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(cookieParser())

import  teamMemberRouter  from "./Routes/TeamMember.route.js"
import  ProductRouter  from "./Routes/Product.route.js"
import  UserRouter  from "./Routes/User.route.js"


app.use("/team", teamMemberRouter);
app.use("/product", ProductRouter);
app.use("/api",UserRouter);



export { app }
