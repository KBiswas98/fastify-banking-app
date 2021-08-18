const root = async (fastify, opts): Promise<void> => {
	fastify.route({
		method: 'GET',
		url: '/health-check',
		handler: async (request, reply) => {
			return { status: true };
		},
	});
};

export default root;
