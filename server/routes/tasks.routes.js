let router = require('express').Router()
let task_controller = require('../controllers/tasks.controller')

// get all tasks
router.get('/', task_controller.get_tasks)
//create task
router.post('/create', task_controller.create_task)
//delete task
router.post('/:taskId/delete', task_controller.delete_task)

module.exports = router