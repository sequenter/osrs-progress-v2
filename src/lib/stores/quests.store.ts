import { getItem, setItem } from '$lib/utils/storage.utils';
import { writable } from 'svelte/store';

export const Quests = writable<string[]>(getItem('quests') || []);

Quests.subscribe((val) => {
	setItem('quests', val);
});
