import { DateTime, Duration } from "luxon"
import baseConfig from "../config/environment.config"
import { v5 as uuid, validate as validateUuid } from "uuid"

const TIME_TO_UNLOCK_MESSAGE = 5

export interface IMessage {
  id?: string
  message: string
  lastAccess?: string
}

export default class Message {
  id: string = ""
  message: string = ""
  lastAccess: string = ""
  lastAccessBy: string | null = null

  constructor({ message, id, lastAccess }: IMessage) {
    this.id = id || uuid(message, baseConfig.uuidNamespace)
    this.message = message
    this.lastAccess = lastAccess || new Date().toISOString()
  }

  static isValidId(messageId: string) {
    return validateUuid(messageId)
  }

  lock(userId: string) {
    this.lastAccess = new Date().toISOString()
    this.lastAccessBy = userId
  }

  unlock(userId?: string) {
    const unlockAfter = DateTime.fromISO(this.lastAccess).plus(
      Duration.fromObject({ minutes: TIME_TO_UNLOCK_MESSAGE })
    )
    const nowDate = DateTime.local()

    if (nowDate > unlockAfter || userId === this.lastAccessBy) {
      this.lastAccessBy = null
    }
  }

  get() {
    return {
      id: this.id,
      message: this.message,
    }
  }
}
