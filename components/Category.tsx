import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { ICategory } from '@/types/ICategory';
interface Props {
	category: ICategory;
	handleChoseCategory: (category: ICategory) => void;
}
const Category: React.FC<Props> = (props) => {
	const { category } = props;
	return (
		<TouchableOpacity onPress={() => props.handleChoseCategory(category)}>
			<View style={[styles.priorityContainer, { backgroundColor: category.color }]}>
				<Text>{category.icon}</Text>
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
