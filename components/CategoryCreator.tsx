import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { useStore } from '@/store/store';
import { Icons, Colors } from '@/constants/IconsAndColors';

interface Props {
	setIsCreationModalVisible: (value: boolean) => void;
}

const CategoryCreator: React.FC<Props> = ({ setIsCreationModalVisible }) => {
	const icons = Icons;
	const colors = Colors;
	const [icon, setIcon] = useState<string>('💼');
	const [category, setCategory] = useState<string>('');
	const [color, setColor] = useState(colors[0]);
	const [error, setError] = useState<string | null>(null);

	const addCategory = useStore((state) => state.addCategory);

	const handleModalClose = () => {
		setIsCreationModalVisible(false);
	};

	const handleAddCategory = () => {
		if (category.trim() === '') {
			setError('Category name cannot be empty');
			return;
		}
		addCategory(category, icon, color);
		handleModalClose();
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View style={styles.container}>
				<Text style={styles.label}>CATEGORY NAME</Text>
				<TextInput
					style={[styles.input, error ? styles.inputError : null]}
					placeholder="Enter category name"
					placeholderTextColor="#999"
					value={category}
					onChangeText={(text) => {
						setCategory(text);
						setError(null);
					}}
				/>
				{error && <Text style={styles.errorText}>{error}</Text>}

				<Text style={styles.label}>CATEGORY ICON</Text>
				<View style={styles.iconContainer}>
					{icons.map((item) => (
						<TouchableOpacity key={item} style={[styles.iconBox, icon === item && styles.selectedIcon]} onPress={() => setIcon(item)}>
							<Text style={styles.iconText}>{item}</Text>
						</TouchableOpacity>
					))}
				</View>

				<Text style={styles.label}>CATEGORY COLOR</Text>
				<View style={styles.colorContainer}>
					{colors.map((col) => (
						<TouchableOpacity key={col} style={[styles.colorBox, { backgroundColor: col }, color === col && styles.selectedColor]} onPress={() => setColor(col)} />
					))}
				</View>

				<TouchableOpacity style={[styles.button, { backgroundColor: '#8687E7' }]} onPress={handleAddCategory}>
					<Text style={styles.buttonText}>ADD</Text>
				</TouchableOpacity>
				<TouchableOpacity style={[styles.button, { backgroundColor: '#FF4F4F' }]} onPress={handleModalClose}>
					<Text style={styles.buttonText}>CANCEL</Text>
				</TouchableOpacity>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#2C2C2C',
		padding: 20,
		borderRadius: 15,
		width: '90%',
		maxHeight: '80%',
		alignItems: 'center',
	},
	label: {
		color: '#fff',
		fontSize: 16,
		marginBottom: 5,
	},
	iconContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		marginVertical: 10,
	},
	iconBox: {
		width: 40,
		height: 40,
		margin: 5,
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#3E3E3E',
	},
	selectedIcon: {
		borderWidth: 2,
		borderColor: '#fff',
	},
	iconText: {
		fontSize: 20,
	},
	input: {
		backgroundColor: '#3E3E3E',
		color: '#fff',
		borderRadius: 8,
		padding: 10,
		fontSize: 16,
		width: '100%',
		marginBottom: 10,
	},
	inputError: {
		borderWidth: 2,
		borderColor: '#FF4F4F',
	},
	errorText: {
		color: '#FF4F4F',
		marginBottom: 10,
		fontSize: 14,
	},
	colorContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		marginVertical: 10,
	},
	colorBox: {
		width: 40,
		height: 40,
		margin: 5,
		borderRadius: 5,
	},
	selectedColor: {
		borderWidth: 2,
		borderColor: '#fff',
	},
	button: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 12,
		marginTop: 10,
		borderRadius: 8,
	},
	buttonText: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 16,
	},
});

export default CategoryCreator;
