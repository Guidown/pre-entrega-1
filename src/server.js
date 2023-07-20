import express  from "express";
import productRouter from "./routes/product.routes.js";
import cartRouter from "./routes/cart.routes.js"
import dirname from "./utils.js";
import { engine } from "express-handlebars"
import path from "path";
import viewRouter from "./routes/view.routes.js";
import { Server } from "socket.io";
import productManager from "./managers/productManager.js";
import http from "http"



const app = express();
const PORT = 8080;


//CONFIGURACION HANDLEBARS
app.engine("hbs", engine({extname: ".hbs"}))
app.set("view engine", "hbs")
app.set("views", path.resolve(dirname + "/views"))

//ARCHIVOS ESTATICOS
app.use("/", express.static(dirname + "/public"))



//CONFIGURACION EXPRESS
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/", viewRouter)
app.use("/api/products", productRouter)
app.use("/api/carts", cartRouter )


const httpServer = http.createServer(app)

httpServer.listen(PORT, () => {
    console.log(`🚀SERVIDOR LEVANTADO EN EL PUERTO: ${PORT} 🚀`)
})

const socketServer = new Server(httpServer)

const pmanager = new productManager(dirname + "/models/products.json" )
socketServer.on("connection",  (socket) => {
    console.log("Cliente conectado con ID:", socket.id)
    const listofproducts =  pmanager.getProduct()
    socket.emit("products", listofproducts)
})





