let express = require('express')
let router = express.Router()

const userCtrl = require('../controllers/users.controller')




/* GET users listing. */
router.get('/', userCtrl.getUsers)

router.get('/:id/teams', userCtrl.getUsersTeams)

router.get('/:id',  userCtrl.getUser)

//does not work for some reason
router.delete('/delete/:id', userCtrl.deleteUser)

module.exports = router