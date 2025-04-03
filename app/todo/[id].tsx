import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useStore } from '@/store/store';
import { ITodo } from '@/types/ITodo';
import Category from '@/components/Category';
import { useTranslation } from 'react-i18next';

const id = () => {
	const { t } = useTranslation();
	const params = useLocalSearchParams();
	const todos = useStore((state) => state.todos);
	const theme = useStore((state) => state.currentTheme);
	const [currentTodo, setCurrentTodo] = useState<ITodo>({
		id: 0,
		title: '',
		description: '',
		completed: false,
		DateCreated: '',
		DateEdited: '',
		images: [],
		category: null,
		priority: 0,
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
		<View style={[styles.container, { backgroundColor: theme.colors.background }]}>
			{error ? (
				<Text style={[styles.errorText, { color: theme.colors.notification }]}>{error}</Text>
			) : (
				<View style={[styles.todoCard, { backgroundColor: theme.colors.card }]}>
					<Text style={[styles.title, { color: theme.colors.text, borderBottomColor: theme.colors.border }]}>{currentTodo.title}</Text>
					<View style={styles.detailContainer}>
						<Text style={[styles.label, { color: theme.colors.text }]}>{t('description')}:</Text>
						<Text style={[styles.description, { color: theme.colors.text }]}>{currentTodo.description}</Text>
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
					<View style={[styles.separator, { backgroundColor: theme.colors.border }]}></View>
					<View style={styles.infoRow}>
						<Text style={[styles.value, { color: theme.colors.text }]}>{currentTodo.category ? <Category category={currentTodo.category} handleChoseCategory={() => {}} /> : t('uncategorized')}</Text>
					</View>
					<View style={[styles.separator, { backgroundColor: theme.colors.border }]}></View>
					<View style={styles.infoRow}>
						<Text style={[styles.label, { color: theme.colors.text }]}>{t('dateCreated')}:</Text>
						<Text style={[styles.value, { color: theme.colors.text }]}>{currentTodo.DateCreated}</Text>
					</View>
					<View style={styles.infoRow}>
						<Text style={[styles.label, { color: theme.colors.text }]}>{t('completed')}:</Text>
						<Text style={[styles.value, { color: currentTodo.completed ? '#00cc00' : theme.colors.notification }]}>{currentTodo.completed ? `${t('yes')}` : `${t('no')}`}</Text>
					</View>
					{currentTodo.exicuteUntil && (
						<View style={styles.infoRow}>
							<Text style={[styles.label, { color: theme.colors.text }]}>{t('executeUntil')} :</Text>
							<Text style={[styles.value, { color: theme.colors.text }]}>
								{currentTodo.exicuteUntil
									? new Date(currentTodo.exicuteUntil).toLocaleString(t('timeLocale'), {
											year: 'numeric',
											month: 'long',
											day: 'numeric',
											hour: '2-digit',
											minute: '2-digit',
									  })
									: '-'}
							</Text>
						</View>
					)}
				</View>
			)}

			<Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
				<View style={[styles.modalOverlay, { backgroundColor: 'rgba(0, 0, 0, 0.8)' }]}>
					<TouchableOpacity style={[styles.modalCloseButton, { backgroundColor: theme.colors.card }]} onPress={() => setModalVisible(false)}>
						<Text style={[styles.modalCloseText, { color: theme.colors.text }]}>×</Text>
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
	},
	todoCard: {
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
		marginBottom: 15,
		borderBottomWidth: 1,
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
		width: 100,
	},
	description: {
		fontSize: 16,
		lineHeight: 24,
		marginTop: 5,
	},
	value: {
		fontSize: 16,
		flex: 1,
	},
	errorText: {
		fontSize: 18,
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
		marginVertical: 10,
	},
	image: {
		width: 100,
		height: 100,
		borderRadius: 8,
	},
	modalOverlay: {
		flex: 1,
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
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 1,
	},
	modalCloseText: {
		fontSize: 24,
		fontWeight: 'bold',
	},
});

export default id;
