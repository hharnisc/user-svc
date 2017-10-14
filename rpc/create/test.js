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
        verified: false
      })
    expect(result)
      .toEqual({
        id
      })
  })

  it('show throw an error if email is missing', async () => {
    try {
      await create({}, {})
    } catch (err) {
      expect(err.message)
        .toBe('Missing Input Parameter')
    }
  })
})
