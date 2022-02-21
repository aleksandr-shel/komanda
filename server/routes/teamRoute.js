const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');

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

//change team members (add or remove)
router.post('/:teamId/changeMembers', (req, res) => {
    const chosenUsers = req.body.chosenUsers;
    const teamId = req.body.teamId;
    const usersToAdd = req.body.usersToAdd;
    const usersToRemove = req.body.usersToRemove;

    //add teamId to the teams array under every user in usersToAdd array
    usersToAdd.forEach((userId) => {
        User.updateOne(
            { _id: userId },
            { $push: { teams: teamId } }).exec();
    })

    //remove teamID from the teams array under every user in usersToRemove array
    usersToRemove.forEach((userId) => {
        User.updateOne(
            { _id: userId },
            { $pull: { teams: teamId } }).exec();
    })

    Team.updateOne(
        { _id: teamId },
        { users: chosenUsers }).exec();
    res.send(chosenUsers);

})

router.get('/:teamId/users', (req, res) => {
    Team.findById(req.params.teamId, (err, team) => {
        if (err) {
            console.log(err);
            res.send('error occurred' + err);
        } else {
            res.send({
                usersArrayTemp: team.users,
                teamOwnerTemp: team.teamOwner
            });
        }
    })
})

module.exports = router;