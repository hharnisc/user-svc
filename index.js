const grpc = require('grpc');

const proto = grpc.load('./user.proto');

console.log('proto', proto);
