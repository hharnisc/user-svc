const grpc = require('grpc');
const proto = grpc.load('./user.proto');

const client = new proto.user.User('localhost:50051', grpc.credentials.createInsecure());
client.create(
  {
    email: 'test@test.com',
    provider: 'google',
    providerInfo: {
      accessToken: '123',
      refressToken: '456',
    },
    roles: ['read', 'write'],
  },
  (err, response) => {
    console.log('response', response);
  }
);
