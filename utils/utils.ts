export const formatDate = (timestamp: number) => {
	return new Date(timestamp).toLocaleDateString('ru-RU');
};
