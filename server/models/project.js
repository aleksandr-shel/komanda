let mongoose = require('mongoose')

let Project = mongoose.Schema(
    {
        projectName: {
            type: String,
            default: '',
            required: 'Project name is required'
        },
        team: {
            type: mongoose.Schema.Types.ObjectId,
            default: ''
        },
        tasks: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Task",
            default: []
        }
    }, {
    collection: 'projects'
}
)

module.exports = mongoose.model('Project', Project)