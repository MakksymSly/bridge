import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ITodo } from '@/types/ITodo';
interface Store {
	todos: ITodo[];
	addTodo: (todo: ITodo) => void;
	deleteTodo: (id: number) => void;
	reset: () => void;
	toggleStatus: (id: number) => void;
}

export const useStore = create<Store>()(
	persist(
		(set) => ({
			todos: [
				{ id: 1, title: 'Сделать зарядку', completed: false, DateCreated: '2023-01-01' },
				{ id: 2, title: 'Почитать книгу', completed: true, DateCreated: '2023-01-01' },
				{ id: 3, title: 'Написать код', completed: false, DateCreated: '2023-01-01' },
				{ id: 4, title: 'Сходить в магазин', completed: false, DateCreated: '2023-01-01' },
				{ id: 5, title: 'Посмотреть урок по React Native', completed: true, DateCreated: '2023-01-01' },
			],
			addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
			deleteTodo: (id: number) => set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) })),
			toggleStatus: (id: number) => set((state) => ({ todos: state.todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)) })),
			reset: () => set({ todos: [] }),
		}),
		{
			name: 'Todos-Store',
			storage: createJSONStorage(() => AsyncStorage),
		}
	)
);
