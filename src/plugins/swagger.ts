import fp from 'fastify-plugin';
import { SensibleOptions } from 'fastify-sensible';

export default fp<SensibleOptions>(async fastify => {
	fastify.register(require('fastify-swagger'), {
		routePrefix: '/documentation',
		swagger: {
			info: {
				title: 'aiofmes app apis',
				description: 'Testing the Fastify swagger API',
				version: '0.1.0',
			},
			externalDocs: {
				url: 'https://swagger.io',
				description: 'Find more info here',
			},
			host: process.env.BASE_URL.split('//')[1],
			schemes: ['http', 'https'],
			consumes: ['application/json'],
			produces: ['application/json'],
			securityDefinitions: {
				ApiToken: {
					description: 'Authorization header token, sample: "Bearer #TOKEN#"',
					type: 'apiKey',
					name: 'Authorization',
					in: 'header',
				},
			},
		},
		uiConfig: {
			deepLinking: false,
		},

		staticCSP: true,
		transformStaticCSP: (header: any) => header,
		exposeRoute: true,
	});
});
