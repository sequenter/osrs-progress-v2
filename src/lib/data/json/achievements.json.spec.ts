import { ACHIEVEMENTS } from '..';
import { SCHEMA_ACHIEVEMENT } from '../schema';
import { validateJSONWithSchema } from '$lib/utils/test.utils';

describe('Achievements JSON data', () => {
	it('Does not have any errors on validation', () => {
		expect(
			validateJSONWithSchema(ACHIEVEMENTS, {
				type: 'array',
				items: SCHEMA_ACHIEVEMENT
			})
		).to.be.null;
	});
});
