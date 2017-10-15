const create = require('./index')

describe('rpc/create', () => {
  it('should create a new user', async () => {
    const email = 'test@test.com'
    const id = '12345'
    const insertResult = {
      insertedId: id
    }
    const db = {
      insertOne: jest.fn(() => Promise.resolve(insertResult))
    }
    const result = await create({email}, {db})
    expect(db.insertOne)
      .toBeCalledWith({
        email,
        verified: false,
        data: {}
      })
    expect(result)
      .toEqual({
        id
      })
  })

  it('should throw an error if email is missing', async () => {
    try {
      await create({}, {})
    } catch (err) {
      expect(err.message)
        .toBe('Missing Input Parameter')
      expect(err.handled)
        .toBe(true)
    }
  })

  it('should throw an error if email is invalid', async () => {
    const email = 'email'
    const id = '12345'
    const insertResult = {
      insertedId: id
    }
    const db = {
      insertOne: jest.fn(() => Promise.resolve(insertResult))
    }
    try {
      await create({email}, {db})
      throw new Error('This Should Fail')
    } catch (err) {
      expect(err.message)
        .toBe('Invalid Input: email')
      expect(err.handled)
        .toBe(true)
    }
  })

  it('should throw an error if the email address already exists', async () => {
    const email = 'test@gmail.com'
    const errorMessage = 'Email Address Already Exists'
    const error = new Error('email')
    error.code = 11000
    const db = {
      insertOne: jest.fn(() => Promise.reject(error))
    }
    try {
      await create({email}, {db})
      throw new Error('This Should Fail')
    } catch (err) {
      expect(err.message)
        .toBe(errorMessage)
      expect(err.handled)
        .toBe(true)
    }
  })
})
