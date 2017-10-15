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
      .toEqual({
        deleted: true
      })
  })

  it('should throw an error if email is missing', async () => {
    try {
      await deleteUser({}, {})
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
      await deleteUser({email}, {})
      throw new Error('This Should Fail')
    } catch (err) {
      expect(err.message)
        .toBe('Invalid Input: email')
      expect(err.handled)
        .toBe(true)
    }
  })

  it('should not delete a user who does not exist', async () => {
    const email = 'test@test.com'
    const expectedResult = {
      deletedCount: 0
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
      .toEqual({
        deleted: false
      })
  })
})
