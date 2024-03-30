import { baseStore } from '$lib/utils/store.utils';

export interface SettingDetails {
	general__ironman: boolean;
	general__recommended: boolean;
	general__all: boolean;
	show__combat: boolean;
	show__completed: boolean;
	show__upcoming: number;
	show: {
		achievements: boolean;
		quests: boolean;
		pets: boolean;
		collections: boolean;
	};
}

export const Settings = baseStore('settings', {
	general__ironman: false,
	general__recommended: false,
	general__all: false,
	show__combat: false,
	show__completed: false,
	show__upcoming: 10,
	show: {
		achievements: true,
		quests: true,
		pets: true,
		collections: true
	}
} as SettingDetails);
