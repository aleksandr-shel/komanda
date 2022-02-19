let mongoose = require('mongoose')

let Team = mongoose.Schema(
    {
        teamName: {
            type: String,
            default: '',
            required: 'Team name is required'
        },
        teamOwner: {
            type: mongoose.Schema.Types.ObjectId,
            default: ''
        },
        users: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "User",
            default: []
        },
        projects: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Project",
            default: []
        }
    }, {
    collection: 'teams'
}
)

module.exports = mongoose.model('Team', Team)