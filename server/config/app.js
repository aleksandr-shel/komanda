let express = require('express')
require('path')
let cookieParser = require('cookie-parser')
let bodyParser = require('body-parser')

const cors = require('cors')
let mongoose = require('mongoose')
let DB = require('./db')

mongoose.connect(DB.URI, {useNewUrlParser: true, useUnifiedTopology: true})

let mongoDB = mongoose.connection
mongoDB.on('error', console.error.bind(console, 'Connection Error:'))
mongoDB.once('open',()=>{
    console.log('Connected to MongoDB...')
})

let usersRoute = require('../routes/users.routes')
let teamsRoute = require('../routes/teams.routes')

let app = express()

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cookieParser())

//routing
app.use('/api/users', usersRoute);
app.use('/api/teams', teamsRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});
  
// error handler
app.use(function(err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500);
    res.render('error', { title: 'Error'})
})

module.exports = app