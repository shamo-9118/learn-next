import React, { useEffect, useState } from 'react';

import { SearchPanel } from './SearchPanel';
import { TodoTable } from './Table/Todo/TodoTable';
import { useFetchData } from '@/hooks/usefetchData';

import type { Todo } from '@/types/todo';

export const TodoWrapper = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchedData = useFetchData('todos');
  useEffect(() => {
    setTodos(fetchedData);
  }, [fetchedData]);

  const todoUserIdList = Array.from(
    new Set(todos.map((todo) => todo.userId)),
  ).sort((a, b) => a - b);

  return (
    <div>
      <SearchPanel />
      <TodoTable />
    </div>
  );
};
