import { NextFunction, Request, Response } from "express"
import Messages from "../factories/Messages.factory"

export interface IRequest extends Request {
  messages?: Messages
}

export default function messagesMiddleware() {
  const messages = new Messages()
  return (req: IRequest, res: Response, next: NextFunction) => {
    req.messages = messages
    next()
  }
}
