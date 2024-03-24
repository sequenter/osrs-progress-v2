export const setItem = (key: string, val: object) => {
	localStorage.setItem(key, JSON.stringify(val));
};

export const getItem = (key: string) => {
	const item = localStorage.getItem(key);
	return item && JSON.parse(item);
};
