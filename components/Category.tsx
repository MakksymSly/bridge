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

	const handleLongPress = () => {
		Alert.alert('Actions', '', [
			{
				text: `${t('delete')}`,
				style: 'destructive',
				onPress: () => {
					deleteCategory(category.id);
				},
			},
			{ text: `${t('edit')}`, style: 'default' },
			{ text: `${t('cancel')}`, style: 'cancel' },
		]);
	};

	if (!categoryExists) return null;

	return (
		<TouchableOpacity onPress={() => handleChoseCategory(category)} onLongPress={handleLongPress}>
			<View style={[styles.priorityContainer, { backgroundColor: category.color }]}>
				<Text style={styles.priorityText}>{category.icon}</Text>
				<Text numberOfLines={1} style={styles.priorityText}>
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
	},
	priorityText: {
		color: '#fff',
		marginLeft: 5,
	},
});

export default Category;
