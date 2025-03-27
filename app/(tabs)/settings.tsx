import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import LanguageModal from '@/components/LanguageModal';
import ThemeModal from '@/components/ThemeModal';
import Feather from '@expo/vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { useStore } from '@/store/store';
import AboutModal from '@/components/AboutModal';

const Settings = () => {
	const { t } = useTranslation();
	const [isClearModalVisible, setIsClearModalVisible] = useState(false);
	const [isLanguageModalVisible, setIsLanguageModalVisible] = useState(false);
	const [isThemeModalVisible, setIsThemeModalVisible] = useState(false);
	const [isAboutModalVisible, setIsAboutModalVisible] = useState(false);
	const theme = useStore((state) => state.currentTheme);

	const handleModalVisible = (name: string) => {
		switch (name) {
			case 'language':
				setIsLanguageModalVisible(!isLanguageModalVisible);
				break;
			case 'clear':
				setIsClearModalVisible(!isClearModalVisible);
				break;
			case 'theme':
				setIsThemeModalVisible(!isThemeModalVisible);
				break;
			case 'about':
				setIsAboutModalVisible(!isAboutModalVisible);
				break;
		}
	};

	const clearStorage = async () => {
		try {
			await AsyncStorage.clear();
		} catch (e) {
			throw new Error(`${e}`);
		}
	};

	return (
		<View style={[styles.container, { backgroundColor: theme.colors.background }]}>
			{isLanguageModalVisible && <LanguageModal setModalVisible={handleModalVisible} />}
			{isThemeModalVisible && <ThemeModal setModalVisible={handleModalVisible} />}
			{isAboutModalVisible && <AboutModal setModalVisible={handleModalVisible} />}

			<Text style={[styles.header, { color: theme.colors.text }]}>{t('settings')}</Text>

			<TouchableOpacity style={[styles.optionButton, { backgroundColor: theme.colors.card }]} onPress={() => handleModalVisible('theme')}>
				<Feather name="moon" size={24} color={theme.colors.text} />
				<Text style={[styles.optionText, { color: theme.colors.text }]}>{t('choseTheme')}</Text>
			</TouchableOpacity>

			<TouchableOpacity style={[styles.optionButton, { backgroundColor: theme.colors.card }]} onPress={() => handleModalVisible('language')}>
				<Feather name="globe" size={24} color={theme.colors.text} />
				<Text style={[styles.optionText, { color: theme.colors.text }]}>{t('choseLanguage')}</Text>
			</TouchableOpacity>
			<TouchableOpacity style={[styles.optionButton, { backgroundColor: theme.colors.card }]} onPress={() => handleModalVisible('about')}>
				<Feather name="info" size={24} color={theme.colors.text} />
				<Text style={[styles.optionText, { color: theme.colors.text }]}>{t('about')}</Text>
			</TouchableOpacity>

			<TouchableOpacity style={[styles.clearButton, { backgroundColor: theme.colors.notification }]} onPress={() => handleModalVisible('clear')}>
				<Feather name="trash-2" size={24} color={theme.colors.text} />
				<Text style={[styles.buttonText, { color: theme.colors.text }]}>{t('clearStorage')}</Text>
			</TouchableOpacity>

			<Modal transparent visible={isClearModalVisible} animationType="fade">
				<View style={styles.modalOverlay}>
					<View style={[styles.modalContainer, { backgroundColor: theme.colors.card }]}>
						<Text style={[styles.modalTitle, { color: theme.colors.text }]}>{t('clearStorageConfirm')}</Text>
						<Text style={[styles.modalMessage, { color: theme.colors.text }]}>{t('clearStorageMessage')}</Text>
						<View style={styles.modalButtonContainer}>
							<TouchableOpacity style={[styles.modalCancelButton, { backgroundColor: theme.colors.border }]} onPress={() => handleModalVisible('clear')}>
								<Text style={[styles.buttonText, { color: theme.colors.text }]}>Cancel</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={[styles.modalConfirmButton, { backgroundColor: theme.colors.notification }]}
								onPress={() => {
									clearStorage();
									handleModalVisible('clear');
								}}>
								<Text style={[styles.buttonText, { color: theme.colors.text }]}>Confirm</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		paddingTop: 60,
	},
	header: {
		fontSize: 28,
		fontWeight: 'bold',
		marginBottom: 30,
		textAlign: 'center',
	},
	optionButton: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 15,
		borderRadius: 10,
		marginBottom: 15,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 3,
		elevation: 5,
	},
	optionText: {
		fontSize: 18,
		fontWeight: '600',
		marginLeft: 15,
	},
	clearButton: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 15,
		borderRadius: 10,
		marginTop: 20,
		justifyContent: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 3,
		elevation: 5,
	},
	buttonText: {
		fontSize: 18,
		fontWeight: '600',
		marginLeft: 15,
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalContainer: {
		width: '80%',
		padding: 20,
		borderRadius: 15,
		alignItems: 'center',
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 15,
	},
	modalMessage: {
		fontSize: 16,
		textAlign: 'center',
		marginBottom: 20,
	},
	modalButtonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
		gap: 10,
	},
	modalCancelButton: {
		paddingVertical: 12,
		paddingHorizontal: 20,
		borderRadius: 10,
		flex: 1,
		alignItems: 'center',
	},
	modalConfirmButton: {
		paddingVertical: 12,
		paddingHorizontal: 20,
		borderRadius: 10,
		flex: 1,
		alignItems: 'center',
	},
});

export default Settings;
