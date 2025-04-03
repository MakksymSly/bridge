import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { useStore } from '@/store/store';
import { useTranslation } from 'react-i18next';

interface Props {
	setIsVisible: () => void;
	setExecutionDate: (time: Date | null) => void;
	setExecutionTime: (time: Date | null) => void;
}

const CalendarAndTimeModal: React.FC<Props> = (props) => {
	const { setIsVisible, setExecutionDate, setExecutionTime } = props;
	const [date, setDate] = useState(new Date());
	const [time, setTime] = useState<Date | null>(null);
	const [mode, setMode] = useState<'date' | 'time'>('date');
	const [show, setShow] = useState(false);
	const theme = useStore((state) => state.currentTheme);
	const { t } = useTranslation();

	const onChange = (_: any, selectedValue?: Date) => {
		const currentValue = selectedValue || date;
		if (mode === 'date') {
			setDate(currentValue);
		} else if (mode === 'time') {
			setTime(currentValue);
		}
		setShow(false);
	};

	const showMode = (currentMode: 'date' | 'time') => {
		setMode(currentMode);
		setShow(true);
	};

	const showDatepicker = () => {
		showMode('date');
	};

	const showTimepicker = () => {
		showMode('time');
	};

	const handleOKPress = () => {
		setExecutionDate(date);
		setExecutionTime(time);
		setIsVisible();
	};

	const formatDateTime = () => {
		const dateStr = date.toLocaleString('ru-RU', { dateStyle: 'medium' });
		const timeStr = time ? time.toLocaleString('ru-RU', { timeStyle: 'short' }) : 'Не выбрано';
		return `${dateStr}${time ? ', ' + timeStr : ''}`;
	};

	return (
		<View style={[styles.overlay, { backgroundColor: 'rgba(0, 0, 0, 0.9)' }]}>
			<SafeAreaView style={[styles.container, { backgroundColor: theme.colors.card }]}>
				<Text style={[styles.title, { color: theme.colors.text }]}>{t('pickDateAndTime')}</Text>

				<View style={styles.buttonContainer}>
					<TouchableOpacity style={[styles.optionButton, { backgroundColor: theme.colors.primary }]} onPress={showDatepicker} activeOpacity={0.8}>
						<Text style={[styles.buttonText, { color: theme.colors.card }]}>{t('date')}</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							styles.optionButton,
							{
								backgroundColor: time ? theme.colors.primary : theme.colors.background,
							},
						]}
						onPress={showTimepicker}
						activeOpacity={0.8}>
						<Text style={[styles.buttonText, { color: time ? theme.colors.card : theme.colors.text }]}>{t('time')}</Text>
					</TouchableOpacity>
				</View>

				<View style={[styles.dateContainer, { backgroundColor: theme.colors.background }]}>
					<Text style={[styles.label, { color: theme.colors.text }]}>{t('chosen')}:</Text>
					<Text style={[styles.dateText, { color: theme.colors.text }]}>{formatDateTime()}</Text>
				</View>

				<View style={styles.actionButtons}>
					<TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.colors.primary }]} onPress={handleOKPress}>
						<Text style={[styles.buttonText, { color: theme.colors.card }]}>{t('save')}</Text>
					</TouchableOpacity>
					<TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.colors.text }]} onPress={setIsVisible}>
						<Text style={[styles.buttonText, { color: theme.colors.card }]}>{t('cancel')}</Text>
					</TouchableOpacity>
				</View>

				{show && (
					<View style={[styles.pickerContainer, { backgroundColor: theme.colors.card }]}>
						<DateTimePicker testID="dateTimePicker" value={mode === 'date' ? date : time || date} mode={mode} is24Hour={true} onChange={onChange} style={styles.picker} textColor={theme.colors.text} />
					</View>
				)}
			</SafeAreaView>
		</View>
	);
};

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	container: {
		width: '90%',
		padding: 24,
		borderRadius: 16,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 8,
		elevation: 10,
	},
	title: {
		fontSize: 22,
		fontWeight: '600',
		textAlign: 'center',
		marginBottom: 20,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '100%',
		marginBottom: 20,
	},
	optionButton: {
		flex: 1,
		paddingVertical: 12,
		paddingHorizontal: 20,
		borderRadius: 12,
		marginHorizontal: 8,
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
		elevation: 3,
	},
	buttonText: {
		fontSize: 16,
		fontWeight: '500',
	},
	dateContainer: {
		padding: 16,
		borderRadius: 12,
		marginBottom: 20,
	},
	label: {
		fontSize: 14,
		fontWeight: '400',
		marginBottom: 8,
		opacity: 0.7,
	},
	dateText: {
		fontSize: 18,
		fontWeight: '500',
	},
	actionButtons: {
		flexDirection: 'row-reverse',
		justifyContent: 'space-around',
		width: '100%',
		marginBottom: 20,
	},
	actionButton: {
		flex: 1,
		paddingVertical: 12,
		paddingHorizontal: 20,
		borderRadius: 12,
		marginHorizontal: 8,
		alignItems: 'center',
		justifyContent: 'center',
	},
	pickerContainer: {
		borderRadius: 12,
		padding: 16,
		alignItems: 'center',
	},
	picker: {
		width: '100%',
	},
});

export default CalendarAndTimeModal;
