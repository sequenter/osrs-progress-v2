import {
	ACHIEVEMENT_DIARIES,
	ACHIEVEMENT_DIFFICULTY,
	QUEST_DIFFICULTY,
	QUEST_LENGTH,
	SKILLS
} from '$constant/Global';

// Types
export type Skill = (typeof SKILLS)[number];
export type AchievementDifficulty = (typeof ACHIEVEMENT_DIFFICULTY)[number];
export type AchievementDiary = (typeof ACHIEVEMENT_DIARIES)[number];
export type QuestDifficulty = (typeof QUEST_DIFFICULTY)[number];
export type SkillDetail = { [key in Skill]?: number };

// Interfaces
export interface Achievement {
	diary: AchievementDiary;
	difficulty: AchievementDifficulty;
	id: string;
	img: string;
	requirements: Requirements;
	task: string;
}

export interface Quest {
	difficulty: QuestDifficulty;
	img: string;
	length: (typeof QUEST_LENGTH)[number];
	name: string;
	release: string;
	requirements: Requirements;
	rewards: {
		QP?: number;
		skills?: Skill[];
	};
}

export interface Requirements {
	main?: Concern[];
	ironman?: Concern[];
}

export interface Concern {
	concern: string;
	detail: ConcernDetail[];
}

export interface ConcernDetail {
	combat?: boolean;
	combatLevel?: number;
	quests?: string[];
	skills?: {
		allOf?: SkillDetail;
		anyOf?: SkillDetail;
	};
	QP?: number;
}
