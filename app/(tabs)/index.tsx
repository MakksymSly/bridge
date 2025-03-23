import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, Image, Platform } from 'react-native';
import React, { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useStore } from '@/store/store';
import Feather from '@expo/vector-icons/Feather';
import { ITodo } from '@/types/ITodo';
import NewTodoModal from '@/components/NewTodoModal';
import TodoTile from '@/components/TodoTile';

const homeEmptyImage = require('@/assets/images/home-empty.png');

const App = () => {
	const [isNewTodoModalVisible, setIsNewTodoModalVisible] = useState(false);
	const todos = useStore((state) => state.todos);

	const deleteTodo = useStore((state) => state.deleteTodo);
	const toggleStatus = useStore((state) => state.toggleStatus);

	const handleLongPress = (todo: ITodo) => {
		Alert.alert('extra actions', '', [
			{ text: 'Delete', onPress: () => deleteTodo(todo.id), style: 'destructive' },
			{ text: 'Edit', style: 'default' },
			{ text: todo.completed ? 'Unmark as completed' : 'Mark as completed', onPress: () => toggleStatus(todo.id), style: 'default' },
			{ text: 'Отмена', style: 'cancel' },
		]);
	};

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<View style={styles.content}>
				{isNewTodoModalVisible ? <NewTodoModal setModalVisible={setIsNewTodoModalVisible} /> : null}
				{!todos.length ? (
					<View style={styles.emptyHomeContainer}>
						<Image style={styles.emptyHomeImage} source={homeEmptyImage} />
						<Text style={styles.emptyHomeText}>What do you want to do today?</Text>
						<Text style={styles.emptyHomeSubText}>Tap + to add your tasks</Text>
					</View>
				) : (
					<>
						<View style={styles.todosContainer}>
							<ScrollView contentContainerStyle={styles.todosBlock} keyboardShouldPersistTaps="handled">
								{todos.map((todo) => (
									<TodoTile key={todo.id} todo={todo} handleLongPress={handleLongPress} />
								))}
							</ScrollView>
						</View>
					</>
				)}
			</View>
			<TouchableOpacity onPress={() => setIsNewTodoModalVisible(true)} style={styles.addButton}>
				<Feather name="plus" size={24} color="white" />
			</TouchableOpacity>
		</GestureHandlerRootView>
	);
};

export default App;

const styles = StyleSheet.create({
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
		display: 'flex',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
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
