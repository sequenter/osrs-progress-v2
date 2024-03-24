import { getItem, setItem } from '$lib/utils/storage.utils';
import { writable } from 'svelte/store';

export const Achievements = writable<Array<string>>(getItem('achievements') || []);

Achievements.subscribe((val) => {
	setItem('achievements', val);
});
