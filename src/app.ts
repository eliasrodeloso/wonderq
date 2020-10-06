import express from "express"
import cors from "cors"
import { json } from "body-parser"

import messagesRouter from "./resources/messages/message.router"
import usersMiddleware from "./middlewares/users.middleware"

const app = express()

app.disable("x-powered-by")

app.use(cors())
app.use(json())
app.use(usersMiddleware())

app.use("/api/v1/messages", messagesRouter)

export default app
