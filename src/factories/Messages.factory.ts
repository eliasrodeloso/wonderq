import Message, { IMessage } from "./Message.factory"

/**
 * Class to store the messages as a Map
 */
export default class Messages {
  messages: Map<string, Message> = new Map()

  constructor(...messages: Array<Message>) {
    messages.forEach((message: Message) => {
      this.messages.set(message.id, message)
    })
  }

  /**
   * Retrieve a message from the map
   *
   * @param {String} messageId to be retrieved from the map
   */
  getMessage(messageId: string): IMessage | null {
    if (!this.messages.has(messageId)) {
      throw new Error("Message not found")
    }
    return this.messages.get(messageId) || null
  }

  /**
   * Add a message to the map
   *
   * @param {Message} message
   */
  addMessage(message: Message) {
    if (this.messages.has(message.id)) {
      throw new Error("Message already exists")
    }
    this.messages.set(message.id, message)
  }

  private unlockMessages(userId: string) {
    this.messages.forEach((message) => {
      message.unlock(userId)
    })
  }

  /**
   * Get all messages
   */
  getMessages(userId?: string): Array<IMessage> | null {
    if (!userId) {
      return null
    }

    this.unlockMessages(userId)
    const arrayMessages = []

    for (const message of this.messages.values()) {
      if (!message.lastAccessBy) {
        arrayMessages.push(message.get())
        message.lock(userId)
      }
    }
    return arrayMessages
  }

  // /**
  //  * Lock a message on the map
  //  *
  //  * @param {String} messageId to be locked
  //  */
  // setMessageLocked(messageId: string): IMessage | null {
  //   if (!this.messages.has(messageId)) {
  //     throw new Error("Message not found")
  //   }

  //   // this logic is needed because this method can return an undefined
  //   // if the item is not on the map
  //   // but since I already check if the record is on the map
  //   // I can be certain the new Message part is never going to happen
  //   const tempMessage =
  //     this.messages.get(messageId) || new Message({ message: "dummy" })
  //   tempMessage?.lock()
  //   this.messages.set(messageId, tempMessage)
  //   return tempMessage.get()
  // }

  /**
   * Delete a message on the map
   *
   * @param {String} messageId to be deleted
   */
  deleteMessage(messageId: string): boolean {
    if (!this.messages.has(messageId)) {
      throw new Error("Message not found")
    }
    return this.messages.delete(messageId)
  }
}
