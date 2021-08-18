import fastifyPlugin from 'fastify-plugin';

module.exports = fastifyPlugin(async (fastify) => {
  fastify.decorate('jwtauthentication', async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (error) {
      reply.send(error);
    }
  });
});
