import { Request, Response } from "express"
import { IRequest } from "../../middlewares/messages.middleware"
import Message from "../../factories/Message.factory"

function getMessages(req: Request, res: Response) {
  return res.status(200).json({ data: [] })
}

function createMessage(req: IRequest, res: Response) {
  try {
    const message = new Message({ message: req.body.message })

    req.messages?.addMessage(message)

    res.status(200).json({ data: message })
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

export default {
  getMessages,
  createMessage,
}
