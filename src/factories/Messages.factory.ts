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

  /**
   * Get all messages
   */
  getMessages(): Array<IMessage> {
    const arrayMessages = []
    for (const message of this.messages.values()) {
      if (!message.locked) {
        arrayMessages.push(message.get())
      }
    }
    return arrayMessages
  }

  /**
   * Lock a message on the map
   *
   * @param {String} messageId to be locked
   */
  setMessageLocked(messageId: string): IMessage | null {
    if (!this.messages.has(messageId)) {
      throw new Error("Message not founf")
    }
    const tempMessage =
      this.messages.get(messageId) || new Message({ message: "dummy" })
    tempMessage?.lock()
    this.messages.set(messageId, tempMessage)
    return tempMessage.get()
  }

  /**
   * Unlock a message on the map
   *
   * @param {String} messageId to be unlocked
   */
  setMessageUnlocked(messageId: string) {
    if (!this.messages.has(messageId)) {
      throw new Error("Message not found")
    }
    const tempMessage =
      this.messages.get(messageId) || new Message({ message: "dummy" })
    tempMessage?.unlock()
    this.messages.set(messageId, tempMessage)
  }

  /**
   * Delete a message on the map
   *
   * @param {String} messageId to be deleted
   */
  deleteMessage(messageId: string): boolean {
    if (!this.messages.has(messageId)) {
      throw new Error("Message not founf")
    }
    return this.messages.delete(messageId)
  }
}
