const express = require('express')
const router = express.Router()

const tasksCtrl = require('../controllers/tasks.controller')

router.get('/',  tasksCtrl.getAllTasks)

router.get('/:taskId', tasksCtrl.getTask)

router.get('/project/:projectId', tasksCtrl.getProjectTasks)

router.post('/create', tasksCtrl.createTask)

router.put('/update/:taskId', tasksCtrl.updateTask)

router.delete('/delete/:taskId', tasksCtrl.deleteTask)

module.exports = router