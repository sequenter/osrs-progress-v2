import type { Achievement, Concern, Requirements, Skill, SkillDetail } from '$lib/data/types';
import type { SettingDetails } from '$stores/settings.store';
import type { SkillDetails } from '$stores/skills.store';

export const getAchievements = (
	achievements: Achievement[],
	skillsStore: SkillDetails,
	settingsStore: SettingDetails
) => {
	const arr: (Achievement & { upcoming: boolean })[] = [];
	const instance = checkRequirements.getInstance(skillsStore, settingsStore);

	achievements.forEach((achievement) => {
		const result = instance.isFulfilled(achievement.requirements);

		result.fulfilled && arr.push({ ...achievement, upcoming: result.upcoming });
	});

	return arr;
};

class checkRequirements {
	private static instance: checkRequirements;

	private settingsStore!: SettingDetails;
	private skillsStore!: SkillDetails;
	private isUpcoming!: boolean;

	public static getInstance = (
		skillsStore: SkillDetails,
		settingsStore: SettingDetails
	): checkRequirements => {
		if (checkRequirements.instance) {
			checkRequirements.instance.update(skillsStore, settingsStore);
		} else {
			checkRequirements.instance = new checkRequirements(skillsStore, settingsStore);
		}

		return checkRequirements.instance;
	};

	private constructor(skillStore: SkillDetails, settingsStore: SettingDetails) {
		this.update(skillStore, settingsStore);
	}

	public update = (skillStore: SkillDetails, settingsStore: SettingDetails) => {
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
			if (fulfilled && detail.skills) fulfilled = this.checkSkills(detail.skills);

			if (fulfilled) return true;
		}

		return false;
	};

	private checkCombat = (combat: boolean) => {
		return combat ? this.settingsStore.show__combat : true;
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
		this.isUpcoming =
			!this.skillsStore[key].locked &&
			this.skillsStore[key].level + this.settingsStore.show__upcoming >= value !=
				this.skillsStore[key].level >= value;

		return (
			!this.skillsStore[key].locked &&
			this.skillsStore[key].level + this.settingsStore.show__upcoming >= value
		);
	};
}
