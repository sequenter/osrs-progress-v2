import Ajv, { type JSONSchemaType, type Schema } from 'ajv/dist/ajv';

export function validateJSONWithSchema(json: object, schema: Schema | JSONSchemaType<unknown>) {
	const validate = new Ajv().compile(schema);
	validate(json);

	return validate?.errors;
}
