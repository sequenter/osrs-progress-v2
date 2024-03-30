import type { Requirements as RequirementDetails } from '$lib/data/types';
import { writable } from 'svelte/store';

export const Requirements = writable<RequirementDetails & { title?: string }>({});
