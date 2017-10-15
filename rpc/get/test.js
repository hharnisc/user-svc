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
})
