const users=require('../models/userModel')
const jwt=require('jsonwebtoken')

// user registration
exports.userRegister=async(req,res)=>{
    // destructure request from request body
    const {username,password,email}=req.body
    try{
        const existingUser=await users.findOne({email})
        if(existingUser){
            res.status(401).json("User Already Exist!")
            console.log(existingUser)
        }
        // create new user ,if there is no existing user
        else{
            const newUser=new users({
                username,password,email
            })
            await newUser.save()
            res.status(201).json(newUser)
            console.log(newUser)
        }
    }catch(err){
        res.status(404).json(err)
    }
}


// user login
exports.userLogin=async(req,res)=>{
  try{
    // destructure data from request body
    const {email,password}=req.body
    const existingUser=await users.findOne({email,password})
    // token generation
    if(existingUser){
        const token=jwt.sign({userId:existingUser._id},process.env.SECRET_KEY)
        res.status(200).json({existingUser,token})
    }
    else{
        res.status(406).json("invalid email/password")
    }
  }catch(err){
    console.log(err)
    res.status(404).json(err)

  }
}

