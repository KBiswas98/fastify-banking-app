import path from 'path';
import envSchema from 'env-schema';
import S from 'fluent-json-schema';

export default function loadConfig(): void {
	const result = require('dotenv').config({
		path: path.join(__dirname, `../../${process.env.NODE_ENV ?? 'development'}.env`),
	});

	if (result.error) {
		throw new Error(result.error);
	}

	envSchema({
		data: result.parsed,
		schema: S.object()
			.prop('NODE_ENV', S.string().enum(['development', 'production']).required())
			.prop('DB_URI', S.string().required())
			.prop('HOST', S.string().required())
			.prop('PORT', S.string().required())
			.prop('JWT_SECRET', S.string().required())
			.prop('JWT_EXPIRES', S.string().required()),
	});
}
