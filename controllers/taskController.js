const tasks=require('../models/taskModel')



// Create New Task
exports.addTasks = async (req, res) => {
    // destructuring datas
    const { taskTitle, description,done, date } = req.body
    const userId = req.payload

    try {
        const existingTask = await tasks.findOne({ taskTitle })
        if (existingTask) {
            res.status(406).json("Task already exist!")
        }
        else {
            // if not existing task, create new task
            const newTask = new tasks({
                taskTitle, description, done, date: new Date(date), userId
            })
            await newTask.save()
            res.status(200).json(newTask)
        }
    }
    catch (err) {
        res.status(400).json(err)
        console.log(err)
    }
}

// get all tasks of user
exports.allTasks = async (req, res) => {

    try {
        const userId = req.payload
        const result = await tasks.find({ userId })
        if (result) {
            res.status(200).json(result)
        }
        else {
            res.status(401).json("No Tasks Available !")
        }
    } catch (err) {
        res.status(400).json(err)
    }
}


// to  mark  task done
exports.taskDone = async (req, res) => {
    const { id } = req.params
    const { done } = req.body
    try {
        const task = await tasks.findByIdAndUpdate(id, { done }, { new: true })
        if (!task) {
            res.status(404).json(' not found');
        }
        else{
            res.status(200).json(task);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }

}


// to delete a task
exports.deleteTask = async (req, res) => {
    const { tid } = req.params
    try {
        const result = await tasks.findByIdAndDelete({ _id: tid })
        res.status(200).json(result)
    }
    catch (err) {
        console.log(err)
        res.status(404).json(err)
    }
}

// Specific Task Details
exports.taskDetail = async (req, res) => {

    const { tid } = req.params
    const userId = req.payload

    try {
        const result = await tasks.findById({ _id: tid })
        if (result) {
            res.status(200).json(result)
        }
        else {
            res.status(401).json("No Task  !")
        }
    }
    catch (err) {
        console.log(err)
        res.status(406).json(err)
    }
}


exports.editTask = async (req, res) => {
    const { taskTitle, description, done, date } = req.body;
    const userId = req.payload;
    const { tid } = req.params;

    try {
        const updateTask = await tasks.findByIdAndUpdate(
            { _id: tid },
            { taskTitle, description, done, date, userId },
            { new: true } // { new: true } returns the updated document
        );

        if (!updateTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json(updateTask);
    } catch (err) {
        console.log(err);
        res.status(406).json(err);
    }
};




