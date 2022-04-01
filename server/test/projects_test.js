const request = require("supertest");
const app = require("../config/app");

let projectId = '';


describe("POST /api/projects/create", function () {
    it("Adds a project", function (done) {
      // Use supertest to run assertions for our API
      request(app)
        .post("/api/projects/create")
        .send({
            projectName:'Project API test', 
            team: '621fd9b18158bf0e4d68815e'
        })
        .expect(200)
        .end((err, res)=>{
            projectId = res._body._id
            if (err){
                throw err;
            }
          
            done()
        })
    });
})

describe("GET /api/projects", function () {
    it("List all projects", function (done) {
      request(app).get("/api/projects").expect(200, done);
    });
});

describe("DELETE /api/projects/:taskId", function () {
    it("Deletes a particular project", function (done) {
      request(app)
        .delete(`/api/projects/delete/${projectId}`)
        .expect(200, done);
    });
  });