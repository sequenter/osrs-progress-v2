import { getItem, setItem } from './storage.utils';
import { writable } from 'svelte/store';

export const baseStore = <T>(key: string, defaultStore: T) => {
	const { set, update, subscribe } = writable<T>(getItem(key) || defaultStore);

	subscribe((store) => {
		setItem(key, store);
	});

	return {
		set,
		update,
		subscribe
	};
};

export const updateStoreArray = (arr: string[], value: string) => {
	if (arr.includes(value)) {
		arr = arr.filter((item) => item !== value);
	} else {
		arr = [...arr, value];
	}

	return arr;
};
