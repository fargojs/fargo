import flugin from 'fastify-plugin';

export const storage = flugin(() => {}, {
  name: 'storage'
});

// declare module 'fastify' {
//   interface FastifyInstance {
//     storage: Storage;
//   }
// }
