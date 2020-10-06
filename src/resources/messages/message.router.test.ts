import { Response } from "supertest"
import app from "../../app"
const request = require("supertest")

describe("Test message router", () => {
  const message = "dummy"

  test("It should response 404 to any other route on the messages router", (done) => {
    request(app).get("/api/v1/messages/route").expect(404, done)
  })

  test(`It should create a message with body ${message} on POST /api/v1/messages`, (done) => {
    request(app)
      .post("/api/v1/messages")
      .send({ message })
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(201)
      .end((err: any, res: Response) => {
        expect(res.body.data.message).toStrictEqual(message)
        done()
      })
  })

  test(`It should return an error if message is ${message} and is already created on POST /api/v1/messages`, (done) => {
    request(app)
      .post("/api/v1/messages")
      .send({ message })
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(409, done)
  })

  test(`It should return all the available messages with the Header User-Content-Id=1 on GET /api/v1/messages`, (done) => {
    request(app)
      .get("/api/v1/messages")
      .set("User-Content-Id", "1")
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(200, (error: any, res: Response) => {
        expect(res.body.data.length).toBeGreaterThan(0)
        done()
      })
  })

  test(`It should return an empty array if the Header is set to User-Content-Id=2 on GET /api/v1/messages`, (done) => {
    request(app)
      .get("/api/v1/messages")
      .set("User-Content-Id", "2")
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(200, (error: any, res: Response) => {
        expect(res.body.data.length).toStrictEqual(0)
        done()
      })
  })

  describe("It should delete a message", () => {
    var messageCreated = { id: "" }

    beforeAll(async () => {
      const res = await request(app)
        .post("/api/v1/messages")
        .send({ message: "dummy-a" })

      messageCreated = res.body.data
    })

    test(`It should delete the message with id ${messageCreated.id} on DELETE /api/v1/messages/${messageCreated.id}/process`, (done) => {
      request(app)
        .delete(`/api/v1/messages/${messageCreated?.id}/process`)
        .set("User-Content-Id", "1")
        .expect(204, done)
    })

    test(`It should return an error on get message with id ${messageCreated.id} on GET /api/v1/messages/${messageCreated.id}`, (done) => {
      request(app)
        .get(`/api/v1/messages/${messageCreated?.id}`)
        .set("User-Content-Id", "1")
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(404, done)
    })
  })
})
