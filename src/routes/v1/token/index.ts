import { SuccessErrorResponse, SuccessResponse } from '../../../lib/responseHandler';
import { generate_token_schema } from '../../../utility/jsonValidSchema';
import { generateJwtToken } from '../../../utility/token';

const root = async (fastify, opts): Promise<void> => {
	fastify.route({
		method: 'GET',
		url: '/generate-new-token/:email',
		schema: {
			tags: ['Token'],
			description: 'Generate JWT token',
			params: generate_token_schema,
		},
		handler: async (request, reply) => {
			const { email } = request.params;
			const jwtToken = await generateJwtToken(fastify, email);
			return SuccessResponse(reply, 'created-response', { jwtToken, email });
		},
	});
};

export default root;
