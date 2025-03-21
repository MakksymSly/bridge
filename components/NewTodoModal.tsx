import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';

interface Props {
	handleAddTodo: () => void;
}

const NewTodoModal: React.FC<Props> = (props) => {
	const { handleAddTodo } = props;

	const [text, setText] = useState('');

	return (
		<View style={styles.overlay}>
			<View style={styles.container}>
				<Text style={styles.title}>Add Task</Text>
				<TextInput style={styles.input} placeholder="Task Title" placeholderTextColor="#888" />
				<TextInput style={styles.textArea} multiline numberOfLines={4} placeholder="Task Details" placeholderTextColor="#888" value={text} onChangeText={setText} />
				<TouchableOpacity style={styles.saveButton} onPress={handleAddTodo}>
					<Text style={styles.saveButtonText}>Save</Text>
				</TouchableOpacity>
			</View>
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
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 1,
	},
	container: {
		backgroundColor: '#363636',
		padding: 20,
		borderRadius: 15,
		width: '90%',
		maxHeight: '50%',
		elevation: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 5,
	},
	title: {
		color: '#fff',
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 15,
		textAlign: 'center',
	},
	input: {
		backgroundColor: '#4A4A4A',
		color: '#fff',
		paddingHorizontal: 15,
		paddingVertical: 10,
		borderRadius: 10,
		marginBottom: 15,
		fontSize: 16,
	},
	textArea: {
		backgroundColor: '#4A4A4A',
		color: '#fff',
		paddingHorizontal: 15,
		paddingVertical: 10,
		borderRadius: 10,
		marginBottom: 20,
		fontSize: 16,
		textAlignVertical: 'top',
		height: 100,
	},
	saveButton: {
		backgroundColor: '#8687E7',
		paddingVertical: 12,
		borderRadius: 10,
		alignItems: 'center',
	},
	saveButtonText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: '600',
	},
});

export default NewTodoModal;
