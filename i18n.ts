import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from '@/locales/en.json';
import ru from '@/locales/ru.json';
import ua from '@/locales/ua.json';

i18n.use(initReactI18next).init({
	resources: {
		en: { translation: en },
		ru: { translation: ru },
		ua: { translation: ua },
	},
	lng: 'en',
	fallbackLng: 'en',
	interpolation: {
		escapeValue: false,
	},

	react: {
		useSuspense: false,
	},
});

AsyncStorage.getItem('language').then((storedLanguage) => {
	if (storedLanguage) {
		i18n.changeLanguage(storedLanguage);
	}
});

export default i18n;
