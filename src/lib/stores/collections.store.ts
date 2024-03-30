import { baseStore } from '$lib/utils/store.utils';
import { COLLECTIONS } from '$lib/data';
import { get } from 'svelte/store';

export interface CollectionDetails {
	[x: string]: {
		count: number;
		items: string[];
	};
}

const defaultStore = () => {
	const obj: CollectionDetails = {};

	for (const collection of COLLECTIONS) {
		obj[collection.name] = {
			items: [],
			count: collection.items.length
		};
	}

	return obj;
};

export const Collections = baseStore('collections', defaultStore());

export const isComplete = (collection: string) => {
	const store = getCollectionItem(collection);
	return !!store && store.count === store.items.length;
};

export const itemComplete = (collection: string, item: string) => {
	const store = getCollectionItem(collection);
	return !!store && store.items.includes(item);
};

export const itemsCompleteCount = (collection: string, items: string[]) => {
	const store = getCollectionItem(collection);
	return store ? items.filter((item) => store.items.includes(item)).length : 0;
};

export const collectionCompleteCount = () => {
	const store = get(Collections);
	return Object.values(store).filter((collection) => collection.count === collection.items.length)
		.length;
};

const getCollectionItem = (item: string) => {
	return get(Collections)[item];
};
