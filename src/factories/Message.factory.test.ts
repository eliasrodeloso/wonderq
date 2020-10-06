import Message from "./Message.factory"

describe("Message class", () => {
  const message = new Message({ message: "dummy" })

  it("should create an instance of a message", () => {
    expect(message).toBeDefined()
    expect(message).toBeInstanceOf(Message)
  })

  it("should return true if the message id is a valid uuid", () => {
    jest.spyOn(Message, "isValidId")
    expect(Message.isValidId(message.id)).toBeTruthy()
    expect(Message.isValidId).toBeCalled()
  })

  it("should return false if an invalid id is sent to the static isValidId method", () => {
    jest.spyOn(Message, "isValidId")
    expect(Message.isValidId("dummy")).toBeFalsy()
    expect(Message.isValidId).toBeCalled()
  })

  it("should return the created message on the get method", () => {
    jest.spyOn(message, "get")
    const localMessage = message.get()
    expect(message.get).toBeCalled()
    expect(localMessage).toBeDefined()
    expect(localMessage.message).toStrictEqual("dummy")
    expect(Message.isValidId(localMessage.id)).toBeTruthy()
  })

  it("should lock a message for the dummyUser user", () => {
    jest.spyOn(message, "lock")
    message.lock("dummyUser")
    expect(message.lock).toBeCalledWith("dummyUser")
    expect(message.lastAccessBy).toStrictEqual("dummyUser")
  })

  it("should unlock the message for the same dummyUser", () => {
    jest.spyOn(message, "unlock")
    message.unlock("dummyUser")
    expect(message.unlock).toBeCalledWith("dummyUser")
    expect(message.lastAccessBy).toStrictEqual(null)
  })
})
