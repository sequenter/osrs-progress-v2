# osrs-progress-v2

osrs-progress-v2 is an SPA, written with [SvelteKit](https://kit.svelte.dev/), that provides a UI to act as a companion to track progress on OldSchool Runescape. Originally written with spaghetti vanilla JavaScript (and a bit of ancient [jQuery](https://jquery.com/)), v2 was created to be a modern equivalent... with more features!

### Technology Stack

Written with [Svelte](https://svelte.dev/), [Typescript](https://www.typescriptlang.org/) and [Tailwind](https://tailwindcss.com/), JSON validation through [Ajv](https://ajv.js.org/) and [Vitest](https://vitest.dev/), formatted using [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/).

### Features

- View available achievements, quests, pets and collections (referred to as _tasks_) that reveal based on skill levels and quest completions.
- View current skills, quest points and task completion progress.
- View task requirements through their info dialogs.
- Progress is saved automatically through the use of `localStorage`.
- Settings toggles:
  - **Combat**: Enable combat and show combat related tasks.
  - **Completed**: Show tasks that have been completed.
  - **Disregard Requirements**: Show all tasks, regardless of requirements.
  - **Ironman**: Show tasks that have extra ironman requirements that have been fulfilled.
  - **Recommended**: Tasks will only show when _recommended_ (alongside required) stats have been fulfilled.
  - **Upcoming**: Show tasks that that aren't quite unlocked, but will be soon within a given amount of levels.

## Data

`Achievements`, `Collections`, `Pets`, `Quests` and `Skills` data in JSON format has been compiled from the [OSRS wiki](https://oldschool.runescape.wiki), with non top level null values omitted. Great effort has been made to consider requirements by drilling down into drop tables and reviewing the finer details, however, they can be incredibly broad - spot something missing? Make a contribution!

### Schemas

Each JSON file is mirrored with a Typescript interface and validated against a combined schema:

- [Achievement](#Achievement)
- [Collection](#Collection)
- [Pets](#Pet)
- [Quest](#Quest)
  - The `skills` object within the `rewards` object contains arrays of skills that the quest rewards XP in.
    - `allOf`: XP in these skills are always rewarded.
    - `anyOf`: XP rewards are given as a choice for these skills.
    - `xsomeOf`: XP is only potentially awarded in these skills, either one, some, or none, such as in the case of 'Observatory Quest' and 'Tai Bwo Wannai Trio'.
- [Requirements](#Requirements)
  - Can contain `main`, `ironman`, or neither. `ironman` requirements need to be fulfilled in addition to `main` requirements.
- [Concern](#Concern)
  - Concerns contain details of specific requirements.
  - If multiple concerns are present in `main` and/or `ironman` requirements, they all need to be fulfilled to fulfil the requirement.
- [ConcernDetail](#Concerndetail)
  - Optionally contains `combat`, `combatLevel`, `QP`, `quests` and `skills`.
  - Multiple _ConcernDetail_ on a _Concern_ object signifies that a _Concern_ can be fulfilled in several ways.
  - Only one _ConcernDetail_ needs to be fulfilled to fulfil the _Concern_.
  - Within the `skills` object, all skills and levels need to be fulfilled within `allOf`, whereas only one skill from `anyOf` needs to be fulfilled (in addition to `allOf`).
- [SkillDetail](#Skilldetail)

#### Achievement

```JSON
{
	"additionalProperties": false,
	"properties": {
		"diary": {
			"enum": [
				"Ardougne",
				"Desert",
				"Falador",
				"Fremennik",
				"Kandarin",
				"Karamja",
				"Kourend & Kebos",
				"Lumbridge & Draynor",
				"Morytania",
				"Varrock",
				"Western Provinces",
				"Wilderness"
			]
		},
		"difficulty": {
			"enum": ["Easy", "Medium", "Hard", "Elite"]
		},
		"id": {
			"type": "string"
		},
		"img": {
			"type": "string"
		},
		"requirements": {
			"$ref": "/Requirements"
		},
		"task": {
			"type": "string"
		}
	},
	"required": ["diary", "difficulty", "id", "img", "requirements", "task"],
	"type": "object"
}
```

#### Collection

```JSON
{
	"additionalProperties": false,
	"properties": {
		"items": {
			"items": {
				"type": "string"
			},
			"type": "array"
		},
		"name": {
			"type": "string"
		},
		"img": {
			"type": "string"
		},
		"requirements": {
			"$ref": "/Requirements"
		},
		"task": {
			"type": "string"
		}
	},
	"required": ["name", "img", "requirements", "items"],
	"type": "object"
}
```

#### Pet

```JSON
{
	"additionalProperties": false,
	"properties": {
		"name": {
			"type": "string"
		},
		"img": {
			"type": "string"
		},
		"requirements": {
			"$ref": "/Requirements"
		},
		"task": {
			"type": "string"
		}
	},
	"required": ["name", "img", "requirements", "items"],
	"type": "object"
}
```

#### Quest

```JSON
{
	"additionalProperties": false,
	"properties": {
		"difficulty": {
			"enum": [
				"Novice",
				"Intermediate",
				"Experienced",
				"Master",
				"Grandmaster",
				"Special"
			]
		},
		"img": {
			"type": "string"
		},
		"length": {
			"enum": [
				"Very Short",
				"Short",
				"Medium",
				"Long",
				"Very Long"
			]
		},
		"name": {
			"type": "string"
		},
		"release": {
			"type": "string"
		},
		"requirements": {
			"$ref": "/Requirements"
		},
		"rewards": {
			"additionalProperties": false,
			"properties": {
				"QP": {
					"type": "number"
				},
				"Skills": {
					"additionalProperties": false,
					"properties": {
						"allOf": {
							"items": {
								"enum": {
									"$ref": "/Skills"
								}
							},
							"type": "array"
						},
						"anyOf": {
							"items": {
								"enum": {
									"$ref": "/Skills"
								}
							},
							"type": "array"
						},
						"xsomeOf": {
							"items": {
								"enum": {
									"$ref": "/Skills"
								}
							},
							"type": "array"
						}
					},
					"type": "object"
				}
			},
			"type": "object"
		}
	},
	"required": ["difficulty", "img", "length", "name", "release", "requirements", "rewards"],
	"type": "object"
}
```

#### Requirements

```JSON
{
	"additionalProperties": false,
	"properties": {
		"ironman": {
			"items": {
                "$ref": "/Concern"
            },
			"type": "array"
		},
		"main": {
			"items": {
				"$ref": "/Concern"
			},
			"type": "array"
		}
	},
	"type": "object"
}
```

#### Concern

```JSON
{
	"additionalProperties": false,
	"properties": {
		"concern": {
			"type": "string"
		},
		"detail": {
			"items": {
				"$ref": "/ConcernDetail"
			},
			"type": "array"
		}
	},
	"required": ["concern", "detail"],
	"type": "object"
}
```

#### ConcernDetail

```JSON
{
	"additionalProperties": false,
	"properties": {
		"QP": {
			"type": "number"
		},
		"combat": {
			"type": "boolean"
		},
		"combatLevel": {
			"type": "number"
		},
		"quests": {
			"items": {
				"type": "string"
			},
			"type": "array"
		},
		"skills": {
			"additionalProperties": false,
			"properties": {
				"allOf": {
					"$ref": "/SkillDetail"
				},
				"anyOf": {
					"$ref": "/SkillDetail"
				}
			},
			"type": "object"
		}
	},
	"type": "object"
}
```

#### SkillDetail

```JSON
{
	"additionalProperties": false,
	"propertyNames": {
		"enum": {
			"$ref": "/Skills"
		}
	},
	"patternProperties": {
		".*": {
			"type": "number"
		}
	},
	"type": "object"
}
```
