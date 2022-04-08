const request = require("supertest");
const app = require("../config/app");

let projectId = '';
const teamId = '624638801b44d32e19039ad2';

describe("POST /api/projects/create", function () {
    it("Adds a project", function (done) {
      // Use supertest to run assertions for our API
      request(app)
        .post("/api/projects/create")
        .send({
            projectName:'Project API test', 
          team: teamId
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