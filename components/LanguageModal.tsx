import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { useStore } from '@/store/store';
import { useTranslation } from 'react-i18next';

interface Props {
	setModalVisible: (type: string) => void;
}

const LanguageModal: React.FC<Props> = (props) => {
	const { t } = useTranslation();
	const { setModalVisible } = props;
	const language = useStore((state) => state.language);
	const setLanguage = useStore((state) => state.setLanguage);

	return (
		<Modal transparent animationType="fade">
			<View style={styles.overlay}>
				<View style={styles.modalContainer}>
					<Text style={styles.title}>{t('selectLanguage')}</Text>
					<View style={styles.optionContainer}>
						<Picker selectedValue={language} onValueChange={(itemValue) => setLanguage(itemValue)} style={styles.picker}>
							<Picker.Item label="English" value="en" />
							<Picker.Item label="Ukrainian" value="ua" />
							<Picker.Item label="Русский" value="ru" />
						</Picker>
					</View>
					<TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible('language')}>
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

export default LanguageModal;
