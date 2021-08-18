import { join } from 'path';

import fastify from 'fastify';
import AutoLoad from 'fastify-autoload';
import cors from 'fastify-cors';
import 'module-alias/register';
// Load env vars
import loadConfig from '@lib/config';

loadConfig();

export async function createServer() {
	const server = fastify({
		logger: {
			level: process.env.LOG_LEVEL,
		},
	});

	server.register(cors, { origin: '*' });

	server.register(AutoLoad, {
		dir: join(__dirname, 'plugins'),
	});

	server.register(AutoLoad, {
		dir: join(__dirname, 'routes'),
		ignorePattern: /.*(test|spec).ts/,
	});

	await server.ready();
	return server;
}

export async function startServer() {
	process.on('unhandledRejection', err => {
		console.error(err);
		process.exit(1);
	});

	const server = await createServer();
	await server.listen(+process.env.PORT, process.env.HOST);

	if (process.env.NODE_ENV === 'production') {
		for (const signal of ['SIGINT', 'SIGTERM']) {
			process.on(signal, () =>
				server.close().then(err => {
					console.log(`close application on ${signal}`);
					process.exit(err ? 1 : 0);
				}),
			);
		}
	}
}

startServer();
