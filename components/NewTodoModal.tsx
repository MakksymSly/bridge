import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import { formatDate } from '@/utils/utils';
import { useStore } from '@/store/store';
import * as ImagePicker from 'expo-image-picker';
import Feather from '@expo/vector-icons/Feather';
import Octicons from '@expo/vector-icons/Octicons';
import NewCategoryModal from './NewCategoryModal';
import { ICategory } from '@/types/ICategory';
import { ITodo } from '@/types/ITodo';
import NewPriority from './NewPriority';
import { useTranslation } from 'react-i18next';
import CalendarAndTimeModal from './CalendarAndTimeModal';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: false,
	}),
});

interface Props {
	setModalVisible: (visible: boolean) => void;
	existingTodo?: ITodo | null;
	setExistingTodo: (todo: ITodo | null) => void;
}

const NewTodoModal: React.FC<Props> = (props) => {
	const { setModalVisible, existingTodo, setExistingTodo } = props;
	const theme = useStore((state) => state.currentTheme);
	const [title, setTitle] = useState(existingTodo ? existingTodo.title : '');
	const [description, setDescription] = useState(existingTodo ? existingTodo.description : '');
	const [images, setImages] = useState<string[]>(existingTodo?.images && existingTodo.images.length > 0 ? existingTodo.images : []);
	const [executionDate, setExecutionDate] = useState<Date | null>(null);
	const [executionTime, setExecutionTime] = useState<Date | null>(null);
	const [combinedDateAndTime, setCombinedDateAndTime] = useState<Date | null>(existingTodo?.exicuteUntil ?? null);
	const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
	const [isPriorityModalVisible, setPriorityModalVisible] = useState(false);
	const [titleError, setTitleError] = useState(false);
	const addTodo = useStore((state) => state.addTodo);
	const updateTodo = useStore((state) => state.updateTodo);
	const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(existingTodo?.category ?? null);
	const [selectedPriority, setSelectedPriority] = useState<number | null>(existingTodo?.priority ?? null);
	const [isCalendarAndTimerModalVisible, setCalendarAndTimerModalVisible] = useState(false);

	useEffect(() => {
		const setupNotifications = async () => {
			const { status: existingStatus } = await Notifications.getPermissionsAsync();
			let finalStatus = existingStatus;

			if (existingStatus !== 'granted') {
				const { status } = await Notifications.requestPermissionsAsync();
				finalStatus = status;
			}

			if (finalStatus !== 'granted') {
				console.log('Notification permissions not granted');
				return;
			}

			if (Platform.OS === 'android') {
				await Notifications.setNotificationChannelAsync('default', {
					name: 'default',
					importance: Notifications.AndroidImportance.MAX,
					vibrationPattern: [0, 250, 250, 250],
					lightColor: '#FF231F7C',
				});
			}

			console.log('Notification permissions granted');
		};

		setupNotifications();
	}, []);

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

	const combineDateAndTime = (date: Date | null, time: Date | null): Date | null => {
		if (!date) return null;

		const combinedDate = new Date(date);
		if (time) {
			combinedDate.setHours(time.getHours());
			combinedDate.setMinutes(time.getMinutes());
			combinedDate.setSeconds(0);
		}

		return combinedDate;
	};

	async function scheduleNotification(taskDate: Date, minutesBefore: number) {
		const notificationTime = new Date(taskDate.getTime() - minutesBefore * 60 * 1000);
		const now = new Date();

		if (notificationTime <= now) {
			console.log('Notification time is in the past, skipping...');
			return;
		}

		try {
			await Notifications.scheduleNotificationAsync({
				content: {
					title: t('notificationTitle'),
					body: t('notificationBody'),
					sound: true,
				},
				trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: notificationTime },
			});
		} catch (error) {
			console.error('Error scheduling notification:', error);
		}
	}

	const handleAddTodo = async () => {
		if (!title.trim()) {
			setTitleError(true);
			return;
		}

		setTitleError(false);
		const newCombinedDateAndTime = combineDateAndTime(executionDate, executionTime);
		setCombinedDateAndTime(newCombinedDateAndTime);
		const createdNewTodo = {
			id: Date.now(),
			title,
			completed: false,
			description: (description || '').trim(),
			DateCreated: formatDate(Date.now()),
			images: images.length > 0 ? images : [],
			category: selectedCategory,
			priority: selectedPriority,
			exicuteUntil: newCombinedDateAndTime,
		};

		if (!existingTodo) {
			addTodo(createdNewTodo);
		} else {
			updateTodo(createdNewTodo, existingTodo.id);
		}

		if (newCombinedDateAndTime) {
			await scheduleNotification(newCombinedDateAndTime, 1440);
		}

		setTitle('');
		setDescription('');
		setImages([]);
		setModalVisible(false);
		setSelectedCategory(null);
		setExistingTodo(null);
	};

	const handleTitleChange = (text: string) => {
		setTitle(text);
		if (text.trim()) {
			setTitleError(false);
		}
	};

	const handleCategoryModalToggle = () => {
		setCategoryModalVisible(!isCategoryModalVisible);
	};

	const handlePriorityModalToggle = () => {
		setPriorityModalVisible(!isPriorityModalVisible);
	};

	const handleCalendarAndTimerModalToggle = () => {
		setCalendarAndTimerModalVisible(!isCalendarAndTimerModalVisible);
	};

	const handleCancel = () => {
		setTitle('');
		setDescription('');
		setImages([]);
		setModalVisible(false);
		setTitleError(false);
		setExecutionDate(null);
		setExecutionTime(null);
		setCombinedDateAndTime(null);
		setSelectedCategory(null);
		setSelectedPriority(null);
	};

	const removeImage = (index: number) => {
		setImages((prevImages) => prevImages.filter((_, i) => i !== index));
	};

	const { t } = useTranslation();

	const isModalShown = !isCategoryModalVisible && !isPriorityModalVisible;
	const isCategoryModalShown = isCategoryModalVisible && !isPriorityModalVisible;

	return (
		<View style={[styles.overlay, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
			{isModalShown && (
				<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
					<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={Platform.OS === 'ios' ? -200 : -300} style={styles.keyboardAvoidingContainer}>
						<View style={[styles.container, { backgroundColor: theme.colors.card }]}>
							<Text style={[styles.title, { color: theme.colors.text }]}>{t('addTask')}</Text>
							<TextInput style={[styles.input, { backgroundColor: theme.colors.background, color: theme.colors.text }, titleError && styles.inputError]} placeholder={t('taskTitle')} placeholderTextColor={theme.colors.border} value={title} onChangeText={handleTitleChange} />
							{titleError && <Text style={[styles.errorText, { color: theme.colors.notification }]}>{t('todoTitleEmptyError')}</Text>}
							<TextInput style={[styles.textArea, { backgroundColor: theme.colors.background, color: theme.colors.text }]} multiline numberOfLines={4} placeholder={t('taskDescription')} placeholderTextColor={theme.colors.border} value={description} onChangeText={setDescription} />
							<View style={[styles.iconContainer, { backgroundColor: theme.colors.background }]}>
								<TouchableOpacity style={[styles.iconButton, { backgroundColor: theme.colors.border }]} onPress={handlePriorityModalToggle}>
									{selectedPriority ? <Text style={[styles.priorityText, { color: theme.colors.text }]}>{selectedPriority}</Text> : <Feather name="flag" size={24} color={theme.colors.text} />}
								</TouchableOpacity>
								<TouchableOpacity style={[styles.iconButton, { backgroundColor: theme.colors.border }]} onPress={handleCategoryModalToggle}>
									{selectedCategory ? <Text>{selectedCategory.icon}</Text> : <Octicons name="versions" size={24} color={theme.colors.text} />}
								</TouchableOpacity>
								<TouchableOpacity style={[styles.iconButton, { backgroundColor: theme.colors.border }]} onPress={handleCalendarAndTimerModalToggle}>
									<Octicons name="calendar" size={24} color={combinedDateAndTime || executionDate || executionTime ? theme.colors.primary : theme.colors.text} />
								</TouchableOpacity>
							</View>
							<TouchableOpacity style={[styles.imageButton, { backgroundColor: theme.colors.border }]} onPress={pickImage}>
								<Text style={[styles.imageButtonText, { color: theme.colors.text }]}>{t('addImage')}</Text>
							</TouchableOpacity>

							{images.length > 0 && (
								<ScrollView horizontal style={styles.previewContainer} showsHorizontalScrollIndicator={false}>
									{images.map((img, index) => (
										<View key={index} style={styles.previewWrapper}>
											<TouchableOpacity style={[styles.removeButton, { backgroundColor: theme.colors.notification }]} onPress={() => removeImage(index)}>
												<Text style={[styles.removeButtonText, { color: theme.colors.text }]}>X</Text>
											</TouchableOpacity>
											<Image source={{ uri: img }} style={styles.imagePreview} resizeMode="cover" />
										</View>
									))}
								</ScrollView>
							)}

							<View style={styles.buttonContainer}>
								<TouchableOpacity style={[styles.cancelButton, { backgroundColor: theme.colors.notification }]} onPress={handleCancel}>
									<Text style={[styles.buttonText, { color: theme.colors.text }]}>{t('cancel')}</Text>
								</TouchableOpacity>
								<TouchableOpacity style={[styles.saveButton, { backgroundColor: theme.colors.primary }]} onPress={handleAddTodo}>
									<Text style={[styles.buttonText, { color: theme.colors.text }]}>{t('save')}</Text>
								</TouchableOpacity>
							</View>
						</View>
					</KeyboardAvoidingView>
				</TouchableWithoutFeedback>
			)}
			{isCategoryModalShown && <NewCategoryModal handleCategoryModalToggle={handleCategoryModalToggle} setSelectedCategory={setSelectedCategory} />}
			{isPriorityModalVisible && <NewPriority handlePriorityModalToggle={handlePriorityModalToggle} setSelectedPriority={setSelectedPriority} selectedPriority={selectedPriority} />}
			<Modal visible={isCalendarAndTimerModalVisible} animationType="slide" transparent={true} onRequestClose={handleCalendarAndTimerModalToggle} style={styles.overlay}>
				<CalendarAndTimeModal setIsVisible={handleCalendarAndTimerModalToggle} setExecutionDate={setExecutionDate} setExecutionTime={setExecutionTime} />
			</Modal>
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
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 1,
	},
	keyboardAvoidingContainer: {
		width: '100%',
		alignItems: 'center',
	},
	container: {
		padding: 20,
		borderRadius: 15,
		width: '90%',
		maxHeight: '100%',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 15,
		textAlign: 'center',
	},
	input: {
		paddingHorizontal: 15,
		paddingVertical: 10,
		borderRadius: 10,
		marginBottom: 15,
		fontSize: 16,
	},
	inputError: {
		borderWidth: 2,
		borderColor: '#FF4F4F',
	},
	errorText: {
		fontSize: 12,
		marginBottom: 10,
	},
	textArea: {
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
		borderRadius: 10,
		padding: 10,
		marginBottom: 15,
	},
	iconButton: {
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
		padding: 10,
		borderRadius: 10,
		alignItems: 'center',
		marginBottom: 15,
	},
	imageButtonText: {
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
		width: 20,
		height: 20,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 2,
	},
	removeButtonText: {
		fontSize: 16,
		lineHeight: 20,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		gap: 10,
	},
	cancelButton: {
		paddingVertical: 12,
		borderRadius: 10,
		alignItems: 'center',
		flex: 1,
	},
	saveButton: {
		paddingVertical: 12,
		borderRadius: 10,
		alignItems: 'center',
		flex: 1,
	},
	buttonText: {
		fontSize: 18,
		fontWeight: '600',
	},
	priorityText: {
		fontSize: 22,
		fontWeight: '800',
	},
});

export default NewTodoModal;
