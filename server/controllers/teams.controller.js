

let Team = require('../models/team');

let User = require('../models/user');

const getTeams = async (req, res) => {

    Team.find((err, teams) => {
        if (err) {
            console.log(err)
            res.send('error occurred' + err);
        } else {
            res.send(teams);
        }
    })

}


const createTeam = async (req, res) => {
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
}


const changeTeamMembers = async (req, res) => {
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

}


const getTeamMembers = async (req, res) => {
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
}

const getTeam = async (req,res)=>{
    const {teamId} = req.params;
    Team.findById({_id:teamId}, (err, team)=>{
        if (err){
            res.status(400).send(err);
        }

        res.status(200).send(team);
    })
}


//delete a Team
const deleteTeam = async (req,res)=>{
    //when deleting a team there is a chain of deleting: 
    //1) delete projects
    //2) delete tasks 
    //3) delete any reference id to this team for each user
    //and so on
}
module.exports = {
    getTeams,
    getTeam,
    createTeam,
    changeTeamMembers,
    getTeamMembers,
    deleteTeam
}