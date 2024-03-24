import type {
	ACHIEVEMENT_DIARIES,
	ACHIEVEMENT_DIFFICULTY,
	QUEST_DIFFICULTY,
	QUEST_LENGTH,
	SKILLS
} from '$constant/global';

// Types
export type Skill = (typeof SKILLS)[number];

export type SkillDetail = { [key in Skill]?: number };

// Interfaces
export interface Achievement {
	diary: (typeof ACHIEVEMENT_DIARIES)[number];
	difficulty: (typeof ACHIEVEMENT_DIFFICULTY)[number];
	id: string;
	img: string;
	requirements: Requirements;
	task: string;
}

export interface Quest {
	difficulty: (typeof QUEST_DIFFICULTY)[number];
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
