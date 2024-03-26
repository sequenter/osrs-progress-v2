import { getItem, setItem } from '$lib/utils/storage.utils';
import { writable } from 'svelte/store';

export const Achievements = writable<string[]>(getItem('achievements') || []);

Achievements.subscribe((val) => {
	setItem('achievements', val);
});
