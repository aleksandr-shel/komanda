const request = require("supertest");
const app = require("../config/app");

let teamId = '';
const userId = '624638368520e00012824bf0';

describe("POST /api/teams/create", function () {
    it("Adds a team", function (done) {
        request(app)
            .post("/api/teams/create")
            .send({
                teamName: 'Team Test',
                teamOwner: userId,
                users: [userId]
            })
            .expect(200)
            .end((err, res) => {
                teamId = res._body._id
                if (err) {
                    throw err;
                }

                done()
            })
    });
})

describe("GET /api/teams", function () {
    it("List all teams", function (done) {
        request(app).get("/api/teams").expect(200, done);
    });
});

describe("DELETE /api/teams/:teamId", function () {
    it("Deletes a particular team", function (done) {
        request(app)
            .delete(`/api/teams/${teamId}`)
            .expect(200, done);
    });
});