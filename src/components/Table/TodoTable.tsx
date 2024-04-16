import React, { useState, useEffect } from 'react';
import Link from 'next/link'

type Todo = {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
};

export const TodoTable = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos`);
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
  const todoDataKeyList = todos.length > 0 ? Object.keys(todos[0]) : [];
  return (
    <table className="border-2 w-full">
      <thead className="border-2 text-center">
        <tr className="bg-[#bfdcff] font-medium">
          { 
            todoDataKeyList.map((todoDataKey) => {
              return <td className="border-2 text-center p-3" key={todoDataKey}>{todoDataKey}</td>
            })
          }
        </tr>
      </thead>
      <tbody className="border-2">
          {
            todos.map((todo) => {
              return (
                <tr className="border-2 p-3" key={todo.id}>
                  <td className="border-2 p-3 text-center">{todo.userId}</td>
                  <td className="border-2 p-3 text-center">{todo.id}</td>
                  <td className="border-2 p-3">
                    <Link href={`/todos/${encodeURIComponent(todo.id)}`}>
                      {todo.title}
                    </Link>
                  </td>
                  <td className="border-2 p-3 text-center">
                    <input type="checkbox" defaultChecked={todo.completed} />
                  </td>
                </tr>
              )
            })
          }
      </tbody>
    </table>
  )
}