import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
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
	const theme = useStore((state) => state.currentTheme);

	const { todo, handleLongPress } = props;

	return (
		<Link href={`/todo/${todo.id}`} key={todo.id} asChild>
			<TouchableOpacity key={todo.id} onLongPress={() => handleLongPress(todo)} style={StyleSheet.flatten([styles.todoItem, { backgroundColor: theme.colors.card }])}>
				<BouncyCheckbox
					style={{ flex: 1 }}
					fillColor={theme.colors.primary}
					isChecked={todo.completed}
					onPress={() => {
						toggleStatus(todo.id);
					}}
				/>
				<View style={styles.todoItemTextContainer}>
					<Text numberOfLines={1} ellipsizeMode="tail" style={[styles.todoItemText, { color: theme.colors.text, textDecorationLine: todo.completed ? 'line-through' : 'none' }]}>
						{todo.title}
					</Text>
					<Text style={[styles.todoItemSubText, { color: theme.colors.text }]}>{todo.DateCreated}</Text>
				</View>
				<View style={styles.todoItemInfoContainer}>
					{todo.category && (
						<View style={[styles.todoItemCategoryContainer, { backgroundColor: todo.category?.color }]}>
							<Text style={styles.todoItemCategoryIcon}>{todo.category?.icon}</Text>
							<Text style={styles.todoItemCategoryText}>{todo.category?.name}</Text>
						</View>
					)}
					{todo.priority && (
						<View style={[styles.todoItemPriorityContainer, { borderColor: theme.colors.primary }]}>
							<Ionicons name="flag-outline" size={24} color={theme.colors.primary} />
							<Text style={[styles.todoItemPriorityText, { color: theme.colors.primary }]}>{todo.priority}</Text>
						</View>
					)}
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
		width: '90%',
		height: 72,
		paddingLeft: 10,
		paddingRight: 10,
		borderRadius: 8,
		backgroundColor: '#fafafa',
	},
	todoItemTextContainer: {
		flex: 7,
		gap: 4,
	},
	todoItemText: {
		maxWidth: '70%',
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
	},
	todoItemPriorityText: {
		color: '#8687E7',
	},
	todoItemCategoryContainer: {
		display: 'flex',
		flexDirection: 'row',
		borderWidth: 1,
		padding: 4,
		borderRadius: 8,
	},
	todoItemCategoryText: {},
	todoItemInfoContainer: {
		display: 'flex',
		flexDirection: 'row',
		gap: 5,
	},
	todoItemCategoryIcon: {},
});

export default TodoTile;
