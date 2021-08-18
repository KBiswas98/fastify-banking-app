import S from 'fluent-json-schema';

export const generate_token_schema = S.object().prop('email', S.string().format(S.FORMATS.EMAIL).required());

export const get_bank_ifsc_request = S.object().prop('ifsc', S.string().required());

export const get_branch_request_schema = S.object().prop('bank_name', S.string().required()).prop('city', S.string().required());

export const get_branch_body_request_schema = S.object().prop('offset', S.number().required()).prop('limit', S.number().required());
