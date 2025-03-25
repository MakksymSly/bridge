import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import Category from './Category';
import { useStore } from '@/store/store';
import { ICategory } from '@/types/ICategory';
import CategoryCreator from './CategoryCreator';

interface Props {
	handleCategoryModalToggle: () => void;
	setSelectedCategory: (category: ICategory) => void;
}

const NewCategoryModal: React.FC<Props> = (props) => {
	const { handleCategoryModalToggle, setSelectedCategory } = props;
	const categories = useStore((state) => state.categories);
	const [isCreationModalVisible, setIsCreationModalVisible] = React.useState(false);

	const handleChoseCategory = (category: ICategory) => {
		setSelectedCategory(category);
		handleCategoryModalToggle();
	};

	const handleOpenCreationModal = () => {
		setIsCreationModalVisible(true);
	};
	return !isCreationModalVisible ? (
		<View style={styles.container}>
			<ScrollView style={{ height: '100%' }}>
				<View style={styles.categoriesContainer}>
					<TouchableOpacity onPress={handleOpenCreationModal}>
						<View style={styles.priorityContainer}>
							<Entypo name="plus" size={24} color="#fff" />
						</View>
					</TouchableOpacity>
					{categories.map((category) => (
						<TouchableOpacity key={category.id}>
							<Category category={category} handleChoseCategory={handleChoseCategory} />
						</TouchableOpacity>
					))}
				</View>
			</ScrollView>
			<TouchableOpacity style={styles.cancelButton} onPress={handleCategoryModalToggle}>
				<Text style={styles.priorityText}>CANCEL</Text>
			</TouchableOpacity>
		</View>
	) : (
		<CategoryCreator setIsCreationModalVisible={setIsCreationModalVisible} />
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#363636',
		padding: 20,
		borderRadius: 15,
		width: '90%',
		maxHeight: '80%',
		top: 20,
		alignItems: 'center',
	},
	categoriesContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 10,
		justifyContent: 'flex-start',
		width: '100%',
		height: 300,
		maxHeight: 300,
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
		backgroundColor: '#FF4F4F',
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
		marginTop: 30,
		borderRadius: 8,
	},
	categoryButton: {
		color: '#fff',
	},
});

export default NewCategoryModal;
