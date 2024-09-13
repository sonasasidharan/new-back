const mongoose=require('mongoose')


  const  taskSchema=new mongoose.Schema({

    taskTitle: {
        type: String,
        required: true,
        unique:true
    },
    description: {
        type: String,
        required: true,
        unique:true
    },
    done: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        required:true
    },
    userId:{
        type:String,
        required:true
    }

  })

  const tasks=mongoose.model('tasks',taskSchema)

  module.exports=tasks

