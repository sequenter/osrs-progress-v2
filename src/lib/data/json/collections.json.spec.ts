import { COLLECTIONS } from '..';
import { SCHEMA_COLLECTION } from '../schema';
import { validateJSONWithSchema } from '$lib/utils/test.utils';

describe('Collections JSON data', () => {
	it('Does not have any errors on validation', () => {
		expect(
			validateJSONWithSchema(COLLECTIONS, {
				type: 'array',
				items: SCHEMA_COLLECTION
			})
		).to.be.null;
	});
});
