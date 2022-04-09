let Team = require('../models/team');
let Project = require('../models/project');
let Task = require('../models/task');
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
    Team.findById(req.params.teamId, async (err, team) => {
        if (err) {
            console.log(err);
            res.send('error occurred' + err);
        } else {
            const userObjects = await User.find({ '_id': { $in: team.users } }); //get all users by ID that are in usersIdList
            res.send({
                usersArrayTemp: team.users,
                teamOwnerTemp: team.teamOwner,
                userObjects
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
    const {teamId} = req.params;
    Team.findByIdAndDelete({_id:teamId},(err, team)=>{
        if (err){
            return res.status(400).send(err);
        }
        team.projects.forEach(projectId=>{
            Project.findOneAndRemove({_id:projectId}, (err, project)=>{
                if (err){
                    return res.status(400).send(err);
                }
        
                Task.deleteMany({project: projectId}, (err)=>{
                    if (err){
                        return res.status(400).send({err, message:'could delete tasks related to a project'})
                    }
                })
            })
        })  
        team.users.forEach(userId=>{
            User.findOneAndUpdate(
                {_id:userId},
                {$pull:{teams:teamId}},
                (err)=>{
                    if (err){
                        return res.status(400).send(err)
                    }
                }
            )
        })
        return res.status(200).send(team)
    })
}
module.exports = {
    getTeams,
    getTeam,
    createTeam,
    changeTeamMembers,
    getTeamMembers,
    deleteTeam
}