import type { AchievementDifficulty, QuestDifficulty, Section } from '$lib/data/types';

export const TEXT_COLOUR: { [key in AchievementDifficulty | QuestDifficulty]: string } = {
	Easy: 'text-lime-500',
	Medium: 'text-sky-500',
	Hard: 'text-fuchsia-400',
	Elite: 'text-yellow-400',
	Novice: 'text-lime-500',
	Intermediate: 'text-sky-500',
	Experienced: 'text-fuchsia-400',
	Master: 'text-yellow-400',
	Grandmaster: 'text-red-400',
	Special: 'text-gray-500'
} as const;

export const SECTION_COLOUR: { [key in Section]: { text: string; background: string } } = {
	Achievements: {
		text: 'text-green-400',
		background: 'bg-green-400'
	},
	Quests: {
		text: 'text-blue-400',
		background: 'bg-blue-400'
	},
	Pets: {
		text: 'text-red-400',
		background: 'bg-red-400'
	},
	Collections: {
		text: 'text-yellow-400',
		background: 'bg-yellow-400'
	}
};
