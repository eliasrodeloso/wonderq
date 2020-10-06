import { Router } from "express"
import messagesMiddleware from "../../middlewares/messages.middleware"
import controllers from "./message.controllers"

const messagesRouter = Router()

messagesRouter.use(messagesMiddleware())

messagesRouter
  .route("/")
  .get(controllers.getMessages)
  .post(controllers.createMessage)

messagesRouter.route("/:messageId").get(controllers.getMessage)

messagesRouter.route("/:messageId/process").delete(controllers.processMessage)

export default messagesRouter
