import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.route({
    method: 'GET',
    url: '/',
    handler: async (request, reply) => {
      return { api_version: 'v1' };
    },
  });
};

export default root;
