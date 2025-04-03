import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, Image, Platform, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useStore } from '@/store/store';
import Feather from '@expo/vector-icons/Feather';
import { ITodo } from '@/types/ITodo';
import NewTodoModal from '@/components/NewTodoModal';
import TodoTile from '@/components/TodoTile';
import Ionicons from '@expo/vector-icons/Ionicons';
import Filter from '@/components/Filter';
const homeEmptyImage = require('@/assets/images/home-empty.png');
import { useTranslation, I18nextProvider } from 'react-i18next';
import AntDesign from '@expo/vector-icons/AntDesign';
import i18n from '@/i18n';
import * as Notifications from 'expo-notifications';

const App = () => {
	const [isNewTodoModalVisible, setIsNewTodoModalVisible] = useState(false);
	const todos = useStore((state) => state.todos);
	const [selectedTodo, setSelectedTodo] = useState<ITodo | null>(null);
	const [filter, setFilter] = useState('all');
	const deleteTodo = useStore((state) => state.deleteTodo);
	const { t } = useTranslation();
	const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
	const [isSelectModeActive, setIsSelectModeActive] = useState(false);
	const [selectedTodosId, setSelectedTodosId] = useState<number[]>([]);
	const isHydrated = useStore((state) => state.isHydrated);
	const language = useStore((state) => state.language);

	const theme = useStore((state) => state.currentTheme);

	const handleSelectedTouched = () => {
		setIsSelectModeActive(!isSelectModeActive);
	};

	const handleSelectedId = (id: number) => {
		if (!isSelectModeActive) {
			return;
		}
		if (!selectedTodosId.includes(id)) {
			setSelectedTodosId((prev) => [...prev, id]);
			return;
		}

		setSelectedTodosId((prev) => prev.filter((todoId) => todoId !== id));
	};
	const handleLongPress = (todo: ITodo) => {
		Alert.alert('extra actions', '', [
			{
				text: `${t('delete')}`,
				onPress: () => deleteTodo(todo.id),
				style: 'destructive',
			},
			{
				text: `${t('edit')}`,
				style: 'default',
				onPress: () => {
					setIsNewTodoModalVisible(true);
					setSelectedTodo(todo);
				},
			},
			{ text: `${t('cancel')}`, style: 'cancel' },
		]);
	};
	async function requestPermissions() {
		const { status } = await Notifications.requestPermissionsAsync();
		if (status !== 'granted') {
			alert(t('noAccessforNotifications'));
		}
	}

	useEffect(() => {
		requestPermissions();
	}, []);

	useEffect(() => {
		if (isHydrated && language) {
			i18n.changeLanguage(language);
		}
	}, [language, isHydrated]);

	const filteredTodos = todos.filter((todo) => {
		if (filter === 'all') return true;
		if (filter === 'completed') return todo.completed === true;
		if (filter === 'inProgress') return todo.completed === false;
		if (filter === 'prioritized') return todos.sort((a, b) => (a.priority ?? 11) - (b.priority ?? 11));
		if (filter === 'leastPrioritized') return todos.sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
		if (filter === 'unprioritized') return todo.priority === null;
		return false;
	});

	const handleClearCompleted = () => {
		const completedTodos = todos.filter((todo) => todo.completed === true);
		completedTodos.forEach((todo) => deleteTodo(todo.id));
	};

	const handleClearSelected = () => {
		const selectedTodos = todos.filter((todo) => selectedTodosId.includes(todo.id));
		selectedTodos.forEach((todo) => deleteTodo(todo.id));
		setSelectedTodosId([]);
	};

	return (
		<I18nextProvider i18n={i18n}>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<View style={[styles.content, { backgroundColor: theme.colors.background }]}>
					<Modal transparent={true} onRequestClose={() => setIsNewTodoModalVisible(false)} visible={isNewTodoModalVisible}>
						<NewTodoModal setExistingTodo={setSelectedTodo} existingTodo={selectedTodo} setModalVisible={setIsNewTodoModalVisible} />
					</Modal>
					<Modal transparent={true} onRequestClose={() => setIsFilterModalVisible(false)} visible={isFilterModalVisible}>
						<Filter setModalVisible={setIsFilterModalVisible} filter={filter} setFilter={setFilter} />
					</Modal>

					{!filteredTodos && (
						<View style={styles.emptyHomeContainer}>
							<Image style={styles.emptyHomeImage} source={homeEmptyImage} />
							<Text style={[styles.emptyHomeText, { color: theme.colors.text }]}>{t('emptyList')}</Text>
						</View>
					)}
					{!todos.length ? (
						<View style={styles.emptyHomeContainer}>
							<Image style={styles.emptyHomeImage} source={homeEmptyImage} />
							<Text style={[styles.emptyHomeText, { color: theme.colors.text }]}>{t('emptyIndexTextOne')}</Text>
							<Text style={[styles.emptyHomeSubText, { color: theme.colors.text }]}>{t('emptyIndexTextTwo')}</Text>
						</View>
					) : (
						<View style={styles.todosContainer}>
							<View style={styles.header}>
								<TouchableOpacity onPress={() => setIsFilterModalVisible(true)}>
									<Ionicons name="filter" size={28} color={theme.colors.primary} />
								</TouchableOpacity>
								<View style={styles.headerSelect}>
									{isSelectModeActive ? (
										<TouchableOpacity onPress={handleClearSelected} style={[styles.headerSelectButton, { backgroundColor: theme.colors.primary }]}>
											<Text style={{ color: theme.colors.text }}>
												Clear {selectedTodosId.length} selected task{selectedTodosId.length > 1 ? 's' : ''}
											</Text>
										</TouchableOpacity>
									) : (
										<TouchableOpacity onPress={handleClearCompleted} style={[styles.headerSelectButton, { backgroundColor: theme.colors.primary }]}>
											<Text style={{ color: theme.colors.text }}>Clear All Completed</Text>
										</TouchableOpacity>
									)}
									<TouchableOpacity onPress={handleSelectedTouched}>
										<AntDesign name="checksquareo" size={28} color={isSelectModeActive ? theme.colors.text : theme.colors.primary} />
									</TouchableOpacity>
								</View>
							</View>
							<ScrollView contentContainerStyle={styles.todosBlock} keyboardShouldPersistTaps="handled">
								{filteredTodos.map((todo) => (
									<TodoTile isSelectModeActive={isSelectModeActive} selectedTodosId={selectedTodosId} handleSelectedId={handleSelectedId} key={todo.id} todo={todo} handleLongPress={() => handleLongPress(todo)} />
								))}
							</ScrollView>
						</View>
					)}
					<TouchableOpacity
						onPress={() => {
							setIsNewTodoModalVisible(true);
							setSelectedTodo(null);
						}}
						style={[styles.addButton, { backgroundColor: theme.colors.primary }]}>
						<Feather name="plus" size={24} color={theme.dark ? theme.colors.text : 'white'} />
					</TouchableOpacity>
				</View>
			</GestureHandlerRootView>
		</I18nextProvider>
	);
};

export default App;

const styles = StyleSheet.create({
	headerSelectButton: {
		padding: 5,
		borderRadius: 5,
	},
	headerSelect: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 10,
	},
	header: {
		display: 'flex',
		paddingLeft: 20,
		paddingRight: 20,
		marginBottom: 30,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	addButton: {
		position: 'absolute',
		bottom: Platform.OS === 'ios' ? 90 : 10,
		left: '50%',
		transform: [{ translateX: -30 }],
		width: 60,
		height: 60,
		borderRadius: 30,
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 5,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
	},
	emptyHomeContainer: {
		position: 'absolute',
		display: 'flex',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		top: 150,
	},
	emptyHomeImage: {
		width: 300,
		height: 300,
	},
	content: {
		flex: 1,
		alignItems: 'center',
		paddingTop: 80,
	},
	emptyHomeText: {
		fontSize: 20,
	},
	emptyHomeSubText: {
		fontSize: 16,
	},
	todosContainer: {
		flex: 1,
		width: '100%',
	},
	todosBlock: {
		alignItems: 'center',
		gap: 10,
		paddingBottom: 100,
	},
});
