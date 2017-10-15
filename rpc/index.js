const {
 rpc,
 method
} = require('@hharnisc/micro-rpc')
const create = require('./create')
const get = require('./get')

module.exports = rpc(
  method('create', create),
  method('get', get),
  method('update', () => 'update'),
  method('delete', () => 'delete'),
  method('verify', () => 'verify'),
)
