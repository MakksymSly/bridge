import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import { ITodo } from '@/types/ITodo';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useStore } from '@/store/store';
import Ionicons from '@expo/vector-icons/Ionicons';

interface Props {
	todo: ITodo;
	handleLongPress: (todo: ITodo) => void;
}
const TodoTile: React.FC<Props> = (props) => {
	const toggleStatus = useStore((state) => state.toggleStatus);
	const { todo, handleLongPress } = props;
	return (
		<Link href={`/todo/${todo.id}`} key={todo.id} asChild>
			<TouchableOpacity key={todo.id} onLongPress={() => handleLongPress(todo)} style={styles.todoItem}>
				<BouncyCheckbox
					style={{ flex: 1 }}
					fillColor="#8687E7"
					isChecked={todo.completed}
					onPress={() => {
						toggleStatus(todo.id);
					}}
				/>
				<View style={styles.todoItemTextContainer}>
					<Text style={[styles.todoItemText, { textDecorationLine: todo.completed ? 'line-through' : 'none' }]}>{todo.title}</Text>
					<Text style={styles.todoItemSubText}>{todo.DateCreated}</Text>
				</View>
				<View style={styles.todoItemPriorityContainer}>
					<Ionicons name="flag-outline" size={24} color="#8687E7" />
					<Text style={styles.todoItemPriorityText}>1</Text>
				</View>
			</TouchableOpacity>
		</Link>
	);
};

const styles = StyleSheet.create({
	todoItem: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '80%',
		height: 72,
		paddingLeft: 10,
		paddingRight: 10,
		borderRadius: 8,
		backgroundColor: '#fafafa',
	},

	todoItemTextContainer: {
		flex: 5,
		gap: 4,
	},
	todoItemText: {
		fontSize: 16,
	},
	todoItemSubText: { color: 'grey', fontSize: 14 },
	todoItemPriorityContainer: {
		display: 'flex',
		flexDirection: 'row',
		gap: 4,
		borderWidth: 1,
		borderColor: '#8687E7',
		borderRadius: 8,
		padding: 4,
		color: '#8687E7',
	},
	todoItemPriorityText: {
		color: '#8687E7',
	},
});
export default TodoTile;
