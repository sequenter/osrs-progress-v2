import { baseStore } from '$lib/utils/store.utils';

export interface QuestDetails {
	items: string[];
	qp: number;
}

export const Quests = baseStore('quests', { items: [], qp: 0 } as QuestDetails);
