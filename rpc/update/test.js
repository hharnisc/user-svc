const update = require('./index')

describe('rpc/update', () => {
  it('should update an existing user', async () => {
    const email = 'test@test.com'
    const appId = '1234'
    const appData = {test: true}
    const expectedResult = {
      matchedCount: 1
    }
    const db = {
      updateOne: jest.fn(() => Promise.resolve(expectedResult))
    }
    const result = await update({email, appId, appData}, {db})
    expect(db.updateOne)
      .toBeCalledWith({
        email
      }, {
        $set: {
          [`data.${appId}`]: appData
        }
      })
    expect(result)
      .toEqual({
        updated: true
      })
  })

  it('should throw an error if email is missing', async () => {
    try {
      await update({}, {})
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
      await update({email}, {})
      throw new Error('This Should Fail')
    } catch (err) {
      expect(err.message)
        .toBe('Invalid Input: email')
      expect(err.handled)
        .toBe(true)
    }
  })

  it('should ensure appId exists', async () => {
    const email = 'test@test.com'
    const appData = {test: true}
    try {
      await update({email, appData}, {})
    } catch (err) {
      expect(err.message)
        .toBe('Invalid Input: appId')
      expect(err.handled)
        .toBe(true)
    }
  })

  it('should only accept string appIds', async () => {
    const email = 'test@test.com'
    const appId = 1234
    const appData = {test: true}
    try {
      await update({email, appId, appData}, {})
    } catch (err) {
      expect(err.message)
        .toBe('Invalid Input: appId')
      expect(err.handled)
        .toBe(true)
    }
  })

  it('should update and remove data from an existing user', async () => {
    const email = 'test@test.com'
    const appId = '1234'
    const expectedResult = {
      matchedCount: 1
    }
    const db = {
      updateOne: jest.fn(() => Promise.resolve(expectedResult))
    }
    const result = await update({email, appId}, {db})
    expect(db.updateOne)
      .toBeCalledWith({
        email
      }, {
        $unset: {
          [`data.${appId}`]: ''
        }
      })
    expect(result)
      .toEqual({
        updated: true
      })
  })

  it('should not update a user who does not exist', async () => {
    const email = 'test@test.com'
    const appId = '1234'
    const appData = {test: true}
    const expectedResult = {
      matchedCount: 0
    }
    const db = {
      updateOne: jest.fn(() => Promise.resolve(expectedResult))
    }
    const result = await update({email, appId, appData}, {db})
    expect(db.updateOne)
      .toBeCalledWith({
        email
      }, {
        $set: {
          [`data.${appId}`]: appData
        }
      })
    expect(result)
      .toEqual({
        updated: false
      })
  })
})
