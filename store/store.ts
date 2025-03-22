import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ITodo } from '@/types/ITodo';
import { ICategory } from '@/types/ICategory';

interface Store {
	todos: ITodo[];
	addTodo: (todo: ITodo) => void;
	deleteTodo: (id: number) => void;
	reset: () => void;
	toggleStatus: (id: number) => void;
	categories: ICategory[];
	addCategory: (name: string, icon: string, color: string) => void;
	updateTodoCategory: (todoId: number, categoryId: string) => void;
}

export const useStore = create<Store>()(
	persist(
		(set) => ({
			todos: [],
			categories: [
				{ id: 1, name: 'Work', icon: 'briefcase-outline', color: 'red' },
				{ id: 2, name: 'Home', icon: 'home-outline', color: 'blue' },
				{ id: 3, name: 'Fitess', icon: 'person-outline', color: 'purple' },
			],
			addCategory: (name, icon, color) =>
				set((state) => ({
					categories: [...state.categories, { id: Date.now(), name, icon, color }],
				})),
			updateTodoCategory: (todoId, categoryId) =>
				set((state) => ({
					todos: state.todos.map((todo) => (todo.id === todoId ? { ...todo, categoryId } : todo)),
				})),
			addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
			deleteTodo: (id) => set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) })),
			toggleStatus: (id) =>
				set((state) => ({
					todos: state.todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
				})),
			reset: () => set({ todos: [] }),
		}),
		{
			name: 'Todos-Store',
			storage: createJSONStorage(() => AsyncStorage),
		}
	)
);
