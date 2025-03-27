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
	const currentTheme = useStore((state) => state.currentTheme);
	const themeName = useStore((state) => state.themeName);
	const setTheme = useStore((state) => state.setTheme);

	return (
		<Modal transparent animationType="fade">
			<View style={[styles.overlay, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
				<View style={[styles.modalContainer, { backgroundColor: currentTheme.colors.card }]}>
					<Text style={[styles.title, { color: currentTheme.colors.text }]}>{t('selectTheme')}</Text>
					<View style={styles.optionContainer}>
						<Picker selectedValue={themeName} onValueChange={(itemValue) => setTheme(itemValue as 'light' | 'dark')} style={[styles.picker, { backgroundColor: currentTheme.colors.background, color: currentTheme.colors.text }]}>
							<Picker.Item label={t('dark')} value="dark" />
							<Picker.Item label={t('light')} value="light" />
						</Picker>
					</View>
					<TouchableOpacity style={[styles.closeButton, { backgroundColor: currentTheme.colors.notification }]} onPress={() => setModalVisible('theme')}>
						<Text style={[styles.buttonText, { color: currentTheme.colors.text }]}>{t('close')}</Text>
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
