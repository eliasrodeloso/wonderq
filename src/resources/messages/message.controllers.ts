import { Response } from "express"
import { IRequest } from "middlewares/messages.middleware"
import Message from "../../factories/Message.factory"

function getMessages(req: IRequest, res: Response) {
  try {
    res
      .status(200)
      .json({ data: req.messages?.getMessages(req.currentUser?.uuid) })
  } catch (error) {
    res.status(400).send("Error getting messages")
  }
}

function createMessage(req: IRequest, res: Response) {
  try {
    const message = new Message({ message: req.body.message })

    req.messages?.addMessage(message)

    res.status(201).json({ data: message.get() })
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

function processMessage(req: IRequest, res: Response) {
  try {
    if (!Message.isValidId(req.params.messageId)) {
      throw new Error("Message id provided is invalid")
    }

    const result = req.messages?.deleteMessage(req.params.messageId)
    if (result) {
      res.status(204).json()
    } else {
      res.status(404).json({ error: "Message not found" })
    }
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export default {
  getMessages,
  createMessage,
  processMessage,
}
