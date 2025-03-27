import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import Priority from './Priority';
import { Priorities } from '../constants/Priorities';
import { useTranslation } from 'react-i18next';
import { useStore } from '@/store/store';

interface Props {
	handlePriorityModalToggle: () => void;
	setSelectedPriority: (num: number) => void;
	selectedPriority: number | null;
}

const NewPriority: React.FC<Props> = ({ handlePriorityModalToggle, setSelectedPriority, selectedPriority }) => {
	const { t } = useTranslation();
	const theme = useStore((state) => state.currentTheme); // Добавляем получение темы

	return (
		<View style={[styles.container, { backgroundColor: theme.colors.card }]}>
			<ScrollView contentContainerStyle={styles.scrollContainer}>
				<View style={styles.priorityContainer}>
					{Priorities.map((priority) => (
						<Priority key={priority} handlePriorityModalToggle={handlePriorityModalToggle} setSelectedPriority={setSelectedPriority} priority={priority} selectedPriority={selectedPriority} />
					))}
				</View>
			</ScrollView>
			<TouchableOpacity style={[styles.cancelButton, { backgroundColor: theme.colors.notification, shadowColor: theme.colors.notification }]} onPress={handlePriorityModalToggle}>
				<Text style={[styles.cancelText, { color: theme.colors.text }]}>{t('cancel')}</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 20,
		borderRadius: 15,
		width: '90%',
		maxHeight: '80%',
		top: 30,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 6,
		elevation: 8,
	},
	scrollContainer: {
		width: '100%',
		alignItems: 'center',
	},
	priorityContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		gap: 12,
		width: '100%',
	},
	cancelButton: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 12,
		borderRadius: 10,
		marginTop: 20,
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.5,
		shadowRadius: 4,
		elevation: 5,
	},
	cancelText: {
		fontSize: 16,
		fontWeight: 'bold',
	},
});

export default NewPriority;
