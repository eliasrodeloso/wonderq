import app from "./app"
const request = require("supertest")

describe("Test app", () => {
  test("It should response 404 to /", (done) => {
    request(app).get("/").expect(404, done)
  })
})
