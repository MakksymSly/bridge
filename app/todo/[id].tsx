import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useStore } from '@/store/store';
import { ITodo } from '@/types/ITodo';

const id = () => {
	const params = useLocalSearchParams();
	const todos = useStore((state) => state.todos);
	const [currentTodo, setCurrentTodo] = useState<ITodo>({
		id: 0,
		title: '',
		description: '',
		completed: false,
		DateCreated: '',
	});
	const [error, setError] = useState('');
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedImage, setSelectedImage] = useState<string | null>(null);

	useEffect(() => {
		try {
			const todo = todos.find((todo) => todo.id === Number(params.id));
			if (!todo) {
				throw new Error('Todo not found');
			}
			setCurrentTodo(todo);
		} catch (error) {
			setError('Todo not found');
		}
	}, []);

	const openImage = (image: string) => {
		setSelectedImage(image);
		setModalVisible(true);
	};

	return (
		<View style={styles.container}>
			{error ? (
				<Text style={styles.errorText}>{error}</Text>
			) : (
				<View style={styles.todoCard}>
					<Text style={styles.title}>{currentTodo.title}</Text>
					<View style={styles.detailContainer}>
						<Text style={styles.label}>Details:</Text>
						<Text style={styles.description}>{currentTodo.description}</Text>
					</View>
					<View style={styles.infoRow}>
						<View style={styles.imagesContainer}>
							{currentTodo.images?.map((image, index) => (
								<TouchableOpacity key={index} onPress={() => openImage(image)}>
									<Image source={{ uri: image }} style={styles.image} />
								</TouchableOpacity>
							))}
						</View>
					</View>
					<View style={styles.separator}></View>
					<View style={styles.infoRow}>
						<Text style={styles.label}>Date:</Text>
						<Text style={styles.value}>{currentTodo.DateCreated}</Text>
					</View>
					<View style={styles.infoRow}>
						<Text style={styles.label}>Completed:</Text>
						<Text style={[styles.value, { color: currentTodo.completed ? '#00cc00' : '#ff4444' }]}>{currentTodo.completed ? 'Yes' : 'No'}</Text>
					</View>
					<View style={styles.infoRow}>
						<Text style={styles.label}>ID:</Text>
						<Text style={styles.value}>{currentTodo.id}</Text>
					</View>
				</View>
			)}

			<Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
				<View style={styles.modalOverlay}>
					<TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
						<Text style={styles.modalCloseText}>×</Text>
					</TouchableOpacity>
					{selectedImage && <Image source={{ uri: selectedImage }} style={styles.fullImage} resizeMode="contain" />}
				</View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: '#f5f5f5',
	},
	todoCard: {
		backgroundColor: 'white',
		borderRadius: 12,
		padding: 20,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#333',
		marginBottom: 15,
		borderBottomWidth: 1,
		borderBottomColor: '#eee',
		paddingBottom: 10,
	},
	detailContainer: {
		marginBottom: 15,
	},
	infoRow: {
		flexDirection: 'row',
		marginBottom: 10,
		alignItems: 'center',
	},
	label: {
		fontSize: 16,
		fontWeight: '600',
		color: '#666',
		width: 100,
	},
	description: {
		fontSize: 16,
		color: '#444',
		lineHeight: 24,
		marginTop: 5,
	},
	value: {
		fontSize: 16,
		color: '#444',
		flex: 1,
	},
	errorText: {
		fontSize: 18,
		color: '#ff4444',
		textAlign: 'center',
		marginTop: 20,
	},
	imagesContainer: {
		flexDirection: 'row',
		gap: 10,
		flexWrap: 'wrap',
	},
	separator: {
		height: 1,
		backgroundColor: '#ccc',
		marginVertical: 10,
	},
	image: {
		width: 100,
		height: 100,
		borderRadius: 8,
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.8)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	fullImage: {
		width: '90%',
		height: '70%',
	},
	modalCloseButton: {
		position: 'absolute',
		top: 40,
		right: 20,
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 1,
	},
	modalCloseText: {
		fontSize: 24,
		color: '#333',
		fontWeight: 'bold',
	},
});

export default id;
