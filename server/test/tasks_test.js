const request = require("supertest");
const app = require("../config/app");

let taskId = '';
const projectId = '624638871b44d32e19039ad9';
// API tests
describe("POST /api/tasks/create", function () {
  it("Adds a task", function (done) {
    // Use supertest to run assertions for our API
    request(app)
      .post("/api/tasks/create")
      .send({
        taskName: "API test 01",
        description: "API unit testing",
        status: "processing",
        project: projectId,
        deadline: Date.now(),
        assignedUsers: ["621b177de013710011684ec5"],
        importance: "Medium",
      })
      .expect(200)
      .end((err, res)=>{
        createdTask = res._body;
        taskId = createdTask._id
        if (err){
          throw err;
        }
        
        done()
      })
  });
  
});
describe("GET /api/tasks", function () {
  it("List all tasks", function (done) {
    request(app).get("/api/tasks").expect(200, done);
  });
});
describe("GET /api/tasks/:taskId", function () {
  it("Gets a particular task", function (done) {
    request(app)
      // Here, you should use the ids generated from the tasks you have in your db
      .get(`/api/tasks/${taskId}`)
      .expect(200, done);
  });
});
describe("PUT /api/tasks/:taskId", function () {
  it("Updates a particular tas", function (done) {
    request(app)
      .put(`/api/tasks/update/${taskId}`)
      .send({
        taskName: "API test update",
        description: "API unit update testing",
        status: "processing",
        project: "62456982873f2311d17b1515",
        deadline: Date.now(),
        assignedUsers: ["621b177de013710011684ec5"],
        importance: "Medium",
      })
      .expect(200, done);
  });
});
describe("DELETE /api/tasks/:taskId", function () {
  it("Deletes a particular task", function (done) {
    request(app)
      .delete(`/api/tasks/delete/${taskId}`)
      .expect(200, done);
  });
});
