import express, { Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import "dotenv/config"
import morgan from 'morgan'
//import connectDB from './config/database'
import userRoutes from '../app/routes/userRoutes'
import { errorHandler } from './helpers/errorHandler'


//Connect to DB
//connectDB()

//Initialize express
const app = express()

//Load middleware
if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"))
}

//Accept incoming request data
//regular middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))


//cookie middleware
app.use(cookieParser())


//CORS
//app.use(cors())



//Registering Routes
app.get("/", (req, res)=> {
    res.send("API running...")
})

app.use("/api/v1/auth", userRoutes)



// Error Handler
app.use(errorHandler)


const PORT = process.env.PORT || 9000
app.listen(PORT, ()=> console.log(`Server listening on port ${PORT} in ${process.env.NODE_ENV} mode`))