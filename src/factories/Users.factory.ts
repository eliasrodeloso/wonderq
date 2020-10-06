import User from "./User.factory"

/**
 * Manage the users that access to the API
 */
export default class Users {
  users: Map<string, User> = new Map()

  constructor() {
    this.users = new Map()
  }

  addUser(user: User) {
    this.users.set(user.uuid, user)
  }

  getUserLastAcces(userId: string) {
    if (!this.users.has(userId)) {
      throw new Error("User doesn't exist")
    }
    return this.users.get(userId)?.getLastAccessTime()
  }

  updateUserLastAccess(userId: string) {
    if (!this.users.has(userId)) {
      throw new Error("User doesn't exist")
    }

    // this logic is needed because this method can return an undefined
    // if the item is not on the map
    // but since I already check if the record is on the map
    // I can be certain the new Message part is never going to happen
    const tempUser = this.users.get(userId) || new User("dummy")
    tempUser?.updateUser()
    this.users.set(userId, tempUser)
  }

  getUserByIp(userIp: string) {}
}
