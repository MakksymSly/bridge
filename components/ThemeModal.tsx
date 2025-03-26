import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { useStore } from '@/store/store';
import { useTranslation } from 'react-i18next';

interface Props {
	setModalVisible: (type: string) => void;
}

const ThemeModal: React.FC<Props> = (props) => {
	const { t } = useTranslation();
	const { setModalVisible } = props;
	const theme = useStore((state) => state.currentTheme);
	const setTheme = useStore((state) => state.setTheme);

	return (
		<Modal transparent animationType="fade">
			<View style={styles.overlay}>
				<View style={styles.modalContainer}>
					<Text style={styles.title}>{t('selectTheme')}</Text>
					<View style={styles.optionContainer}>
						<Picker selectedValue={theme} onValueChange={(itemValue) => setTheme(itemValue)} style={styles.picker}>
							<Picker.Item label={t('dark')} value="dark" />
							<Picker.Item label={t('light')} value="light" />
						</Picker>
					</View>
					<TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible('theme')}>
						<Text style={styles.buttonText}>{t('close')}</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalContainer: {
		backgroundColor: '#363636',
		width: '80%',
		padding: 20,
		borderRadius: 15,
		alignItems: 'center',
	},
	title: {
		color: '#fff',
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 15,
		textAlign: 'center',
	},
	optionContainer: {
		width: '100%',
		marginBottom: 20,
	},
	picker: {
		backgroundColor: '#4A4A4A',
		color: '#fff',
		borderRadius: 10,
	},
	closeButton: {
		backgroundColor: '#FF4F4F',
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 10,
		alignItems: 'center',
	},
	buttonText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: '600',
	},
});

export default ThemeModal;
