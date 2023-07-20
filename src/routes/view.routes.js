import { Router } from "express";
import productManager from "../managers/productManager.js";
import dirname from "../utils.js";

const pManager = new productManager(dirname + "/models/products.json")
const viewRouter = Router()

viewRouter.get("/",async(req, res)=>{
    const list = await pManager.getProduct({})
    res.render("home", {list})
})
viewRouter.get("/realtimeproducts", (req, res) => {
    res.render("realtimeproducts")
})



export default viewRouter