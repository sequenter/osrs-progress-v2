import { QUESTS } from '..';
import { SCHEMA_QUEST } from '../schema';
import { validateJSONWithSchema } from '$lib/utils/test.utils';

describe('Quests JSON data', () => {
	it('Does not have any errors on validation', () => {
		expect(
			validateJSONWithSchema(QUESTS, {
				type: 'array',
				items: SCHEMA_QUEST
			})
		).to.be.null;
	});
});
