import { validateJSONWithSchema } from './test.utils';

describe('Test utils', () => {
	describe(validateJSONWithSchema, () => {
		const testSchema = {
			additionalProperties: false,
			properties: {
				foo: {
					type: 'string'
				},
				bar: {
					type: 'number'
				},
				bang: {
					additionalProperties: false,
					properties: {
						whizz: {
							type: 'boolean'
						},
						pang: {
							enum: ['ping', 'pong', 'peng', 'pung']
						},
						thunk: {
							items: {
								enum: ['bish', 'bash', 'bosh']
							},
							type: 'array'
						}
					},
					required: ['whizz', 'pang', 'thunk'],
					type: 'object'
				}
			},
			required: ['foo', 'bar', 'bang'],
			type: 'object'
		};

		it('Returns null for a valid object', () => {
			expect(
				validateJSONWithSchema(
					{
						foo: 'Fizz Buzz',
						bar: 42,
						bang: {
							whizz: false,
							pang: 'ping',
							thunk: ['bish', 'bash']
						}
					},
					testSchema
				)
			).to.be.null;
		});

		it('Returns errors for an invalid object', () => {
			expect(
				validateJSONWithSchema(
					{
						oof: 'Fizz Buzz',
						rab: 24,
						ganb: {
							zzihw: true,
							gnap: 'gnip',
							knuht: ['hsib', 'hsab']
						}
					},
					testSchema
				)
			).to.have.length.greaterThan(0);

			expect(
				validateJSONWithSchema(
					{
						foo: 'Fizz Buzz',
						bar: 42,
						bang: {
							whizz: false,
							pang: 'bish',
							thunk: ['ping', 'pong']
						}
					},
					testSchema
				)
			).to.have.length.greaterThan(0);

			expect(
				validateJSONWithSchema(
					{
						foo: 42,
						bar: 'Fizz Buzz',
						bang: {
							whizz: false,
							pang: 'ping',
							thunk: ['bish', 'bash']
						}
					},
					testSchema
				)
			).to.have.length.greaterThan(0);
		});
	});
});
