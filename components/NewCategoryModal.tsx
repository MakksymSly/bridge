import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import Category from './Category';
import { useStore } from '@/store/store';
import { ICategory } from '@/types/ICategory';

interface Props {
	handleCategoryModalToggle: () => void;
	setSelectedCategory: (category: ICategory) => void;
}

const NewCategoryModal: React.FC<Props> = (props) => {
	const { handleCategoryModalToggle, setSelectedCategory } = props;
	const categories = useStore((state) => state.categories);

	const handleChoseCategory = (category: ICategory) => {
		setSelectedCategory(category);
		handleCategoryModalToggle();
	};
	return (
		<View style={styles.container}>
			<ScrollView>
				<View style={styles.categoriesContainer}>
					{categories.map((category) => (
						<TouchableOpacity key={category.id}>
							<Category category={category} handleChoseCategory={handleChoseCategory} />
						</TouchableOpacity>
					))}
					<TouchableOpacity>
						<View style={styles.priorityContainer}>
							<Entypo name="plus" size={24} color="#fff" />
						</View>
					</TouchableOpacity>
				</View>
			</ScrollView>
			<TouchableOpacity style={styles.cancelButton} onPress={handleCategoryModalToggle}>
				<Text style={styles.priorityText}>CANCEL</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#363636',
		padding: 20,
		borderRadius: 15,
		width: '90%',
		maxHeight: '80%',
		top: -150,
		alignItems: 'center',
	},
	categoriesContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 10,
		justifyContent: 'flex-start',
		width: '100%',
	},
	priorityContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		padding: 10,
		width: 100,
		height: 50,
		borderRadius: 10,
	},
	priorityText: {
		color: '#fff',
		marginLeft: 5,
	},
	cancelButton: {
		backgroundColor: '#8687E7',
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
		marginTop: 30,
		borderRadius: 8,
	},
});

export default NewCategoryModal;
