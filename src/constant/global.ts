import { QUESTS } from '$lib/data';

export const WIKI_IMAGES_URL = 'https://oldschool.runescape.wiki/images/';

export const WIKI_IMAGES_ERROR = 'https://oldschool.runescape.wiki/images/Bank_filler.png';

export const ACHIEVEMENT_DIFFICULTY = ['Easy', 'Medium', 'Hard', 'Elite'] as const;

export const ACHIEVEMENT_DIARIES = [
	'Ardougne',
	'Desert',
	'Falador',
	'Fremennik',
	'Kandarin',
	'Karamja',
	'Kourend & Kebos',
	'Lumbridge & Draynor',
	'Morytania',
	'Varrock',
	'Western Provinces',
	'Wilderness'
] as const;

export const QUEST_DIFFICULTY = [
	'Novice',
	'Intermediate',
	'Experienced',
	'Master',
	'Grandmaster',
	'Special'
] as const;

export const QUEST_LENGTH = ['Very Short', 'Short', 'Medium', 'Long', 'Very Long'] as const;

export const DIFFICULTY_COMPARE: { [key in (typeof ACHIEVEMENT_DIFFICULTY)[number]]: number } = {
	Easy: 1,
	Medium: 2,
	Hard: 3,
	Elite: 4
};

export const COMBAT_SKILLS = [
	'Attack',
	'Strength',
	'Defence',
	'Ranged',
	'Prayer',
	'Magic',
	'Hitpoints'
] as const;

export const SKILLING_SKILLS = [
	'Runecraft',
	'Construction',
	'Agility',
	'Herblore',
	'Thieving',
	'Crafting',
	'Fletching',
	'Slayer',
	'Hunter',
	'Mining',
	'Smithing',
	'Fishing',
	'Cooking',
	'Firemaking',
	'Woodcutting',
	'Farming'
] as const;

export const SKILLS = [...COMBAT_SKILLS, ...SKILLING_SKILLS] as const;

export const QUEST_POINTS = QUESTS.reduce(
	(sum, { rewards }) => sum + (rewards.QP ? rewards.QP : 0),
	0
);
