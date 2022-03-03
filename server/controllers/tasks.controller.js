let task = require('../models/task')
let project = require('../models/project')

let get_tasks = async (req, res) => {

	task.find((err, tasks) => {
		if (err)
		{
			console.log(err)
			res.send('error occurred' + err)
		} else {
			res.send(tasks)
		}
	})
}
let create_task = async (req, res) => {
	let new_task = new task({
		taskName: req.body.taskName,
		description: req.body.description,
		status: req.body.status,
		project: req.body.project,
		deadline: req.body.deadline,
		assignedUsers: [req.body.assignedUsers]
	})

	task.create(new_task, (err, result) => {
		if (err)
		{
			res.send(err)
		}
		else
		{
			//adding task id to its identical project
			project.updateOne({ _id: req.body.project }, {$push: {tasks: result._id}}).exec()
			res.send(result)
		}
	})
}
let delete_task = async (req, res) => {
	task.findByIdAndDelete(req.params.taskId, function(err, result){
		if (err)
		{
			res.send(err)
		}
		else
		{
			//removing task id from its identical project
			project.updateOne({_id: result.project}, {$pop: {tasks: result._id}}).exec()
			res.send(result)
		}
	})
}

module.exports = {
	get_tasks,
	create_task,
	delete_task
}