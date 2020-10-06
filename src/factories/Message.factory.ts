import baseConfig from "../config/environment.config"
import { v5 as uuid } from "uuid"

export interface IMessage {
  id?: string
  message: string
  locked?: boolean
  processed?: boolean
}

export default class Message {
  id: string = ""
  message: string = ""
  locked: boolean = false
  processed: boolean = false

  constructor({ message, id, locked, processed }: IMessage) {
    this.id = id || uuid(message, baseConfig.uuidNamespace)
    this.message = message
    this.locked = locked || false
    this.processed = processed || false
  }

  lock() {
    this.locked = true
  }

  unlock() {
    this.locked = false
  }

  setProcessed(value: boolean) {
    this.processed = value
  }

  get() {
    return {
      id: this.id,
      message: this.message,
      locked: this.locked,
      processed: this.processed,
    }
  }
}
