const {
 rpc,
 method
} = require('@hharnisc/micro-rpc')
const create = require('./create')
const get = require('./get')
const deleteUser = require('./delete')
const verify = require('./verify')

module.exports = rpc(
  method('create', create),
  method('get', get),
  method('update', () => 'update'),
  method('delete', deleteUser),
  method('verify', verify),
)
