import { useMemo } from 'react';
import { Todo, FilterType } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import TodoInput from './TodoInput';
import TodoFilters from './TodoFilters';
import TodoList from './TodoList';
import TodoCounter from './TodoCounter';

export default function TodoApp() {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filter, setFilter] = useLocalStorage<FilterType>('todoFilter', 'all');

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((t) => !t.completed);
      case 'completed':
        return todos.filter((t) => t.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const activeCount = useMemo(() => todos.filter((t) => !t.completed).length, [todos]);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const editTodo = (id: string, title: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title } : t))
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="mx-auto max-w-lg px-4 py-12">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
            Список задач
          </h1>
          <p className="text-sm text-gray-400 mt-1">To-Do List</p>
        </header>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
          <TodoInput onAdd={addTodo} />
          <TodoFilters current={filter} onChange={setFilter} />
          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onEdit={editTodo}
            onDelete={deleteTodo}
          />
          {todos.length > 0 && (
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <TodoCounter count={activeCount} />
              {activeCount < todos.length && (
                <button
                  onClick={() =>
                    setTodos((prev) => prev.map((t) => ({ ...t, completed: false })))
                  }
                  className="text-sm text-indigo-500 hover:text-indigo-600 transition-colors"
                >
                  Сбросить все
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}