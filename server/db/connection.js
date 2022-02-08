// database setup
let { MongoClient } = require('mongodb')
let uri = 'mongodb+srv://admin:admin@cluster.6caek.mongodb.net/database?retryWrites=true&w=majority'
let client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

let _db
module.exports = {
	connectToServer: function (callback) {
		client.connect(function (err, db) {
			// Verify we got a good "db" object
			if (db)
			{
				_db = db.db('database')
				console.log('Successfully connected to MongoDB.')
			}
			return callback(err)
		});
	},

	getDb: function () {
		return _db
	},
}