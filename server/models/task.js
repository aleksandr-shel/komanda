let mongoose = require('mongoose')

let Task = mongoose.Schema(
    {
        taskName: {
            type: String,
            default: '',
            required: 'Task name is required'
        },
        description: {
            type:String,
            default:''
        },
        status:{
            type:String,
            default:''
        },
        project: {
            type: mongoose.Schema.Types.ObjectId,
            default: ''
        },
        deadline:{
            type:Date,
            default: Date.now
        },
        assignedUsers: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'User',
            default: []
        }
    }, {
    collection: 'tasks'
}
)

module.exports = mongoose.model('Task', Task)