import React, { useState, useEffect } from 'react';
import type { Todo } from '@/types/todo';

export const SearchPanel = () => {
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
    <div className='space-y-3 mb-6 bg-neutral-100 py-4 px-5 rounded-md'>
      <div>
        <label className='flex flex-col max-w-[300px]'>
          <span className='text-sm'>検索ボックス</span>
          <input
            className='border-[2px] border-neutral-300 rounded-md px-1'
            type='text'
            value={searchConditionCharacter}
            onChange={handleSearchConditionCharacter}
          />
        </label>
      </div>
      <div className='flex gap-4 mb-4'>
        {todoUserIdList.map((todoUserId) => {
          return (
            <button
              onClick={() => getSelectedUserId(todoUserId)}
              className={`w-full bg-sky-600 text-white rounded-md duration-200 ${
                todoUserId === isSelectedUserId ? ' opacity-25' : 'opacity-100'
              }`}
              key={todoUserId}
            >
              {todoUserId}
            </button>
          );
        })}
      </div>
      <div>
        <label className='flex flex-col max-w-[300px]' htmlFor=''>
          <span className='text-sm tracking-[-0.08em]'>ステータス</span>
          <select
            value={selectedStatus}
            onChange={handleSelectedStatus}
            className='border-[2px] border-neutral-300 rounded-md p-1'
            name=''
            id=''
          >
            <option className='notSelected' value='' selected>
              選択してください
            </option>
            <option value='completed'>完了</option>
            <option value='incomplete'>未完了</option>
          </select>
        </label>
      </div>
      <div>
        <label className='flex flex-col max-w-[300px]' htmlFor=''>
          <span className='text-sm tracking-[-0.08em]'>並び替え</span>
          <select
            value={selectedArrangementType}
            onChange={handleSelectedArrangementType}
            className='border-[2px] border-neutral-300 rounded-md p-1'
            name=''
            id=''
          >
            <option value='ascending_order' selected>
              昇順
            </option>
            <option value='descending_order'>降順</option>
          </select>
        </label>
      </div>
    </div>
  );
};
