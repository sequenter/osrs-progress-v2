import { getItem, setItem } from '$lib/utils/storage.utils';
import { writable } from 'svelte/store';

export const Pets = writable<string[]>(getItem('pets') || []);

Pets.subscribe((val) => {
	setItem('pets', val);
});
