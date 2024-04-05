const mongoose = require("moongose")
mongoose.connect("mongodb: //localhost:27017/login")
.then(()=>{
    console.log("mongodb connected")
})
.catch(()=>{
    console.log("Failed to connect")
})

const loginSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
const collection = new mongoose.model("info",loginSchema)
module.exports = collection