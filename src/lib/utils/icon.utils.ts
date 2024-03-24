import { default as agility } from '$lib/assets/icons/skills/Agility.png';
import { default as attack } from '$lib/assets/icons/skills/Attack.png';
import { default as construction } from '$lib/assets/icons/skills/Construction.png';
import { default as cooking } from '$lib/assets/icons/skills/Cooking.png';
import { default as crafting } from '$lib/assets/icons/skills/Crafting.png';
import { default as defence } from '$lib/assets/icons/skills/Defence.png';
import { default as farming } from '$lib/assets/icons/skills/Farming.png';
import { default as firemaking } from '$lib/assets/icons/skills/Firemaking.png';
import { default as fishing } from '$lib/assets/icons/skills/Fishing.png';
import { default as fletching } from '$lib/assets/icons/skills/Fletching.png';
import { default as herblore } from '$lib/assets/icons/skills/Herblore.png';
import { default as hitpoints } from '$lib/assets/icons/skills/Hitpoints.png';
import { default as hunter } from '$lib/assets/icons/skills/Hunter.png';
import { default as magic } from '$lib/assets/icons/skills/Magic.png';
import { default as mining } from '$lib/assets/icons/skills/Mining.png';
import { default as prayer } from '$lib/assets/icons/skills/Prayer.png';
import { default as ranged } from '$lib/assets/icons/skills/Ranged.png';
import { default as runecraft } from '$lib/assets/icons/skills/Runecraft.png';
import { default as slayer } from '$lib/assets/icons/skills/Slayer.png';
import { default as smithing } from '$lib/assets/icons/skills/Smithing.png';
import { default as strength } from '$lib/assets/icons/skills/Strength.png';
import { default as thieving } from '$lib/assets/icons/skills/Thieving.png';
import { default as woodcutting } from '$lib/assets/icons/skills/Woodcutting.png';
import type { Skills } from '$lib/data/types';

export const Mapper: { [key in Skills]: string } = {
	Agility: agility,
	Attack: attack,
	Construction: construction,
	Cooking: cooking,
	Crafting: crafting,
	Defence: defence,
	Farming: farming,
	Firemaking: firemaking,
	Fishing: fishing,
	Fletching: fletching,
	Herblore: herblore,
	Hitpoints: hitpoints,
	Hunter: hunter,
	Magic: magic,
	Mining: mining,
	Prayer: prayer,
	Ranged: ranged,
	Runecraft: runecraft,
	Slayer: slayer,
	Smithing: smithing,
	Strength: strength,
	Thieving: thieving,
	Woodcutting: woodcutting
};
