import express from "express"
import dogRouter from "../dog/routes"
import userRoutes from "../user/routes"
import router from "../routes/routes"
import bodyParser from "body-parser"
import cors from "cors"


const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use("/",router)
app.use("/",dogRouter)
app.use("/",userRoutes)
app.use(cors({origin:'*'}))
export default app