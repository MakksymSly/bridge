import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import LanguageModal from '@/components/LanguageModal';
import ThemeModal from '@/components/ThemeModal';
import Feather from '@expo/vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

const Settings = () => {
	const { t } = useTranslation();
	const [isClearModalVisible, setIsClearModalVisible] = useState(false);
	const [isLanguageModalVisible, setIsLanguageModalVisible] = useState(false);
	const [isThemeModalVisible, setIsThemeModalVisible] = useState(false);

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
		<View style={styles.container}>
			{isLanguageModalVisible && <LanguageModal setModalVisible={handleModalVisible} />}
			{isThemeModalVisible && <ThemeModal setModalVisible={handleModalVisible} />}

			<Text style={styles.header}>{t('settings')}</Text>

			<TouchableOpacity style={styles.optionButton} onPress={() => handleModalVisible('theme')}>
				<Feather name="moon" size={24} color="#fff" />
				<Text style={styles.optionText}>{t('choseTheme')}</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.optionButton} onPress={() => handleModalVisible('language')}>
				<Feather name="globe" size={24} color="#fff" />
				<Text style={styles.optionText}>{t('choseLanguage')}</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.clearButton} onPress={() => handleModalVisible('clear')}>
				<Feather name="trash-2" size={24} color="#fff" />
				<Text style={styles.buttonText}>{t('clearStorage')}</Text>
			</TouchableOpacity>

			<Modal transparent visible={isClearModalVisible} animationType="fade">
				<View style={styles.modalOverlay}>
					<View style={styles.modalContainer}>
						<Text style={styles.modalTitle}>{t('clearStorageConfirm')}</Text>
						<Text style={styles.modalMessage}>{t('clearStorageMessage')}</Text>
						<View style={styles.modalButtonContainer}>
							<TouchableOpacity style={styles.modalCancelButton} onPress={() => handleModalVisible('clear')}>
								<Text style={styles.buttonText}>Cancel</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.modalConfirmButton}
								onPress={() => {
									clearStorage();
									handleModalVisible('clear');
								}}>
								<Text style={styles.buttonText}>Confirm</Text>
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
		backgroundColor: '#363636',
		padding: 20,
		paddingTop: 60,
	},
	header: {
		color: '#fff',
		fontSize: 28,
		fontWeight: 'bold',
		marginBottom: 30,
		textAlign: 'center',
	},
	optionButton: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#4A4A4A',
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
		color: '#fff',
		fontSize: 18,
		fontWeight: '600',
		marginLeft: 15,
	},
	clearButton: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#FF4F4F',
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
		color: '#fff',
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
		backgroundColor: '#363636',
		width: '80%',
		padding: 20,
		borderRadius: 15,
		alignItems: 'center',
	},
	modalTitle: {
		color: '#fff',
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 15,
	},
	modalMessage: {
		color: '#fff',
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
		backgroundColor: '#555',
		paddingVertical: 12,
		paddingHorizontal: 20,
		borderRadius: 10,
		flex: 1,
		alignItems: 'center',
	},
	modalConfirmButton: {
		backgroundColor: '#FF4F4F',
		paddingVertical: 12,
		paddingHorizontal: 20,
		borderRadius: 10,
		flex: 1,
		alignItems: 'center',
	},
});

export default Settings;
