import grpc from 'grpc';

const proto = grpc.load('./user.proto');

const create = (call, cb) => {
  console.log('call', call); // eslint-disable-line no-console
  cb(null, {
    id: 'id',
    email: 'test@test.com',
    emails: ['test@test.com'],
    providers: {
      google: {
        accessToken: '123',
        refressToken: '456',
      },
    },
    roles: ['read', 'write'],
  });
};

const server = new grpc.Server();
server.addProtoService(proto.user.User.service, { create });
server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
server.start();
