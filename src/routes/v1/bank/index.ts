import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { ServerError, SuccessErrorResponse, SuccessResponse } from '../../../lib/responseHandler';
import { get_bank_ifsc_request, get_branch_body_request_schema, get_branch_request_schema } from '../../../utility/jsonValidSchema';

const root = async (fastify, opts): Promise<void> => {
	fastify.route({
		method: 'GET',
		url: '/get-bank-from-ifsc/:ifsc',
		preValidation: [fastify.authenticate],
		schema: {
			security: [{ ApiToken: [] }],
			tags: ['Bank'],
			description: 'Get Bank info from branch IFSC code.',
			params: get_bank_ifsc_request,
		},
		handler: async (request, reply) => {
			try {
				const { ifsc } = request.params;

				const client = await fastify.pg.connect();
				const { rows } = await client.query(`SELECT * FROM banks WHERE id=(SELECT bank_id FROM branches WHERE ifsc='${ifsc}');`);

				if (rows.length <= 0) {
					return SuccessErrorResponse(reply, 'IFSC code not found in the Database.');
				}

				client.release();
				return SuccessResponse(reply, 'success-response', {
					message: rows,
				});
			} catch (error) {
				return ServerError(reply, 'internal-server-error', error);
			}
		},
	});

	fastify.route({
		method: 'POST',
		url: '/get-branch-info/:bank_name/:city',
		preValidation: [fastify.authenticate],
		schema: {
			security: [{ ApiToken: [] }],
			tags: ['Branch'],
			description: 'Find branch with Bank name and city name',
			params: get_branch_request_schema,
			body: get_branch_body_request_schema,
		},
		handler: async (request, reply) => {
			try {
				const { bank_name, city } = request.params;
				const { offset, limit } = request.body;

				const client = await fastify.pg.connect();
				const { rows } = await client.query(
					`SELECT * FROM branches WHERE bank_id = (SELECT id FROM banks WHERE name='${bank_name}') AND city = '${city}' LIMIT ${limit} OFFSET ${offset};`,
				);

				if (rows.length <= 0) {
					return SuccessErrorResponse(reply, 'No Branch found.');
				}

				client.release();
				return SuccessResponse(reply, 'success-response', {
					message: {
						data: rows,
						metadata: {
							offset,
							limit,
						},
					},
				});
			} catch (error) {
				return ServerError(reply, 'internal-server-error', error);
			}
		},
	});
};

export default root;
