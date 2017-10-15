const deleteUser = require('./index')

describe('rpc/delete', () => {
  it('should delete an existing user', async () => {
    const email = 'test@test.com'
    const expectedResult = {
      deletedCount: 1
    }
    const db = {
      deleteOne: jest.fn(() => Promise.resolve(expectedResult))
    }
    const result = await deleteUser({email}, {db})
    expect(db.deleteOne)
      .toBeCalledWith({
        email
      })
    expect(result)
      .toEqual(true)
  })
})
