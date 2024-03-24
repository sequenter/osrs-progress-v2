import type { Achievement, Requirements, Concern, SkillDetail, Skill } from '$lib/data/types';
import { type SkillDetails } from '$stores/skills.store';

export const getAchievements = (achievements: Achievement[], skillStore: SkillDetails) => {
	const arr: (Achievement & { upcoming: boolean })[] = [];

	achievements.forEach((achievement) => {
		const result = checkRequirements.getInstance(skillStore).isFulfilled(achievement.requirements);

		result.fulfilled && arr.push({ ...achievement, upcoming: result.upcoming });
	});

	return arr;
};

class checkRequirements {
	private static instance: checkRequirements;

	private skillStore!: SkillDetails;
	private upcomingLevel!: number;
	private isUpcoming!: boolean;

	public static getInstance = (skillStore: SkillDetails): checkRequirements => {
		if (checkRequirements.instance) {
			checkRequirements.instance.update(skillStore);
		} else {
			checkRequirements.instance = new checkRequirements(skillStore);
		}

		return checkRequirements.instance;
	};

	private constructor(skillStore: SkillDetails) {
		this.update(skillStore);
	}

	public update = (skillStore: SkillDetails) => {
		this.skillStore = skillStore;
		this.upcomingLevel = 10;
		this.isUpcoming = false;
	};

	public isFulfilled = (requirements: Requirements) => {
		let fulfilled = true;

		if (requirements.main) fulfilled = this.checkConcerns(requirements.main);
		if (fulfilled && requirements.ironman) fulfilled = this.checkConcerns(requirements.ironman);

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
			if (fulfilled && detail.skills) {
				this.isUpcoming = false;
				fulfilled = this.checkSkills(detail.skills);
			}

			if (fulfilled) return true;
		}

		return false;
	};

	private checkCombat = (combat: boolean) => {
		return !combat;
	};

	private checkSkills = (detail: { allOf?: SkillDetail; anyOf?: SkillDetail }) => {
		let fulfilled = true;

		if (detail.allOf) {
			fulfilled = (Object.entries(detail.allOf) as [Skill, number][]).every(this.checkSkill);
		}

		if (fulfilled && detail.anyOf) {
			fulfilled = (Object.entries(detail.anyOf) as [Skill, number][]).some(this.checkSkill);
		}

		return fulfilled;
	};

	private checkSkill = ([key, value]: [Skill, number]) => {
		this.isUpcoming =
			!this.skillStore[key].locked &&
			this.skillStore[key].level + this.upcomingLevel >= value !=
				this.skillStore[key].level >= value;

		return !this.skillStore[key].locked && this.skillStore[key].level + this.upcomingLevel >= value;
	};
}
