import { NextFunction, Response } from "express"
import { IUsersRequest } from "./users.middleware"
import Messages from "../factories/Messages.factory"

export interface IRequest extends IUsersRequest {
  messages?: Messages
}

export default function messagesMiddleware() {
  const messages = new Messages()
  return (req: IRequest, res: Response, next: NextFunction) => {
    req.messages = messages
    next()
  }
}
