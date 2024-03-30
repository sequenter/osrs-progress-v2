/* eslint-disable  @typescript-eslint/no-explicit-any */
export const setItem = (key: string, val: any) => {
	localStorage.setItem(key, JSON.stringify(val));
};

export const getItem = (key: string) => {
	const item = localStorage.getItem(key);
	return item && JSON.parse(item);
};
