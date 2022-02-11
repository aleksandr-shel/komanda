let express = require('express')
let router = express.Router()

//connect to model
let User = require('../models/user')

/* GET users listing. */
router.get('/', (req, res)=> {
  User.find((err, users)=>{
    if(err){
      console.log(err)
      res.send('error occurred' + err)
    } else {
      res.send(users)
    }
  })
})

router.get('/:id/teams', (req,res)=>{
	User.findById(req.params.id, (err, user)=>{
		if (err){
			console.log(err);
			res.send('error occurred' + err)
		} else {
			res.send(user?.teams)
		}
	})
})

router.get('/:id', (req,res)=>{
	User.findById(req.params.id, (err, user)=>{
		if (err){
			console.log(err);
			res.send('error occurred' + err);
		} else {
			res.send(user);
		}
	})
})

//does not work for some reason
router.delete('/delete/:id', (req,res)=>{
  let id = req.params.id;
  User.remove({_id:id},(err)=>{
    if (err){
      res.send(err);
    } else {
      res.send({message:'User was deleted'})
    }
  })
})

module.exports = router