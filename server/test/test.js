const request = require('supertest');
const app = require('../config/app')


// API tests
describe('POST /api/tasks/create', function() {
    it('Adds a task', function(done) {
    // Use supertest to run assertions for our API
    request(app)
    .post('/api/tasks/create')
    .send({ taskName: "API test 01",
            description: "API unit testing",
            status: "processing",
            project: "62456982873f2311d17b1515",
            deadline: Date.now(),
            assignedUsers: ["621b177de013710011684ec5"],
            importance: "Medium" })
    .expect(200, done);
    });
});
    describe('GET /api/tasks', function() {
    it('List all tasks', function(done) {
    request(app)
    .get('/api/tasks')
    .expect(200, done);
    });
    });
    describe('GET /api/tasks/:taskId', function() {
    it('Gets a particular task', function(done) {
    request(app)
    // Here, you should use the ids generated from the tasks you have in your db
    .get('/tasks/957095a3-fff0-47a5-9d2f-d64fddbd67e2')
    .expect(200, done);
    });
    });
    describe('PUT /api/tasks/:taskId', function() {
    it('Updates a particular task', function(done) {
    request(app)
    .put('/tasks/957095a3-fff0-47a5-9d2f-d64fddbd67e2')
    .send({ title : "Updated task buoy" })
    .expect(200, done);
    });
    });
    describe('DELETE /api/tasks/:taskId', function() {
    it('Deletes a particular task', function(done) {
    request(app)
    .delete('/tasks/8e88212c-2a05-4774-a371-9638cc897e52')
    .expect(200, done);
    });
    });