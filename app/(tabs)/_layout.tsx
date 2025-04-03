import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { CustomDarkTheme } from '@/themes/CustomDarkTheme';
import { CustomLightTheme } from '@/themes/CustomLightTheme';
import { useStore } from '@/store/store';

export default function TabLayout() {
	const theme = useStore((state) => state.currentTheme);
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: theme.dark ? CustomDarkTheme.colors.primary : CustomLightTheme.colors.primary,
				headerShown: false,
				tabBarButton: HapticTab,
				tabBarHideOnKeyboard: true,
				tabBarBackground: TabBarBackground,
				tabBarStyle: {
					...Platform.select({
						ios: {
							position: 'absolute',
						},
						default: {},
					}),
					backgroundColor: theme.dark ? CustomDarkTheme.colors.card : CustomLightTheme.colors.card,
				},
			}}>
			<Tabs.Screen
				name="index"
				options={{
					title: ``,
					tabBarIcon: ({ color }) => <IconSymbol size={32} name="house.fill" color={color} />,
				}}
			/>

			<Tabs.Screen
				name="settings"
				options={{
					title: ``,
					tabBarIcon: ({ color }) => <EvilIcons name="gear" size={32} color={color} />,
				}}
			/>
		</Tabs>
	);
}
