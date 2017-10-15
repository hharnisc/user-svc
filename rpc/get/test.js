const get = require('./index')

describe('rpc/get', () => {
  it('should get an existing user', async () => {
    const email = 'test@test.com'
    const expectedResult = {
      _id: '123456',
      email,
      verified: true
    }
    const db = {
      findOne: jest.fn(() => Promise.resolve(expectedResult))
    }
    const result = await get({email}, {db})
    expect(db.findOne)
      .toBeCalledWith({
        email
      })
    expect(result)
      .toEqual(expectedResult)
  })

  it('should throw an error if email is missing', async () => {
    try {
      await get({}, {})
    } catch (err) {
      expect(err.message)
        .toBe('Missing Input Parameter')
      expect(err.handled)
        .toBe(true)
    }
  })

  it('should throw an error if email is invalid', async () => {
    const email = 'email'
    try {
      await get({email}, {})
      throw new Error('This Should Fail')
    } catch (err) {
      expect(err.message)
        .toBe('Invalid Input: email')
      expect(err.handled)
        .toBe(true)
    }
  })
})
