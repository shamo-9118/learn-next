import { useEffect, useState } from 'react';
import type { Todo } from '@/types/todo';

export const useFetchData = (path: string) => {
  const [data, setData] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/${path}`,
        );
        if (!response.ok) {
          throw new Error(`ネットワークエラー:  ${response.status}`);
        }
        const data: Todo[] = await response.json();
        setData(data);
      } catch (error) {
        console.error('データを取得できませんでした:', error);
      }

      fetchData();
    };
  }, []);

  return data;
};
