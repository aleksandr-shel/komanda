const express = require('express')

const router = express.Router()

const teamsCtrl = require('../controllers/teams.controller')

//get all teams, there is no teams yet
router.get('/', teamsCtrl.getTeams)

//create team
router.post('/create', teamsCtrl.createTeam)

//change team members (add or remove)
router.post('/:teamId/changeMembers', teamsCtrl.changeTeamMembers)

router.get('/:teamId/users', teamsCtrl.getTeamMembers)

router.get('/:teamId', teamsCtrl.getTeam)

router.delete('/:teamId', teamsCtrl.deleteTeam)

module.exports = router