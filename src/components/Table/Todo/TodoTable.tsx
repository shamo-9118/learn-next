import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { theadDescription } from '@/components/Table/Todo/styleCalsses';
import { useFetchData } from '@/hooks/usefetchData';

import type { Todo } from '@/types/todo';

export const TodoTable = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isSelectedUserId, setIsSelectedUserId] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState('notSelected');
  const [searchConditionCharacter, setSearchConditionCharacter] = useState('');

  const fetchedData = useFetchData('todos');

  useEffect(() => {
    setTodos(fetchedData);
  }, [fetchedData]);

  return (
    <table className='border-2 w-full'>
      <thead className='border-2 text-center'>
        <tr className='bg-[#bfdcff] font-medium'>
          <td className={theadDescription}>ユーザーID</td>
          <td className={theadDescription}>ID</td>
          <td className={theadDescription}>タイトル</td>
          <td className={theadDescription}>完了</td>
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
            <tr className={theadDescription} key={todo.id}>
              <td className={theadDescription}>{todo.userId}</td>
              <td className={theadDescription}>{todo.id}</td>
              <td className={theadDescription}>
                <Link href={`/todos/${encodeURIComponent(todo.id)}`}>
                  {todo.title}
                </Link>
              </td>
              <td className={theadDescription}>
                <input type='checkbox' defaultChecked={todo.completed} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
