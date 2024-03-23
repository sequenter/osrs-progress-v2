import {
	ACHIEVEMENT_DIARIES,
	ACHIEVEMENT_DIFFICULTY,
	QUEST_DIFFICULTY,
	QUEST_LENGTH,
	SKILLS
} from '$constant/global';

const SCHEMA_SKILLDETAIL = {
	additionalProperties: false,
	propertyNames: {
		enum: SKILLS
	},
	patternProperties: {
		'.*': {
			type: 'number'
		}
	},
	type: 'object'
} as const;

const SCHEMA_CONCERNDETAIL = {
	additionalProperties: false,
	properties: {
		QP: {
			type: 'number'
		},
		combat: {
			type: 'boolean'
		},
		combatLevel: {
			type: 'number'
		},
		quests: {
			items: {
				type: 'string'
			},
			type: 'array'
		},
		skills: {
			additionalProperties: false,
			properties: {
				allOf: SCHEMA_SKILLDETAIL,
				anyOf: SCHEMA_SKILLDETAIL
			},
			type: 'object'
		}
	},
	type: 'object'
} as const;

const SCHEMA_CONCERN = {
	additionalProperties: false,
	properties: {
		concern: {
			type: 'string'
		},
		detail: {
			items: SCHEMA_CONCERNDETAIL,
			type: 'array'
		}
	},
	required: ['concern', 'detail'],
	type: 'object'
} as const;

const SCHEMA_REQUIREMENTS = {
	additionalProperties: false,
	properties: {
		ironman: {
			items: SCHEMA_CONCERN,
			type: 'array'
		},
		main: {
			items: SCHEMA_CONCERN,
			type: 'array'
		}
	},
	type: 'object'
} as const;

export const SCHEMA_ACHIEVEMENT = {
	additionalProperties: false,
	properties: {
		diary: {
			enum: ACHIEVEMENT_DIARIES
		},
		difficulty: {
			enum: ACHIEVEMENT_DIFFICULTY
		},
		id: {
			type: 'string'
		},
		img: {
			type: 'string'
		},
		requirements: SCHEMA_REQUIREMENTS,
		task: {
			type: 'string'
		}
	},
	required: ['diary', 'difficulty', 'id', 'img', 'requirements', 'task'],
	type: 'object'
} as const;

export const SCHEMA_QUEST = {
	additionalProperties: false,
	properties: {
		difficulty: {
			enum: QUEST_DIFFICULTY
		},
		img: {
			type: 'string'
		},
		length: {
			enum: QUEST_LENGTH
		},
		name: {
			type: 'string'
		},
		release: {
			type: 'string'
		},
		requirements: SCHEMA_REQUIREMENTS,
		rewards: {
			additionalProperties: false,
			properties: {
				QP: {
					type: 'number'
				},
				Skills: {
					additionalProperties: false,
					properties: {
						allOf: {
							items: {
								enum: SKILLS
							},
							type: 'array'
						},
						anyOf: {
							items: {
								enum: SKILLS
							},
							type: 'array'
						},
						xsomeOf: {
							items: {
								enum: SKILLS
							},
							type: 'array'
						}
					},
					type: 'object'
				}
			},
			type: 'object'
		}
	},
	required: ['difficulty', 'img', 'length', 'name', 'release', 'requirements', 'rewards'],
	type: 'object'
} as const;

export const SCHEMA_COLLECTION = {
	additionalProperties: false,
	properties: {
		items: {
			items: {
				type: 'string'
			},
			type: 'array'
		},
		name: {
			type: 'string'
		},
		img: {
			type: 'string'
		},
		requirements: SCHEMA_REQUIREMENTS,
		task: {
			type: 'string'
		}
	},
	required: ['name', 'img', 'requirements', 'items'],
	type: 'object'
} as const;

export const SCHEMA_PETS = {
	additionalProperties: false,
	properties: {
		name: {
			type: 'string'
		},
		img: {
			type: 'string'
		},
		requirements: SCHEMA_REQUIREMENTS,
		task: {
			type: 'string'
		}
	},
	required: ['name', 'img', 'requirements', 'items'],
	type: 'object'
} as const;
