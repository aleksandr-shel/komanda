const express = require('express');


const router = express.Router();

let Team = require('../models/team');

router.get('/', (req,res)=>{

    Team.find((err, teams)=>{
        if(err){
          console.log(err)
          res.send('error occured' + err);
        } else {
          res.send(teams);
        }
      })

})




module.exports = router;