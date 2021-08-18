import fp from 'fastify-plugin';
import { ErrorResponse } from '../lib/responseHandler';

export default fp(async (fastify, opts, next) => {
	fastify.register(require('fastify-jwt'), {
		secret: process.env.JWT_SECRET,
	});

	fastify.decorate('authenticate', async function (request, reply) {
		try {
			const token = await request.jwtVerify();
			request.user = JSON.stringify({ email: token.email });
		} catch (err) {
			return reply.send(err);
		}
	});
});
