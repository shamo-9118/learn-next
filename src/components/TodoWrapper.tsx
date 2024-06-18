import { SearchPanel } from './SearchPanel';
import { TodoTable } from './Table/Todo/TodoTable';

export const TodoWrapper = () => {
  return (
    <div>
      <SearchPanel />
      <TodoTable />
    </div>
  );
};
