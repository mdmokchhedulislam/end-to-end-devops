require("dotenv").config({
    path:'.env'
})
const app = require("./src/app");
const connectMONGODB = require("./src/config/db.config");
connectMONGODB()

app.use("/",require("./src/routes"))

// 404 route concept
app.use("*",(req,res)=>{
    res.json({
        error:"Not Found"
    })
})

app.listen(5000,()=>{
    console.log("application is running on http://localhost:5000")
})