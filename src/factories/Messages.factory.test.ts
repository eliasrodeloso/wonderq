import Message from "./Message.factory"
import Messages from "./Messages.factory"

describe("Messages class", () => {
  const messageA = new Message({ message: "dummy-a" })
  const messageB = new Message({ message: "dummy-b" })

  const messages = new Messages(messageA, messageB)

  test("the message attribute should be a map instance and correctly created", () => {
    expect(messages.messages).toBeInstanceOf(Map)
    expect(messages).toBeDefined()
    expect(messages).toBeInstanceOf(Messages)
  })

  it(`should return the information of message id ${messageA.id}`, () => {
    jest.spyOn(messages, "getMessage")
    expect(messages.getMessage(messageA.id)).toBe(messageA)
    expect(messages.getMessage).toBeCalledWith(messageA.id)
  })

  it(`should add a new message`, () => {
    const messageC = new Message({ message: "dummy-c" })
    jest.spyOn(messages, "addMessage")
    messages.addMessage(messageC)
    expect(messages.addMessage).toBeCalledWith(messageC)
    const obtained = messages.getMessage(messageC.id)
    expect(obtained?.id).toStrictEqual(messageC.id)
    expect(obtained?.message).toStrictEqual(messageC.message)
  })

  it("should delete a message", () => {
    const messageC = new Message({ message: "dummy-d" })
    jest.spyOn(messages, "deleteMessage")
    messages.addMessage(messageC)
    messages.deleteMessage(messageC.id)
    expect(messages.deleteMessage).toBeCalledWith(messageC.id)
    expect(() => {
      messages.getMessage(messageC.id)
    }).toThrowError("Message not found")
  })
})
