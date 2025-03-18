import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useStore } from '@/store/store';
import AntDesign from '@expo/vector-icons/AntDesign';
import { formatDate } from '@/utils/utils';
import { ITodo } from '@/types/ITodo';

const App = () => {
	const [newTodo, setNewTodo] = useState('');
	const [modalVisible, setModalVisible] = useState(false);
	const todos = useStore((state) => state.todos);
	const addTodo = useStore((state) => state.addTodo);
	const deleteTodo = useStore((state) => state.deleteTodo);
	const toggleStatus = useStore((state) => state.toggleStatus);

	const handleAddTodo = () => {
		if (!newTodo.trim()) return;

		const createdNewTodo = {
			id: Date.now(),
			title: newTodo,
			completed: false,
			DateCreated: formatDate(Date.now()),
		};

		addTodo(createdNewTodo);
		setNewTodo('');
	};

	const handleLongPress = (todo: ITodo) => {
		Alert.alert('Выберите действие', '', [
			{ text: 'Delete', onPress: () => deleteTodo(todo.id), style: 'destructive' },
			{ text: 'Edit', style: 'default' },
			{ text: todo.completed ? 'Unmark as completed' : 'Mark as completed', onPress: () => toggleStatus(todo.id), style: 'default' },
			{ text: 'Отмена', style: 'cancel' },
		]);
	};

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<View style={styles.content}>
				<Text style={styles.title}>Bridge List</Text>

				<TextInput style={styles.input} placeholder="Enter Task..." value={newTodo} onChangeText={setNewTodo} />

				<Button onPress={handleAddTodo} title="Добавить задачу" />

				<View style={styles.todosContainer}>
					<ScrollView contentContainerStyle={styles.todosBlock} keyboardShouldPersistTaps="handled">
						{todos.map((todo) => (
							<TouchableOpacity key={todo.id} onLongPress={() => handleLongPress(todo)} style={styles.todoItem}>
								<View style={[styles.todoStatus, { backgroundColor: todo.completed ? 'green' : 'red' }]} />
								<Text>{todo.title}</Text>
								<AntDesign name="right" size={20} color="black" />
							</TouchableOpacity>
						))}
					</ScrollView>
				</View>
			</View>
		</GestureHandlerRootView>
	);
};

export default App;

const styles = StyleSheet.create({
	content: {
		flex: 1,
		alignItems: 'center',
		paddingTop: 80,
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
		paddingBottom: 20,
	},
	todoItem: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '80%',
		height: 70,
		paddingLeft: 10,
		paddingRight: 10,
		borderRadius: 8,
		backgroundColor: '#fafafa',
	},
	todoStatus: {
		position: 'absolute',
		left: -20,
		width: 20,
		height: '100%',
		borderTopLeftRadius: 8,
		borderBottomLeftRadius: 8,
	},
});
