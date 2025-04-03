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
	selectedTodosId: number[];
	handleSelectedId: (id: number) => void;
	isSelectModeActive: boolean;
}

const TodoTile: React.FC<Props> = (props) => {
	const toggleStatus = useStore((state) => state.toggleStatus);
	const theme = useStore((state) => state.currentTheme);

	const { todo, handleLongPress, handleSelectedId, selectedTodosId, isSelectModeActive } = props;

	return (
		<Link href={`/todo/${todo.id}`} key={todo.id} asChild>
			<TouchableOpacity key={todo.id} onPress={() => handleSelectedId(todo.id)} onLongPress={() => handleLongPress(todo)} style={StyleSheet.flatten([styles.todoItem, { backgroundColor: theme.colors.card }])}>
				<View>
					{isSelectModeActive && (
						<BouncyCheckbox
							style={{ flex: 1, marginRight: 8 }}
							fillColor={'green'}
							isChecked={selectedTodosId.includes(todo.id)}
							onPress={() => {
								handleSelectedId(todo.id);
							}}
						/>
					)}

					<BouncyCheckbox
						style={{ flex: 1, marginRight: 8 }}
						fillColor={theme.colors.primary}
						isChecked={todo.completed}
						onPress={() => {
							toggleStatus(todo.id);
						}}
					/>
				</View>
				<View style={styles.subcontainer}>
					<View style={styles.todoItemTextContainer}>
						<Text numberOfLines={1} ellipsizeMode="tail" style={[styles.todoItemText, { color: theme.colors.text, textDecorationLine: todo.completed ? 'line-through' : 'none' }]}>
							{todo.title}
						</Text>
					</View>
					<View style={styles.todoItemInfoContainer}>
						{todo.category && (
							<View style={[styles.todoItemCategoryContainer, { backgroundColor: todo.category?.color }]}>
								<Text style={{ color: theme.colors.text }}>{todo.category?.icon}</Text>
								<Text numberOfLines={1} style={{ color: theme.colors.text }}>
									{todo.category?.name}
								</Text>
							</View>
						)}
						{todo.priority && (
							<View style={[styles.todoItemPriorityContainer, { borderColor: theme.colors.primary }]}>
								<Ionicons name="flag-outline" size={24} color={theme.colors.primary} />
								<Text style={[styles.todoItemPriorityText, { color: theme.colors.primary }]}>{todo.priority}</Text>
							</View>
						)}
					</View>
				</View>
			</TouchableOpacity>
		</Link>
	);
};

const styles = StyleSheet.create({
	subcontainer: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		flex: 1,
	},
	todoItem: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '90%',
		height: 72,
		paddingLeft: 10,
		paddingRight: 10,
		borderRadius: 8,
		backgroundColor: '#fafafa',
	},
	todoItemTextContainer: {
		flex: 1,
	},
	todoItemText: {
		maxWidth: '70%',
		overflowY: 'hidden',
		fontSize: 16,
	},
	todoItemSubText: { color: 'grey', fontSize: 14 },
	todoItemPriorityContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
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
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		borderRadius: 8,
		maxWidth: 100,
		maxHeight: 40,
		padding: 10,
	},
	todoItemInfoContainer: {
		display: 'flex',
		flexDirection: 'row',
		gap: 5,
		justifyContent: 'flex-end',
	},
});

export default TodoTile;
