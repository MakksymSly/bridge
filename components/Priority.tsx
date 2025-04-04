import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useStore } from '@/store/store';

interface Props {
	setSelectedPriority?: (num: number) => void;
	priority: number;
	selectedPriority?: number | null;
	handlePriorityModalToggle?: () => void;
}

const Priority: React.FC<Props> = (props) => {
	const { setSelectedPriority, priority, selectedPriority, handlePriorityModalToggle } = props;
	const theme = useStore((state) => state.currentTheme);
	const isSelected = priority === selectedPriority;

	return (
		<TouchableOpacity
			style={[styles.todoItemPriorityContainer, { borderColor: theme.colors.primary }, isSelected && { backgroundColor: theme.colors.primary }]}
			onPress={() => {
				setSelectedPriority?.(priority);
				handlePriorityModalToggle?.();
			}}
			activeOpacity={0.7}>
			<Ionicons name="flag-outline" size={20} color={isSelected ? theme.colors.text : theme.colors.primary} />
			<Text style={[styles.todoItemPriorityText, { color: theme.colors.primary }, isSelected && { color: theme.colors.text }]}>{priority}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	todoItemPriorityContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
		borderWidth: 1,
		borderRadius: 8,
		paddingVertical: 6,
		paddingHorizontal: 12,
		backgroundColor: 'transparent',
	},
	todoItemPriorityText: {
		fontSize: 16,
		fontWeight: '600',
	},
});

export default Priority;
