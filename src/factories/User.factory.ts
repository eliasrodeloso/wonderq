import baseConfig from "../config/environment.config"
import { v5 as uuid } from "uuid"

/**
 * User to store the last access time by uuid created by IP and uuidNamespace
 */
export default class User {
  uuid: string = ""
  lastAccessTime: string = ""
  currentAccessTime: string = ""

  constructor(userIp: string, headerContentId?: string) {
    this.uuid = uuid(`${userIp}${headerContentId}`, baseConfig.uuidNamespace)
    this.lastAccessTime = new Date().toISOString()
    this.currentAccessTime = new Date().toISOString()
  }

  /**
   * Update the last access time fot the user
   */
  updateUser() {
    this.lastAccessTime = this.currentAccessTime
    this.currentAccessTime = new Date().toISOString()
  }

  /**
   * Get the last access time for the user
   */
  getLastAccessTime() {
    return this.lastAccessTime
  }
}
