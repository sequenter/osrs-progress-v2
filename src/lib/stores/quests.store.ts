import { getItem, setItem } from '$lib/utils/storage.utils';
import { writable } from 'svelte/store';

export interface QuestDetails {
	quests: string[];
	qp: number;
}

export const Quests = writable<QuestDetails>(
	getItem('quests') || {
		quests: [],
		qp: 0
	}
);

Quests.subscribe((val) => {
	setItem('quests', val);
});
