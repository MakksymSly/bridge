import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

interface Props {
	setSelectedPriority: (num: number) => void;
	priority: number;
	selectedPriority: number | null;
	handlePriorityModalToggle: () => void;
}

const Priority: React.FC<Props> = (props) => {
	const { setSelectedPriority, priority, selectedPriority, handlePriorityModalToggle } = props;
	const isSelected = priority === selectedPriority;

	return (
		<TouchableOpacity
			style={[styles.todoItemPriorityContainer, isSelected && styles.selected]}
			onPress={() => {
				setSelectedPriority(priority);
				handlePriorityModalToggle();
			}}
			activeOpacity={0.7}>
			<Ionicons name="flag-outline" size={20} color={isSelected ? '#fff' : '#8687E7'} />
			<Text style={[styles.todoItemPriorityText, isSelected && styles.selectedText]}>{priority}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	todoItemPriorityContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
		borderWidth: 1,
		borderColor: '#8687E7',
		borderRadius: 8,
		paddingVertical: 6,
		paddingHorizontal: 12,
		backgroundColor: 'transparent',
	},
	todoItemPriorityText: {
		color: '#8687E7',
		fontSize: 16,
		fontWeight: '600',
	},
	selected: {
		backgroundColor: '#8687E7',
	},
	selectedText: {
		color: '#fff',
	},
});

export default Priority;
