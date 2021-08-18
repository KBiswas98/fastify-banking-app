export const generateJwtToken = async (fastify, email) => {
	return await fastify.jwt.sign({ email }, { expiresIn: parseInt(process.env.JWT_EXPIRES) });
};
