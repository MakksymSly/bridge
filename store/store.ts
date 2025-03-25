import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ITodo } from '@/types/ITodo';
import { ICategory } from '@/types/ICategory';

interface Store {
	todos: ITodo[];
	addTodo: (todo: ITodo) => void;
	deleteTodo: (id: number) => void;
	updateTodo: (todo: ITodo, id: number) => void;
	reset: () => void;
	toggleStatus: (id: number) => void;
	categories: ICategory[];
	addCategory: (name: string, icon: string, color: string) => void;
	updateTodoCategory: (todoId: number, categoryId: string) => void;
	deleteTodoCategory: (categoryId: number) => void;
}

export const useStore = create<Store>()(
	persist(
		(set) => ({
			todos: [],
			addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
			deleteTodo: (id) => set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) })),
			toggleStatus: (id) =>
				set((state) => ({
					todos: state.todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
				})),
			updateTodo: (todo, id) => set((state) => ({ todos: state.todos.map((t) => (t.id === id ? todo : t)) })),
			reset: () => set({ todos: [] }),
			categories: [
				{ id: 1, name: 'Work', icon: '💼', color: 'rgba(0, 123, 255, 0.5)' },
				{ id: 2, name: 'House', icon: '🏠', color: 'rgba(40, 167, 69, 0.5)' },
				{ id: 3, name: 'Study', icon: '📚', color: 'rgba(255, 193, 7, 0.5)' },
				{ id: 4, name: 'Health', icon: '🏋️', color: 'rgba(220, 53, 69, 0.5)' },
				{ id: 5, name: 'Shopping', icon: '🛒', color: 'rgba(23, 162, 184, 0.5)' },
				{ id: 6, name: 'Finance', icon: '💰', color: 'rgba(108, 117, 125, 0.5)' },
				{ id: 7, name: 'Games', icon: '🎮', color: 'rgba(102, 16, 242, 0.5)' },
				{ id: 8, name: 'Travel', icon: '✈️', color: 'rgba(32, 201, 150, 0.35)' },
			],
			addCategory: (name, icon, color) =>
				set((state) => ({
					categories: [...state.categories, { id: Date.now(), name, icon, color }],
				})),
			deleteTodoCategory: (categoryId: number) =>
				set((state) => ({
					categories: state.categories.filter((category) => category?.id !== categoryId),
					todos: state.todos.map((todo) => (todo.category?.id === categoryId ? { ...todo, category: null } : todo)),
				})),
			updateTodoCategory: (todoId, categoryId) =>
				set((state) => ({
					todos: state.todos.map((todo) => (todo.id === todoId ? { ...todo, categoryId } : todo)),
				})),
		}),
		{
			name: 'Todos-Store',
			storage: createJSONStorage(() => AsyncStorage),
		}
	)
);
