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
  const [selectedStatus, setSelectedStatus] = useState<string>('notSelected');
  const [searchConditionCharacter, setSearchConditionCharacter] = useState<string>('');
  const [selectedArrangementType, setSelectedArragementType] =useState<string>('ascending_order')
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const text = 'laboriosam mollitia et enim quasi adipisci quia provident illum'

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
  const todoUserIdList = Array.from(new Set(todos.map((todo)=> todo.userId))).sort()
  const getSelectedUserId = (todoUserId: number) => {
    if (todoUserId === isSelectedUserId) {
      setIsSelectedUserId(0)
      return;
    }
    setIsSelectedUserId(todoUserId)
  }

  const handleSelectedStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value)
  }

  const handleSearchConditionCharacter = (event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchConditionCharacter(event.target.value)
  }

  const handleSelectedArrangementType = (event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedArragementType(event.target.value)
  }

  useEffect(()=> {
    if (selectedArrangementType === 'ascending_order') {
      const newTodos = [...todos].sort((a,b)=> a.id - b.id);
      setTodos(newTodos)
    }
  
    if (selectedArrangementType === 'descending_order') {
      const newTodos = [...todos].sort((a,b)=> b.id - a.id);
      setTodos(newTodos)
    }
  },[selectedArrangementType])

  return (
    <>
    <div className='space-y-3 mb-6 bg-neutral-100 py-4 px-5 rounded-md'>
      <div>
        <label className='flex flex-col max-w-[300px]'>
          <span className='text-sm'>検索ボックス</span>
          <input className='border-[2px] border-neutral-300 rounded-md px-1' type="text" value={searchConditionCharacter} onChange={handleSearchConditionCharacter}/>
        </label>
      </div>
      <div className='flex gap-4 mb-4'>
        {
          todoUserIdList.map((todoUserId)=>{
            return (
              <button
                onClick={() => getSelectedUserId(todoUserId)}
                className={`w-full bg-sky-600 text-white rounded-md duration-200 ${todoUserId === isSelectedUserId ? ' opacity-25' : 'opacity-100'}`}
                key={todoUserId}
              >
                {todoUserId}
              </button>
            )
          })
        }
      </div>
      <div>
        <label className='flex flex-col max-w-[300px]' htmlFor="">
          <span className='text-sm tracking-[-0.08em]'>ステータス</span>
          <select value={selectedStatus} onChange={handleSelectedStatus} className='border-[2px] border-neutral-300 rounded-md p-1' name="" id="">
            <option className='notSelected' value="" selected>選択してください</option>
            <option value="completed">完了</option>
            <option value="incomplete">未完了</option>
          </select>
        </label>
      </div>
      <div>
        <label className='flex flex-col max-w-[300px]' htmlFor="">
          <span className='text-sm tracking-[-0.08em]'>並び替え</span>
          <select value={selectedArrangementType} onChange={handleSelectedArrangementType} className='border-[2px] border-neutral-300 rounded-md p-1' name="" id="">
            <option value='ascending_order' selected>昇順</option>
            <option value='descending_order'>降順</option>
          </select>
        </label>
      </div>
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
                if (isSelectedUserId !== 0) {
                  if (todo.userId !== isSelectedUserId) return
                }

                if (selectedStatus !== 'notSelected') {
                  if (selectedStatus === 'completed' && !todo.completed) return
                  if (selectedStatus === 'incomplete' && todo.completed) return
                }

                if (searchConditionCharacter.length > 0) {
                  const isExistedSearchTargetCharacter = todo.title.indexOf(searchConditionCharacter) === -1 ? false : true;
                  if(!isExistedSearchTargetCharacter) return;
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