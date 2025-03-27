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
	const theme = useStore((state) => state.currentTheme);

	return (
		<Modal transparent animationType="fade">
			<View style={[styles.overlay, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
				<View style={[styles.modalContainer, { backgroundColor: theme.colors.card }]}>
					<Text style={[styles.title, { color: theme.colors.text }]}>{t('selectLanguage')}</Text>
					<View style={styles.optionContainer}>
						<Picker selectedValue={language} onValueChange={(itemValue) => setLanguage(itemValue)} style={[styles.picker, { backgroundColor: theme.colors.background, color: theme.colors.text }]}>
							<Picker.Item label="English" value="en" />
							<Picker.Item label="Ukrainian" value="ua" />
							<Picker.Item label="Русский" value="ru" />
						</Picker>
					</View>
					<TouchableOpacity style={[styles.closeButton, { backgroundColor: theme.colors.notification }]} onPress={() => setModalVisible('language')}>
						<Text style={[styles.buttonText, { color: theme.colors.text }]}>{t('close')}</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalContainer: {
		width: '80%',
		padding: 20,
		borderRadius: 15,
		alignItems: 'center',
	},
	title: {
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
		borderRadius: 10,
	},
	closeButton: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 10,
		alignItems: 'center',
	},
	buttonText: {
		fontSize: 18,
		fontWeight: '600',
	},
});

export default LanguageModal;
