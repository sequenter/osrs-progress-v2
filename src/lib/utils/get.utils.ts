import type {
	Achievement,
	Collection,
	Concern,
	Pet,
	Quest,
	Requirements,
	RewardSkills,
	Skill,
	SkillDetail
} from '$lib/data/types';
import type { QuestDetails } from '$stores/quests.store';
import type { SettingDetails } from '$stores/settings.store';
import type { SkillDetails } from '$stores/skills.store';

export const getAchievements = (
	achievements: Achievement[],
	skillsStore: SkillDetails,
	settingsStore: SettingDetails,
	questsStore: QuestDetails
) => {
	const arr: (Achievement & { upcoming: boolean })[] = [];
	const instance = checkRequirements.getInstance(skillsStore, settingsStore, questsStore);

	achievements.forEach((achievement) => {
		const result = instance.isFulfilled(achievement.requirements);

		(result.fulfilled || settingsStore.general__all) &&
			arr.push({ ...achievement, upcoming: result.upcoming });
	});

	return arr;
};

export const getQuests = (
	quests: Quest[],
	skillsStore: SkillDetails,
	settingsStore: SettingDetails,
	questsStore: QuestDetails
) => {
	const arr: (Quest & { upcoming: boolean })[] = [];
	const instance = checkRequirements.getInstance(skillsStore, settingsStore, questsStore);

	quests.forEach((quest) => {
		const result = instance.isFulfilled(quest.requirements);
		const skillRewards = quest.rewards.Skills
			? rewardsUnlocked(quest.rewards.Skills, skillsStore)
			: true;

		((skillRewards && result.fulfilled) || settingsStore.general__all) &&
			arr.push({ ...quest, upcoming: result.upcoming });
	});

	return arr;
};

export const getPets = (
	pets: Pet[],
	skillsStore: SkillDetails,
	settingsStore: SettingDetails,
	questsStore: QuestDetails
) => {
	const arr: (Pet & { upcoming: boolean })[] = [];
	const instance = checkRequirements.getInstance(skillsStore, settingsStore, questsStore);

	pets.forEach((pet) => {
		const result = instance.isFulfilled(pet.requirements);

		(result.fulfilled || settingsStore.general__all) &&
			arr.push({ ...pet, upcoming: result.upcoming });
	});

	return arr;
};

export const getCollections = (
	collections: Collection[],
	skillsStore: SkillDetails,
	settingsStore: SettingDetails,
	questsStore: QuestDetails
) => {
	const arr: (Collection & { upcoming: boolean })[] = [];
	const instance = checkRequirements.getInstance(skillsStore, settingsStore, questsStore);

	collections.forEach((collection) => {
		const result = instance.isFulfilled(collection.requirements);

		(result.fulfilled || settingsStore.general__all) &&
			arr.push({ ...collection, upcoming: result.upcoming });
	});

	return arr;
};

const rewardsUnlocked = (skills: RewardSkills, skillsStore: SkillDetails) => {
	return (
		(skills.allOf?.every((skill) => !skillsStore.items[skill].locked) ?? true) &&
		(skills.anyOf?.some((skill) => !skillsStore.items[skill].locked) ?? true)
	);
};

class checkRequirements {
	private static instance: checkRequirements;

	private questsStore!: QuestDetails;
	private settingsStore!: SettingDetails;
	private skillsStore!: SkillDetails;
	private isUpcoming!: boolean;

	public static getInstance = (
		skillsStore: SkillDetails,
		settingsStore: SettingDetails,
		questsStore: QuestDetails
	): checkRequirements => {
		if (checkRequirements.instance) {
			checkRequirements.instance.update(skillsStore, settingsStore, questsStore);
		} else {
			checkRequirements.instance = new checkRequirements(skillsStore, settingsStore, questsStore);
		}

		return checkRequirements.instance;
	};

	private constructor(
		skillStore: SkillDetails,
		settingsStore: SettingDetails,
		questsStore: QuestDetails
	) {
		this.update(skillStore, settingsStore, questsStore);
	}

	public update = (
		skillStore: SkillDetails,
		settingsStore: SettingDetails,
		questsStore: QuestDetails
	) => {
		this.questsStore = questsStore;
		this.settingsStore = settingsStore;
		this.skillsStore = skillStore;
		this.isUpcoming = false;
	};

	public isFulfilled = (requirements: Requirements) => {
		let fulfilled = true;
		this.isUpcoming = false;

		if (requirements.main) fulfilled = this.checkConcerns(requirements.main);
		if (fulfilled && this.settingsStore.general__ironman && requirements.ironman)
			fulfilled = this.checkConcerns(requirements.ironman);

		return { fulfilled, upcoming: this.isUpcoming };
	};

	private checkConcerns = (concerns: Concern[]) => {
		for (const concern of concerns) {
			if (!this.checkConcern(concern)) return false;
		}

		return true;
	};

	private checkConcern = (concern: Concern) => {
		for (const detail of concern.detail) {
			let fulfilled = true;

			if (detail.combat) fulfilled = this.checkCombat(detail.combat);
			if (fulfilled && detail.QP) fulfilled = this.checkQuestPoints(detail.QP);
			if (fulfilled && detail.combatLevel) fulfilled = this.checkCombatLevel(detail.combatLevel);
			if (fulfilled && detail.quests) fulfilled = this.checkQuests(detail.quests);
			if (fulfilled && detail.skills) fulfilled = this.checkSkills(detail.skills);

			if (fulfilled) return true;
		}

		return false;
	};

	private checkQuestPoints = (qp: number) => {
		return this.questsStore.qp >= qp;
	};

	private checkQuests = (quests: string[]) => {
		return quests.every((quest) => this.questsStore.items.includes(quest));
	};

	private checkCombat = (combat: boolean) => {
		return !combat || this.settingsStore.show__combat;
	};

	private checkCombatLevel = (combatLevel: number) => {
		return this.skillsStore.combatLevel >= combatLevel;
	};

	private checkSkills = (detail: { allOf?: SkillDetail; anyOf?: SkillDetail }) => {
		let fulfilled = true;
		this.isUpcoming = false;

		if (detail.allOf) {
			fulfilled = (Object.entries(detail.allOf) as [Skill, number][]).every(this.checkSkill);
		}

		if (fulfilled && detail.anyOf) {
			fulfilled = (Object.entries(detail.anyOf) as [Skill, number][]).some(this.checkSkill);
		}

		return fulfilled;
	};

	private checkSkill = ([key, value]: [Skill, number]) => {
		const skill = this.skillsStore.items[key];
		const upcoming = skill.level + this.settingsStore.show__upcoming >= value;

		this.isUpcoming = this.isUpcoming || (!skill.locked && upcoming != skill.level >= value);

		return !skill.locked && upcoming;
	};
}
