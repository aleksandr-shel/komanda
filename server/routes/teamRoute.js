const express = require('express');

const router = express.Router();

let Team = require('../models/team');

let User = require('../models/user');

//get all teams, there is no teams yet
router.get('/', (req, res) => {

    Team.find((err, teams) => {
        if (err) {
            console.log(err)
            res.send('error occurred' + err);
        } else {
            res.send(teams);
        }
    })

})

//create team
router.post('/create', (req, res) => {
    const userId = req.body.teamOwner;

    let newTeam = new Team({
        teamName: req.body.teamName,
        teamOwner: userId,
        users: [userId]
    })

    Team.create(newTeam, (err, team) => {
        if (err) {
            res.send(err);
        } else {
            //adding team id to the user's teams array
            User.updateOne(
                { _id: userId },
                { $push: { teams: team._id } }).exec();
            res.send(team);
        }
    })
})

//add team members
router.post('/:teamId/add', (req, res) => {
    const usersId = req.body.chosenUsers;
    const teamId = req.body.teamId;

    //update teams array under every user in the array
    usersId.forEach((userId) => {
        User.updateOne(
            { _id: userId },
            { $push: { teams: teamId } }).exec();
    })

    Team.updateOne(
        { _id: teamId },
        { $push: { users: usersId } }).exec();
    res.send(usersId);

})


module.exports = router;