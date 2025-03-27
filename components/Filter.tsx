import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';
import { useStore } from '@/store/store';

interface Props {
	filter: string;
	setFilter: (value: string) => void;
	setModalVisible(visible: boolean): void;
}

const Filter: React.FC<Props> = ({ filter, setFilter, setModalVisible }) => {
	const { t } = useTranslation();
	const theme = useStore((state) => state.currentTheme); // Добавляем получение темы

	return (
		<Modal transparent animationType="fade">
			<View style={[styles.overlay, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
				<View style={[styles.modalContainer, { backgroundColor: theme.colors.card }]}>
					<Text style={[styles.title, { color: theme.colors.text }]}>{t('selectFilter')}</Text>

					<Picker selectedValue={filter} onValueChange={(itemValue) => setFilter(itemValue)} style={[styles.picker, { color: theme.colors.text, backgroundColor: theme.colors.background }]}>
						<Picker.Item label={t('all')} value="all" />
						<Picker.Item label={t('completed')} value="completed" />
						<Picker.Item label={t('inProgress')} value="inProgress" />
						<Picker.Item label={t('mostPrioritized')} value="prioritized" />
						<Picker.Item label={t('leastPrioritized')} value="leastPrioritized" />
						<Picker.Item label={t('unprioritized')} value="unprioritized" />
					</Picker>

					<TouchableOpacity style={[styles.closeButton, { backgroundColor: theme.colors.notification }]} onPress={() => setModalVisible(false)}>
						<Text style={[styles.closeText, { color: theme.colors.text }]}>{t('close')}</Text>
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
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 1,
	},
	modalContainer: {
		width: '80%',
		padding: 20,
		borderRadius: 10,
		alignItems: 'center',
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	picker: {
		width: '100%',
		borderRadius: 10,
	},
	closeButton: {
		marginTop: 20,
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 8,
		width: '100%',
		alignItems: 'center',
	},
	closeText: {
		fontWeight: 'bold',
	},
});

export default Filter;
