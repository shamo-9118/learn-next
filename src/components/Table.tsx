type Todo = {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
};

type Props = {
  todos: Todo[]
}

export const Table: React.FC<Props> = ({todos}) => {
  const todoDataKeyList = todos.length > 0 ? Object.keys(todos[0]) : [];
  return (
    <table className="border-2">
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
              console.log(todos)
              return (
                <tr className="border-2 p-3" key={todo.id}>
                  <td className="border-2 p-3 text-center">{todo.userId}</td>
                  <td className="border-2 p-3 text-center">{todo.id}</td>
                  <td className="border-2 p-3">{todo.title}</td>
                  <td className="border-2 p-3 text-center">
                    <input type="checkbox" checked={todo.completed} />
                  </td>
                </tr>
              )
            })
          }
      </tbody>
    </table>
  )
}