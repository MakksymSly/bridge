import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import React from 'react';
import { useStore } from '@/store/store';
import { useTranslation } from 'react-i18next';
import { Link } from 'expo-router';

interface Props {
	setModalVisible: (type: string) => void;
}

const AboutModal: React.FC<Props> = (props) => {
	const { t } = useTranslation();
	const { setModalVisible } = props;

	const theme = useStore((state) => state.currentTheme);

	return (
		<Modal transparent animationType="fade">
			<View style={[styles.overlay, { backgroundColor: 'rgba(0, 0, 0, 0.6)' }]}>
				<View style={[styles.modalContainer, { backgroundColor: theme.colors.card, borderColor: theme.colors.primary }]}>
					<Text style={[styles.title, { color: theme.colors.primary }]}>{t('about')}</Text>
					<View style={styles.optionContainer}>
						<Text style={[styles.infoText, { color: theme.colors.text }]}>{t('version')}: 1.0</Text>
						<Text style={[styles.infoText, { color: theme.colors.text }]}>
							{t('developer')}: {t('developerName')}
						</Text>
						<Link href="mailto:MaksymSeliutin.dev@gmail.com" style={[styles.link, { color: theme.colors.notification }]}>
							Email: MaksymSeliutin.dev@gmail.com
						</Link>
						<Link href="https://github.com/MakksymSly" style={[styles.link, { color: theme.colors.notification }]}>
							My GitHub
						</Link>
					</View>
					<TouchableOpacity style={[styles.closeButton, { backgroundColor: theme.colors.primary, borderColor: theme.colors.notification }]} onPress={() => setModalVisible('about')}>
						<Text style={[styles.buttonText, { color: theme.colors.card }]}>{t('close')}</Text>
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
		backgroundColor: 'rgba(0, 0, 0, 0.6)',
	},
	modalContainer: {
		width: '85%',
		padding: 25,
		borderRadius: 20,
		alignItems: 'center',

		borderWidth: 2,

		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 5,
		elevation: 8,
	},
	title: {
		fontSize: 24,
		fontWeight: '700',
		marginBottom: 20,
		textAlign: 'center',
	},
	optionContainer: {
		width: '100%',
		marginBottom: 25,
	},
	infoText: {
		fontSize: 16,

		marginVertical: 5,
		textAlign: 'center',
	},
	link: {
		fontSize: 16,

		marginVertical: 5,
		textAlign: 'center',
		textDecorationLine: 'underline',
	},
	closeButton: {
		paddingVertical: 12,
		paddingHorizontal: 30,
		borderRadius: 12,
		alignItems: 'center',

		borderWidth: 1,
	},
	buttonText: {
		fontSize: 18,
		fontWeight: '600',
	},
});

export default AboutModal;
