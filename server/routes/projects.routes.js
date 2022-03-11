const express = require('express')
const router = express.Router()


const projectCtrl = require('../controllers/projects.controller');

router.get('/', projectCtrl.getAllProjects)

router.get('/:teamId', projectCtrl.getTeamProjects)

router.post('/create', projectCtrl.createProject)

router.delete('/delete/:projectId', projectCtrl.deleteProject)

router.get('/project/:projectId', projectCtrl.getProject)

module.exports = router