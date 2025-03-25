import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface Props {
	filter: string;
	setFilter: (value: string) => void;
	setModalVisible(visible: boolean): void;
}

const Filter: React.FC<Props> = ({ filter, setFilter, setModalVisible }) => {
	return (
		<Modal transparent animationType="fade">
			<View style={styles.overlay}>
				<View style={styles.modalContainer}>
					<Text style={styles.title}>Select Filter</Text>

					<Picker selectedValue={filter} onValueChange={(itemValue) => setFilter(itemValue)} style={styles.picker}>
						<Picker.Item label="All" value="all" />
						<Picker.Item label="Completed" value="completed" />
						<Picker.Item label="In Progress" value="inProgress" />
						<Picker.Item label="Most Prioritized" value="prioritized" />
						<Picker.Item label="Least Prioritized" value="leastPrioritized" />
						<Picker.Item label="Unprioritized" value="unprioritized" />
					</Picker>

					<TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
						<Text style={styles.closeText}>Close</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	overlay: {
		position: 'absolute',
		top: -200,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 1,
	},
	modalContainer: {
		backgroundColor: '#363636',
		width: '80%',
		padding: 20,
		borderRadius: 10,
		alignItems: 'center',
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 10,
		color: '#fff',
	},
	picker: {
		width: '100%',
		color: '#fff',
		backgroundColor: '#4A4A4A',
		borderRadius: 10,
	},
	closeButton: {
		marginTop: 20,
		backgroundColor: '#FF4F4F',
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 8,
		width: '100%',
		alignItems: 'center',
	},
	closeText: {
		color: '#fff',
		fontWeight: 'bold',
	},
});

export default Filter;
