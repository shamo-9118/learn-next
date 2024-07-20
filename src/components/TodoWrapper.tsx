import React, { useEffect, useState, useMemo } from 'react';

import { SearchPanel } from './SearchPanel';
import { TodoTable } from './Table/Todo/TodoTable';
import { useFetchData } from '@/hooks/usefetchData';

import type { Todo } from '@/types/todo';
import type { SelectedStatus } from '@/types/selectedStatus';
import type { SelectedArrangementType } from '@/types/selectedArrangementType';

export const TodoWrapper = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState('notSelected');
  const [searchConditionCharacter, setSearchConditionCharacter] = useState('');
  const [selectedArrangementType, setSelectedArragementType] =
    useState<SelectedArrangementType>('ascending_order');

  const fetchedData = useFetchData('todos');
  useEffect(() => {
    setTodos(fetchedData);
  }, [fetchedData]);

  const todoUserIdList = Array.from(
    new Set(todos.map((todo) => todo.userId)),
  ).sort((a, b) => a - b);

  const filterdTodoList = useMemo(() => {
    let filteredTodos = [...todos];

    if (selectedUserId != 0) {
      filteredTodos = filteredTodos.filter(
        (todo) => todo.userId === selectedUserId,
      );
    }

    if (selectedStatus !== 'notSelected') {
      filteredTodos = filteredTodos.filter((todo) =>
        selectedStatus === 'completed' ? todo.completed : !todo.completed,
      );
    }

    if (searchConditionCharacter !== '') {
      filteredTodos = filteredTodos.filter((todo) =>
        todo.title.includes(searchConditionCharacter),
      );
    }

    if (selectedArrangementType === 'ascending_order') {
      filteredTodos.sort((a, b) => a.id - b.id);
    }
    if (selectedArrangementType === 'descending_order') {
      filteredTodos.sort((a, b) => b.id - a.id);
    }

    return filteredTodos;
  }, [
    todos,
    selectedUserId,
    selectedStatus,
    searchConditionCharacter,
    selectedArrangementType,
  ]);

  const searchItems = {
    selectedUserId,
    setSelectedUserId,
    selectedStatus,
    setSelectedStatus,
    searchConditionCharacter,
    setSearchConditionCharacter,
    selectedArrangementType,
    setSelectedArragementType,
  };

  return (
    <div>
      <SearchPanel todoUserIdList={todoUserIdList} searchItems={searchItems} />
      <TodoTable filterdTodoList={filterdTodoList} />
    </div>
  );
};
