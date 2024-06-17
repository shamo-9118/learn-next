import React, { useState, useEffect } from 'react';
import Link from 'next/link';

type Todo = {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
};

export const TodoTable = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isSelectedUserId, setIsSelectedUserId] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState('notSelected');
  const [searchConditionCharacter, setSearchConditionCharacter] = useState('');
  const [selectedArrangementType, setSelectedArragementType] =
    useState('ascending_order');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/todos`,
        );
        if (!response.ok) {
          throw new Error(`ネットワークエラー:  ${response.status}`);
        }
        const data: Todo[] = await response.json();
        setTodos(data);
      } catch (error) {
        console.error('データを取得できませんでした:', error);
      }
    };

    fetchData();
  }, []);

  const todoDataKeyList = todos.length > 0 ? Object.keys(todos[0]) : [];
  const todoUserIdList = Array.from(
    new Set(todos.map((todo) => todo.userId)),
  ).sort();
  const getSelectedUserId = (todoUserId: number) => {
    if (todoUserId === isSelectedUserId) {
      setIsSelectedUserId(0);
      return;
    }
    setIsSelectedUserId(todoUserId);
  };

  const handleSelectedStatus = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedStatus(event.target.value);
  };

  const handleSearchConditionCharacter = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchConditionCharacter(event.target.value);
  };

  const handleSelectedArrangementType = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedArragementType(event.target.value);
  };

  useEffect(() => {
    if (selectedArrangementType === 'ascending_order') {
      const newTodos = [...todos].sort((a, b) => a.id - b.id);
      setTodos(newTodos);
    }

    if (selectedArrangementType === 'descending_order') {
      const newTodos = [...todos].sort((a, b) => b.id - a.id);
      setTodos(newTodos);
    }
  }, [selectedArrangementType]);

  return (
    <table className='border-2 w-full'>
      <thead className='border-2 text-center'>
        <tr className='bg-[#bfdcff] font-medium'>
          {todoDataKeyList.map((todoDataKey) => {
            return (
              <td className='border-2 text-center p-3' key={todoDataKey}>
                {todoDataKey}
              </td>
            );
          })}
        </tr>
      </thead>
      <tbody className='border-2'>
        {todos.map((todo) => {
          if (isSelectedUserId !== 0) {
            if (todo.userId !== isSelectedUserId) return;
          }

          if (selectedStatus !== 'notSelected') {
            if (selectedStatus === 'completed' && !todo.completed) return;
            if (selectedStatus === 'incomplete' && todo.completed) return;
          }

          if (searchConditionCharacter.length > 0) {
            const isExistedSearchTargetCharacter =
              todo.title.indexOf(searchConditionCharacter) === -1
                ? false
                : true;
            if (!isExistedSearchTargetCharacter) return;
          }

          return (
            <tr className='border-2 p-3' key={todo.id}>
              <td className='border-2 p-3 text-center'>{todo.userId}</td>
              <td className='border-2 p-3 text-center'>{todo.id}</td>
              <td className='border-2 p-3'>
                <Link href={`/todos/${encodeURIComponent(todo.id)}`}>
                  {todo.title}
                </Link>
              </td>
              <td className='border-2 p-3 text-center'>
                <input type='checkbox' defaultChecked={todo.completed} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
