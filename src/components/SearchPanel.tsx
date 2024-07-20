import React, { useState, useEffect } from 'react';

import type { Todo } from '@/types/todo';
import type { SelectedStatus } from '@/types/selectedStatus';
import type { SelectedArrangementType } from '@/types/selectedArrangementType';

type Props = {
  todoUserIdList: number[];
  searchItems: SearchItems;
};

type SearchItems = {
  selectedUserId: number;
  setSelectedUserId: React.Dispatch<React.SetStateAction<number>>;
  selectedStatus: string;
  setSelectedStatus: React.Dispatch<React.SetStateAction<string>>;
  searchConditionCharacter: string;
  setSearchConditionCharacter: React.Dispatch<React.SetStateAction<string>>;
  selectedArrangementType: SelectedArrangementType;
  setSelectedArragementType: React.Dispatch<
    React.SetStateAction<SelectedArrangementType>
  >;
};

export const SearchPanel: React.FC<Props> = (props) => {
  const [selectedUserId, setSelectedUserId] = useState(0);

  const getSelectedUserId = (todoUserId: number) => {
    if (todoUserId === selectedUserId) {
      setSelectedUserId(0);
      return;
    }

    setSelectedUserId(todoUserId);
  };

  const handleSelectedStatus = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    props.searchItems.setSelectedStatus(event.target.value);
  };

  const handleSearchConditionCharacter = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    props.searchItems.setSearchConditionCharacter(event.target.value);
  };

  const handleSelectedArrangementType = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const value = event.target.value as SelectedArrangementType;
    props.searchItems.setSelectedArragementType(value);
  };

  return (
    <div className='space-y-3 mb-6 bg-neutral-100 py-4 px-5 rounded-md'>
      <div>
        <label className='flex flex-col max-w-[300px]'>
          <span className='text-sm'>検索ボックス</span>
          <input
            className='border-[2px] border-neutral-300 rounded-md px-1'
            type='text'
            value={props.searchItems.searchConditionCharacter}
            onChange={handleSearchConditionCharacter}
          />
        </label>
      </div>
      <div className='flex gap-4 mb-4'>
        {props.todoUserIdList.map((todoUserId) => {
          return (
            <button
              onClick={() => getSelectedUserId(todoUserId)}
              className={`w-full bg-sky-600 text-white rounded-md duration-200 ${
                todoUserId === selectedUserId ? ' opacity-25' : 'opacity-100'
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
            value={props.searchItems.selectedStatus}
            onChange={handleSelectedStatus}
            className='border-[2px] border-neutral-300 rounded-md p-1'
            name=''
            id=''
          >
            <option className='notSelected' value='notSelected'>
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
            value={props.searchItems.selectedArrangementType}
            onChange={handleSelectedArrangementType}
            className='border-[2px] border-neutral-300 rounded-md p-1'
            name=''
            id=''
          >
            <option value='ascending_order'>昇順</option>
            <option value='descending_order'>降順</option>
          </select>
        </label>
      </div>
    </div>
  );
};
