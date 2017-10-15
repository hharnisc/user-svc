const update = require('./index')

describe('rpc/update', () => {
  it('should update an existing user', async () => {
    const email = 'test@test.com'
    const dataId = '1234'
    const data = {test: true}
    const expectedResult = {
      matchedCount: 1
    }
    const db = {
      updateOne: jest.fn(() => Promise.resolve(expectedResult))
    }
    const result = await update({email, dataId, data}, {db})
    expect(db.updateOne)
      .toBeCalledWith({
        email
      }, {
        $set: {
          [`data.${dataId}`]: data
        }
      })
    expect(result)
      .toEqual({
        updated: true
      })
  })
})
