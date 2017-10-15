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
})
