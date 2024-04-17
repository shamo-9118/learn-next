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
  const [isSelectedUserId, setIsSelectedUserId] = useState<number>(0);
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
  const todoUserIdList = Array.from(new Set(todos.map((todo)=> todo.userId)))
  const getSelectedUserId = (todoUserId: number) => {
    if (todoUserId === isSelectedUserId) {
      setIsSelectedUserId(0)
    }
    setIsSelectedUserId(todoUserId)
  }

  return (
    <>
      <div className='flex gap-4 mb-4'>
        {
          todoUserIdList.map((todoUserId)=>{
            return <button onClick={() => getSelectedUserId(todoUserId)} className='w-full bg-sky-600 text-white rounded-md' key={todoUserId}>{todoUserId}</button>;
          })
        }
      </div>
      <table className='border-2 w-full'>
        <thead className='border-2 text-center'>
          <tr className='bg-[#bfdcff] font-medium'>
            { 
              todoDataKeyList.map((todoDataKey) => {
                return <td className='border-2 text-center p-3' key={todoDataKey}>{todoDataKey}</td>
              })
            }
          </tr>
        </thead>
        <tbody className='border-2'>
            {
              todos.map((todo) => {
                if(isSelectedUserId !== 0) {
                  if (todo.userId !== isSelectedUserId) return
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
                      <input type="checkbox" defaultChecked={todo.completed} />
                    </td>
                  </tr>
                )
              })
            }
        </tbody>
      </table>
    </>
  )
}