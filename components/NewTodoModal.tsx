import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { formatDate } from '@/utils/utils';
import { useStore } from '@/store/store';
import * as ImagePicker from 'expo-image-picker';
import Feather from '@expo/vector-icons/Feather';
import Octicons from '@expo/vector-icons/Octicons';
import NewCategoryModal from './NewCategoryModal';
import { ICategory } from '@/types/ICategory';

interface Props {
	setModalVisible: (visible: boolean) => void;
}

const NewTodoModal: React.FC<Props> = ({ setModalVisible }) => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [images, setImages] = useState<string[]>([]);
	const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
	const [isPriorityModalVisible, setPriorityModalVisible] = useState(false);
	const addTodo = useStore((state) => state.addTodo);
	const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);

	const pickImage = async () => {
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (status !== 'granted') {
			alert('Please grant camera roll permissions to use this feature.');
			return;
		}

		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: false,
			quality: 1,
			base64: true,
		});

		if (!result.canceled && result.assets[0].base64) {
			const imageBase64 = `data:image/jpeg;base64,${result.assets[0].base64}`;
			setImages((prevImages) => [...prevImages, imageBase64]);
		}
	};

	const handleAddTodo = () => {
		if (!title.trim()) return;

		const createdNewTodo = {
			id: Date.now(),
			title,
			completed: false,
			description: description.trim(),
			DateCreated: formatDate(Date.now()),
			images: images.length > 0 ? images : [''],
			category: selectedCategory,
		};

		addTodo(createdNewTodo);

		setTitle('');
		setDescription('');
		setImages([]);
		setModalVisible(false);
		setSelectedCategory(null);
	};

	const handleCategoryModalToggle = () => {
		setCategoryModalVisible(!isCategoryModalVisible);
	};

	const handleCancel = () => {
		setTitle('');
		setDescription('');
		setImages([]);
		setModalVisible(false);
	};

	const removeImage = (index: number) => {
		setImages((prevImages) => prevImages.filter((_, i) => i !== index));
	};

	const isModalShown = !isCategoryModalVisible && !isPriorityModalVisible;
	const isCategoryModalShown = isCategoryModalVisible && !isPriorityModalVisible;
	return (
		<View style={styles.overlay}>
			{isModalShown && (
				<View style={styles.container}>
					<Text style={styles.title}>ADD TASK</Text>
					<TextInput style={styles.input} placeholder="TASK TITLE*" placeholderTextColor="#888" value={title} onChangeText={setTitle} />
					<TextInput style={styles.textArea} multiline numberOfLines={4} placeholder="TASK DESCRIPTION*" placeholderTextColor="#888" value={description} onChangeText={setDescription} />
					<View style={styles.iconContainer}>
						<TouchableOpacity style={styles.iconButton}>
							<Feather name="flag" size={24} color="#fff" />
						</TouchableOpacity>
						<TouchableOpacity style={styles.iconButton} onPress={handleCategoryModalToggle}>
							<Octicons name="versions" size={24} color={selectedCategory ? selectedCategory.color : '#fff'} />
						</TouchableOpacity>
					</View>
					<TouchableOpacity style={styles.imageButton} onPress={pickImage}>
						<Text style={styles.imageButtonText}>ADD IMAGE</Text>
					</TouchableOpacity>

					{images.length > 0 && (
						<ScrollView horizontal style={styles.previewContainer} showsHorizontalScrollIndicator={false}>
							{images.map((img, index) => (
								<View key={index} style={styles.previewWrapper}>
									<TouchableOpacity style={styles.removeButton} onPress={() => removeImage(index)}>
										<Text style={styles.removeButtonText}>X</Text>
									</TouchableOpacity>
									<Image source={{ uri: img }} style={styles.imagePreview} resizeMode="cover" />
								</View>
							))}
						</ScrollView>
					)}

					<View style={styles.buttonContainer}>
						<TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
							<Text style={styles.buttonText}>Cancel</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.saveButton} onPress={handleAddTodo}>
							<Text style={styles.buttonText}>Save</Text>
						</TouchableOpacity>
					</View>
				</View>
			)}
			{isCategoryModalShown && <NewCategoryModal handleCategoryModalToggle={handleCategoryModalToggle} setSelectedCategory={setSelectedCategory} />}
		</View>
	);
};

const styles = StyleSheet.create({
	overlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 1,
	},
	container: {
		backgroundColor: '#363636',
		padding: 20,
		borderRadius: 15,
		width: '90%',
		maxHeight: '80%',
		top: -150,
	},
	title: {
		color: '#fff',
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 15,
		textAlign: 'center',
	},
	input: {
		backgroundColor: '#4A4A4A',
		color: '#fff',
		paddingHorizontal: 15,
		paddingVertical: 10,
		borderRadius: 10,
		marginBottom: 15,
		fontSize: 16,
	},
	textArea: {
		backgroundColor: '#4A4A4A',
		color: '#fff',
		paddingHorizontal: 15,
		paddingVertical: 10,
		borderRadius: 10,
		marginBottom: 15,
		fontSize: 16,
		textAlignVertical: 'top',
		height: 100,
	},
	iconContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		gap: 15,
		backgroundColor: '#4A4A4A',
		borderRadius: 10,
		padding: 10,
		marginBottom: 15,
	},
	iconButton: {
		backgroundColor: '#555',
		borderRadius: 50,
		width: 44,
		height: 44,
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 3,
		elevation: 5,
	},
	imageButton: {
		backgroundColor: '#555',
		padding: 10,
		borderRadius: 10,
		alignItems: 'center',
		marginBottom: 15,
	},
	imageButtonText: {
		color: '#fff',
		fontSize: 16,
	},
	previewContainer: {
		maxHeight: 100,
		marginBottom: 15,
	},
	previewWrapper: {
		position: 'relative',
		marginRight: 10,
	},
	imagePreview: {
		width: 80,
		height: 80,
		borderRadius: 10,
	},
	removeButton: {
		position: 'absolute',
		top: 0,
		right: -5,
		backgroundColor: '#ff4444',
		width: 20,
		height: 20,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 2,
	},
	removeButtonText: {
		color: '#fff',
		fontSize: 16,
		lineHeight: 20,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		gap: 10,
	},
	cancelButton: {
		backgroundColor: '#666',
		paddingVertical: 12,
		borderRadius: 10,
		alignItems: 'center',
		flex: 1,
	},
	saveButton: {
		backgroundColor: '#8687E7',
		paddingVertical: 12,
		borderRadius: 10,
		alignItems: 'center',
		flex: 1,
	},
	buttonText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: '600',
	},
});

export default NewTodoModal;
