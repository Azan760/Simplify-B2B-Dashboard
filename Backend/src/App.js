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
import ClientRouter from "./Routes/Client.route.js";
import SaleInvoiceRouter from "./Routes/Invoice.route.js";
import SupplierRouter from "./Routes/Supplier.route.js"


app.use("/team", teamMemberRouter);
app.use("/product", ProductRouter);
app.use("/api",UserRouter);
app.use("/client", ClientRouter);
app.use("/sales", SaleInvoiceRouter);
app.use("/supplier", SupplierRouter);



export { app }
