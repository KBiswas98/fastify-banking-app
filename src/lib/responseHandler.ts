import { IErrorType200, IErrorType400, IErrorType500 } from '../types/v1';

export const ServerError = (reply: any, state?: IErrorType500, error?: string) => {
  switch (state) {
    case 'internal-server-error':
      return reply.status(500).send({
        status: false,
        error: {
          message:
            !!error && process.env.NODE_ENV === 'development'
              ? error
              : 'The request was not completed due to an internal error on the server side.',
        },
      });
    default:
      return reply.status(503).send({
        status: false,
        error: {
          message:
            !!!error && process.env.NODE_ENV === 'development'
              ? error
              : 'The server was unavailable.',
        },
      });
  }
};

//4XX
export const ErrorResponse = (reply: any, state: IErrorType400, error?: string) => {
  switch (state) {
    case 'bad-request':
      return reply.status(400).send({
        status: false,
        error: {
          message: !!error ? error : 'bad request, please check your request.',
        },
      });
    case 'unauthorized':
      return reply.status(401).send({
        status: false,
        error: {
          message: !!error
            ? error
            : 'The request did not include an authentication token or the authentication token was expired.',
        },
      });
    case 'forbidden':
      return reply.status(403).send({
        status: false,
        error: {
          message: !!error
            ? error
            : 'The client did not have permission to access the requested resource.',
        },
      });
    case 'not-allow':
      return reply.status(405).send({
        status: false,
        error: {
          message: !!error
            ? error
            : 'The HTTP method in the request was not supported by the resource.',
        },
      });
    default:
      return reply.status(404).send({
        status: false,
        error: {
          message: 'The requested resource was not found.',
        },
      });
  }
};

export const SuccessErrorResponse = (reply: any, error?: string) => {
  return reply.status(200).send({
    status: false,
    error: error,
  });
};

// 2XX
export const SuccessResponse = (reply: any, state: IErrorType200, data?: unknown) => {
  switch (state) {
    case 'success-response':
      return reply.status(200).send({
        status: true,
        payload: data,
      });
    case 'created-response':
      return reply.status(201).send({
        status: true,
        payload: data,
      });
    default:
      return reply.status(202).send({
        status: true,
      });
  }
};
