import fp from 'fastify-plugin';

export default fp(async (fastify, opts, next) => {
	fastify.register(require('fastify-postgres'), {
		connectionString: process.env.DB_URI,
		ssl: {
			rejectUnauthorized: false,
		},
	});
});
