import { getItem, setItem } from '$lib/utils/storage.utils';
import { writable } from 'svelte/store';

export interface SettingDetails {
	general__ironman: boolean;
	general__recommended: boolean;
	show__combat: boolean;
	show__completed: boolean;
	show__upcoming: number;
}

const defaultStore: SettingDetails = getItem('settings') || {
	general__ironman: false,
	general__recommended: false,
	show__combat: false,
	show__completed: false,
	show__upcoming: 10
};

export const Settings = writable<SettingDetails>(defaultStore);

Settings.subscribe((val) => {
	setItem('settings', val);
});
