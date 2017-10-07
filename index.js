const {
 rpc,
 method
} = require('@hharnisc/micro-rpc')

module.exports = rpc(
  method('create', () => 'create'),
  method('get', () => 'get'),
  method('update', () => 'update'),
  method('delete', () => 'delete'),
  method('verify', () => 'verify'),
)
