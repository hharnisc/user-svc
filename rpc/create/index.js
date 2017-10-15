const {createError} = require('@hharnisc/micro-rpc')
const {validate} = require('isemail')

module.exports = async ({
  email
}, {
  db
}) => {
  if (!email) {
    throw createError({message: 'Missing Input Parameter'})
  }
  if (!validate(email)) {
    throw createError({message: 'Invalid Input: email'})
  }
  try {
    const result = await db.insertOne({
      email,
      verified: false
    })
    return {
      id: result.insertedId
    }
  } catch (err) {
    if (err.code === 11000) {
      throw createError({message: 'Email Address Already Exists'})
    }
    throw err
  }
}
