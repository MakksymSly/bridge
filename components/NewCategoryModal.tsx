import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import Category from './Category';
import { useStore } from '@/store/store';
import { ICategory } from '@/types/ICategory';
import CategoryCreator from './CategoryCreator';
import { useTranslation } from 'react-i18next';

interface Props {
	handleCategoryModalToggle: () => void;
	setSelectedCategory: (category: ICategory) => void;
}

const NewCategoryModal: React.FC<Props> = (props) => {
	const { t } = useTranslation();
	const { handleCategoryModalToggle, setSelectedCategory } = props;
	const categories = useStore((state) => state.categories);
	const theme = useStore((state) => state.currentTheme);
	const [isCreationModalVisible, setIsCreationModalVisible] = React.useState(false);

	const handleChoseCategory = (category: ICategory) => {
		setSelectedCategory(category);
		handleCategoryModalToggle();
	};

	const handleOpenCreationModal = () => {
		setIsCreationModalVisible(true);
	};

	return !isCreationModalVisible ? (
		<View style={[styles.container, { backgroundColor: theme.colors.card }]}>
			<ScrollView style={{ height: '100%' }}>
				<View style={styles.categoriesContainer}>
					<TouchableOpacity onPress={handleOpenCreationModal}>
						<View style={[styles.priorityContainer, { borderColor: theme.colors.border }]}>
							<Entypo name="plus" size={24} color={theme.colors.text} />
						</View>
					</TouchableOpacity>
					{categories.map((category) => (
						<TouchableOpacity key={category.id}>
							<Category category={category} handleChoseCategory={handleChoseCategory} />
						</TouchableOpacity>
					))}
				</View>
			</ScrollView>
			<TouchableOpacity style={[styles.cancelButton, { backgroundColor: theme.colors.notification }]} onPress={handleCategoryModalToggle}>
				<Text style={[styles.priorityText, { color: theme.colors.text }]}>{t('cancel')}</Text>
			</TouchableOpacity>
		</View>
	) : (
		<CategoryCreator setIsCreationModalVisible={setIsCreationModalVisible} />
	);
};

const styles = StyleSheet.create({
	container: {
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
		marginLeft: 5,
	},
	cancelButton: {
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
