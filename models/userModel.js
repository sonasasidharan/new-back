const mongoose=require('mongoose')

// create new schema
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

// define model
const users=mongoose.model('users',userSchema)

// export model
module.exports=users