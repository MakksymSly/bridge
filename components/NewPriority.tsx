import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import Priority from './Priority';
import { Priorities } from '../constants/Priorities';

interface Props {
	handlePriorityModalToggle: () => void;
	setSelectedPriority: (num: number) => void;
	selectedPriority: number | null;
}

const NewPriority: React.FC<Props> = ({ handlePriorityModalToggle, setSelectedPriority, selectedPriority }) => {
	return (
		<View style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollContainer}>
				<View style={styles.priorityContainer}>
					{Priorities.map((priority) => (
						<Priority key={priority} handlePriorityModalToggle={handlePriorityModalToggle} setSelectedPriority={setSelectedPriority} priority={priority} selectedPriority={selectedPriority} />
					))}
				</View>
			</ScrollView>
			<TouchableOpacity style={styles.cancelButton} onPress={handlePriorityModalToggle}>
				<Text style={styles.cancelText}>CANCEL</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#2D2D2D',
		padding: 20,
		borderRadius: 15,
		width: '90%',
		maxHeight: '80%',
		top: 30,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 6,
		elevation: 8,
	},
	scrollContainer: {
		width: '100%',
		alignItems: 'center',
	},
	priorityContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		gap: 12,
		width: '100%',
	},
	cancelButton: {
		backgroundColor: '#FF4F4F',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 12,
		borderRadius: 10,
		marginTop: 20,
		shadowColor: '#FF4F4F',
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.5,
		shadowRadius: 4,
		elevation: 5,
	},
	cancelText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
	},
});

export default NewPriority;
