import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import React from 'react';
import { ICategory } from '@/types/ICategory';
import { useStore } from '@/store/store';
import { useTranslation } from 'react-i18next';

interface Props {
	category: ICategory;
	handleChoseCategory: (category: ICategory) => void;
}

const Category: React.FC<Props> = ({ category, handleChoseCategory }) => {
	const { t } = useTranslation();
	const deleteCategory = useStore((state) => state.deleteTodoCategory);
	const categoryExists = useStore((state) => state.categories.some((c) => c.id === category.id));
	const theme = useStore((state) => state.currentTheme);

	const handleLongPress = () => {
		Alert.alert('Actions', '', [
			{
				text: `${t('delete')}`,
				style: 'destructive',
				onPress: () => {
					deleteCategory(category.id);
				},
			},

			{ text: `${t('cancel')}`, style: 'cancel' },
		]);
	};

	if (!categoryExists) return null;

	return (
		<TouchableOpacity onPress={() => handleChoseCategory(category)} onLongPress={handleLongPress}>
			<View style={[styles.priorityContainer, { backgroundColor: category.color }]}>
				<Text style={[styles.priorityText, { color: theme.colors.text }]}>{category.icon}</Text>
				<Text numberOfLines={1} style={[styles.priorityText, { color: theme.colors.text }]}>
					{category.name}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	priorityContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		padding: 10,
		width: 100,
		borderRadius: 10,
		height: 50,
		minWidth: 150,
	},
	priorityText: {
		marginLeft: 5,
		maxWidth: 100,
	},
});

export default Category;
