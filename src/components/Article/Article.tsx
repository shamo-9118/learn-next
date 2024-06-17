import { useState, useEffect } from 'react';

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

type Props = {
  taskId: string | string[] | undefined;
};

export const Article = (props: Props) => {
  const [todoData, setTodoData] = useState<Todo>();

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/todos/${props.taskId}`,
        );
        if (!response.ok) {
          throw new Error(`ネットワークエラー:  ${response.status}`);
        }
        const data: Todo = await response.json();
        setTodoData(data);
      } catch (error) {
        console.error('データを取得できませんでした:', error);
      }
    };
    fetchTaskData();
  }, []);

  return (
    <div>
      <table>
        <tr>
          <td>ユーザーID</td>
          <td>{todoData?.userId}</td>
        </tr>
        <tr>
          <td>タスクID</td>
          <td>{todoData?.id}</td>
        </tr>
        <tr>
          <td>タスクタイトル</td>
          <td>{todoData?.title}</td>
        </tr>
        <tr>
          <td>完了ステータス</td>
          <td>
            <input type='checkbox' checked={todoData?.completed} />
          </td>
        </tr>
      </table>
    </div>
  );
};
