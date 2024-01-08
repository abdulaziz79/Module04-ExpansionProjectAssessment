import exress from "express"
import dotenv from "dotenv"
import cors from "cors"
import router from "./Routes/User.js"
import db from "./models/index.js"
import prodRoute from "./Routes/Product.js"
dotenv.config()


const app =exress()

app.use(cors())
app.use(exress.json())
app.use("/user",router)
app.use("/product",prodRoute)
app.use(exress.urlencoded({extended:true}))

const PORT=process.env.PORT || 3001;

try {
    app.listen(PORT,()=>{
        console.log(`running on ${PORT}`)
    })
    await  db.sequelize.authenticate()
    console.log("connection established")
    
} catch (error) {
    console.log(error.message)
}