import { baseStore } from '$lib/utils/store.utils';

export interface CollectionDetails {
	name: string;
	count: number;
	items: string[];
}

export const Collections = baseStore('collections', [] as CollectionDetails[]);
