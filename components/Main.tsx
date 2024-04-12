import { Table } from '@/components/Table'
import React, { useState, useEffect } from 'react';

import type { FunctionComponent } from 'react';
type Props = {
  children: string;
};

type Todo = {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
};

export const Main: FunctionComponent<Props> = ({children}) => {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        if (!response.ok) {
          throw new Error(`ネットワークエラー:  ${response.status}`);
        }
        const data: Todo[] = await response.json();
        setTodos(data);
      } catch (error) {
        console.error('データを取得できませんでした:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <main className='max-w-[860px] px-6 py-8'>
      <h2 className="text-4xl mb-8">{children}</h2>
      <Table todos={todos} />
    </main>
  )
}