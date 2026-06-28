interface TodoCounterProps {
  count: number;
}

export default function TodoCounter({ count }: TodoCounterProps) {
  const word = count === 1 ? 'задача' : count >= 2 && count <= 4 ? 'задачи' : 'задач';

  return (
    <p className="text-sm text-gray-500">
      {count} {word} осталось
    </p>
  );
}