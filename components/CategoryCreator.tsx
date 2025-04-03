import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { useStore } from '@/store/store';
import { Icons, Colors } from '@/constants/IconsAndColors';
import { useTranslation } from 'react-i18next';

interface Props {
	setIsCreationModalVisible: (value: boolean) => void;
}

const CategoryCreator: React.FC<Props> = ({ setIsCreationModalVisible }) => {
	const { t } = useTranslation();
	const theme = useStore((state) => state.currentTheme);

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
			setError(`${t('categoryNameCannotBeEmpty')}`);
			return;
		}
		addCategory(category, icon, color);
		handleModalClose();
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View style={[styles.container, { backgroundColor: theme.colors.card }]}>
				<Text style={[styles.label, { color: theme.colors.text }]}>{t('categoryName')}</Text>
				<TextInput
					style={[styles.input, { backgroundColor: theme.colors.background, color: theme.colors.text }, error ? styles.inputError : null]}
					placeholder={t('enterCategoryName')}
					placeholderTextColor={theme.colors.border}
					value={category}
					onChangeText={(text) => {
						setCategory(text);
						setError(null);
					}}
				/>
				{error && <Text style={[styles.errorText, { color: theme.colors.notification }]}>{error}</Text>}

				<Text style={[styles.label, { color: theme.colors.text }]}>{t('categoryIcon')}</Text>
				<View style={styles.iconContainer}>
					{icons.map((item) => (
						<TouchableOpacity key={item} style={[styles.iconBox, { backgroundColor: theme.colors.background }, icon === item && styles.selectedIcon, icon === item && { borderColor: `${theme.dark ? '#fff' : '#000'}` }]} onPress={() => setIcon(item)}>
							<Text style={styles.iconText}>{item}</Text>
						</TouchableOpacity>
					))}
				</View>

				<Text style={[styles.label, { color: theme.colors.text }]}>{t('categoryColor')}</Text>
				<View style={styles.colorContainer}>
					{colors.map((col) => (
						<TouchableOpacity key={col} style={[styles.colorBox, { backgroundColor: col, borderColor: theme.colors.border }, color === col && styles.selectedColor, color === col && { borderColor: `${theme.dark ? '#fff' : '#000'}` }]} onPress={() => setColor(col)} />
					))}
				</View>

				<TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.primary }]} onPress={handleAddCategory}>
					<Text style={[styles.buttonText, { color: theme.colors.text }]}>{t('add')}</Text>
				</TouchableOpacity>
				<TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.notification }]} onPress={handleModalClose}>
					<Text style={[styles.buttonText, { color: theme.colors.text }]}>{t('cancel')}</Text>
				</TouchableOpacity>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		padding: 20,
		borderRadius: 15,
		width: '90%',
		alignItems: 'center',
		top: 300,
		minHeight: '55%',
	},
	label: {
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
	},
	selectedIcon: {
		borderWidth: 2,
		borderColor: '#fff',
	},
	iconText: {
		fontSize: 20,
	},
	input: {
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
		fontWeight: 'bold',
		fontSize: 16,
	},
});

export default CategoryCreator;
