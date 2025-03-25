import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, Image, Platform } from 'react-native';
import React, { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useStore } from '@/store/store';
import Feather from '@expo/vector-icons/Feather';
import { ITodo } from '@/types/ITodo';
import NewTodoModal from '@/components/NewTodoModal';
import TodoTile from '@/components/TodoTile';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import Filter from '@/components/Filter';
const homeEmptyImage = require('@/assets/images/home-empty.png');

const App = () => {
	const [isNewTodoModalVisible, setIsNewTodoModalVisible] = useState(false);
	const todos = useStore((state) => state.todos);
	const [selectedTodo, setSelectedTodo] = useState<ITodo | null>(null);
	const [filter, setFilter] = useState('all');
	const deleteTodo = useStore((state) => state.deleteTodo);
	const toggleStatus = useStore((state) => state.toggleStatus);
	const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

	const handleLongPress = (todo: ITodo) => {
		Alert.alert('extra actions', '', [
			{
				text: 'Delete',
				onPress: () => {
					deleteTodo(todo.id);
				},
				style: 'destructive',
			},
			{
				text: 'Edit',
				style: 'default',
				onPress: () => {
					setIsNewTodoModalVisible(true);
					setSelectedTodo(todo);
				},
			},
			{ text: 'Отмена', style: 'cancel' },
		]);
	};

	const filteredTodos = todos.filter((todo) => {
		if (filter === 'all') {
			return true;
		} else if (filter === 'completed') {
			return todo.completed === true;
		} else if (filter === 'inProgress') {
			return todo.completed === false;
		} else if (filter === 'prioritized') {
			return todos.sort((a, b) => (a.priority ?? 11) - (b.priority ?? 11));
		} else if (filter === 'leastPrioritized') {
			return todos.sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
		} else if (filter === 'unprioritized') {
			return todo.priority === null;
		} else {
			return false;
		}
	});

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<View style={styles.content}>
				{isNewTodoModalVisible ? <NewTodoModal existingTodo={selectedTodo} setModalVisible={setIsNewTodoModalVisible} /> : null}
				{isFilterModalVisible ? <Filter setModalVisible={setIsFilterModalVisible} filter={filter} setFilter={setFilter} /> : null}
				{!todos.length ? (
					<View style={styles.emptyHomeContainer}>
						<Image style={styles.emptyHomeImage} source={homeEmptyImage} />
						<Text style={styles.emptyHomeText}>What do you want to do today?</Text>
						<Text style={styles.emptyHomeSubText}>Tap + to add your tasks</Text>
					</View>
				) : (
					<>
						<View style={styles.todosContainer}>
							<View style={styles.header}>
								<TouchableOpacity onPress={() => setIsFilterModalVisible(true)}>
									<Ionicons name="filter" size={28} color="black" />
								</TouchableOpacity>
							</View>
							<ScrollView contentContainerStyle={styles.todosBlock} keyboardShouldPersistTaps="handled">
								{filteredTodos.map((todo) => (
									<TodoTile
										key={todo.id}
										todo={todo}
										handleLongPress={() => {
											handleLongPress(todo);
										}}
									/>
								))}
							</ScrollView>
						</View>
					</>
				)}
			</View>
			<TouchableOpacity
				onPress={() => {
					setIsNewTodoModalVisible(true);
					setSelectedTodo(null);
				}}
				style={styles.addButton}>
				<Feather name="plus" size={24} color="white" />
			</TouchableOpacity>
		</GestureHandlerRootView>
	);
};

export default App;

const styles = StyleSheet.create({
	header: {
		display: 'flex',
		paddingLeft: 20,
		paddingRight: 20,
		marginBottom: 30,
	},
	addButton: {
		position: 'absolute',
		bottom: Platform.OS === 'ios' ? 90 : 10,
		left: '50%',
		transform: [{ translateX: -30 }],
		width: 60,
		height: 60,
		borderRadius: 30,
		backgroundColor: '#8687E7',
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
	emptyHomeImage: { width: 300, height: 300 },
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
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	input: {
		width: '80%',
		height: 40,
		borderColor: '#ccc',
		borderWidth: 1,
		paddingHorizontal: 10,
		borderRadius: 8,
		marginBottom: 10,
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
