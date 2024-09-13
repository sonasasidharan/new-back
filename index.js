require('dotenv').config()
const express=require('express')
const cors=require('cors')
const router=require('./routes/Routes')
require('./db/Connection')

// createing server instance
const ttserver=express()

// configuring cors to server
ttserver.use(cors())

// configuring json conversion on server
ttserver.use(express.json())

// configuring routes to server
ttserver.use(router)

//  assingn port number
const PORT=3000

// calling listen methode to implement listen mode for server to run
ttserver.listen(PORT,()=>{
    console.log(`server is running at:${PORT}`)
})

// setting responce for base_url get request
ttserver.get('/',(req,res)=>{
    res.send("<h1>tt server is active..<h1/>")
})