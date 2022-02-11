let mongoose = require('mongoose')

let Team = mongoose.Schema(
    {
        teamName: {
            type: String,
            default: '',
            required: 'Team name is required'
        },
        teamOwner:{
            type: String,
            default: ''
        },
        users:{
            type: [String],
            default: []
        }, 
        projects:{
            type: [String],
            default: []
        }
    }, {
        collection:'teams'
    }
)

module.exports = mongoose.model('Team', Team)