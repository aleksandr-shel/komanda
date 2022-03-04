const Task = require('../models/task')
const Project = require('../models/project')

//return all tasks
const getAllTasks = async (req,res)=>{ 
    Task.find((err,tasks)=>{
        if (err){
            return res.status(400).send(err);
        }

        res.status(200).send(tasks);
    })
}


//get tasks related to the project
const getProjectTasks = async (req,res)=>{
    const {projectId} = req.params;

    Task.find({project:projectId}, (err, tasks)=>{
        if (err){
            return res.status(400).send(err);
        }
        res.status(200).send(tasks);
    })
}


//creates a task, project id is in the request body.
const createTask = async (req,res)=>{
    const {taskName, description, status, project, deadline, assignedUsers, importance} = req.body;

    if (!project){
        return res.status(400).send({message:'No project ID was sent'})
    }

    let newTask = new Task({
        taskName,
        description,
        status,
        project,
        deadline,
        assignedUsers,
        importance
    })

    Task.create(
        newTask,
        (err, createdTask)=>{
            if (err){
                return res.status(400).send(err);
            }

            Project.findOneAndUpdate(
                {_id:project},
                {$push: {tasks: createdTask._id}},
                (err)=>{
                    if (err){
                        return res.status(200).send('could not update project or project was not found')
                    }
                })
            
            res.status(200).send(createdTask);
        }
    )
}

const getTask = async (req,res)=>{

}

const deleteTask = async (req,res)=>{
    Task.findByIdAndDelete(req.params.taskId, function(err, result){
		if (err)
		{
			res.send(err)
		}
		else
		{
			//removing task id from its identical project
			Project.updateOne({_id: result.project}, {$pull: {tasks: result._id}}).exec()
			res.send(result)
		}
	})
}

const updateTask = async (req,res)=>{

}


module.exports = {
    getAllTasks,
    getProjectTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask
}