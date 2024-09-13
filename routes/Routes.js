const express=require('express')
const router=express.Router()

// middleware
const jwtMiddle=require('../middlewares/jwtMiddle')

// controllers
const userController=require('../controllers/userController')
const taskController=require('../controllers/taskController')

// registration
router.post('/register',userController.userRegister)

// login
router.post('/login',userController.userLogin)


// create task
router.post('/add',jwtMiddle,taskController.addTasks)

// view task lists
router.get('/allTasks',jwtMiddle,taskController.allTasks)

// to mark task done 
router.put('/taskDone/:id',jwtMiddle,taskController.taskDone) 

// delete task
router.delete('/deleteTask/:tid',jwtMiddle,taskController.deleteTask)

// specefic task details
router.get('/speceficTask/:tid',jwtMiddle,taskController.taskDetail)

// edit tasks
router.put('/editTask/:tid',jwtMiddle,taskController.editTask)




module.exports=router