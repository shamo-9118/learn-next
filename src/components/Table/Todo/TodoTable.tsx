import React from 'react';
import Link from 'next/link';
import { theadDescription } from '@/components/Table/Todo/styleCalsses';

import type { Todo } from '@/types/todo';

type Props = {
  filterdTodoList: Todo[];
};

export const TodoTable: React.FC<Props> = (props) => {
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
        {props.filterdTodoList.map((todo) => {
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
