let mongoose = require('mongoose')

let User = mongoose.Schema(
    {
        email: {
            type: String,
            default: '',
            trim: true,
            required: 'mail is required',
            unique: true,
            dropDups: true
        },
        teams:{
            type: [String],
            default: []
        }
    }, {
        collection:'user'
    }
)

module.exports = mongoose.model('User', User)