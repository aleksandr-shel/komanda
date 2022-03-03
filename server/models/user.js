let mongoose = require('mongoose')

let User = mongoose.Schema(
    {
        email: {
            type: String,
            default: '',
            trim: true,
            required: 'email is required',
            unique: true,
            dropDups: true
        },
        teams: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Team',
            default: []
        }
    }, {
    collection: 'user'
}
)

module.exports = mongoose.model('User', User)