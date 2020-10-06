## WonderQ

An amazing project, one of the best that I have done so far

Some recommendations:

- There is Postman collection for the API with all the requests documented and explained
- To test properly is imperative that you use the `User-Content-Id` header on the Get all messages endpoint, can take any value
- There is a constant called `TIME_TO_UNLOCK_MESSAGE` on the `src/factories/Message.factory.ts` file to set the time where a message can be unlocked so other users can see it

## Discussion

#### What steps would you need to take in order to scale this system to make it production ready for very high volume?

Firstly, I would add authentication for the producers and writers, then I would add more middlewares to check the data coming in and handle errors properly, to make it safer to deal with, and also I would add a way to rate the API limits, don't know exactly how is done, **yet**. I would add a database, probably NoSQL, like MongoDB with an excellent ORM, Mongoose most likely, to make it easier to read and write to and make it more fail-safe to validations and type errors. I would use gzip compression, defintely I would use async functions, I would increase the type safety of the code and finally would add more quantity and quality tests

#### What are potential issues in production that might arise and how would you go about implementing solutions?

In the current solution:

- Invalid data insertion to the Javascript objects, let's say a double quote on the message sent to be created if it wasn't correctly scaped. Can be solved with a robust middleware, though it is taken care now
- Multiple users having the same access to the information, I mean, this is not currently "100% bullet-proof" to have different users. Could be solved with a robust management of users and along with middlewares to make sure the access priviliges are setted correctly
- Large amount of data could significantly slow performance on the responses time, even though, the Map object was created to precisely manage large amount of data on Javascript, this by itself is not enough. Can be solved, with the ORM, along with optimized stored data
- And a lot more, like, DDOS attacks because there is not API limits and is totally unprotected. Like I said, **I still** don't know about this part, but I'm pretty sure that I will find out about it

In a future implementation with all tools and technolgies mentioned on the previous question:

- Probably, because the solution uses time-sensitive information and the built-in Date object on Javascript as-is is not enough, could be errors of timing and information access, so, a solution could be either create a library from scratch where we can adjust this to our needs or use a robust library out there and test, test, and test more
- Also, since it could be a large code base, whenever a developer does a change to adapt the application to a new feature, unintended consequences could happen like breaking a feature that was previously tested and in production, the new bugs, there is when end-to-end testing come in handy, so, cypress could be a good solution there
