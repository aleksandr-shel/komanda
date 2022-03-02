

//connect to model
let Team = require('../models/team')
let User = require('../models/user')

const getUsers = async (req, res) => {
    User.find((err, users) => {
      if (err) {
        console.log(err)
        res.send('error occurred' + err)
      } else {
        res.send(users)
      }
    })
  }


const getUsersTeams = async (req, res) => {
    User.findById(req.params.id, async (err, user) => {
      if (err) {
        console.log(err);
        res.send('error occurred' + err)
      } else {
        const teamsIdList = user?.teams;
        const teamsList = await Team.find({ '_id': { $in: teamsIdList } }); //get all teams by ID that are in teamsIdList
        res.send(teamsList);
      }
    })
  }

const getUser = async (req, res) => {
    User.findById(req.params.id, (err, user) => {
      if (err) {
        console.log(err);
        res.send('error occurred' + err);
      } else {
        res.send(user);
      }
    })
  }


//does not work because of auth0?
const deleteUser = async (req, res) => {
    let id = req.params.id;
    User.remove({ _id: id }, (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send({ message: 'User was deleted' })
      }
    })
  }
  

module.exports = {
    getUsers,
    getUsersTeams,
    getUser,
    deleteUser
}