import { FilterType } from '../types';

interface TodoFiltersProps {
  current: FilterType;
  onChange: (filter: FilterType) => void;
}

const filters: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'Все' },
  { value: 'active', label: 'Активные' },
  { value: 'completed', label: 'Выполненные' },
];

export default function TodoFilters({ current, onChange }: TodoFiltersProps) {
  return (
    <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
            current === f.value
              ? 'bg-white text-indigo-600 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}