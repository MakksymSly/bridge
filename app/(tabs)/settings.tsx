import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const settings = () => {
	const clearStorage = async () => {
		try {
			await AsyncStorage.clear();
			console.log('AsyncStorage очищен');
		} catch (error) {
			console.error('Ошибка при очистке AsyncStorage:', error);
		}
	};
	return (
		<View>
			<TouchableOpacity onPress={clearStorage} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
				<Text>Clear</Text>
			</TouchableOpacity>
		</View>
	);
};

export default settings;
