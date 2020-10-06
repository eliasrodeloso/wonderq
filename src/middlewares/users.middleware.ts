import { NextFunction, Request, Response } from "express"
import User from "../factories/User.factory"
import Users from "../factories/Users.factory"

export interface IUsersRequest extends Request {
  users?: Users
  currentUser?: User
}

export default function usersMiddleware() {
  const users = new Users()
  return (req: IUsersRequest, res: Response, next: NextFunction) => {
    const user = new User(req.ip, req.get("user-content-id"))

    const previousUser = users.users.get(user.uuid)
    previousUser?.updateUser()

    if (previousUser) {
      req.currentUser = previousUser
    } else {
      users.addUser(user)
      req.currentUser = user
    }

    req.users = users
    next()
  }
}
