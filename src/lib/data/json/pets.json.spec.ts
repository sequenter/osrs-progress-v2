import { PETS } from '..';
import { SCHEMA_PET } from '../schema';
import { validateJSONWithSchema } from '$lib/utils/test.utils';

describe('Collections JSON data', () => {
	it('Does not have any errors on validation', () => {
		expect(
			validateJSONWithSchema(PETS, {
				type: 'array',
				items: SCHEMA_PET
			})
		).to.be.null;
	});
});
