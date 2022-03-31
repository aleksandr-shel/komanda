const Task = require('../models/task');
const Project = require('../models/project');
const project = require('../models/project');

//return all tasks
const getAllTasks = async (req, res) => {
  Task.find((err, tasks) => {
    if (err) {
      return res.status(400).send(err);
    }

    res.status(200).send(tasks);
  });
};

//get tasks related to the project
const getProjectTasks = async (req, res) => {
  const { projectId } = req.params;

  Task.find({ project: projectId }, (err, tasks) => {
    if (err) {
      return res.status(400).send(err);
    }
    res.status(200).send(tasks);
  });
};

//creates a task, project id is in the request body.
const createTask = async (req, res) => {
  const {
    taskName,
    description,
    status,
    project,
    deadline,
    assignedUsers,
    importance,
  } = req.body;

  if (!project) {
    return res.status(400).send({ message: 'No project ID was sent' });
  }

  let newTask = new Task({
    taskName,
    description,
    status,
    project,
    deadline,
    assignedUsers,
    importance,
  });

  Task.create(newTask, (err, createdTask) => {
    if (err) {
      return res.status(400).send(err);
    }

    Project.findOneAndUpdate(
      { _id: project },
      { $push: { tasks: createdTask._id } },
      (err) => {
        if (err) {
          return res
            .status(400)
            .send('could not update project or project was not found');
        }
      }
    );

    res.status(200).send(createdTask);
  });
};

const getTask = async (req, res) => {
  Task.findById(req.params.taskId, (err, result)=>{
    if(err){
      return res.status(400).send(err);
    }
    return res.status(200).send(result);
  })
};

const deleteTask = async (req, res) => {
  Task.findByIdAndDelete(req.params.taskId, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    } else {
      //removing task id from its identical project
      Project.updateOne(
        { _id: result.project },
        { $pull: { tasks: result._id } }
      ).exec();
      res.status(200).send(result);
    }
  });
};

const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const {
    taskName,
    description,
    status,
    deadline,
    assignedUsers,
    importance,
  } = req.body;

  if (!taskId) {
    return res.status(400).send({ message: 'No task ID was sent' });
  }

  Task.findByIdAndUpdate(
    taskId,
    {
      taskName: taskName,
      description: description,
      status: status,
      deadline: deadline,
      assignedUsers: assignedUsers,
      importance: importance,
    },
    { new: true },
    (err, updatedTask) => {
      if (err) {
        return res.status(400).send(err);
      }
      res.status(200).send(updatedTask);
    }
  );
};

const handleRealTimeTasks = (socket)=>{
    // console.log('connected');
    socket.on('joinTasksPage', ({projectId})=>{
      // console.log('joined tasks page with id: ' + projectId)
      socket.join(projectId);
    })


    socket.on('addTask', (task)=>{
      socket.broadcast.to(task?.project).emit("task-added", task)
    })

    socket.on('deleteTask', ({taskId, projectId})=>{
      socket.broadcast.to(projectId).emit('task-deleted', {taskId})
    })

    socket.on('updateTask', (task)=>{
      socket.broadcast.to(task?.project).emit('task-updated', task)
    })

    socket.on('leaveTasksPageRooms', (projects)=>{
      projects.forEach(project=>{
        socket.leave(project._id)
      })
    })

}


module.exports = {
  getAllTasks,
  getProjectTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
  handleRealTimeTasks
};
