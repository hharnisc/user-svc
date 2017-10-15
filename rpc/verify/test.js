const verify = require('./index')

describe('rpc/verify', () => {
  it('should verify an existing user', async () => {
    const email = 'test@test.com'
    const expectedResult = {
      matchedCount: 1
    }
    const db = {
      updateOne: jest.fn(() => Promise.resolve(expectedResult))
    }
    const result = await verify({email}, {db})
    expect(db.updateOne)
      .toBeCalledWith({
        email
      }, {
        $set: {
          verified: true
        }
      })
    expect(result)
      .toEqual({
        verified: true
      })
  })

  it('should throw an error if email is missing', async () => {
    try {
      await verify({}, {})
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
      await verify({email}, {})
      throw new Error('This Should Fail')
    } catch (err) {
      expect(err.message)
        .toBe('Invalid Input: email')
      expect(err.handled)
        .toBe(true)
    }
  })
})
